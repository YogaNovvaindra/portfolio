import crypto from 'node:crypto'
import { SpanStatusCode } from '@opentelemetry/api'

export default defineEventHandler((event) => {
  const startTime = performance.now()
  const req = event.node.req
  const res = event.node.res

  const headers = req.headers || {}

  function extractTraceparentFromHeaders(h) {
    if (!h) return null
    if (h['traceparent']) return h['traceparent']
    return null
  }

  function extractTraceIdFromHeaders(h) {
    if (!h) return null
    if (h['x-request-id']) return h['x-request-id']
    if (h['x-correlation-id']) return h['x-correlation-id']
    return null
  }

  function extractClientIpFromHeaders(h) {
    if (!h) return null
    if (h['cf-connecting-ip']) return h['cf-connecting-ip']
    if (h['true-client-ip']) return h['true-client-ip']
    const xff = h['x-forwarded-for'] || h['x-forwarded']
    if (xff) return xff.split(',')[0].trim()
    return null
  }

  const traceparent = extractTraceparentFromHeaders(headers) || undefined
  const incomingTraceId = extractTraceIdFromHeaders(headers)
  const cfRay = headers['cf-ray'] || undefined

  const method = req.method || 'GET'
  const url = req.url || '/'
  const path = url.split('?')[0] || '/'

  // ── Suppress internal Nuxt routes ────────────────────────────────────────
  // /__nuxt_error is Nuxt's internal SSR mechanism for rendering error.vue.
  // Its URL contains a full URL-encoded stack trace — extremely noisy and not
  // a real user request. The actual 404/500 is already logged on the original
  // request path, and the client sends a page.error beacon via /api/pageview.
  if (path.startsWith('/__nuxt_error') || path.startsWith('/__nuxt_island')) {
    return
  }

  const isStatic =
    url.startsWith('/_nuxt/') ||
    url.startsWith('/favicon.ico') ||
    /\.(png|jpe?g|gif|svg|webp|css|js|woff2?|ico|json)$/i.test(url.split('?')[0])

  const headerIp = extractClientIpFromHeaders(headers)
  const clientIp = headerIp || getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const userAgent =
    (req.headers && (req.headers['user-agent'] || req.headers['User-Agent'])) || 'unknown'

  const host = headers['host'] || undefined

  // ── OpenTelemetry span — created FIRST so its trace ID drives the log traceId
  // getTracer() auto-imported from server/utils/tracer.js; null when OTLP disabled
  let span = null
  try {
    const tracer = getTracer()
    if (tracer) {
      span = tracer.startSpan(`${method} ${path}`, {
        attributes: {
          'http.method': method,
          'http.url': url,
          'http.target': path,
          'http.host': host || '',
          'http.user_agent': userAgent,
          'net.peer.ip': clientIp,
          'cf.ray': cfRay || '',
        },
      })
      event.context.otelSpan = span
    }
  } catch (_) {
    // OTEL not available / disabled — silently skip
  }

  // Use the OTEL span's own trace ID so Loki + Tempo share the same ID.
  // Falls back to incoming header ID or a new UUID when OTEL is off.
  const otelTraceId = span?.spanContext?.()?.traceId || null
  // Always 32-char lowercase hex (W3C TraceContext format) — same whether OTLP on or off
  const traceId = otelTraceId || incomingTraceId || crypto.randomBytes(16).toString('hex')

  event.context.traceId = traceId
  event.context.traceparent = traceparent
  event.context.cfRay = cfRay

  // ── Auto-forward Trace Context for internal useRequestFetch() ──────────
  // By mutating req.headers, Nuxt's useRequestFetch() will automatically
  // forward these trace headers to any internal SSR API calls.
  req.headers['x-request-id'] = traceId
  if (span) {
    const ctx = span.spanContext()
    const flags = ctx.traceFlags.toString(16).padStart(2, '0')
    req.headers['traceparent'] = `00-${ctx.traceId}-${ctx.spanId}-${flags}`
  } else if (!req.headers['traceparent']) {
    req.headers['traceparent'] = `00-${traceId}-0000000000000000-01`
  }

  res.setHeader('X-Trace-ID', traceId)

  const incomingMeta = {
    event: 'http.request',
    source: isStatic ? 'static' : 'route',
    ip: clientIp,
    host,
    userAgent,
    cfRay,
    traceparent,
    direction: 'inbound',
    method,
    path,
    url,
  }

  if (isStatic) {
    logger.debug('request received', traceId, incomingMeta)
  } else {
    logger.info('request received', traceId, incomingMeta)
  }

  // Intercept write/end to count actual bytes sent (works for chunked/streaming too)
  let responseBytes = 0
  const origWrite = res.write.bind(res)
  const origEnd = res.end.bind(res)
  res.write = (chunk, ...args) => {
    if (chunk) responseBytes += Buffer.byteLength(chunk)
    return origWrite(chunk, ...args)
  }
  res.end = (chunk, ...args) => {
    if (chunk) responseBytes += Buffer.byteLength(chunk)
    return origEnd(chunk, ...args)
  }

  res.on('finish', () => {
    const duration = (performance.now() - startTime).toFixed(2)
    const statusCode = res.statusCode || 200

    let level = 'info'
    if (statusCode >= 500) {
      level = 'error'
    } else if (statusCode >= 400) {
      level = 'warn'
    }

    const outgoingMeta = {
      event: 'http.response',
      source: isStatic ? 'static' : 'route',
      statusCode,
      durationMs: parseFloat(duration),
      responseBytes,
      direction: 'outbound',
      method,
      path,
      url,
      host,
      ip: clientIp,
      userAgent,
      cfRay,
      traceparent,
    }

    if (isStatic) {
      logger.debug('request completed', traceId, outgoingMeta)
    } else {
      logger[level]('request completed', traceId, outgoingMeta)
    }

    // ── Finish OTEL span ────────────────────────────────────────────────────
    if (span) {
      span.setAttributes({
        'http.status_code': statusCode,
        'http.response_content_length': responseBytes,
        'http.duration_ms': parseFloat(duration),
      })
      if (statusCode >= 500) {
        span.setStatus({ code: SpanStatusCode.ERROR })
      }
      span.end()
    }
  })
})

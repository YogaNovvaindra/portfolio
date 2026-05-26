import crypto from 'node:crypto'

export default defineEventHandler((event) => {
  const startTime = performance.now()
  const req = event.node.req
  const res = event.node.res

  // Prefer incoming trace/correlation headers when present
  const headers = req.headers || {}

  function extractTraceIdFromHeaders(h) {
    if (!h) return null
    // W3C Trace Context
    if (h['traceparent']) return h['traceparent']
    // Common app-level correlation ids
    if (h['x-request-id']) return h['x-request-id']
    if (h['x-correlation-id']) return h['x-correlation-id']
    // Cloudflare edge id as a useful fallback
    if (h['cf-ray']) return `cf:${h['cf-ray']}`
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

  // 1. Use incoming trace header when available, otherwise generate UUID
  const incomingTrace = extractTraceIdFromHeaders(headers)
  const traceId = incomingTrace || crypto.randomUUID()

  // 2. Attach to request context so downstream handlers/utilities can read it
  event.context.traceId = traceId

  // 3. Inject X-Trace-ID into response headers for client transparency
  res.setHeader('X-Trace-ID', traceId)

  const method = req.method || 'GET'
  const url = req.url || '/'
  const path = url.split('?')[0] || '/'
  
  // Categorize static files to prevent log spam in local terminals, but still log them at DEBUG/info levels
  const isStatic = url.startsWith('/_nuxt/') || 
                   url.startsWith('/favicon.ico') || 
                   url.startsWith('/__nuxt') ||
                   /\.(png|jpe?g|gif|svg|webp|css|js|woff2?|ico|json)$/i.test(url.split('?')[0])

  // Determine client IP preferring Cloudflare headers
  const headerIp = extractClientIpFromHeaders(headers)
  const clientIp = headerIp || getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const userAgent = (req.headers && (req.headers['user-agent'] || req.headers['User-Agent'])) || 'unknown'
  const cfRay = headers['cf-ray'] || undefined

  // Log the incoming request
  const incomingMeta = {
    event: 'http.request',
    source: isStatic ? 'static' : 'route',
    ip: clientIp,
    userAgent,
    cfRay,
    direction: 'inbound',
    method,
    path,
    url
  }

  if (isStatic) {
    logger.debug('request received', traceId, incomingMeta)
  } else {
    logger.info('request received', traceId, incomingMeta)
  }

  // 4. Hook into standard response lifecycle completion to log final outcome and latency
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
      direction: 'outbound',
      method,
      path,
      url,
      ip: clientIp,
      userAgent
    }

    if (isStatic) {
      logger.debug('request completed', traceId, outgoingMeta)
    } else {
      logger[level]('request completed', traceId, outgoingMeta)
    }
  })
})

import crypto from 'node:crypto'

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
  const traceId = incomingTraceId || crypto.randomUUID()
  const cfRay = headers['cf-ray'] || undefined

  event.context.traceId = traceId
  event.context.traceparent = traceparent
  event.context.cfRay = cfRay

  res.setHeader('X-Trace-ID', traceId)

  const method = req.method || 'GET'
  const url = req.url || '/'
  const path = url.split('?')[0] || '/'
  
  const isStatic = url.startsWith('/_nuxt/') || 
                   url.startsWith('/favicon.ico') || 
                   url.startsWith('/__nuxt') ||
                   /\.(png|jpe?g|gif|svg|webp|css|js|woff2?|ico|json)$/i.test(url.split('?')[0])

  const headerIp = extractClientIpFromHeaders(headers)
  const clientIp = headerIp || getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const userAgent = (req.headers && (req.headers['user-agent'] || req.headers['User-Agent'])) || 'unknown'

  const host = headers['host'] || undefined

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
    url
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
      traceparent
    }

    if (isStatic) {
      logger.debug('request completed', traceId, outgoingMeta)
    } else {
      logger[level]('request completed', traceId, outgoingMeta)
    }
  })
})

import crypto from 'node:crypto'

export default defineEventHandler((event) => {
  const startTime = performance.now()
  const req = event.node.req
  const res = event.node.res

  // 1. Generate standard UUID trace ID for tracing correlation
  const traceId = crypto.randomUUID()

  // 2. Attach to request context so downstream handlers/utilities can read it
  event.context.traceId = traceId

  // 3. Inject X-Trace-ID into response headers for client transparency
  res.setHeader('X-Trace-ID', traceId)

  const method = req.method || 'GET'
  const url = req.url || '/'
  
  // Categorize static files to prevent log spam in local terminals, but still log them at DEBUG/info levels
  const isStatic = url.startsWith('/_nuxt/') || 
                   url.startsWith('/favicon.ico') || 
                   url.startsWith('/__nuxt') ||
                   /\.(png|jpe?g|gif|svg|webp|css|js|woff2?|ico|json)$/i.test(url.split('?')[0])

  // Nitro's built-in getRequestIP automatically parses true IPs behind proxies (X-Forwarded-For, Cloudflare, etc.)
  const clientIp = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const userAgent = req.headers['user-agent'] || 'unknown'

  // Log the incoming request
  const logPrefix = isStatic ? '[STATIC]' : '[ROUTE]'
  const incomingMsg = `${logPrefix} ---> ${method} ${url}`
  const incomingMeta = {
    ip: clientIp,
    userAgent,
    type: isStatic ? 'static' : 'route',
    direction: 'inbound'
  }

  if (isStatic) {
    logger.debug(incomingMsg, traceId, incomingMeta)
  } else {
    logger.info(incomingMsg, traceId, incomingMeta)
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

    const outgoingMsg = `${logPrefix} <--- ${method} ${url} ${statusCode} (${duration}ms)`
    const outgoingMeta = {
      statusCode,
      durationMs: parseFloat(duration),
      type: isStatic ? 'static' : 'route',
      direction: 'outbound'
    }

    if (isStatic) {
      logger.debug(outgoingMsg, traceId, outgoingMeta)
    } else {
      logger[level](outgoingMsg, traceId, outgoingMeta)
    }
  })
})

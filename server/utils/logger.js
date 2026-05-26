// Beautiful, environment-aware logger utility.
// Auto-imported in Nitro server context.
// Outputs to standard stdout/stderr, ideal for Docker logs consumption.

/**
 * Formats a log line as single-line structured JSON to stdout/stderr.
 * Excellent for Docker container log parsing by fluentd, promtail, datadog-agent, etc.
 */
function formatJsonLog(level, message, traceId, meta = {}) {
  // Standardized top-level fields for all logs. Put any extras under `meta`.
  const service = process.env.SERVICE_NAME || 'portfolio'
  const env = process.env.NODE_ENV || 'development'

  const {
    event,
    source,
    operation,
    method,
    path,
    url,
    statusCode,
    durationMs,
    direction,
    ip,
    userAgent,
    traceparent,
    cfRay,
    error,
    ...rest
  } = meta || {}

  const payload = {
    timestamp: new Date().toISOString(),
    service,
    env,
    level: level.toUpperCase(),
    traceId: traceId || undefined,
    message: message || undefined,
    event: event || undefined,
    source: source || undefined,
    operation: operation || undefined,
    method: method || undefined,
    path: path || undefined,
    url: url || undefined,
    statusCode: statusCode || undefined,
    durationMs: durationMs || undefined,
    direction: direction || undefined,
    ip: ip || undefined,
    userAgent: userAgent || undefined,
    traceparent: traceparent || undefined,
    cfRay: cfRay || undefined,
    error: error || undefined
  }

  if (Object.keys(rest).length) payload.meta = rest

  return JSON.stringify(payload)
}

/**
 * Standard log function writing to standard stdout/stderr streams.
 */
function writeLog(level, message, eventOrTraceId, meta = {}) {
  let traceId = null
  if (typeof eventOrTraceId === 'string') {
    traceId = eventOrTraceId
  } else if (eventOrTraceId && typeof eventOrTraceId === 'object') {
    // Read trace ID from Nitro event context if available
    traceId = eventOrTraceId.context?.traceId || null
  }

  const output = formatJsonLog(level, message, traceId, meta)

  // Docker captures stdout for console.log/console.info/console.debug and stderr for console.error/console.warn
  if (level === 'error') {
    console.error(output)
  } else if (level === 'warn') {
    console.warn(output)
  } else {
    console.log(output)
  }
}

export const logger = {
  info: (message, eventOrTraceId, meta) => writeLog('info', message, eventOrTraceId, meta),
  warn: (message, eventOrTraceId, meta) => writeLog('warn', message, eventOrTraceId, meta),
  error: (message, eventOrTraceId, meta) => writeLog('error', message, eventOrTraceId, meta),
  debug: (message, eventOrTraceId, meta) => writeLog('debug', message, eventOrTraceId, meta)
}

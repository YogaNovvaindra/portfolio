// Beautiful, environment-aware logger utility.
// Auto-imported in Nitro server context.
// Outputs to standard stdout/stderr, ideal for Docker logs consumption.

/**
 * Formats a log line as single-line structured JSON to stdout/stderr.
 * Excellent for Docker container log parsing by fluentd, promtail, datadog-agent, etc.
 */
function formatJsonLog(level, message, traceId, meta = {}) {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    level: level.toUpperCase(),
    traceId: traceId || undefined,
    message,
    ...meta
  })
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

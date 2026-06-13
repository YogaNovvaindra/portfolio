/**
 * POST /api/pageview
 * Receives client-side SPA page navigation events and emits structured server logs.
 * This ensures /about, /portfolio, /blog, /blog/[slug], and all Vue Router routes
 * — including 404/error pages — appear in server traces with a standardized shape.
 */
import { trace, context } from '@opentelemetry/api'

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}))

  const { page, from, title, referrer, statusCode, statusMessage, errorEvent } = body || {}

  const isError = !!errorEvent

  // Pull real request context so page.view logs mirror http.request shape
  const req = event.node.req
  const headers = req.headers || {}
  const host = headers['host'] || undefined
  const userAgent = headers['user-agent'] || headers['User-Agent'] || undefined
  const cfRay = headers['cf-ray'] || event.context?.cfRay || undefined
  const ip =
    headers['cf-connecting-ip'] ||
    headers['true-client-ip'] ||
    (headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    getRequestIP(event, { xForwardedFor: true }) ||
    undefined

  const pagePath = page || 'unknown'
  const eventName = isError ? 'page.error' : 'page.view'

  // ── Create an explicit child span in Tempo for the page view ──────────
  try {
    const tracer = typeof getTracer !== 'undefined' ? getTracer() : null
    const parentSpan = event.context.otelSpan
    if (tracer && parentSpan) {
      const ctx = trace.setSpan(context.active(), parentSpan)
      const viewSpan = tracer.startSpan(eventName, {
        attributes: {
          'page.path': pagePath,
          'page.title': title || '',
          'page.referrer': referrer || '',
          'page.from': from || '',
          'http.status_code': statusCode || undefined
        }
      }, ctx)
      viewSpan.end() // Instant span just to mark the event in the waterfall
    }
  } catch (_) {}

  logger.info(isError ? 'error page view' : 'page view', event, {
    event: eventName,
    source: 'client',
    direction: 'inbound',
    method: 'GET',           // SPA navigations are logical GETs from user perspective
    host,
    path: pagePath,          // the actual page route (/about, /portfolio, etc.)
    url: pagePath,
    ip,
    userAgent,
    cfRay,
    statusCode: statusCode || undefined,
    statusMessage: statusMessage || undefined,
    // page-specific context
    from: from || undefined,
    title: title || undefined,
    referrer: referrer || undefined,
  })

  setResponseStatus(event, 204)
  return null
})


// Nuxt 3 Ghost API Service
// Runs server-side — ghostKey is never exposed to the browser

/**
 * internalUrl — strips the Ghost origin so all asset paths are relative.
 * Matches the behaviour of the old Vue CLI ghost.js service.
 */
function internalUrl(obj, ghostUrl) {
  if (obj === null || obj === undefined) return obj
  const origin = ghostUrl?.replace(/\/$/, '') || 'https://ygnv.my.id'
  if (typeof obj === 'string') return obj.replaceAll(origin, '')
  if (Array.isArray(obj)) return obj.map(i => internalUrl(i, ghostUrl))
  if (typeof obj === 'object') {
    const out = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        out[key] = internalUrl(obj[key], ghostUrl)
      }
    }
    return out
  }
  return obj
}

/**
 * Wraps a Ghost $fetch call in an OTEL child span.
 * Returns null span when OTLP is disabled — zero overhead.
 */
async function withGhostSpan(operation, url, traceId, fn) {
  const tracer = getTracer()
  if (!tracer) return fn()

  const { createRequire } = await import('node:module')
  const _require = createRequire(import.meta.url)
  const { SpanStatusCode } = _require('@opentelemetry/api')

  const span = tracer.startSpan(`ghost.${operation}`, {
    attributes: {
      'peer.service': 'ghost-cms',
      'http.method': 'GET',
      'http.url': url,
      'db.system': 'ghost',
      'db.operation': operation,
      'log.trace_id': traceId || '',
    },
  })

  const startTime = performance.now()
  try {
    const result = await fn()
    span.setAttributes({
      'http.status_code': 200,
      'http.duration_ms': parseFloat((performance.now() - startTime).toFixed(2)),
    })
    span.end()
    return result
  } catch (err) {
    const status = err?.response?.status || err?.statusCode || 500
    span.setAttributes({
      'http.status_code': status,
      'http.duration_ms': parseFloat((performance.now() - startTime).toFixed(2)),
      'error.message': err?.message || err.toString(),
    })
    span.setStatus({ code: SpanStatusCode.ERROR, message: err?.message || err.toString() })
    span.end()
    throw err
  }
}

export function useGhostApi(event = null) {
  const config = useRuntimeConfig()
  const BASE = (config.public.ghostUrl || process.env.GHOST_URL || process.env.NUXT_PUBLIC_GHOST_URL || 'https://ygnv.my.id').replace(/\/$/, '')
  const KEY = config.ghostKey || process.env.GHOST_KEY || process.env.NUXT_GHOST_KEY || ''

  const defaultParams = `key=${KEY}&include=tags,authors&formats=html`
  const traceId = event?.context?.traceId || null
  const traceparent = event?.context?.traceparent || null
  const cfRay = event?.context?.cfRay || null

  const fetchHeaders = {}
  if (traceId) {
    fetchHeaders['x-request-id'] = traceId
    fetchHeaders['x-correlation-id'] = traceId
  }
  if (traceparent) {
    fetchHeaders.traceparent = traceparent
  }

  const fetchOptions = Object.keys(fetchHeaders).length ? { headers: fetchHeaders } : {}

  function logGhostRequest(level, message, operation, url, meta = {}) {
    logger[level](message, traceId, {
      event: 'ghost.request',
      source: 'ghost',
      operation,
      method: 'GET',
      url,
      direction: 'outbound',
      traceparent: traceparent || undefined,
      cfRay: cfRay || undefined,
      ...meta
    })
  }

  async function getPosts(limit = 'all', page = 1, filter = null) {
    let url = `${BASE}/ghost/api/content/posts/?${defaultParams}&limit=${limit}&page=${page}`
    if (filter) url += `&filter=${encodeURIComponent(filter)}`

    const loggedUrl = url.replace(`key=${KEY}`, 'key=[REDACTED]')
    logGhostRequest('info', 'request started', 'getPosts', loggedUrl)

    const startTime = performance.now()
    return withGhostSpan('getPosts', loggedUrl, traceId, async () => {
      try {
        const data = await $fetch(url, fetchOptions)
        const duration = (performance.now() - startTime).toFixed(2)
        logGhostRequest('info', 'request completed', 'getPosts', loggedUrl, { statusCode: 200, durationMs: parseFloat(duration) })
        return internalUrl(data, BASE)
      } catch (err) {
        const duration = (performance.now() - startTime).toFixed(2)
        logGhostRequest('error', 'request failed', 'getPosts', loggedUrl, {
          statusCode: err?.response?.status || err?.statusCode || 500,
          durationMs: parseFloat(duration),
          error: err.toString()
        })
        throw err
      }
    })
  }

  async function getPostBySlug(slug) {
    const url = `${BASE}/ghost/api/content/posts/slug/${slug}/?${defaultParams}`
    const loggedUrl = url.replace(`key=${KEY}`, 'key=[REDACTED]')
    logGhostRequest('info', 'request started', 'getPostBySlug', loggedUrl)

    const startTime = performance.now()
    return withGhostSpan('getPostBySlug', loggedUrl, traceId, async () => {
      try {
        const data = await $fetch(url, fetchOptions)
        const duration = (performance.now() - startTime).toFixed(2)
        logGhostRequest('info', 'request completed', 'getPostBySlug', loggedUrl, { statusCode: 200, durationMs: parseFloat(duration) })
        return internalUrl(data, BASE)
      } catch (err) {
        const duration = (performance.now() - startTime).toFixed(2)
        logGhostRequest('error', 'request failed', 'getPostBySlug', loggedUrl, {
          statusCode: err?.response?.status || err?.statusCode || 500,
          durationMs: parseFloat(duration),
          error: err.toString()
        })
        throw err
      }
    })
  }

  async function getSearchIndex() {
    const fields = 'id,title,slug,custom_excerpt,excerpt,published_at,feature_image,primary_author'
    const url = `${BASE}/ghost/api/content/posts/?key=${KEY}&limit=all&fields=${fields}&include=authors,tags`
    const loggedUrl = url.replace(`key=${KEY}`, 'key=[REDACTED]')
    logGhostRequest('info', 'request started', 'getSearchIndex', loggedUrl)

    const startTime = performance.now()
    return withGhostSpan('getSearchIndex', loggedUrl, traceId, async () => {
      try {
        const data = await $fetch(url, fetchOptions)
        const duration = (performance.now() - startTime).toFixed(2)
        logGhostRequest('info', 'request completed', 'getSearchIndex', loggedUrl, { statusCode: 200, durationMs: parseFloat(duration) })
        return internalUrl(data, BASE)
      } catch (err) {
        const duration = (performance.now() - startTime).toFixed(2)
        logGhostRequest('error', 'request failed', 'getSearchIndex', loggedUrl, {
          statusCode: err?.response?.status || err?.statusCode || 500,
          durationMs: parseFloat(duration),
          error: err.toString()
        })
        throw err
      }
    })
  }

  async function getTags() {
    const url = `${BASE}/ghost/api/content/tags/?key=${KEY}&limit=all&include=count.posts&filter=visibility:public`
    const loggedUrl = url.replace(`key=${KEY}`, 'key=[REDACTED]')
    logGhostRequest('info', 'request started', 'getTags', loggedUrl)

    const startTime = performance.now()
    return withGhostSpan('getTags', loggedUrl, traceId, async () => {
      try {
        const data = await $fetch(url, fetchOptions)
        const duration = (performance.now() - startTime).toFixed(2)
        logGhostRequest('info', 'request completed', 'getTags', loggedUrl, { statusCode: 200, durationMs: parseFloat(duration) })

        const tags = (data?.tags || []).sort(
          (a, b) => (b.count?.posts || 0) - (a.count?.posts || 0)
        )
        return internalUrl(tags, BASE)
      } catch (err) {
        const duration = (performance.now() - startTime).toFixed(2)
        logGhostRequest('error', 'request failed', 'getTags', loggedUrl, {
          statusCode: err?.response?.status || err?.statusCode || 500,
          durationMs: parseFloat(duration),
          error: err.toString()
        })
        throw err
      }
    })
  }

  return { getPosts, getPostBySlug, getSearchIndex, getTags }
}

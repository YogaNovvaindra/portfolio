// Nuxt 3 Ghost API Service
// Runs server-side — ghostKey is never exposed to the browser

import { performance } from 'node:perf_hooks'
import { logger } from './logger.js'
import { trace, context, SpanStatusCode } from '@opentelemetry/api'

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

export function useGhostApi(event) {
  const config = useRuntimeConfig()
  const BASE = (config.public.ghostUrl || process.env.GHOST_URL || process.env.NUXT_PUBLIC_GHOST_URL || 'https://ygnv.my.id').replace(/\/$/, '')
  const KEY = config.ghostKey || process.env.GHOST_KEY || process.env.NUXT_GHOST_KEY || ''
  
  // Extract traceId and parent span from event context set by tracing middleware
  const traceId = event?.context?.traceId || 'unknown'
  const parentSpan = event?.context?.otelSpan

  const defaultParams = `key=${KEY}&include=tags,authors&formats=html`

  async function performFetch(url, spanName) {
    const loggedUrl = url.replace(`key=${KEY}`, 'key=[REDACTED]')
    logger.info(`[GHOST CALL] ---> GET ${loggedUrl}`, traceId)
    
    let span = null
    try {
      const tracer = typeof getTracer !== 'undefined' ? getTracer() : null
      if (tracer && parentSpan) {
        const ctx = trace.setSpan(context.active(), parentSpan)
        span = tracer.startSpan(spanName, {
          attributes: {
            'http.url': loggedUrl,
            'http.method': 'GET'
          }
        }, ctx)
      }
    } catch (_) {}

    const startTime = performance.now()
    try {
      const data = await $fetch(url)
      const duration = (performance.now() - startTime).toFixed(2)
      logger.info(`[GHOST CALL] <--- GET ${loggedUrl} 200 (${duration}ms)`, traceId, { durationMs: parseFloat(duration) })
      
      if (span) {
        span.setAttributes({
          'http.status_code': 200,
          'http.duration_ms': parseFloat(duration)
        })
        span.end()
      }
      return data
    } catch (err) {
      const duration = (performance.now() - startTime).toFixed(2)
      logger.error(`[GHOST CALL] <--- GET ${loggedUrl} ERROR (${duration}ms) - ${err.message}`, traceId, { 
        durationMs: parseFloat(duration),
        error: err.toString() 
      })
      
      if (span) {
        span.setAttributes({
          'http.status_code': err.response?.status || 500,
          'http.duration_ms': parseFloat(duration)
        })
        span.setStatus({ code: SpanStatusCode.ERROR, message: err.message })
        span.end()
      }
      throw err
    }
  }

  async function getPosts(limit = 'all', page = 1, filter = null) {
    let url = `${BASE}/ghost/api/content/posts/?${defaultParams}&limit=${limit}&page=${page}`
    if (filter) url += `&filter=${encodeURIComponent(filter)}`
    const data = await performFetch(url, 'ghost.getPosts')
    return internalUrl(data, BASE)
  }

  async function getPostBySlug(slug) {
    const url = `${BASE}/ghost/api/content/posts/slug/${slug}/?${defaultParams}`
    const data = await performFetch(url, `ghost.getPostBySlug`)
    return internalUrl(data, BASE)
  }

  async function getSearchIndex() {
    const fields = 'id,title,slug,custom_excerpt,excerpt,published_at,feature_image,primary_author'
    const url = `${BASE}/ghost/api/content/posts/?key=${KEY}&limit=all&fields=${fields}&include=authors,tags`
    const data = await performFetch(url, 'ghost.getSearchIndex')
    return internalUrl(data, BASE)
  }

  async function getTags() {
    const url = `${BASE}/ghost/api/content/tags/?key=${KEY}&limit=all&include=count.posts&filter=visibility:public`
    const data = await performFetch(url, 'ghost.getTags')
    const tags = (data?.tags || []).sort(
      (a, b) => (b.count?.posts || 0) - (a.count?.posts || 0)
    )
    return internalUrl(tags, BASE)
  }

  return { getPosts, getPostBySlug, getSearchIndex, getTags }
}


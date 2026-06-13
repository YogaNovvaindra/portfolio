// Client-side Page Hit Observability.
// Intercepts client-side SPA router changes, logs them in the browser console,
// and forwards a page-view beacon to the server so all routes (including
// /about, /portfolio, /blog, /blog/[slug], etc.) appear in structured server logs & traces.

/**
 * Fire-and-forget page view beacon to POST /api/pageview.
 * Uses sendBeacon (non-blocking, survives page unload) with fetch keepalive fallback.
 */
function sendPageView(page, from, title, referrer) {
  try {
    const payload = JSON.stringify({
      page,
      from: from || undefined,
      title: title || undefined,
      referrer: referrer || undefined,
    })
    const url = '/api/pageview'
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([payload], { type: 'application/json' }))
    } else {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {})
    }
  } catch (_) {
    // Never let logging errors break navigation
  }
}

export default defineNuxtPlugin(() => {
  const router = useRouter()
  const config = useRuntimeConfig()
  const version = config.public?.appVersion || 'unknown'

  // Log startup version in browser console for premium aesthetics & observability
  console.log(
    `%c[SYSTEM]%c Running Portfolio v${version}`,
    'color: #10b981; font-weight: bold; background: rgba(16, 185, 129, 0.1); padding: 2px 6px; border-radius: 4px; font-family: monospace;',
    'color: #a1a1aa; font-weight: 500;'
  )

  // ── Single source of truth for all page-view beacons ─────────────────────
  // router.afterEach fires for EVERY navigation — including the very first one
  // when the SPA boots (initial hard-load). from.name === null is Vue Router's
  // signal for "this is the initial navigation", so we never need a separate
  // onMounted/import.meta.client block (which caused the duplicate).
  router.afterEach((to, from) => {
    const isInitial = from.name === null  // true on hard-load / first render

    // Guard: skip same-page refires (e.g. HMR hot-reload in dev)
    if (!isInitial && to.fullPath === from.fullPath) return

    const toPath = to.fullPath
    // On initial load use document.referrer (external source);
    // on SPA navigation use the previous Vue route path.
    const fromPath = isInitial ? (document.referrer || undefined) : from.fullPath

    // Styled browser DevTools console output
    console.log(
      `%c[CLIENT HIT]%c ${isInitial ? 'Hard Load' : 'Navigation'}: %c${fromPath || 'direct'}%c ➔ %c${toPath}`,
      'color: #3b82f6; font-weight: bold; background: rgba(59, 130, 246, 0.1); padding: 2px 6px; border-radius: 4px; font-family: monospace;',
      'color: #71717a;',
      'color: #f43f5e; font-weight: 600; font-family: monospace;',
      'color: #a1a1aa;',
      'color: #10b981; font-weight: 600; font-family: monospace;'
    )

    // Forward to server — fire-and-forget, never blocks navigation
    sendPageView(
      toPath,
      fromPath,
      document.title || undefined,
      isInitial ? undefined : (document.referrer || undefined)
    )
  })

  // ── SPA navigation errors (broken links clicked within the app) ──────────
  // router.onError fires when Vue Router fails to navigate (e.g. lazy-loaded
  // chunk 404, or a navigation guard throws). The server's http.response WARN
  // already covers hard-load 404s; this covers the client-only SPA error case
  // where there is no server-side log at all.
  router.onError((err, to) => {
    sendPageView(
      to?.fullPath || window.location.pathname,
      document.referrer || undefined,
      document.title || undefined,
      undefined
    )
    console.log(
      `%c[CLIENT ERR]%c Navigation Error: %c${to?.fullPath || '?'}%c — ${err?.message || err}`,
      'color: #ef4444; font-weight: bold; background: rgba(239,68,68,0.1); padding: 2px 6px; border-radius: 4px; font-family: monospace;',
      'color: #71717a;',
      'color: #f43f5e; font-weight: 600; font-family: monospace;',
      'color: #a1a1aa;'
    )
  })
})

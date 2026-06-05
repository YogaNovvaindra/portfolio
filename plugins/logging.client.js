// Client-side Page Hit Observability.
// Intercepts client-side SPA router changes and prints clean, styled logs to browser console.

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

  router.afterEach((to, from) => {
    const fromPath = from?.fullPath && from.fullPath !== '/' ? from.fullPath : 'Initial Entry'
    const toPath = to.fullPath

    // Styled browser DevTools console output for premium aesthetics
    console.log(
      `%c[CLIENT HIT]%c Navigation Transition: %c${fromPath}%c ➔ %c${toPath}`,
      'color: #3b82f6; font-weight: bold; background: rgba(59, 130, 246, 0.1); padding: 2px 6px; border-radius: 4px; font-family: monospace;',
      'color: #71717a;',
      'color: #f43f5e; font-weight: 600; font-family: monospace;',
      'color: #a1a1aa;',
      'color: #10b981; font-weight: 600; font-family: monospace;'
    )
  })
})

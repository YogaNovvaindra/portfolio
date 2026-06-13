import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Read version from package.json
let appVersion = '0.0.1'
try {
  const pkg = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf8'))
  appVersion = pkg.version
} catch (e) {
  appVersion = process.env.npm_package_version || '0.0.1'
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  compatibilityDate: '2024-11-01',

  runtimeConfig: {
    ghostKey: process.env.GHOST_KEY || process.env.NUXT_GHOST_KEY,
    public: {
      appVersion,
      ghostUrl: process.env.GHOST_URL || process.env.NUXT_PUBLIC_GHOST_URL || 'https://ygnv.my.id',
      siteUrl: process.env.SITE_URL || process.env.NUXT_PUBLIC_SITE_URL || 'https://yoganova.my.id',
    },
  },

  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    head: {
      // Default fallback meta — overridden per-page with useSeoMeta()
      title: 'Yoga Novaindra — DevSecOps Engineer',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Building automated, secure, and observable infrastructure — from bare-metal Kubernetes clusters to cloud-native platforms.' },
        { property: 'og:site_name', content: 'yoganova.my.id' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&family=JetBrains+Mono:wght@400;500&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  modules: ['@nuxt/image'],

  // ─── Reverse proxy — replaces Nginx proxy_pass rules from default.conf ───────
  // /ghost/api/ → http://ghost.services:2368/ghost/api/
  // /content/   → http://ghost.services:2368/content/
  nitro: {
    // ── Externalize @opentelemetry packages ──────────────────────────────────
    // createRequire() in 0.tracing.js bypasses the bundler and loads these at
    // runtime via CJS require(). Marking them external ensures Nitro copies
    // them into .output/server/node_modules/ so they are available in prod.
    externals: {
      traceInclude: [
        'node_modules/@opentelemetry/api',
        'node_modules/@opentelemetry/sdk-node',
        'node_modules/@opentelemetry/exporter-trace-otlp-http',
        'node_modules/@opentelemetry/resources',
        'node_modules/@opentelemetry/semantic-conventions',
      ],
    },
    routeRules: {
      '/ghost/api/**': {
        proxy: `${process.env.GHOST_URL || 'http://ghost.services:2368'}/ghost/api/**`,
        headers: {
          Host: 'ygnv.my.id',
        },
      },
      '/content/**': {
        proxy: `${process.env.GHOST_URL || 'http://ghost.services:2368'}/content/**`,
        headers: {
          Host: 'ygnv.my.id',
        },
        cache: {
          // 30 days — mirrors nginx: expires 30d; Cache-Control: public, immutable
          maxAge: 60 * 60 * 24 * 30,
        },
      },
    },
  },

  // Keep Tailwind v3 via PostCSS (already installed)
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})

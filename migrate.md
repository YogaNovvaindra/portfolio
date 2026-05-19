# Migrating Vue 3 SPA → Nuxt 3 for Proper OG Meta Tags

## Why Nuxt 3?

Your current Vue CLI SPA renders everything client-side. When WhatsApp/Telegram/Slack bots crawl `/blog/your-post-slug`, they only see the blank `index.html` with homepage meta tags — they never run JavaScript.

Nuxt 3 adds **Server-Side Rendering (SSR)**, meaning each page's HTML (including `<meta og:title>`, `<meta og:image>`, etc.) is fully rendered before it reaches the bot.

---

## Overview of Changes

| Area | Before (Vue CLI) | After (Nuxt 3) |
|------|-----------------|----------------|
| Entry point | `src/main.js` | `app.vue` + `nuxt.config.ts` |
| Routing | `src/router/index.js` | File-based (`pages/` directory) |
| Meta tags | Static `public/index.html` | `useSeoMeta()` per page |
| Build tool | Vue CLI (Webpack) | Vite (built-in) |
| SSR | ❌ No | ✅ Yes |
| Docker | Nginx serving static files | Node.js server |

---

## Step 1 — Scaffold a New Nuxt 3 Project

```bash
# In the parent directory of your current project
npx nuxi@latest init portfolio-nuxt
cd portfolio-nuxt
```

When prompted, choose:
- Package manager: **npm**
- Initialize git: up to you

---

## Step 2 — Install Dependencies

```bash
npm install @nuxt/image
npm install axios          # or use Nuxt's built-in $fetch (recommended)
```

You do **not** need `vue-router` — Nuxt handles routing automatically.

---

## Step 3 — Configure Nuxt (`nuxt.config.ts`)

Create/replace `nuxt.config.ts` at the project root:

```typescript
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    // Private (server-only)
    ghostKey: process.env.GHOST_KEY,
    // Public (exposed to client too)
    public: {
      ghostUrl: process.env.GHOST_URL,
    }
  },

  app: {
    head: {
      // Default fallback meta (homepage)
      title: 'Yoga Novaindra — DevSecOps Engineer',
      meta: [
        { name: 'description', content: 'Personal portfolio and technical blog.' },
        { property: 'og:site_name', content: 'yoganova.my.id' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ]
    }
  },

  css: ['~/assets/css/main.css'], // keep your Tailwind import here
  modules: ['@nuxt/image'],
})
```

---

## Step 4 — Environment Variables

Create `.env` at the project root:

```env
GHOST_URL=https://ygnv.my.id
GHOST_KEY=your_ghost_content_api_key_here
```

> **Note:** In Nuxt 3, env vars are accessed via `useRuntimeConfig()` — not `process.env.VUE_APP_*`. Rename them accordingly.

---

## Step 5 — Set Up Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

Create `assets/css/main.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Update `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: { extend: {} },
  plugins: [],
}
```

---

## Step 6 — Create the Ghost API Service

Create `services/ghost.js`:

```js
// Runs server-side in Nuxt — safe to use the key here
export function useGhostApi() {
  const config = useRuntimeConfig()
  const BASE = config.public.ghostUrl
  const KEY = config.ghostKey  // server-only, not exposed to browser

  async function getPosts(limit = 10) {
    const data = await $fetch(
      `${BASE}/ghost/api/content/posts/?key=${KEY}&limit=${limit}&include=tags,authors&formats=html`
    )
    return data.posts
  }

  async function getPostBySlug(slug) {
    const data = await $fetch(
      `${BASE}/ghost/api/content/posts/slug/${slug}/?key=${KEY}&include=tags,authors&formats=html`
    )
    return data.posts[0]
  }

  async function getPages() {
    const data = await $fetch(
      `${BASE}/ghost/api/content/pages/?key=${KEY}&formats=html`
    )
    return data.pages
  }

  return { getPosts, getPostBySlug, getPages }
}
```

---

## Step 7 — Migrate Pages (File-Based Routing)

In Nuxt 3, files inside `pages/` become routes automatically:

```
pages/
├── index.vue          →  /
├── blog/
│   ├── index.vue      →  /blog
│   └── [slug].vue     →  /blog/:slug   ← THIS is where OG tags are fixed
└── portfolio.vue      →  /portfolio
```

### `pages/index.vue` (Homepage)

```vue
<script setup>
useSeoMeta({
  title: 'Yoga Novaindra — DevSecOps Engineer',
  description: 'Personal portfolio and technical blog.',
  ogTitle: 'Yoga Novaindra — DevSecOps Engineer',
  ogDescription: 'Personal portfolio and technical blog.',
  ogImage: 'https://yoganova.my.id/og-default.png',
  ogUrl: 'https://yoganova.my.id',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <!-- your existing homepage content, migrated from Vue components -->
</template>
```

### `pages/blog/index.vue` (Blog List)

```vue
<script setup>
const { getPosts } = useGhostApi()
const posts = await getPosts(20)

useSeoMeta({
  title: 'Blog — Yoga Novaindra',
  ogTitle: 'Blog — Yoga Novaindra',
  ogDescription: 'Technical articles on DevSecOps, Kubernetes, and more.',
})
</script>

<template>
  <div>
    <article v-for="post in posts" :key="post.id">
      <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
    </article>
  </div>
</template>
```

### `pages/blog/[slug].vue` — The Key Fix ✅

This is where the OG tag problem is solved. Because Nuxt SSR runs `useAsyncData` on the **server**, the full HTML with correct meta tags is returned before any bot reads it.

```vue
<script setup>
const route = useRoute()
const { getPostBySlug } = useGhostApi()

const { data: post, error } = await useAsyncData(
  `post-${route.params.slug}`,
  () => getPostBySlug(route.params.slug)
)

if (!post.value || error.value) {
  throw createError({ statusCode: 404, message: 'Post not found' })
}

// ✅ These meta tags are rendered SERVER-SIDE
// Bots will see the correct title, description, and image
useSeoMeta({
  title: post.value.title,
  description: post.value.excerpt,
  ogTitle: post.value.title,
  ogDescription: post.value.excerpt,
  ogImage: post.value.feature_image,
  ogUrl: `https://yoganova.my.id/blog/${post.value.slug}`,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: post.value.title,
  twitterDescription: post.value.excerpt,
  twitterImage: post.value.feature_image,
})
</script>

<template>
  <article v-if="post">
    <h1>{{ post.title }}</h1>
    <img v-if="post.feature_image" :src="post.feature_image" :alt="post.title" />
    <!-- Render Ghost HTML content -->
    <div class="prose" v-html="post.html" />
  </article>
</template>
```

---

## Step 8 — Migrate Components

Move your existing Vue components from `src/components/` to `components/`. Nuxt **auto-imports** them — no need for manual `import` statements.

```
components/
├── NavBar.vue       # used as <NavBar /> anywhere, no import needed
├── Footer.vue
├── BlogCard.vue
└── ...
```

---

## Step 9 — Update the Dockerfile

Your current Dockerfile builds static files for Nginx. Nuxt SSR needs a **Node.js runtime** instead:

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build Nuxt
ARG GHOST_URL
ARG GHOST_KEY
ENV GHOST_URL=$GHOST_URL
ENV GHOST_KEY=$GHOST_KEY

RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built output
COPY --from=builder /app/.output ./

# Expose port
EXPOSE 3000

# Start Nuxt SSR server
CMD ["node", "server/index.mjs"]
```

> You no longer need `nginx.conf` or `default.conf` — Nuxt runs its own HTTP server.

---

## Step 10 — Update GitHub Actions CI/CD

Update your `.github/workflows/*.yml` build args:

```yaml
- name: Build Docker image
  run: |
    docker build \
      --build-arg GHOST_URL=${{ secrets.GHOST_URL }} \
      --build-arg GHOST_KEY=${{ secrets.GHOST_KEY }} \
      -t ghcr.io/yoganovvaindra/portfolio:latest .
```

Also update your GitHub Actions secrets:
- Rename `VUE_APP_GHOST_URL` → `GHOST_URL`
- Rename `VUE_APP_GHOST_KEY` → `GHOST_KEY`

---

## Step 11 — Test Locally

```bash
# Development (with SSR)
npm run dev

# Production build test
npm run build
node .output/server/index.mjs
```

Then test OG tags using:
- [opengraph.xyz](https://www.opengraph.xyz) — paste your blog URL
- [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug) — Facebook/WhatsApp debugger
- [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator) — Twitter/X card validator

---

## Common Gotchas

### 1. `process.env.VUE_APP_*` no longer works
Replace all instances with `useRuntimeConfig()`:
```js
// Before
const url = process.env.VUE_APP_GHOST_URL

// After
const { public: { ghostUrl } } = useRuntimeConfig()
```

### 2. Ghost API key must stay server-side
In `nuxt.config.ts`, put `ghostKey` under `runtimeConfig` (not `runtimeConfig.public`) so it's never sent to the browser.

### 3. `v-html` and Ghost content styles
Ghost outputs raw HTML. Add the Tailwind Typography plugin for proper styling:
```bash
npm install -D @tailwindcss/typography
```
```js
// tailwind.config.js
plugins: [require('@tailwindcss/typography')]
```
```html
<!-- In your [slug].vue -->
<div class="prose prose-invert max-w-none" v-html="post.html" />
```

### 4. Code highlighting (highlight.js)
You already have `highlight.js` in your dependencies. In Nuxt, initialize it in a plugin:

Create `plugins/highlight.client.js`:
```js
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

export default defineNuxtPlugin(() => {
  return {
    provide: { hljs }
  }
})
```

---

## File Structure Comparison

```
Before (Vue CLI)          After (Nuxt 3)
─────────────────         ──────────────────────
src/
  main.js           →     app.vue
  router/index.js   →     pages/ (auto-routing)
  views/            →     pages/
  components/       →     components/ (auto-import)
  services/         →     services/ (same)
  assets/           →     assets/
public/index.html   →     nuxt.config.ts (app.head)
vue.config.js       →     nuxt.config.ts
```

---

## Summary

Once migrated, when a bot hits `https://yoganova.my.id/blog/bare-metal-kubernetes-networking-getting-started-with-metallb-and-traefik`, Nuxt's SSR will:

1. Fetch the post from Ghost CMS **on the server**
2. Render the full HTML with the correct `og:title`, `og:description`, and `og:image`
3. Return that HTML to the bot

Result: every blog post will show its own title, excerpt, and featured image when shared — not your homepage.
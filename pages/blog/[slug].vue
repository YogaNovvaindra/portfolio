<template>
  <div class="relative min-h-screen">
    <!-- Progress Bar (Client-only) -->
    <ClientOnly>
      <div class="reading-progress-container fixed top-0 left-0 h-1 bg-zinc-900/40 z-[99] w-full md:hidden">
        <div class="h-full bg-blue-500 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(59,130,246,0.6)]" :style="{ width: `${readingProgress}%` }"></div>
      </div>
    </ClientOnly>

    <main class="w-full relative z-10" v-if="post">
      <!-- Full-Width Hero Header -->
      <header class="relative w-full h-[35vh] md:h-[45vh] flex items-end justify-center overflow-hidden title-reveal">
        <div class="absolute inset-0 z-0 overflow-hidden">
          <img v-if="post.feature_image" ref="headerImg" :src="post.feature_image" :style="{ transform: `translateY(${parallaxY}px) scale(1.1)` }" fetchpriority="high" decoding="sync" class="w-full h-full object-cover will-change-transform" />
          <div v-else class="w-full h-full bg-zinc-900/80"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-transparent"></div>
        </div>
        
        <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-left pb-8 md:pb-12">
          <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl max-w-3xl">
            {{ post.title }}
          </h1>
        </div>
      </header>

      <!-- Article Body Container -->
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-4xl relative">
        <!-- Back Button -->
        <div class="mb-12 md:mb-16 fadein-bot text-left">
          <NuxtLink to="/blog" class="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-blue-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </NuxtLink>
        </div>

        <article class="fadein-bot">
          <!-- Post Meta Information Below Hero -->
          <div class="mb-10 md:mb-16 text-left">
            <div class="flex items-center justify-start gap-4 text-sm font-medium mb-8 flex-wrap">
              <div v-if="post.tags && post.tags.length > 0" class="flex items-center gap-2 flex-wrap">
                <template v-if="!showAllTags">
                  <span class="inline-flex items-center gap-1.5 uppercase tracking-widest text-xs">
                    <NuxtLink
                      :to="`/blog?tag=${(post.primary_tag || post.tags[0]).slug}`"
                      class="text-blue-400 hover:text-blue-300 hover:underline transition-colors font-bold"
                    >
                      {{ (post.primary_tag || post.tags[0]).name }}
                    </NuxtLink>
                    <button
                      v-if="post.tags.length > 1"
                      @click="showAllTags = true"
                      class="text-zinc-500 font-bold opacity-70 hover:opacity-100 transition-opacity cursor-pointer ml-1"
                      :title="`View all ${post.tags.length} tags`"
                    >+{{ post.tags.length - 1 }}</button>
                  </span>
                </template>
                <template v-else>
                  <span
                    v-for="(tag, index) in post.tags"
                    :key="tag.id"
                    class="inline-flex items-center uppercase tracking-widest text-xs"
                  >
                    <NuxtLink
                      :to="`/blog?tag=${tag.slug}`"
                      class="text-blue-400 hover:text-blue-300 hover:underline transition-colors font-bold"
                    >{{ tag.name }}</NuxtLink>
                    <span v-if="index < post.tags.length - 1" class="text-zinc-600 ml-2 mr-2">&bull;</span>
                  </span>
                  <button @click="showAllTags = false" class="text-zinc-500 hover:text-white transition-colors text-xs font-bold ml-2" title="Collapse">✕</button>
                </template>
              </div>
              <span v-if="post.tags && post.tags.length > 0" class="text-zinc-700">|</span>
              <span class="text-zinc-500 uppercase tracking-widest text-xs">{{ post.reading_time || 3 }} min read</span>
              <span class="text-zinc-700">|</span>
              <time 
                :datetime="post.published_at" 
                :title="formatDate(post.published_at)" 
                class="text-zinc-500 uppercase tracking-widest text-xs cursor-help hover:text-zinc-300 transition-colors duration-200"
              >
                {{ getRelativeTime(post.published_at) }}
              </time>
            </div>

            <p v-if="post.custom_excerpt || post.excerpt" class="text-lg md:text-xl lg:text-2xl text-zinc-400 mb-10 leading-relaxed max-w-3xl font-light">
              {{ post.custom_excerpt || post.excerpt }}
            </p>

            <div class="flex items-center gap-4">
              <img v-if="post.primary_author?.profile_image" :src="post.primary_author.profile_image" alt="" loading="lazy" decoding="async" class="h-14 w-14 rounded-full object-cover border-2 border-zinc-800" />
              <div v-else class="h-14 w-14 rounded-full bg-blue-500/20 flex items-center justify-center border-2 border-blue-500/30 text-blue-400 font-bold text-xl">Y</div>
              <div>
                <p class="text-white font-semibold tracking-wide">{{ post.primary_author?.name || 'Yoga Novaindra' }}</p>
                <p class="text-zinc-500 text-sm">Author</p>
              </div>
            </div>
          </div>

          <!-- HTML Content -->
          <div class="prose max-w-none article-content" v-html="post.html" ref="articleBody"></div>

          <div v-if="post.tags?.length > 1" class="mt-20 pt-10 border-t border-zinc-800/80">
            <h3 class="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> Related Tags</h3>
            <div class="flex flex-wrap gap-2">
              <NuxtLink v-for="tag in post.tags" :key="tag.id" :to="`/blog?tag=${tag.slug}`" class="text-sm font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg hover:border-blue-500/30 hover:text-blue-400 transition-colors">
                {{ tag.name }}
              </NuxtLink>
            </div>
          </div>

          <!-- More Stories Navigation -->
          <BlogRelatedPosts :posts="relatedPosts" class="fadein-bot" />

          <!-- Article Footer -->
          <footer class="mt-24 pt-12 border-t border-zinc-900 text-center fadein-bot">
            <p class="text-zinc-600 text-sm flex items-center justify-center gap-2">
              <span>&copy; {{ new Date().getFullYear() }} Yoga Novaindra</span>
              <span class="text-zinc-800">&bull;</span>
              <span class="flex items-center gap-1.5">
                Powered by 
                <a href="https://ghost.org" target="_blank" class="inline-flex items-center gap-1 font-medium text-zinc-400 hover:text-blue-400 transition-colors">
                  <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M11.96 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.04zm7.25 15.11c-.53 1.48-1.59 2.54-3.1 3.1-1.51.56-3.1.56-4.6 0-1.5-.56-2.57-1.62-3.1-3.1-.53-1.48-.53-3.1 0-4.6.53-1.5 1.59-2.56 3.1-3.1 1.51-.56 3.1-.56 4.6 0 1.5.56 2.57 1.62 3.1 3.1.53 1.49.53 3.09 0 4.6z"/></svg>
                  Ghost
                </a>
              </span>
            </p>
          </footer>
        </article>
      </div>

      <!-- Expandable Floating Share Panel -->
      <Transition name="share-float">
        <div
          v-if="post && readingProgress > 4"
          class="fixed bottom-[5.5rem] md:bottom-[6.5rem] right-6 md:right-8 z-50 flex flex-col-reverse items-center gap-3"
          aria-label="Share article"
        >
        <!-- Main Share Toggle Button -->
        <button
          @click="showShare = !showShare"
          class="w-12 h-12 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 flex items-center justify-center shadow-2xl transition-all duration-300 z-50"
          :class="showShare
            ? 'border-blue-500/50 text-blue-400 shadow-blue-500/20'
            : 'hover:border-blue-500/50 hover:shadow-blue-500/20 text-zinc-400'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
        </button>

        <!-- Platform icons — expand upward -->
        <Transition name="share-expand">
          <div v-if="showShare" class="flex flex-col-reverse items-center gap-2">

            <!-- Copy link -->
            <button
              @click="copyLink"
              :title="copied ? 'Copied!' : 'Copy link'"
              class="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:bg-zinc-800/50 hover:border-blue-500/50 text-zinc-400 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 relative"
            >
              <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><path d="M20 6 9 17l-5-5"/></svg>
              <span v-if="copied" class="absolute right-full mr-3 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded shadow-sm whitespace-nowrap">Copied!</span>
            </button>

            <!-- WhatsApp -->
            <a :href="`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`"
              target="_blank" rel="noopener noreferrer" title="Share on WhatsApp"
              class="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:bg-zinc-800/50 text-zinc-400 shadow-lg hover:text-green-400 hover:border-green-500/40 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>

            <!-- Telegram -->
            <a :href="`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`"
              target="_blank" rel="noopener noreferrer" title="Share on Telegram"
              class="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:bg-zinc-800/50 text-zinc-400 shadow-lg hover:text-sky-400 hover:border-sky-500/40 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>

            <!-- X -->
            <a :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`"
              target="_blank" rel="noopener noreferrer" title="Share on X"
              class="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:bg-zinc-800/50 text-zinc-400 shadow-lg hover:text-white hover:border-zinc-500 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>

            <!-- LinkedIn -->
            <a :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`"
              target="_blank" rel="noopener noreferrer" title="Share on LinkedIn"
              class="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:bg-zinc-800/50 text-zinc-400 shadow-lg hover:text-blue-400 hover:border-blue-500/40 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </Transition>
      </div>
    </Transition>

      <!-- Floating TOC (fixed, minimal) -->
      <Transition name="toc-float">
        <aside
          v-if="post && toc.length > 0 && readingProgress > 4"
          class="hidden lg:block fixed right-8 2xl:right-12 top-1/2 -translate-y-1/2 z-40 overflow-y-auto hide-scrollbar"
          style="max-height: calc(100vh - 10rem); width: 10rem;"
          aria-label="Table of Contents"
        >
          <p class="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-4 pl-4 font-mono">On this page</p>
          <nav>
            <ul class="flex flex-col gap-2 border-l border-zinc-800/80" role="list">
              <li
                v-for="item in toc"
                :key="item.id"
                :class="[
                  '-ml-[1px] border-l pl-4 transition-all duration-200',
                  item.level === 3 ? 'ml-3 border-transparent' : '',
                  item.level !== 3 && activeTocId === item.id ? 'border-blue-500' : '',
                  item.level !== 3 && activeTocId !== item.id ? 'border-transparent hover:border-zinc-700' : ''
                ]"
              >
                <a
                  :href="`#${item.id}`"
                  :class="[
                    'block text-xs leading-snug transition-colors duration-200 line-clamp-2',
                    activeTocId === item.id ? 'text-blue-400 font-medium' : 'text-zinc-500 hover:text-zinc-300'
                  ]"
                >
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      </Transition>
    </main>
  </div>
</template>

<script setup>
const route = useRoute()
const nuxtApp = useNuxtApp()

// Fetch post and tag-related posts during SSR with fallback
const { data: pageData } = await useAsyncData(
  `post-page-${route.params.slug}`,
  async () => {
    const postRes = await $fetch(`/api/post/${route.params.slug}`)
    const post = postRes?.posts?.[0]
    if (!post) {
      return { post: null, related: [] }
    }

    let related = []
    const primaryTagSlug = post.primary_tag?.slug || post.tags?.[0]?.slug
    if (primaryTagSlug) {
      try {
        const tagPostsRes = await $fetch('/api/posts', {
          query: {
            limit: 4,
            filter: `tag:${primaryTagSlug}+id:-${post.id}`
          }
        })
        related = (tagPostsRes?.posts || []).filter(p => p.id !== post.id).slice(0, 3)
      } catch (err) {
        console.error('Failed to fetch tag-related posts', err)
      }
    }

    // Fallback if we have fewer than 3 posts
    if (related.length < 3) {
      try {
        const recentRes = await $fetch('/api/posts', { query: { limit: 5 } })
        const recent = (recentRes?.posts || []).filter(p => p.id !== post.id)
        for (const p of recent) {
          if (related.length >= 3) break
          if (!related.some(r => r.id === p.id)) {
            related.push(p)
          }
        }
      } catch (err) {
        console.error('Failed to fetch fallback posts', err)
      }
    }

    return { post, related }
  }
)

const post = computed(() => pageData.value?.post)
const relatedPosts = computed(() => pageData.value?.related || [])

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post Not Found' })
}

// ── SSR SEO META TAGS (The core requirement) ─────────────
const siteUrl = 'https://yoganova.my.id'
const postUrl = `${siteUrl}/blog/${post.value.slug}`
const ogImage = post.value.feature_image || `${siteUrl}/og-default.png`
const title = `${post.value.title} — Yoga Novaindra`
const desc = post.value.custom_excerpt || post.value.excerpt || 'Article by Yoga Novaindra'

useSeoMeta({
  title: title,
  description: desc,
  ogTitle: title,
  ogDescription: desc,
  ogImage: ogImage,
  ogUrl: postUrl,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: desc,
  twitterImage: ogImage
})
// ─────────────────────────────────────────────────────────

const articleBody = ref(null)
const readingProgress = ref(0)
const parallaxY = ref(0)
const copied = ref(false)
const showShare = ref(false)
const showAllTags = ref(false)
const shareUrl = computed(() => {
  if (process.client) return window.location.href
  return `${siteUrl}/blog/${post.value?.slug || ''}`
})
const shareText = computed(() => post.value?.title || '')

const toc = ref([])
const activeTocId = ref('')
let tocObserver = null

function setupTocObserver(headings) {
  if (tocObserver) tocObserver.disconnect()
  if (!headings || headings.length === 0) return

  const visibleHeadings = new Map()

  tocObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        visibleHeadings.set(entry.target.id, entry.isIntersecting)
      })
      const firstVisible = Array.from(headings).find(h => visibleHeadings.get(h.id))
      if (firstVisible) {
        activeTocId.value = firstVisible.id
      }
    },
    {
      rootMargin: '-80px 0px -55% 0px',
      threshold: 0,
    }
  )

  headings.forEach(h => tocObserver.observe(h))
}

function setupArticleEnhancements() {
  const article = articleBody.value
  if (!article) return

  // 1. Generate TOC
  const headings = article.querySelectorAll('h2, h3')
  toc.value = Array.from(headings).map((h, index) => {
    if (!h.id) h.id = `heading-${index}`
    return {
      id: h.id,
      text: h.innerText,
      level: h.tagName === 'H2' ? 2 : 3
    }
  })

  // 2. Set up IntersectionObserver for active TOC highlight
  setupTocObserver(headings)

  // 3. Syntax Highlighting & Copy Button
  const blocks = article.querySelectorAll('pre code')
  blocks.forEach((block) => {
    if (nuxtApp.$hljs) {
      nuxtApp.$hljs.highlightElement(block)
    }
    
    const pre = block.parentElement
    if (pre && !pre.classList.contains('relative')) {
      pre.classList.add('relative', 'group')
      const btn = document.createElement('button')
      btn.innerHTML = `Copy`
      btn.className = 'absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-700 font-medium tracking-wide'
      btn.onclick = () => {
        navigator.clipboard.writeText(block.innerText)
        btn.innerHTML = 'Copied!'
        btn.classList.add('text-blue-400', 'border-blue-500/50')
        setTimeout(() => {
          btn.innerHTML = 'Copy'
          btn.classList.remove('text-blue-400', 'border-blue-500/50')
        }, 2000)
      }
      pre.appendChild(btn)
    }
  })

  // 4. Optimize dynamically inserted post images
  const images = article.querySelectorAll('img')
  images.forEach((img) => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy')
    }
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async')
    }
  })
}

// Highlight.js execution client-side
onMounted(() => {
  setupArticleEnhancements()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (tocObserver) tocObserver.disconnect()
})

function handleScroll() {
  // Collapse share panel on scroll to keep reading distraction-free
  if (showShare.value) {
    showShare.value = false
  }

  // Parallax
  parallaxY.value = Math.min(window.scrollY * 0.15, 60)
  
  // Progress
  if (!articleBody.value) return
  const el = articleBody.value
  const top = el.offsetTop - 100
  const height = el.offsetHeight - window.innerHeight + 200
  const scrolled = window.scrollY - top
  let progress = (scrolled / height) * 100
  progress = Math.max(0, Math.min(100, progress))
  readingProgress.value = progress
}

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function getRelativeTime(dateString) {
  if (!dateString) return ''
  const diff = Math.floor((new Date() - new Date(dateString)) / 1000)
  const units = [
    { n: 'year', s: 31536000 }, { n: 'month', s: 2592000 }, { n: 'week', s: 604800 },
    { n: 'day', s: 86400 }, { n: 'hour', s: 3600 }, { n: 'minute', s: 60 }
  ]
  for (const u of units) {
    if (diff >= u.s) {
      const c = Math.floor(diff / u.s)
      return `${c} ${u.n}${c !== 1 ? 's' : ''} ago`
    }
  }
  return 'just now'
}

function shareOnTwitter() {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(post.value.title)
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=550,height=450')
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (err) {
    console.error('Failed to copy link: ', err)
  }
}
</script>

<style>
/* Skeleton shimmer */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton-shimmer {
  background: linear-gradient(90deg, #18181b 25%, #27272a 50%, #18181b 75%);
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
}

/* Enhancing the typography from Ghost HTML */
.prose {
  font-size: 1rem;
  line-height: 1.75;
}
@media (min-width: 768px) {
  .prose {
    font-size: 1.125rem;
    line-height: 1.8;
  }
}
.prose h2 {
  margin-top: 2em;
  margin-bottom: 1em;
  font-size: 1.5em;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #f4f4f5;
}
.prose h3 {
  margin-top: 1.6em;
  margin-bottom: 0.8em;
  font-size: 1.25em;
  font-weight: 600;
  color: #e4e4e7;
}
.prose h4 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-size: 1.1em;
  font-weight: 600;
  color: #e4e4e7;
}
.prose p {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  color: #d4d4d8; /* zinc-300 for better contrast */
}
.prose ul, .prose ol {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-left: 1.625em;
}
.prose ul {
  list-style-type: disc;
}
.prose ol {
  list-style-type: decimal;
}
.prose li {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  color: #d4d4d8; /* zinc-300 for better contrast */
}
.prose li > p {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.prose blockquote {
  border-left-color: #3b82f6; /* blue-500 */
  background-color: rgba(59, 130, 246, 0.05);
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  font-style: italic;
  color: #e4e4e7;
}
.prose figure {
  margin: 2em 0;
}
.prose figcaption {
  text-align: center;
  color: #71717a; /* zinc-500 */
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

/* Better Code Block Separation */
.prose pre {
  padding: 1.5rem;
  margin-top: 1.5em;
  margin-bottom: 2em;
  border-radius: 0.75rem;
  overflow-x: auto;
  background-color: #121214 !important; /* Very dark background to pop against #0a0a0a */
  border: 1px solid #27272a !important; /* Distinct zinc-800 border */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25);
}

/* Code text inside Pre blocks */
.prose pre code {
  background-color: transparent !important;
  padding: 0 !important;
  color: #e4e4e7; /* zinc-200 */
  font-family: "JetBrains Mono", monospace;
  font-size: 0.9em;
  border: none !important;
}

/* Inline Code Elements */
.prose p code, .prose li code {
  background-color: rgba(59, 130, 246, 0.1);
  color: #60a5fa; /* blue-400 */
  padding: 0.25em 0.4em;
  border-radius: 0.375rem;
  font-size: 0.875em;
  border: 1px solid rgba(59, 130, 246, 0.2);
  font-family: "JetBrains Mono", monospace;
}

/* Floating TOC slide-in from right */
.toc-float-enter-active,
.toc-float-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.toc-float-enter-from,
.toc-float-leave-to {
  opacity: 0;
  transform: translateX(1rem) translateY(-50%);
}
.toc-float-enter-to,
.toc-float-leave-from {
  opacity: 1;
  transform: translateX(0) translateY(-50%);
}
/* TOC: offset scroll target below fixed navbar (nav ~64px + breathing room) */
.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  scroll-margin-top: 88px;
}
/* Share section expand/collapse */
.share-expand-enter-active,
.share-expand-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: bottom center;
}
.share-expand-enter-from,
.share-expand-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.9);
}
/* Share float entry (bottom-right, slides up) */
.share-float-enter-active,
.share-float-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.share-float-enter-from,
.share-float-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
.share-float-enter-to,
.share-float-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Progress Bar: hide on desktop/tablet where fixed navbar is active */
@media (min-width: 768px) {
  .reading-progress-container {
    display: none !important;
  }
}
</style>

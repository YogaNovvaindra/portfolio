<template>
  <div class="min-h-screen py-24 px-4 md:px-8 relative">
    <div class="max-w-6xl mx-auto h-full relative">
      <!-- Hero Section -->
      <div class="flex flex-col xl:flex-row gap-12 xl:gap-8 mb-8 md:mb-12">
        <!-- Left Side: Header -->
        <div class="w-full flex flex-col justify-center text-left title-reveal">
          <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 drop-shadow-sm">
            Tech <span class="text-blue-500">Explorations</span><span class="text-blue-500">.</span>
          </h1>
          <p class="max-w-xl text-lg text-zinc-400 leading-relaxed mb-8">
            A collection of field notes, documentation, and practical guides on whatever I'm currently building or learning.
          </p>
          
          <!-- Search Bar -->
          <div class="relative hidden xl:block w-full fadein-bot group" style="animation-delay: 200ms;">
            <div class="absolute inset-y-0 left-0 z-10 pl-4 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-blue-400 text-zinc-400">
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-zinc-950/70 shadow-inner shadow-black/20">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.25" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </span>
            </div>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search articles, or type # to filter by tag..." 
              class="w-full bg-zinc-900/40 border border-white/5 focus:border-blue-500/30 focus:shadow-[0_0_30px_rgba(59,130,246,0.15)] focus:bg-zinc-900/60 text-white rounded-2xl pl-14 pr-4 py-3.5 placeholder-zinc-500 transition-all duration-300 outline-none backdrop-blur-sm"
            >
          </div>
          
        </div>

        <!-- Featured removed: full-width header and search above grid -->
      </div>

      <div class="xl:hidden mt-4 md:mt-6 mb-6 fadein-bot" style="animation-delay: 200ms;">
        <div class="relative w-full group">
          <div class="absolute inset-y-0 left-0 z-10 pl-4 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-blue-400 text-zinc-400">
            <span class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-zinc-950/70 shadow-inner shadow-black/20">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.25" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
          </div>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search articles, or type # to filter by tag..." 
            class="w-full bg-zinc-900/40 border border-white/5 focus:border-blue-500/30 focus:shadow-[0_0_30px_rgba(59,130,246,0.15)] focus:bg-zinc-900/60 text-white rounded-2xl pl-14 pr-4 py-3.5 placeholder-zinc-500 transition-all duration-300 outline-none backdrop-blur-sm"
          >
        </div>
      </div>

      <!-- Tag Filters -->
      <div class="mt-2 md:mt-4 mb-4 md:mb-6 fadein-bot min-h-[96px]" style="animation-delay: 300ms;">
        <div v-if="tagsLoading" class="w-full min-h-[96px]">
          <div class="flex items-center gap-3 mb-4">
            <div class="h-3 w-14 bg-zinc-800/70 rounded skeleton-shimmer"></div>
            <div class="hidden sm:block h-px flex-1 bg-white/5"></div>
            <div class="h-3 w-20 bg-zinc-800/70 rounded skeleton-shimmer"></div>
          </div>

          <div class="relative w-full overflow-hidden">
            <div class="flex items-center gap-2 w-full pr-28 overflow-x-auto hide-scrollbar py-1">
              <div class="flex-shrink-0 h-8 w-14 rounded-full bg-zinc-900/60 border border-white/5 skeleton-shimmer"></div>
              <div class="flex-shrink-0 h-8 w-20 rounded-full bg-zinc-900/60 border border-white/5 skeleton-shimmer"></div>
              <div class="flex-shrink-0 h-8 w-16 rounded-full bg-zinc-900/60 border border-white/5 skeleton-shimmer"></div>
              <div class="flex-shrink-0 h-8 w-24 rounded-full bg-zinc-900/60 border border-white/5 skeleton-shimmer"></div>
              <div class="flex-shrink-0 h-8 w-18 rounded-full bg-zinc-900/60 border border-white/5 skeleton-shimmer"></div>
            </div>

            <div class="absolute right-0 top-0 h-full flex items-center bg-gradient-to-l from-[#09090b] via-[#09090b] to-transparent pl-12 pointer-events-none">
              <div class="h-8 w-16 rounded-full bg-zinc-900/70 border border-white/5 skeleton-shimmer"></div>
            </div>
          </div>
        </div>

        <template v-else>
          <div class="flex items-center gap-3 mb-4">
            <span class="text-[11px] uppercase tracking-[0.28em] text-zinc-500">Filter</span>
            <span class="hidden sm:block h-px flex-1 bg-white/5"></span>
            <span class="text-[11px] uppercase tracking-[0.22em] text-zinc-600">{{ tags.length }} articles</span>
          </div>

          <div class="relative w-full overflow-hidden">
                    <div ref="tagRow" class="flex gap-2 w-full pr-28 overflow-x-auto hide-scrollbar py-1">
              <button
                @click="toggleTag(null)"
                :class="['flex-shrink-0 h-8 px-4 inline-flex items-center justify-center rounded-full text-[11px] font-semibold transition-all duration-200 border', !activeTag ? 'bg-blue-500 text-white border-blue-400 shadow-[0_0_0_1px_rgba(96,165,250,0.35)]' : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700']"
              >All</button>
              <button
                v-for="tag in visibleTags"
                :key="tag.id"
                @click="toggleTag(tag.slug)"
                :class="['flex-shrink-0 h-8 px-4 inline-flex items-center justify-center rounded-full text-[11px] font-semibold transition-all duration-200 border', activeTag === tag.slug ? 'bg-blue-500 text-white border-blue-400 shadow-[0_0_0_1px_rgba(96,165,250,0.35)]' : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700']"
              >{{ tag.name }}</button>
            </div>

            <div class="absolute right-0 top-0 h-full flex items-center bg-gradient-to-l from-[#09090b] via-[#09090b] to-transparent pl-12 pointer-events-none">
              <button @click="showTagsModal = true" class="pointer-events-auto h-8 px-3.5 rounded-full text-[11px] font-semibold transition-colors border bg-zinc-950/90 border-zinc-800 text-zinc-300 hover:text-white hover:border-blue-500 hover:bg-zinc-900 inline-flex items-center justify-center gap-1.5 shadow-lg">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                More
              </button>
            </div>
          </div>
        </template>
      </div>

      <!-- Skeleton Grid -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative w-full">
        <div v-for="n in 6" :key="n" class="group relative flex flex-col rounded-3xl bg-zinc-900/40 border border-white/5 overflow-hidden">
          <div class="relative w-full aspect-[16/9] bg-zinc-900 border-b border-white/5 skeleton-shimmer"></div>
          <div class="p-6 sm:p-8 flex-1 flex flex-col relative z-10 w-full">
            <div class="h-7 w-full bg-zinc-800/80 rounded mb-3 skeleton-shimmer"></div>
            <div class="h-7 w-2/3 bg-zinc-800/80 rounded mb-6 skeleton-shimmer"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20 fadein-bot">
        <div class="inline-block bg-red-500/10 border border-red-500/20 rounded-xl px-6 py-4">
          <p class="text-red-400">{{ error.message || 'Error loading posts' }}</p>
          <button @click="refresh" class="mt-4 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm font-medium">Try Again</button>
        </div>
      </div>

      <template v-else>
        <!-- Empty State -->
        <div v-if="posts?.posts?.length === 0 && !searchQuery" class="text-center py-20 fadein-bot">
          <p class="text-zinc-500">No posts found.</p>
        </div>
        <div v-if="searchQuery && searchResults.length === 0" class="text-center py-20 fadein-bot">
          <p class="text-zinc-500 text-lg">No articles found matching "<span class="text-zinc-300">{{ searchQuery }}</span>".</p>
        </div>

        <!-- Blog Posts Grid -->
        <Transition name="fade" mode="out-in" appear>
          <div :key="currentPage + '-' + searchQuery" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start relative w-full mt-4 md:mt-6" v-if="remainingPosts.length > 0">
            <article v-for="(post, index) in remainingPosts" :key="post.id" :style="{ animationDelay: `${index * 70}ms` }" class="group relative flex h-fit flex-col self-start rounded-3xl bg-zinc-900/40 border border-white/5 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] fadein-bot">
              <div class="relative w-full aspect-[16/9] overflow-hidden bg-zinc-900 border-b border-white/5">
                <img v-if="post.feature_image" :src="post.feature_image" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                <div v-else class="w-full h-full bg-zinc-800/50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-700"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
              </div>

              <div class="p-5 sm:p-6 flex flex-col relative z-10 w-full">
                <div class="flex items-center gap-3 text-xs text-zinc-500 font-medium mb-4 flex-wrap">
                  <span v-if="post.primary_tag" class="text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20">{{ post.primary_tag.name }}</span>
                  <time 
                    :datetime="post.published_at" 
                    :title="formatDate(post.published_at)" 
                    class="cursor-help hover:text-zinc-300 transition-colors duration-200"
                  >
                    {{ getRelativeTime(post.published_at) }}
                  </time>
                  <span class="w-1 h-1 rounded-full bg-zinc-700"></span>
                  <span>{{ post.reading_time || 3 }} min read</span>
                </div>
                <h3 class="text-xl font-bold leading-snug text-white group-hover:text-blue-400 transition-colors mb-3">
                  <NuxtLink :to="`/blog/${post.slug}`"><span class="absolute inset-0"></span>{{ post.title }}</NuxtLink>
                </h3>
                <p class="text-sm leading-relaxed text-zinc-400 line-clamp-2 mb-4">{{ post.custom_excerpt || post.excerpt }}</p>
                <NuxtLink :to="`/blog/${post.slug}`" class="relative z-20 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 group-hover:text-blue-400 transition-colors pt-3 border-t border-zinc-800/50 w-full">
                  Read article <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </NuxtLink>
              </div>
            </article>
          </div>
        </Transition>

        <!-- Pagination -->
        <div class="flex items-center justify-between mt-12 fadein-bot" v-if="totalPages > 1">
          <p class="text-xs text-zinc-600">Showing <span class="text-zinc-400 font-medium">{{ searchQuery ? 'search results' : `page ${currentPage} of ${totalPages}` }}</span></p>
          <div class="flex items-center gap-4">
            <button @click="currentPage--" :disabled="currentPage === 1" class="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-blue-400 disabled:text-zinc-800 transition-colors">Prev</button>
            <div class="flex items-center gap-1.5">
              <template v-for="item in windowedPages" :key="item">
                <span v-if="item === '...'" class="w-9 h-9 flex items-center justify-center text-zinc-700 text-sm select-none">…</span>
                <button v-else @click="currentPage = item" :class="['w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors', currentPage === item ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400' : 'text-zinc-500 hover:text-zinc-200']">{{ item }}</button>
              </template>
            </div>
            <button @click="currentPage++" :disabled="currentPage === totalPages" class="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-blue-400 disabled:text-zinc-800 transition-colors">Next</button>
          </div>
        </div>
      </template>
    </div>

    <!-- Tags Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showTagsModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" @click.self="showTagsModal = false">
          <div class="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" @click="showTagsModal = false"></div>
          <div class="relative bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
            <div class="p-4 border-b border-zinc-800 flex items-center gap-3">
              <h3 class="text-lg font-semibold text-white flex-shrink-0">All Tags</h3>
              <div class="relative flex-1">
                <input v-model="modalFilter" type="search" placeholder="Filter tags..." class="w-full bg-zinc-900/70 border border-white/5 rounded-md py-2 px-3 text-sm placeholder-zinc-500 outline-none" />
              </div>
              <button @click="showTagsModal = false" class="text-zinc-500 hover:text-white"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            </div>
            <div class="p-4 overflow-y-auto">
              <div class="flex flex-wrap gap-2">
                <button @click="toggleTag(null); showTagsModal = false" :class="['h-9 px-3 rounded-full text-xs font-medium border', !activeTag ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400']">All</button>
                <button v-for="tag in filteredModalTags" :key="tag.id" @click="toggleTag(tag.slug); showTagsModal = false" :class="['h-9 px-3 rounded-full text-xs font-medium border', activeTag === tag.slug ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400']">{{ tag.name }} <span class="text-zinc-400 ml-1">{{ tag.count?.posts || 0 }}</span></button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

function buildBlogQuery(page) {
  const nextQuery = {}
  if (searchQuery.value) nextQuery.q = searchQuery.value
  if (activeTag.value) nextQuery.tag = activeTag.value
  if (page > 1) nextQuery.page = String(page)
  return nextQuery
}

function readBlogQuery(query) {
  const rawPage = Array.isArray(query.page) ? query.page[0] : query.page
  const page = Number(rawPage || 1)
  return {
    search: typeof query.q === 'string' ? query.q : '',
    tag: typeof query.tag === 'string' ? query.tag : null,
    page: Number.isFinite(page) && page > 0 ? page : 1,
  }
}

useSeoMeta({
  title: 'Blog — Yoga Novaindra',
  description: 'Field notes, documentation, and practical guides on DevSecOps, Kubernetes, security, and cloud infrastructure.',
  ogTitle: 'Blog — Yoga Novaindra',
})

const searchQuery = ref('')
const initialQuery = readBlogQuery(route.query)
const serverPage = ref(initialQuery.page)
const searchPage = ref(initialQuery.page)
const activeTag = ref(initialQuery.tag)
const showTagsModal = ref(false)
// parallax/featured removed
const searchIndex = ref([])
const tags = ref([])
const tagsLoading = ref(true)
const syncingRoute = ref(false)

watch(
  () => route.query,
  (query) => {
    const next = readBlogQuery(query)
    syncingRoute.value = true
    searchQuery.value = next.search
    activeTag.value = next.tag
    serverPage.value = next.page
    searchPage.value = next.page
    nextTick(() => {
      syncingRoute.value = false
    })
  },
  { immediate: true }
)

watch(searchQuery, (value) => {
  if (syncingRoute.value) return
  searchPage.value = 1
  router.replace({ query: { ...buildBlogQuery(1), q: value || undefined } })
})

watch(activeTag, (value) => {
  if (syncingRoute.value) return
  serverPage.value = 1
  router.push({ query: { ...buildBlogQuery(1), tag: value || undefined } })
})

// Fetch tags client-side (non-blocking)
onMounted(async () => {
  try {
    tags.value = await $fetch('/api/tags')
    const searchRes = await $fetch('/api/search')
    searchIndex.value = searchRes.posts || []
  } finally {
    tagsLoading.value = false
  }

  // calculate visible tags and watch for resizes
  await nextTick()
  calculateVisibleTags()
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})

// Fetch SSR posts based on page and tag
const { data: posts, pending, error, refresh } = await useAsyncData(
  `blog-posts-${serverPage.value}-${activeTag.value}`,
  () => {
    const query = { limit: 6, page: serverPage.value }
    if (activeTag.value) query.filter = `tag:${activeTag.value}`
    return $fetch('/api/posts', { query })
  },
  { 
    watch: [serverPage, activeTag],
    transform: (res) => ({ posts: res.posts || [], meta: res.meta || {} }),
    lazy: true
  }
)

const sortedTags = computed(() => {
  if (!tags.value?.length) return []
  if (!activeTag.value) return tags.value
  const sorted = [...tags.value]
  const idx = sorted.findIndex(t => t.slug === activeTag.value)
  if (idx > -1) {
    const [act] = sorted.splice(idx, 1)
    sorted.unshift(act)
  }
  return sorted
})

const modalFilter = ref('')
const debouncedModalFilter = ref('')
let modalTimer = null
watch(modalFilter, (v) => {
  clearTimeout(modalTimer)
  modalTimer = setTimeout(() => debouncedModalFilter.value = v.trim().toLowerCase(), 150)
})

const filteredModalTags = computed(() => {
  if (!debouncedModalFilter.value) return sortedTags.value
  return sortedTags.value.filter(t => t.name.toLowerCase().includes(debouncedModalFilter.value) || t.slug.toLowerCase().includes(debouncedModalFilter.value))
})

const tagRow = ref(null)
const visibleTags = ref([])

function calculateVisibleTags() {
  if (!tagRow.value) {
    visibleTags.value = sortedTags.value.slice(0, 6)
    return
  }
  const containerWidth = tagRow.value.clientWidth
  if (!containerWidth) {
    visibleTags.value = sortedTags.value.slice(0, 6)
    return
  }

  // Create a hidden measurement button to get rendered widths
  const meas = document.createElement('button')
  meas.style.position = 'absolute'
  meas.style.visibility = 'hidden'
  meas.style.left = '-9999px'
  meas.style.top = '-9999px'
  meas.className = 'flex-shrink-0 h-8 px-4 inline-flex items-center justify-center rounded-full text-[11px] font-semibold'
  document.body.appendChild(meas)

  const gap = 8 // gap-2 => 8px
  // measure "All" and "More" buttons
  meas.textContent = 'All'
  const allW = meas.offsetWidth
  meas.textContent = '+ More'
  const moreW = meas.offsetWidth

  let used = allW + gap
  const slice = []
  const list = sortedTags.value || []
  for (const tag of list) {
    meas.textContent = tag.name
    const w = meas.offsetWidth
    if (used + w + moreW > containerWidth) break
    slice.push(tag)
    used += w + gap
  }

  // ensure active tag is present
  if (activeTag.value && !slice.find(t => t.slug === activeTag.value)) {
    const active = list.find(t => t.slug === activeTag.value)
    if (active) {
      if (slice.length === 0) slice.push(active)
      else slice[slice.length - 1] = active
    }
  }

  document.body.removeChild(meas)
  visibleTags.value = slice
}

let resizeTimer = null
function onResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => calculateVisibleTags(), 120)
}

function postMatchesQuery(post, query) {
  if (!query || !post) return false
  const normalizedQuery = query.toLowerCase()
  const isHash = normalizedQuery.startsWith('#') && normalizedQuery.length > 1
  const hashQuery = isHash ? normalizedQuery.substring(1) : null
  if (isHash) {
    return post.tags?.some(tag => tag.slug.toLowerCase().includes(hashQuery) || tag.name.toLowerCase().includes(hashQuery))
  }
  return post.title?.toLowerCase().includes(normalizedQuery) || post.excerpt?.toLowerCase().includes(normalizedQuery)
}

const searchMatches = computed(() => {
  if (!searchQuery.value) return []
  let matches = searchIndex.value
  if (activeTag.value) {
    matches = matches.filter(p => p.tags?.some(t => t.slug === activeTag.value))
  }
  return matches.filter(p => postMatchesQuery(p, searchQuery.value))
})

const searchResults = computed(() => {
  if (!searchQuery.value) return []
  return searchMatches.value
})

const remainingPosts = computed(() => {
  if (searchQuery.value) {
    const start = (searchPage.value - 1) * 6
    return searchResults.value.slice(start, start + 6)
  }
  return posts.value?.posts || []
})

const totalPages = computed(() => {
  if (searchQuery.value) return Math.ceil(searchMatches.value.length / 6) || 1
  return posts.value?.meta?.pagination?.pages || 1
})

const currentPage = computed({
  get: () => searchQuery.value ? searchPage.value : serverPage.value,
  set: (v) => {
    const page = Number(v) > 0 ? Number(v) : 1
    if (searchQuery.value) searchPage.value = page
    else serverPage.value = page
    router.push({ query: buildBlogQuery(page) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

const windowedPages = computed(() => {
  const tot = totalPages.value, cur = currentPage.value
  if (tot <= 7) return Array.from({ length: tot }, (_, i) => i + 1)
  const p = [1]
  if (cur > 4) p.push('...')
  for (let i = Math.max(2, cur - 1); i <= Math.min(tot - 1, cur + 1); i++) p.push(i)
  if (cur < tot - 3) p.push('...')
  p.push(tot)
  return p
})

function toggleTag(slug) {
  activeTag.value = activeTag.value === slug ? null : slug
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
</script>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.2s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>

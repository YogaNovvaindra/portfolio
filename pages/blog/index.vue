<template>
  <div class="min-h-screen py-24 px-4 md:px-8 relative">
    <div class="max-w-6xl mx-auto h-full relative">
      <!-- Hero Section -->
      <div class="flex flex-col xl:flex-row gap-12 xl:gap-8 mb-8 md:mb-12">
        <!-- Left Side: Header -->
        <div class="xl:w-5/12 flex flex-col justify-center text-left title-reveal">
          <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 drop-shadow-sm">
            Tech <span class="text-blue-500">Explorations</span><span class="text-blue-500">.</span>
          </h1>
          <p class="text-lg text-zinc-400 leading-relaxed mb-8">
            A collection of field notes, documentation, and practical guides on whatever I'm currently building or learning.
          </p>
          
          <!-- Search Bar -->
          <div class="relative w-full fadein-bot group" style="animation-delay: 200ms;">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-blue-400 text-zinc-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search articles, or type # to filter by tag..." 
              class="w-full bg-zinc-900/40 border border-white/5 focus:border-blue-500/30 focus:shadow-[0_0_30px_rgba(59,130,246,0.15)] focus:bg-zinc-900/60 text-white rounded-2xl pl-12 pr-4 py-3.5 placeholder-zinc-500 transition-all duration-300 outline-none backdrop-blur-sm"
            >
          </div>
          
          <!-- Tag Filters -->
          <div class="mt-6 relative w-full h-9 md:h-7 overflow-hidden fadein-bot" style="animation-delay: 300ms;">
            <!-- Tag Loading Skeletons -->
            <div v-if="!tags?.length" class="flex gap-2 w-full absolute inset-0 hide-scrollbar overflow-x-auto">
              <div class="flex-shrink-0 w-12 h-9 md:h-7 rounded-full bg-zinc-900/60 border border-white/5 skeleton-shimmer"></div>
              <div class="flex-shrink-0 w-20 h-9 md:h-7 rounded-full bg-zinc-900/60 border border-white/5 skeleton-shimmer"></div>
              <div class="flex-shrink-0 w-16 h-9 md:h-7 rounded-full bg-zinc-900/60 border border-white/5 skeleton-shimmer"></div>
              <div class="flex-shrink-0 w-24 h-9 md:h-7 rounded-full bg-zinc-900/60 border border-white/5 skeleton-shimmer"></div>
            </div>

            <!-- Actual Tags -->
            <template v-else>
              <div class="flex gap-2 w-full pr-24 absolute inset-0 hide-scrollbar overflow-x-auto">
                <button
                  @click="toggleTag(null)"
                  :class="['flex-shrink-0 h-9 md:h-7 px-4 inline-flex items-center justify-center rounded-full text-xs font-medium transition-colors border', !activeTag ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700']"
                >All</button>
                <button
                  v-for="tag in sortedTags"
                  :key="tag.id"
                  @click="toggleTag(tag.slug)"
                  :class="['flex-shrink-0 h-9 md:h-7 px-4 inline-flex items-center justify-center rounded-full text-xs font-medium transition-colors border', activeTag === tag.slug ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700']"
                >{{ tag.name }}</button>
              </div>
              
              <div class="absolute right-0 top-0 h-full flex items-center bg-gradient-to-l from-[#09090b] via-[#09090b] to-transparent pl-12 pointer-events-none">
                <button @click="showTagsModal = true" class="pointer-events-auto h-9 md:h-7 px-4 rounded-full text-xs font-medium transition-colors border bg-zinc-900/90 border-zinc-700 text-zinc-300 hover:text-white hover:border-blue-500 hover:bg-zinc-800 inline-flex items-center justify-center gap-1 shadow-lg">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                  More
                </button>
              </div>
            </template>
          </div>
        </div>

        <!-- Right Side: Featured Post -->
        <div class="xl:w-7/12">
          <!-- Skeleton -->
          <div v-if="pending">
            <div class="min-h-[400px] rounded-3xl border border-white/5 bg-zinc-900/40 relative overflow-hidden flex flex-col justify-between">
              <div class="absolute inset-0 z-0 bg-zinc-900 skeleton-shimmer"></div>
              <div class="relative z-10 flex flex-col h-full p-6 md:p-10">
                <div class="flex items-center gap-3 mb-4"><div class="h-6 w-24 bg-zinc-800/80 rounded-md skeleton-shimmer"></div></div>
                <div class="mt-auto pt-10"><div class="h-10 w-full bg-zinc-800/80 rounded mb-4 skeleton-shimmer"></div></div>
              </div>
            </div>
          </div>
          
          <div v-else-if="featuredPost" class="fadein-bot" style="animation-delay: 100ms;">
            <article class="h-full group relative rounded-3xl border border-white/5 flex flex-col justify-between transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden min-h-[400px]">
              <div class="absolute inset-0 z-0 overflow-hidden">
                <img v-if="featuredPost.feature_image" ref="featuredImg" :src="featuredPost.feature_image" :style="{ transform: `translateY(${parallaxY}px) scale(1.12)` }" fetchpriority="high" class="w-full h-full object-cover will-change-transform" />
                <div v-else class="w-full h-full bg-zinc-900/80"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-900/40"></div>
                <div class="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/30 transition-all duration-700"></div>
              </div>

              <div class="relative z-10 flex flex-col h-full p-6 md:p-10">
                <div class="flex items-center gap-3 text-xs text-zinc-300 font-medium mb-4 flex-wrap">
                  <span class="text-amber-400 flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 backdrop-blur-sm">Featured</span>
                  <time 
                    :title="formatDate(featuredPost.published_at)" 
                    class="cursor-help hover:text-zinc-100 transition-colors duration-200"
                  >
                    {{ getRelativeTime(featuredPost.published_at) }}
                  </time>
                  <span class="w-1 h-1 rounded-full bg-zinc-500"></span>
                  <span>{{ featuredPost.reading_time || 3 }} min read</span>
                  <span v-if="featuredPost.primary_tag" class="text-blue-300 bg-blue-500/20 px-2.5 py-1 rounded-md border border-blue-500/30">{{ featuredPost.primary_tag.name }}</span>
                </div>
                
                <div class="mt-auto pt-10">
                  <h3 class="text-3xl md:text-4xl font-bold leading-tight text-white group-hover:text-blue-400 transition-colors mb-4 drop-shadow-xl">
                    <NuxtLink :to="`/blog/${featuredPost.slug}`"><span class="absolute inset-0"></span>{{ featuredPost.title }}</NuxtLink>
                  </h3>
                  <p class="text-base md:text-lg leading-relaxed text-zinc-300 line-clamp-3 mb-8 drop-shadow-md">{{ featuredPost.custom_excerpt || featuredPost.excerpt }}</p>
                  <NuxtLink :to="`/blog/${featuredPost.slug}`" class="relative z-20 inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-400 transition-colors px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/20">
                    Read featured article <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </NuxtLink>
                </div>
              </div>
            </article>
          </div>
        </div>
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
        <div v-if="searchQuery && searchMatches.length === 0" class="text-center py-20 fadein-bot">
          <p class="text-zinc-500 text-lg">No articles found matching "<span class="text-zinc-300">{{ searchQuery }}</span>".</p>
        </div>

        <!-- Blog Posts Grid -->
        <Transition name="fade" mode="out-in">
          <div :key="currentPage + '-' + searchQuery" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative w-full" v-if="remainingPosts.length > 0">
            <article v-for="post in remainingPosts" :key="post.id" class="group relative flex flex-col rounded-3xl bg-zinc-900/40 border border-white/5 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
              <div class="relative w-full aspect-[16/9] overflow-hidden bg-zinc-900 border-b border-white/5">
                <img v-if="post.feature_image" :src="post.feature_image" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                <div v-else class="w-full h-full bg-zinc-800/50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-700"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
              </div>

              <div class="p-6 sm:p-8 flex-1 flex flex-col relative z-10 w-full">
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
                <p class="text-sm leading-relaxed text-zinc-400 line-clamp-2 mb-6">{{ post.custom_excerpt || post.excerpt }}</p>
                <div class="mt-auto"></div>
                <NuxtLink :to="`/blog/${post.slug}`" class="relative z-20 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 group-hover:text-blue-400 transition-colors pt-5 border-t border-zinc-800/50 w-full">
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
            <div class="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h3 class="text-lg font-semibold text-white">All Tags</h3>
              <button @click="showTagsModal = false" class="text-zinc-500 hover:text-white"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            </div>
            <div class="p-6 overflow-y-auto">
              <div class="flex flex-wrap gap-2">
                <button @click="toggleTag(null); showTagsModal = false" :class="['h-9 px-3 rounded-full text-xs font-medium border', !activeTag ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400']">All</button>
                <button v-for="tag in sortedTags" :key="tag.id" @click="toggleTag(tag.slug); showTagsModal = false" :class="['h-9 px-3 rounded-full text-xs font-medium border', activeTag === tag.slug ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400']">{{ tag.name }} <span class="text-zinc-400 ml-1">{{ tag.count?.posts || 0 }}</span></button>
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

useSeoMeta({
  title: 'Blog — Yoga Novaindra',
  description: 'Field notes, documentation, and practical guides on DevSecOps, Kubernetes, security, and cloud infrastructure.',
  ogTitle: 'Blog — Yoga Novaindra',
})

const searchQuery = ref('')
const serverPage = ref(1)
const searchPage = ref(1)
const activeTag = ref(route.query.tag || null)
const showTagsModal = ref(false)
const parallaxY = ref(0)
const searchIndex = ref([])
const tags = ref([])

// Fetch tags client-side (non-blocking)
onMounted(async () => {
  tags.value = await $fetch('/api/tags')
  const searchRes = await $fetch('/api/search')
  searchIndex.value = searchRes.posts || []
  window.addEventListener('scroll', handleParallax, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', handleParallax))

// Fetch SSR posts based on page and tag
const { data: posts, pending, error, refresh } = await useAsyncData(
  `blog-posts-${serverPage.value}-${activeTag.value}`,
  () => {
    const query = { limit: 7, page: serverPage.value }
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

const searchMatches = computed(() => {
  if (!searchQuery.value) return []
  const query = searchQuery.value.toLowerCase()
  const isHash = query.startsWith('#') && query.length > 1
  const hashQ = isHash ? query.substring(1) : null
  
  let matches = searchIndex.value
  if (activeTag.value) {
    matches = matches.filter(p => p.tags?.some(t => t.slug === activeTag.value))
  }
  return matches.filter(p => {
    if (isHash) return p.tags?.some(t => t.slug.toLowerCase().includes(hashQ) || t.name.toLowerCase().includes(hashQ))
    return p.title?.toLowerCase().includes(query) || p.excerpt?.toLowerCase().includes(query)
  })
})

const featuredPost = computed(() => {
  if (searchQuery.value || serverPage.value !== 1 || activeTag.value) return null
  return posts.value?.posts?.[0]
})

const remainingPosts = computed(() => {
  if (searchQuery.value) {
    const start = (searchPage.value - 1) * 6
    return searchMatches.value.slice(start, start + 6)
  }
  if (serverPage.value === 1 && !activeTag.value) return posts.value?.posts?.slice(1) || []
  return posts.value?.posts || []
})

const totalPages = computed(() => {
  if (searchQuery.value) return Math.ceil(searchMatches.value.length / 6) || 1
  return posts.value?.meta?.pagination?.pages || 1
})

const currentPage = computed({
  get: () => searchQuery.value ? searchPage.value : serverPage.value,
  set: (v) => {
    if (searchQuery.value) searchPage.value = v
    else serverPage.value = v
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
  serverPage.value = 1
  router.push({ query: activeTag.value ? { tag: activeTag.value } : {} })
}

function handleParallax() {
  if (featuredPost.value) parallaxY.value = Math.min(window.scrollY * 0.08, 35)
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

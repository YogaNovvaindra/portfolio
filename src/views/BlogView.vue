<template>
  <div class="min-h-screen py-24 px-4 md:px-8 relative">
    <div class="max-w-6xl mx-auto h-full relative">
      <!-- Skeleton Loading State -->
      <div v-if="loading">
        <!-- Skeleton Hero -->
        <div class="flex flex-col xl:flex-row gap-12 xl:gap-8 mb-8 md:mb-12">
          <div class="xl:w-5/12 flex flex-col justify-center">
            <div class="h-10 w-64 bg-zinc-800/60 rounded-xl mb-6 skeleton-shimmer"></div>
            <div class="h-4 w-full bg-zinc-800/40 rounded mb-2 skeleton-shimmer"></div>
            <div class="h-4 w-5/6 bg-zinc-800/40 rounded mb-8 skeleton-shimmer"></div>
            <div class="h-12 w-full bg-zinc-800/40 rounded-xl mb-6 skeleton-shimmer"></div>
            <div class="flex gap-2">
              <div class="h-8 w-12 bg-zinc-800/40 rounded-full skeleton-shimmer"></div>
              <div class="h-8 w-16 bg-zinc-800/40 rounded-full skeleton-shimmer"></div>
              <div class="h-8 w-20 bg-zinc-800/40 rounded-full skeleton-shimmer"></div>
            </div>
          </div>
          <div class="xl:w-7/12">
            <div class="min-h-[360px] rounded-2xl border border-zinc-800/60 relative skeleton-shimmer">
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex gap-3 mb-4"><div class="h-4 w-24 bg-zinc-800/80 rounded"></div><div class="h-6 w-20 bg-zinc-800/80 rounded-full"></div></div>
                <div class="h-8 w-full bg-zinc-800/80 rounded mb-2"></div>
                <div class="h-8 w-3/4 bg-zinc-800/80 rounded mb-6"></div>
                <div class="h-4 w-full bg-zinc-800/80 rounded mb-2"></div>
                <div class="h-4 w-5/6 bg-zinc-800/80 rounded mb-8"></div>
                <div class="flex items-center gap-3"><div class="h-12 w-12 rounded-full bg-zinc-800/80"></div><div><div class="h-4 w-32 bg-zinc-800/80 rounded mb-2"></div><div class="h-3 w-20 bg-zinc-800/80 rounded"></div></div></div>
              </div>
            </div>
          </div>
        </div>
        <!-- Skeleton Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="n in 6" :key="n" class="rounded-2xl border border-zinc-800/60 min-h-[320px] p-6 flex flex-col justify-between skeleton-shimmer">
            <div>
              <div class="flex gap-3 mb-5"><div class="h-3 w-16 bg-zinc-800/80 rounded-full"></div><div class="h-5 w-20 bg-zinc-800/80 rounded-full"></div></div>
              <div class="h-5 w-full bg-zinc-800/80 rounded mb-2"></div>
              <div class="h-5 w-4/5 bg-zinc-800/80 rounded mb-5"></div>
              <div class="h-3.5 w-full bg-zinc-800/60 rounded mb-2"></div>
              <div class="h-3.5 w-2/3 bg-zinc-800/60 rounded"></div>
            </div>
            <div class="flex items-center gap-3 mt-6">
              <div class="h-10 w-10 rounded-full bg-zinc-800/80"></div>
              <div><div class="h-3.5 w-28 bg-zinc-800/80 rounded mb-2"></div><div class="h-3 w-16 bg-zinc-800/60 rounded"></div></div>
            </div>
          </div>
        </div>
      </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20 fadein-bot">
      <div class="inline-block bg-red-500/10 border border-red-500/20 rounded-xl px-6 py-4">
        <p class="text-red-400">{{ error }}</p>
        <button @click="fetchPosts" class="mt-4 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm font-medium">
          Try Again
        </button>
      </div>
    </div>

    <template v-else>
      <!-- Empty State -->
      <div v-if="serverPosts.length === 0" class="text-center py-20 fadein-bot">
        <p class="text-zinc-500">No posts found.</p>
      </div>

      <template v-else>
        <!-- Hero Section: Header + Featured Post -->
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
            <div class="relative w-full fadein-bot" style="animation-delay: 200ms;">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Search articles, or type # to filter by tag..." 
                class="w-full bg-zinc-900/50 border border-zinc-800 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-white rounded-xl pl-12 pr-4 py-3 placeholder-zinc-500 transition-all duration-300 outline-none"
              >
            </div>
            
            <!-- Tag Filters -->
            <div class="mt-6 relative w-full h-9 md:h-7 overflow-hidden fadein-bot" style="animation-delay: 300ms;" v-if="tags && tags.length > 0">
              <!-- Scrollable Track (hidden scrollbar) -->
              <div class="flex gap-2 w-full pr-24 absolute inset-0 hide-scrollbar overflow-x-auto">
                <button
                  @click="toggleTag(null)"
                  :aria-pressed="!activeTag"
                  :class="['flex-shrink-0 h-9 md:h-7 px-4 inline-flex items-center justify-center rounded-full text-xs font-medium transition-colors border', !activeTag ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700']"
                >
                  All
                </button>
                <button
                  v-for="tag in sortedTags"
                  :key="tag.id"
                  @click="toggleTag(tag.slug)"
                  :aria-pressed="activeTag === tag.slug"
                  :class="['flex-shrink-0 h-9 md:h-7 px-4 inline-flex items-center justify-center rounded-full text-xs font-medium transition-colors border', activeTag === tag.slug ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700']"
                >
                  {{ tag.name }}
                </button>
              </div>
              
              <!-- Absolute Gradient & More Button -->
              <div class="absolute right-0 top-0 h-full flex items-center bg-gradient-to-l from-[#09090b] via-[#09090b] to-transparent pl-12 pointer-events-none">
                <button
                  @click="showTagsModal = true"
                  class="pointer-events-auto h-9 md:h-7 px-4 rounded-full text-xs font-medium transition-colors border bg-zinc-900/90 border-zinc-700 text-zinc-300 hover:text-white hover:border-blue-500 hover:bg-zinc-800 inline-flex items-center justify-center gap-1 shadow-lg"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                  More
                </button>
              </div>
            </div>
          </div>

          <!-- Right Side: Featured Post -->
          <div class="xl:w-7/12 fadein-bot" style="animation-delay: 100ms;" v-if="featuredPost">
            <article class="h-full group relative rounded-3xl border border-white/5 flex flex-col justify-between transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden min-h-[400px]">
              <!-- Background Image & Overlay -->
              <div class="absolute inset-0 z-0 overflow-hidden">
                <img v-if="featuredPost.feature_image" ref="featuredImg" :src="featuredPost.feature_image" :alt="featuredPost.title" :style="{ transform: 'translateY(' + parallaxY + 'px) scale(1.12)' }" class="w-full h-full object-cover will-change-transform" />
                <div v-else class="w-full h-full bg-zinc-900/80"></div>
                <!-- Dark Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-900/40"></div>
                <div class="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/30 backdrop-blur-none transition-all duration-700"></div>
              </div>

              <!-- Content -->
              <div class="relative z-10 flex flex-col h-full p-6 md:p-10">
                <!-- Meta: Featured, Date, Read Time, Tag -->
                <div class="flex items-center gap-3 text-xs text-zinc-300 font-medium mb-4 flex-wrap">
                  <span class="text-amber-400 flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    Featured
                  </span>
                  <time :datetime="featuredPost.published_at" class="cursor-help drop-shadow">{{ getRelativeTime(featuredPost.published_at) }}</time>
                  <span class="w-1 h-1 rounded-full bg-zinc-500"></span>
                  <span class="drop-shadow">{{ featuredPost.reading_time || 3 }} min read</span>
                  <span v-if="featuredPost.primary_tag" class="text-blue-300 bg-blue-500/20 px-2.5 py-1 rounded-md backdrop-blur-sm border border-blue-500/30 ml-auto">{{ featuredPost.primary_tag.name }}</span>
                </div>
                
                <div class="mt-auto pt-10">
                  <h3 class="text-3xl md:text-4xl font-bold leading-tight text-white group-hover:text-blue-400 transition-colors mb-4 drop-shadow-xl">
                    <router-link :to="`/blog/${featuredPost.slug}`">
                      <span class="absolute inset-0"></span>
                      {{ featuredPost.title }}
                    </router-link>
                  </h3>
                  <p class="text-base md:text-lg leading-relaxed text-zinc-300 line-clamp-3 mb-8 drop-shadow-md">
                    {{ featuredPost.custom_excerpt || featuredPost.excerpt }}
                  </p>
                  
                  <div class="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-400 transition-colors px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/20">
                    Read featured article
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Empty Search State -->
        <div v-if="searchQuery && searchMatches.length === 0" class="text-center py-20 fadein-bot">
          <p class="text-zinc-500 text-lg">No articles found matching "<span class="text-zinc-300">{{ searchQuery }}</span>".</p>
        </div>

        <!-- Blog Posts Grid -->
        <Transition name="fade" mode="out-in">
          <div :key="currentPage + '-' + searchQuery" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative w-full" v-if="remainingPosts.length > 0">
            <article
              v-for="post in remainingPosts"
              :key="post.id"
              class="group relative flex flex-col rounded-3xl bg-zinc-900/40 border border-white/5 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            >
              <!-- Top Image Block -->
              <div class="relative w-full aspect-[16/9] overflow-hidden bg-zinc-900 border-b border-white/5">
                <img v-if="post.feature_image" :src="post.feature_image" :alt="post.title" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                <div v-else class="w-full h-full bg-zinc-800/50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-700"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
              </div>

              <!-- Content Block -->
              <div class="p-6 sm:p-8 flex-1 flex flex-col relative z-10 w-full">
                <!-- Meta: Tag, Date, Read Time -->
                <div class="flex items-center gap-3 text-xs text-zinc-500 font-medium mb-4 flex-wrap">
                  <span v-if="post.primary_tag" class="text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20">{{ post.primary_tag.name }}</span>
                  <time :datetime="post.published_at" :title="formatDate(post.published_at)" class="cursor-help">{{ getRelativeTime(post.published_at) }}</time>
                  <span class="w-1 h-1 rounded-full bg-zinc-700"></span>
                  <span>{{ post.reading_time || 3 }} min read</span>
                </div>
                
                <!-- Title -->
                <h3 class="text-xl font-bold leading-snug text-white group-hover:text-blue-400 transition-colors mb-3">
                  <router-link :to="`/blog/${post.slug}`">
                    <span class="absolute inset-0"></span>
                    {{ post.title }}
                  </router-link>
                </h3>
                
                <!-- Excerpt -->
                <p class="text-sm leading-relaxed text-zinc-400 line-clamp-2 mb-6">
                  {{ post.custom_excerpt || post.excerpt }}
                </p>
                
                <div class="mt-auto"></div>
                
                <!-- Action Footer -->
                <div class="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 group-hover:text-blue-400 transition-colors pt-5 border-t border-zinc-800/50">
                  Read article
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              </div>
            </article>
          </div>
        </Transition>

        <!-- Dual-filter indicator -->
        <div v-if="searchQuery && activeTag" class="flex items-center gap-2 mt-4 mb-2 fadein-bot">
          <span class="text-xs text-zinc-500">Filtering by:</span>
          <span class="text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">#{{ activeTag }}</span>
          <span class="text-xs text-zinc-600">+</span>
          <span class="text-xs font-mono text-zinc-300 bg-zinc-800/60 border border-zinc-700/60 px-2.5 py-0.5 rounded-full">"{{ searchQuery }}"</span>
          <button @click="activeTag = null; searchQuery = ''" class="text-xs text-zinc-600 hover:text-zinc-400 transition-colors ml-1" title="Clear all filters">✕ clear</button>
        </div>

        <!-- Post Count & Pagination -->
        <div class="flex items-center justify-between mt-12 fadein-bot" v-if="!searchQuery">
          <p class="text-xs text-zinc-600">
            Showing <span class="text-zinc-400 font-medium">{{ postsCountLabel }}</span>
          </p>
          <div v-if="totalPages > 1" class="flex items-center gap-4">
            <button 
              @click="currentPage > 1 && currentPage--"
              :disabled="currentPage === 1"
              class="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-blue-400 disabled:text-zinc-800 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Prev
            </button>
            <div class="flex items-center gap-1.5">
              <template v-for="item in windowedPages" :key="item">
                <span v-if="item === '...'" class="w-9 h-9 flex items-center justify-center text-zinc-700 text-sm select-none">…</span>
                <button
                  v-else
                  @click="currentPage = item"
                  :class="[
                    'w-10 h-10 md:w-9 md:h-9 rounded-full transition-all duration-300 flex items-center justify-center text-sm font-medium',
                    currentPage === item
                      ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.1)]'
                      : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
                  ]"
                >
                  {{ item }}
                </button>
              </template>
            </div>
            <button 
              @click="currentPage < totalPages && currentPage++"
              :disabled="currentPage === totalPages"
              class="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-blue-400 disabled:text-zinc-800 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Search pagination -->
        <div v-if="searchQuery && totalPages > 1" class="flex justify-center mt-12 fadein-bot">
          <div class="flex items-center gap-4">
            <button 
              @click="currentPage > 1 && currentPage--"
              :disabled="currentPage === 1"
              class="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-blue-400 disabled:text-zinc-800 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Prev
            </button>
            <div class="flex items-center gap-1.5">
              <template v-for="item in windowedPages" :key="item">
                <span v-if="item === '...'" class="w-9 h-9 flex items-center justify-center text-zinc-700 text-sm select-none">…</span>
                <button
                  v-else
                  @click="currentPage = item"
                  :class="[
                    'w-9 h-9 rounded-full transition-all duration-300 flex items-center justify-center text-sm font-medium',
                    currentPage === item
                      ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.1)]'
                      : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
                  ]"
                >
                  {{ item }}
                </button>
              </template>
            </div>
            <button 
              @click="currentPage < totalPages && currentPage++"
              :disabled="currentPage === totalPages"
              class="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-blue-400 disabled:text-zinc-800 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </template>
    </template>
    </div>

    <!-- Tags Modal -->
    <Transition name="modal-fade">
      <div
        v-if="showTagsModal"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label="All tags"
        @click.self="showTagsModal = false"
        @keydown.esc="showTagsModal = false"
      >
        <div class="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" @click="showTagsModal = false"></div>
        <div
          ref="tagsModal"
          class="relative bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl transform transition-all fadein-bot"
          tabindex="-1"
          @keydown="trapFocus"
        >
          <div class="p-6 border-b border-zinc-800 flex justify-between items-center">
            <h3 class="text-lg font-semibold text-white">All Tags</h3>
            <button
              ref="modalCloseBtn"
              @click="showTagsModal = false"
              class="text-zinc-500 hover:text-white transition-colors"
              aria-label="Close tags modal"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <div class="p-6 overflow-y-auto hide-scrollbar">
            <div class="flex flex-wrap gap-2">
              <button
                @click="toggleTag(null); showTagsModal = false"
                :aria-pressed="!activeTag"
                :class="['h-9 md:h-7 px-3 inline-flex items-center justify-center rounded-full text-xs font-medium transition-colors border', !activeTag ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700']"
              >
                All
              </button>
              <button
                v-for="tag in sortedTags"
                :key="tag.id"
                @click="toggleTag(tag.slug); showTagsModal = false"
                :aria-pressed="activeTag === tag.slug"
                :class="['h-9 md:h-7 px-3 inline-flex items-center justify-center rounded-full text-xs font-medium transition-colors border', activeTag === tag.slug ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700']"
              >
                {{ tag.name }} <span class="text-zinc-400 ml-1">{{ tag.count?.posts || 0 }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import ghost from '@/services/ghost';
import { setPageMeta } from '@/services/pageMeta';

export default {
  name: 'BlogView',
  data() {
    return {
      serverPosts: [],
      searchIndex: [],
      loading: true,
      error: null,
      searchQuery: '',
      serverPage: 1,
      searchPage: 1,
      apiTotalPages: 1,
      tags: [],
      activeTag: null,
      showTagsModal: false,
      parallaxY: 0,
    };
  },
  watch: {
    searchQuery() {
      this.searchPage = 1;
    },
    serverPage(newPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.fetchPosts(newPage);
    },
    searchPage() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    activeTag() {
      this.serverPage = 1;
      this.searchPage = 1;
      if (this.serverPage === 1) {
        this.fetchPosts(1);
      }
    },
    showTagsModal(val) {
      if (val) {
        // Focus the modal container after it renders so Escape/Tab work
        this.$nextTick(() => {
          this.$refs.tagsModal?.focus();
        });
      }
    },
    '$route.query.tag'(newTag) {
      if (newTag && newTag !== this.activeTag) {
        this.activeTag = newTag;
      }
    },
  },
  computed: {
    sortedTags() {
      if (!this.tags || this.tags.length === 0) return [];
      if (!this.activeTag) return this.tags;
      
      const activeTagIndex = this.tags.findIndex(t => t.slug === this.activeTag);
      if (activeTagIndex > -1) {
        const sorted = [...this.tags];
        const [active] = sorted.splice(activeTagIndex, 1);
        sorted.unshift(active);
        return sorted;
      }
      return this.tags;
    },
    currentPage: {
      get() {
        return this.searchQuery ? this.searchPage : this.serverPage;
      },
      set(val) {
        if (this.searchQuery) {
          this.searchPage = val;
        } else {
          this.serverPage = val;
        }
      }
    },
    searchMatches() {
      if (!this.searchQuery) return [];
      const query = this.searchQuery.toLowerCase();
      
      // Hashtag search check
      const isHashtagSearch = query.startsWith('#') && query.length > 1;
      const hashTagQuery = isHashtagSearch ? query.substring(1) : null;
      
      // First filter by tag if active
      let matches = this.searchIndex;
      if (this.activeTag) {
        matches = matches.filter(post => 
          post.tags && post.tags.some(t => t.slug === this.activeTag)
        );
      }
      
      // Then filter by text or hashtag
      return matches.filter(post => {
        if (isHashtagSearch) {
          return post.tags && post.tags.some(t => t.slug.toLowerCase().includes(hashTagQuery) || t.name.toLowerCase().includes(hashTagQuery));
        } else {
          const matchTitle = post.title?.toLowerCase().includes(query);
          const matchExcerpt = post.excerpt?.toLowerCase().includes(query) || post.custom_excerpt?.toLowerCase().includes(query);
          return matchTitle || matchExcerpt;
        }
      });
    },
    featuredPost() {
      // Only show featured on the default all-posts view (no tag, no search, page 1)
      if (this.searchQuery || this.currentPage !== 1 || this.activeTag) return null;
      return this.serverPosts.length > 0 ? this.serverPosts[0] : null;
    },
    remainingPosts() {
      if (this.searchQuery) {
        const startIndex = (this.currentPage - 1) * 6;
        return this.searchMatches.slice(startIndex, startIndex + 6);
      }
      // Only skip first post (featured) when on default all-posts view, page 1
      if (this.currentPage === 1 && !this.activeTag) return this.serverPosts.slice(1);
      return this.serverPosts;
    },
    totalPages() {
      if (this.searchQuery) {
        return Math.ceil(this.searchMatches.length / 6) || 1;
      }
      return this.apiTotalPages;
    },
    postsCountLabel() {
      const page = this.serverPage;
      if (this.apiTotalPages <= 1) {
        return `${this.serverPosts.length} post${this.serverPosts.length !== 1 ? 's' : ''}`;
      }
      return `page ${page} of ${this.apiTotalPages}`;
    },
    windowedPages() {
      const total = this.totalPages;
      const current = this.currentPage;
      if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
      }
      const pages = [];
      // Always show first
      pages.push(1);
      // Left ellipsis
      if (current > 4) pages.push('...');
      // Window around current
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      // Right ellipsis
      if (current < total - 3) pages.push('...');
      // Always show last
      pages.push(total);
      return pages;
    },
  },
  mounted() {
    setPageMeta({
      title: 'Blog — Yoga Novaindra',
      description: 'Field notes, documentation, and practical guides on DevSecOps, Kubernetes, security, and cloud infrastructure.',
      url: 'https://yoganova.my.id/blog',
    });
    window.addEventListener('scroll', this.handleParallax, { passive: true });
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleParallax);
  },
  async created() {
    // Check for tag filter from route query (e.g. from ArticleView tag links)
    if (this.$route.query.tag) {
      this.activeTag = this.$route.query.tag;
    }
    this.fetchTags();
    this.fetchSearchIndex();
    await this.fetchPosts();
  },
  methods: {
    async fetchTags() {
      try {
        this.tags = await ghost.getTags();
      } catch (err) {
        console.error('Failed to load tags', err);
      }
    },
    toggleTag(slug) {
      if (this.activeTag === slug) {
        this.activeTag = null; // deselect
      } else {
        this.activeTag = slug;
      }
    },
    async fetchPosts(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const filter = this.activeTag ? `tag:${this.activeTag}` : null;
        // Fetch 7 posts per page (Page 1 uses 1 for featured + 6 for grid)
        const response = await ghost.getPosts(7, page, filter);
        this.serverPosts = response.posts || [];
        this.apiTotalPages = response.meta?.pagination?.pages || 1;
      } catch (err) {
        this.error = 'Failed to load blog posts. Ensure Ghost Content API Key is configured.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async fetchSearchIndex() {
      try {
        const response = await ghost.getSearchIndex();
        this.searchIndex = response.posts || [];
      } catch (err) {
        console.error('Failed to load search index', err);
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    },
    getRelativeTime(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
      
      const units = [
        { name: 'year', seconds: 31536000 },
        { name: 'month', seconds: 2592000 },
        { name: 'week', seconds: 604800 },
        { name: 'day', seconds: 86400 },
        { name: 'hour', seconds: 3600 },
        { name: 'minute', seconds: 60 },
        { name: 'second', seconds: 1 }
      ];

      for (const unit of units) {
        if (diffInSeconds >= unit.seconds) {
          const count = Math.floor(diffInSeconds / unit.seconds);
          return `${count} ${unit.name}${count !== 1 ? 's' : ''} ago`;
        }
      }
      return 'just now';
    },
    handleParallax() {
      const img = this.$refs.featuredImg;
      if (!img) return;
      // Simple scroll-based parallax: card is always near the top
      // so scrollY directly maps to upward image shift
      this.parallaxY = Math.min(window.scrollY * 0.08, 35);
    },
    trapFocus(e) {
      if (e.key !== 'Tab') return;
      const modal = this.$refs.tagsModal;
      if (!modal) return;
      const focusable = Array.from(modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )).filter(el => !el.disabled);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
  },
};
</script>

<style>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>








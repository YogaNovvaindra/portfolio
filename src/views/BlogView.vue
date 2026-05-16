<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 pt-24 max-w-7xl">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20 fadein-bot">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
      <div v-if="posts.length === 0" class="text-center py-20 fadein-bot">
        <p class="text-zinc-500">No posts found.</p>
      </div>

      <template v-else>
        <!-- Hero Section: Header + Featured Post -->
        <div class="flex flex-col xl:flex-row gap-12 xl:gap-8 mb-16 md:mb-24">
          <!-- Left Side: Header -->
          <div class="xl:w-5/12 flex flex-col justify-center text-left title-reveal">
            <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 drop-shadow-sm">
              Tech & <span class="text-blue-500">Explorations</span><span class="text-blue-500">.</span>
            </h1>
            <p class="text-lg text-zinc-400 leading-relaxed">
              A collection of field notes, documentation, and practical guides on whatever I'm currently building or learning.
            </p>
          </div>

          <!-- Right Side: Featured Post -->
          <div class="xl:w-7/12 fadein-bot" style="animation-delay: 100ms;" v-if="featuredPost">
            <article class="h-full group relative rounded-2xl border border-zinc-800/80 p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 overflow-hidden">
              <!-- Background Image & Overlay -->
              <div class="absolute inset-0 z-0">
                <img v-if="featuredPost.feature_image" :src="featuredPost.feature_image" alt="" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div v-else class="w-full h-full bg-zinc-900/80"></div>
                <!-- Dark Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-900/70"></div>
                <div class="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/40 backdrop-blur-none group-hover:backdrop-blur-sm transition-all duration-700"></div>
              </div>

              <!-- Content -->
              <div class="relative z-10">
                <div class="flex items-center gap-x-4 mb-4 text-sm">
                  <time :datetime="featuredPost.published_at" :title="formatDate(featuredPost.published_at)" class="text-zinc-400 cursor-help">
                    {{ getRelativeTime(featuredPost.published_at) }}
                  </time>
                  <span v-if="featuredPost.primary_tag" class="relative z-10 rounded-full bg-blue-500/20 px-4 py-1.5 font-medium text-blue-300 border border-blue-500/30 backdrop-blur-sm">
                    {{ featuredPost.primary_tag.name }}
                  </span>
                </div>
                <div class="group relative">
                  <h3 class="mt-4 text-3xl md:text-4xl font-semibold leading-tight text-white group-hover:text-blue-400 transition-colors">
                    <router-link :to="`/blog/${featuredPost.slug}`">
                      <span class="absolute inset-0"></span>
                      {{ featuredPost.title }}
                    </router-link>
                  </h3>
                  <p class="mt-6 text-base md:text-lg leading-relaxed text-zinc-300 line-clamp-4">
                    {{ featuredPost.custom_excerpt || featuredPost.excerpt }}
                  </p>
                </div>
              </div>

              <!-- Author -->
              <div class="relative z-10 mt-8 flex items-center gap-x-4">
                <img v-if="featuredPost.primary_author?.profile_image" :src="featuredPost.primary_author.profile_image" alt="" class="h-12 w-12 rounded-full bg-zinc-800 object-cover border border-zinc-700" />
                <div v-else class="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 text-blue-400 text-lg font-bold">
                  Y
                </div>
                <div class="text-base leading-6">
                  <p class="font-semibold text-white">
                    <span class="absolute inset-0"></span>
                    {{ featuredPost.primary_author?.name || 'Yoga Novaindra' }}
                  </p>
                  <p class="text-zinc-400">{{ featuredPost.reading_time || 3 }} min read</p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Blog Posts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" v-if="remainingPosts.length > 0">
          <article
            v-for="(post, index) in remainingPosts"
            :key="post.id"
            class="group relative flex flex-col items-start justify-between rounded-2xl border border-zinc-800/80 p-6 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 fadein-bot overflow-hidden min-h-[320px]"
            :style="{ animationDelay: `${(index + 2) * 100}ms` }"
          >
            <!-- Background Image & Overlay -->
            <div class="absolute inset-0 z-0">
              <img v-if="post.feature_image" :src="post.feature_image" alt="" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div v-else class="w-full h-full bg-zinc-900/80"></div>
              <!-- Dark Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-900/70"></div>
              <div class="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/40 backdrop-blur-none group-hover:backdrop-blur-sm transition-all duration-700"></div>
            </div>

            <!-- Content -->
            <div class="relative z-10 w-full">
              <div class="flex items-center gap-x-4 text-xs mb-4">
                <time :datetime="post.published_at" :title="formatDate(post.published_at)" class="text-zinc-400 cursor-help">
                  {{ getRelativeTime(post.published_at) }}
                </time>
                <span
                  v-if="post.primary_tag"
                  class="relative z-10 rounded-full bg-blue-500/20 px-3 py-1.5 font-medium text-blue-300 border border-blue-500/30 backdrop-blur-sm"
                >
                  {{ post.primary_tag.name }}
                </span>
              </div>
              <div class="group relative w-full">
                <h3 class="mt-3 text-xl font-semibold leading-6 text-white group-hover:text-blue-400 transition-colors">
                  <router-link :to="`/blog/${post.slug}`">
                    <span class="absolute inset-0"></span>
                    {{ post.title }}
                  </router-link>
                </h3>
                <p class="mt-4 text-sm leading-6 text-zinc-300 line-clamp-3">
                  {{ post.custom_excerpt || post.excerpt }}
                </p>
              </div>
            </div>
            
            <div class="relative z-10 mt-6 flex items-center gap-x-4 w-full">
              <img v-if="post.primary_author?.profile_image" :src="post.primary_author.profile_image" alt="" class="h-10 w-10 rounded-full bg-zinc-800 object-cover border border-zinc-700" />
              <div v-else class="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 text-blue-400 text-sm font-bold">
                Y
              </div>
              <div class="text-sm leading-6">
                <p class="font-semibold text-white">
                  <span class="absolute inset-0"></span>
                  {{ post.primary_author?.name || 'Yoga Novaindra' }}
                </p>
                <p class="text-zinc-400">{{ post.reading_time || 3 }} min read</p>
              </div>
            </div>
          </article>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import ghost from '@/services/ghost';

export default {
  name: 'BlogView',
  data() {
    return {
      posts: [],
      loading: true,
      error: null,
    };
  },
  computed: {
    featuredPost() {
      return this.posts.length > 0 ? this.posts[0] : null;
    },
    remainingPosts() {
      return this.posts.length > 1 ? this.posts.slice(1) : [];
    }
  },
  async created() {
    await this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await ghost.getPosts();
        this.posts = response.posts || [];
      } catch (err) {
        this.error = 'Failed to load blog posts. Ensure Ghost Content API Key is configured.';
        console.error(err);
      } finally {
        this.loading = false;
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
  },
};
</script>

<style scoped>
.fadein-bot {
  opacity: 0;
  animation: fadeInBot 0.5s ease-out forwards;
}

@keyframes fadeInBot {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
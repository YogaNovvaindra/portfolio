<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 pt-24 max-w-7xl">
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto mb-20 fadein-bot">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <span class="text-xs font-medium text-zinc-300 tracking-wide uppercase">Journal & Notes</span>
      </div>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
        Tech & <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Explorations</span>
      </h1>
      <p class="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
        A collection of field notes, documentation, and practical guides on whatever I'm currently building or learning.
      </p>
    </div>

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

    <!-- Empty State -->
    <div v-else-if="posts.length === 0" class="text-center py-20 fadein-bot">
      <p class="text-zinc-500">No posts found.</p>
    </div>

    <!-- Blog Posts Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article
        v-for="(post, index) in posts"
        :key="post.id"
        class="group relative flex flex-col items-start justify-between rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-6 transition-all duration-300 hover:bg-zinc-800/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 fadein-bot"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="flex items-center gap-x-4 text-xs mb-4">
          <time :datetime="post.published_at" class="text-zinc-500">
            {{ formatDate(post.published_at) }}
          </time>
          <span
            v-if="post.primary_tag"
            class="relative z-10 rounded-full bg-blue-500/10 px-3 py-1.5 font-medium text-blue-400 border border-blue-500/20"
          >
            {{ post.primary_tag.name }}
          </span>
        </div>
        <div class="group relative">
          <h3 class="mt-3 text-xl font-semibold leading-6 text-white group-hover:text-blue-400 transition-colors">
            <router-link :to="`/blog/${post.slug}`">
              <span class="absolute inset-0"></span>
              {{ post.title }}
            </router-link>
          </h3>
          <p class="mt-4 line-clamp-3 text-sm leading-6 text-zinc-400">
            {{ post.custom_excerpt || post.excerpt }}
          </p>
        </div>
        <div class="relative mt-6 flex items-center gap-x-4">
          <img v-if="post.feature_image" :src="post.feature_image" alt="" class="h-10 w-10 rounded-full bg-zinc-800 object-cover border border-zinc-700" />
          <div v-else class="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 text-blue-400 font-bold">
            Y
          </div>
          <div class="text-sm leading-6">
            <p class="font-semibold text-white">
              <span class="absolute inset-0"></span>
              {{ post.primary_author?.name || 'Yoga Novaindra' }}
            </p>
            <p class="text-zinc-500">{{ post.reading_time || 3 }} min read</p>
          </div>
        </div>
      </article>
    </div>
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
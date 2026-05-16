<template>
  <div class="min-h-screen bg-zinc-950">
    <!-- Full-Width Title Hero -->
    <header v-if="!loading && !error && post" class="relative w-full h-[50vh] md:h-[75vh] flex items-end justify-center overflow-hidden title-reveal">
      <!-- Background Image & Overlay -->
      <div class="absolute inset-0 z-0">
        <img v-if="post.feature_image" :src="post.feature_image" :alt="post.title" class="w-full h-full object-cover" />
        <div v-else class="w-full h-full bg-zinc-900/80"></div>
        <!-- Dark Gradient Overlay for Title -->
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent"></div>
      </div>

      <!-- Overlaid Title Only -->
      <div class="relative z-10 container mx-auto px-4 max-w-5xl text-center pb-12 md:pb-20">
        <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl">
          {{ post.title }}
        </h1>
      </div>
    </header>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 max-w-4xl">
      <!-- Back Button -->
      <div class="mb-12 fadein-bot text-center md:text-left">
        <router-link to="/blog" class="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-blue-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </router-link>
      </div>

      <!-- Loading/Error States -->
      <div v-if="loading" class="flex justify-center items-center py-32 fadein-bot">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      <div v-else-if="error" class="text-center py-20 fadein-bot">
        <div class="inline-block bg-red-500/10 border border-red-500/20 rounded-xl px-6 py-4">
          <p class="text-red-400">{{ error }}</p>
          <button @click="fetchPost" class="mt-4 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm font-medium">
            Try Again
          </button>
        </div>
      </div>

      <!-- Article Content -->
      <article v-else-if="post" class="fadein-bot">
        <!-- Post Meta Information Below Hero -->
        <div class="mb-16 text-left">
          <div class="flex items-center justify-start gap-4 text-sm font-medium mb-8">
            <span v-if="post.primary_tag" class="text-blue-400 uppercase tracking-widest text-xs">
              {{ post.primary_tag.name }}
            </span>
            <span class="text-zinc-700">|</span>
            <time :datetime="post.published_at" :title="formatDate(post.published_at)" class="text-zinc-500 uppercase tracking-widest text-xs cursor-help">
              {{ getRelativeTime(post.published_at) }}
            </time>
          </div>

          <p v-if="post.custom_excerpt || post.excerpt" class="text-xl md:text-2xl text-zinc-400 mb-10 leading-relaxed max-w-3xl italic">
            "{{ post.custom_excerpt || post.excerpt }}"
          </p>

          <div class="flex items-center gap-4">
            <img v-if="post.primary_author?.profile_image" :src="post.primary_author.profile_image" alt="" class="h-14 w-14 rounded-full object-cover border-2 border-zinc-800" />
            <div v-else class="h-14 w-14 rounded-full bg-blue-500/20 flex items-center justify-center border-2 border-blue-500/30 text-blue-400 font-bold text-xl">
              Y
            </div>
            <div class="text-left">
              <p class="font-medium text-white">{{ post.primary_author?.name || 'Yoga Novaindra' }}</p>
              <p class="text-xs text-zinc-600 uppercase tracking-widest mt-1">Author</p>
            </div>
          </div>
        </div>

        <!-- Article Body -->
        <div class="prose prose-invert prose-blue max-w-none prose-img:rounded-xl prose-img:border prose-img:border-zinc-800/80 prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800" v-html="post.html">
        </div>

        <!-- More Stories Navigation -->
        <div v-if="recentPosts.length > 0" class="mt-24 pt-16 border-t border-zinc-800/50 fadein-bot">
          <div class="flex items-center justify-between mb-10">
            <h2 class="text-2xl font-bold text-white tracking-tight">More from the blog</h2>
            <router-link to="/blog" class="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
              View all posts &rarr;
            </router-link>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <router-link 
              v-for="recent in recentPosts" 
              :key="recent.id" 
              :to="`/blog/${recent.slug}`"
              class="group block relative"
            >
              <div class="aspect-video rounded-2xl overflow-hidden mb-6 border border-zinc-800/50 bg-zinc-900/40 relative">
                <img :src="recent.feature_image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent"></div>
              </div>
              <h3 class="text-xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                {{ recent.title }}
              </h3>
              <p class="mt-3 text-sm text-zinc-500 line-clamp-2">
                {{ recent.custom_excerpt || recent.excerpt }}
              </p>
            </router-link>
          </div>
        </div>

        <!-- Article Footer -->
        <footer class="mt-24 pt-12 border-t border-zinc-900 text-center fadein-bot">
          <p class="text-zinc-600 text-sm flex items-center justify-center gap-2">
            <span>&copy; {{ new Date().getFullYear() }} Yoga Novaindra</span>
            <span class="text-zinc-800">•</span>
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
  </div>
</template>

<script>
import ghost from '@/services/ghost';

export default {
  name: 'ArticleView',
  data() {
    return {
      post: null,
      recentPosts: [],
      loading: true,
      error: null,
    };
  },
  watch: {
    '$route.params.slug': {
      handler: 'fetchPost',
      immediate: true
    }
  },
  methods: {
    async fetchPost() {
      this.loading = true;
      this.error = null;
      const slug = this.$route.params.slug;
      try {
        const [postResponse, postsResponse] = await Promise.all([
          ghost.getPostBySlug(slug),
          ghost.getPosts({ limit: 3 })
        ]);

        if (postResponse.posts && postResponse.posts.length > 0) {
          this.post = postResponse.posts[0];
          document.title = `${this.post.title} - Yoga Novaindra`;
          
          // Filter out current post from recent posts
          this.recentPosts = (postsResponse.posts || [])
            .filter(p => p.id !== this.post.id)
            .slice(0, 2);
        } else {
          this.error = 'Post not found.';
        }
      } catch (err) {
        this.error = 'Failed to load the article.';
        console.error(err);
      } finally {
        this.loading = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

<style>
/* Scoped isn't used here for the markdown body because v-html needs global styles to target the injected tags */
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

/* Enhancing the typography from Ghost HTML */
.prose {
  font-size: 1.1rem;
  line-height: 1.75;
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
  color: #a1a1aa; /* zinc-400 */
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
  color: #a1a1aa;
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
</style>
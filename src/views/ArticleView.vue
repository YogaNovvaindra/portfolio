<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 pt-24 max-w-4xl">
    <!-- Back Button -->
    <div class="mb-8 fadein-bot">
      <router-link to="/blog" class="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-blue-400 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Blog
      </router-link>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-32 fadein-bot">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <!-- Error State -->
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
      <!-- Article Header -->
      <header class="mb-12 text-center md:text-left">
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm mb-6">
          <time :datetime="post.published_at" class="text-zinc-400">
            {{ formatDate(post.published_at) }}
          </time>
          <span class="text-zinc-600">•</span>
          <span class="text-zinc-400">{{ post.reading_time || 3 }} min read</span>
          <span v-if="post.primary_tag" class="text-zinc-600">•</span>
          <span v-if="post.primary_tag" class="text-blue-400 font-medium bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
            {{ post.primary_tag.name }}
          </span>
        </div>
        
        <h1 class="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
          {{ post.title }}
        </h1>

        <p v-if="post.custom_excerpt || post.excerpt" class="text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed max-w-3xl mx-auto md:mx-0">
          {{ post.custom_excerpt || post.excerpt }}
        </p>

        <!-- Author Info -->
        <div class="flex items-center justify-center md:justify-start gap-4">
          <img v-if="post.primary_author?.profile_image" :src="post.primary_author.profile_image" alt="" class="h-12 w-12 rounded-full object-cover border-2 border-zinc-800" />
          <div v-else class="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center border-2 border-blue-500/30 text-blue-400 font-bold text-lg">
            Y
          </div>
          <div class="text-left">
            <p class="font-medium text-white">{{ post.primary_author?.name || 'Yoga Novaindra' }}</p>
            <p class="text-sm text-zinc-500">Author</p>
          </div>
        </div>
      </header>

      <!-- Feature Image -->
      <div v-if="post.feature_image" class="mb-12 rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl">
        <img :src="post.feature_image" :alt="post.title" class="w-full h-auto object-cover" />
      </div>

      <!-- Article Body -->
      <div class="prose prose-invert prose-blue max-w-none prose-img:rounded-xl prose-img:border prose-img:border-zinc-800/80 prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800" v-html="post.html">
      </div>
    </article>
  </div>
</template>

<script>
import ghost from '@/services/ghost';

export default {
  name: 'ArticleView',
  data() {
    return {
      post: null,
      loading: true,
      error: null,
    };
  },
  async created() {
    await this.fetchPost();
  },
  methods: {
    async fetchPost() {
      this.loading = true;
      this.error = null;
      const slug = this.$route.params.slug;
      try {
        const response = await ghost.getPostBySlug(slug);
        if (response.posts && response.posts.length > 0) {
          this.post = response.posts[0];
          document.title = `${this.post.title} - Yoga Novaindra`;
        } else {
          this.error = 'Post not found.';
        }
      } catch (err) {
        this.error = 'Failed to load the article.';
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
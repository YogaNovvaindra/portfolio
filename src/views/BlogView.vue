<template>
  <div class="min-h-screen py-24 px-4 md:px-8 relative">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 relative">
      <!-- Main Content -->
      <div class="w-full md:w-2/3">
        <div class="flex flex-col gap-6 animate-fade-up">
          <article v-for="article in articles" :key="article.id">
            <router-link :to="`/read/${article.slug}/${article.id}`" 
                         class="group flex w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 md:p-8 transition-all duration-300 hover:bg-white/[0.06] hover:border-custom-blue-500/30 backdrop-blur-xl shadow-lg hover:shadow-custom-blue-500/10 hover:translate-x-1 items-center gap-6">
              <div class="flex-1 min-w-0 pr-4">
                <div class="text-xs mb-3 text-custom-blue-400 font-mono flex items-center gap-2">
                  <span class="w-8 h-px bg-custom-blue-500/50"></span>
                  {{ article.date }}
                </div>
                <h3 class="text-lg md:text-xl text-white font-bold mb-3 group-hover:text-custom-blue-300 transition-colors paraf line-clamp-2">
                  {{ article.title }}
                </h3>
                <p class="text-gray-400 text-sm leading-relaxed paraf line-clamp-2 italic opacity-70 group-hover:opacity-100 transition-opacity">
                  {{ article.desc }}
                </p>
              </div>
              <div class="shrink-0 hidden sm:block">
                <div class="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border border-white/10 group-hover:border-custom-blue-500/30 transition-all duration-300">
                  <img :src="article.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Article Thumbnail">
                </div>
              </div>
            </router-link>
          </article>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="w-full md:w-1/3 animate-fade-up" style="animation-delay: 0.2s">
        <div class="md:sticky md:top-32 space-y-8">
          <!-- Glass Card Sidebar -->
          <div class="bg-white/[0.03] border border-white/[0.08] p-8 rounded-[2rem] backdrop-blur-xl shadow-2xl">
            <h2 class="text-xl font-bold text-white mb-6 font-display capitalize bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Sharing Experiences, Stories, & Knowledge
            </h2>
            <div class="w-12 h-1 bg-custom-blue-500 rounded-full mb-8"></div>
            
            <div class="space-y-6">
              <div>
                <div class="text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-50">Trending Topics</div>
                <div class="flex flex-wrap gap-2">
                  <span v-for="topic in ['NodeJS', 'Technology', 'DevOps', 'Security']" :key="topic"
                        class="py-2 px-4 rounded-xl bg-white/10 hover:bg-custom-blue-500/20 text-white border border-white/20 hover:border-custom-blue-500/40 text-xs font-bold cursor-pointer transition-all">
                    {{ topic }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
    
    <ArticleList class="mt-20 opacity-0 pointer-events-none" />
  </div>
</template>
  
<script>
import ArticleList from '@/components/ArticleList.vue';
import axios from "axios";
export default {
  name: 'BlogView',
  data() {
    return {
      articles: []
    }
  },
  components: {
    ArticleList
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    async getArticles() {
      axios.get('https://64a38c9cc3b509573b564183.mockapi.io/api/blog/all')
        .then(response => {
          this.articles = response.data;
        })
    },
  }
}
</script>

<style scoped>
.paraf {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.animate-fade-up {
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-pulse-slow {
    animation: pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse-glow {
    0%, 100% { opacity: 0.1; transform: scale(1); }
    50% { opacity: 0.2; transform: scale(1.05); }
}
</style>
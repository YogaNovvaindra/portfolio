<template>
  <div class="min-h-screen py-24 px-4 md:px-8 relative">
    <div class="max-w-4xl mx-auto h-full relative">
        <!-- Main Reader Card -->
        <article class="bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] p-8 md:p-16 backdrop-blur-2xl shadow-2xl animate-fade-up">
            <div class="space-y-8">
                <!-- Back Action -->
                <div>
                   <button @click="$router.back()" class="flex items-center gap-2 text-custom-blue-400 hover:text-custom-blue-200 transition-colors mb-8 font-mono text-xs uppercase tracking-widest font-bold group">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                     Back to Articles
                   </button>
                   <h1 class="text-3xl md:text-5xl text-white text-left font-bold leading-tight font-display drop-shadow-lg">{{ title }}</h1>
                   <div class="mt-6 text-left text-gray-500 text-xs font-mono flex items-center gap-4">
                     <span class="px-3 py-1 bg-white/5 border border-white/10 rounded-lg">REF_{{ $route.params.id }}</span>
                     <span class="opacity-60">Published: {{ date }}</span>
                   </div>
                </div>

                <div class="h-px w-32 bg-custom-blue-500 rounded-full opacity-50"></div>

                <!-- Hero Image -->
                <div class="relative w-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group bg-white/5">
                    <div class="relative" style="padding-top: 52%;">
                        <img :src="image" class="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Article Thumbnail">
                    </div>
                </div>

                <!-- Article Body -->
                <div class="text-left text-gray-400 mt-12 prose prose-invert max-w-none leading-relaxed text-base md:text-lg article-content prose-headings:text-white prose-strong:text-custom-blue-200 prose-a:text-custom-blue-400 hover:prose-a:text-custom-blue-300 transition-colors" v-html="content"></div>
                
                <!-- Footer Spacer -->
                <div class="pt-12 border-t border-white/5 mt-20 text-center">
                    <p class="text-gray-600 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">
                      End of Article
                    </p>
                </div>
            </div>
        </article>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
    name: 'ArticleView',
    data() {
        return {
            route: useRoute(),
            title: '',
            image: '',
            date: '',
            content: '',
        }
    },
    mounted() {
        this.getDetails();
    },
    methods: {
        async getDetails() {
            const id = this.route.params.id;
            axios.get('https://64a38c9cc3b509573b564183.mockapi.io/api/blog/all/' + id)
                .then(response => {
                    this.title = response.data.title;
                    this.image = response.data.image;
                    this.date = response.data.date;
                    this.content = response.data.content;
                })
        }
    }
}
</script>

<style scoped>
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

:deep(.article-content p) {
    margin-bottom: 1.5rem;
}
</style>
<script>
export default {
  name: 'BentoGrid',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getSpanClass(index) {
        // Create a bento-like irregular pattern
        // Pattern: Big list item every 4th item, or specific logic
        if (index === 0) return 'md:col-span-2 md:row-span-2';
        if (index === 3) return 'md:col-span-2';
        return 'col-span-1';
    }
  }
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="bento-card group relative overflow-hidden rounded-2xl border border-white/10 bg-glass-dark backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-custom-blue-500/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-custom-blue-500/10"
      :class="getSpanClass(index)"
      :style="{ animationDelay: `${index * 0.1}s` }"
    >
        <!-- Gradient Mesh Background (Subtle) -->
        <div class="absolute inset-0 opacity-20 bg-gradient-to-tr from-custom-blue-900/0 via-custom-blue-900/0 to-custom-blue-500/10 group-hover:opacity-40 transition-opacity duration-500"></div>
        
        <!-- Image Section -->
        <div class="relative h-48 md:h-full min-h-[200px] overflow-hidden">
            <!-- Stronger base gradient for readability on ALL backgrounds -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-100 z-10 transition-opacity duration-300 group-hover:opacity-90"></div>
            <img
              v-if="item.imageUrl"
              :src="'/img/portfolio-' + item.imageUrl + '.webp'" 
              :alt="item.name"
              loading="lazy"
              class="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 group-hover:contrast-125 group-hover:brightness-[0.25]"
              @error="$event.target.src = 'https://via.placeholder.com/800x600/1a1a1a/333333?text=Project'"
            />
            
            <!-- Featured Badge -->
             <div v-if="index === 0 || item.featured" class="absolute top-4 right-4 z-20">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-custom-blue-500/20 text-custom-blue-200 border border-custom-blue-500/20 backdrop-blur-sm">
                    Featured
                </span>
             </div>
        </div>

        <!-- Content Overlay -->
        <div class="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end h-full pointer-events-none text-left">
            <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 class="text-xl font-bold text-white font-display mb-2 drop-shadow-md">
                    {{ item.name }}
                </h3>
                <p class="text-sm text-gray-200 line-clamp-2 md:line-clamp-3 mb-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-75 font-medium drop-shadow-sm">
                    {{ item.status }}
                </p>
                
                <!-- Tech Stack Tags -->
                <div class="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pointer-events-auto">
                    <span v-for="tech in item.tech.split(',').slice(0, 3)" :key="tech" class="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-300">
                        {{ tech.trim() }}
                    </span>
                    <span v-if="item.tech.split(',').length > 3" class="text-[10px] px-1 text-gray-400">+{{ item.tech.split(',').length - 3 }}</span>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3 pt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 pointer-events-auto">
                     <a
                      v-if="item.github !== 'null'"
                      :href="item.github"
                      target="_blank"
                      class="flex-1 text-center py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      Code
                    </a>
                    <a
                      v-if="item.demo !== 'null'"
                      :href="item.demo"
                      target="_blank"
                      class="flex-1 text-center py-2 rounded-lg bg-custom-blue-600/80 hover:bg-custom-blue-500/80 text-xs font-mono text-white transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                      Live
                    </a>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.bento-card {
  animation: fadeUp 0.6s ease-out backwards;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}


</style>

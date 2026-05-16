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
        if (index === 0) return 'md:col-span-2 md:row-span-2';
        if (index === 3) return 'md:col-span-2';
        return 'col-span-1';
    }
  }
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="bento-card group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800/50"
      :class="getSpanClass(index)"
      :style="{ animationDelay: `${index * 0.1}s` }"
    >
        <!-- Image Section -->
        <div class="relative h-48 md:h-full min-h-[220px] overflow-hidden">
            <!-- Overlay to darken image behind text -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <img
              v-if="item.imageUrl"
              :src="'/img/portfolio-' + item.imageUrl + '.webp'" 
              :alt="item.name"
              loading="lazy"
              class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              @error="$event.target.src = 'https://placehold.co/800x600/111111/333333?text=' + item.name"
            />
            
            <!-- Featured Badge -->
            <div v-if="index === 0 || item.featured" class="absolute top-4 right-4 z-20">
                <span class="inline-flex items-center px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-[10px] font-semibold tracking-wider uppercase border border-blue-500/20">
                    Featured
                </span>
            </div>
        </div>

        <!-- Content Overlay -->
        <div class="absolute bottom-0 left-0 right-0 p-5 z-20 flex flex-col justify-end h-full pointer-events-none text-left">
            <div class="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <h3 class="text-xl font-bold text-white tracking-tight mb-1">
                    {{ item.name }}
                </h3>
                <p class="text-sm text-zinc-400 line-clamp-2 mb-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    {{ item.status }}
                </p>
                
                <!-- Tech Stack Tags -->
                <div class="flex flex-wrap gap-1.5 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pointer-events-auto">
                    <span v-for="tech in item.tech.split(',').slice(0, 3)" :key="tech" class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-400">
                        {{ tech.trim() }}
                    </span>
                    <span v-if="item.tech.split(',').length > 3" class="text-[10px] px-1 font-mono text-zinc-500">+{{ item.tech.split(',').length - 3 }}</span>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-2 pt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 pointer-events-auto">
                    <a
                      v-if="item.demo !== 'null'"
                      :href="item.demo"
                      target="_blank"
                      class="flex-1 text-center py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-[11px] font-semibold text-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                      Live
                    </a>
                    <a
                      v-if="item.github !== 'null'"
                      :href="item.github"
                      target="_blank"
                      class="flex-1 text-center py-2 rounded-md bg-transparent border border-zinc-700 hover:bg-zinc-800 text-[11px] font-semibold text-zinc-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      Code
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

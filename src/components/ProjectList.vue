<script>
export default {
  name: 'ProjectList',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <div class="flex flex-col gap-16 md:gap-24">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="project-card group relative flex flex-col md:flex-row gap-8 md:gap-12 items-center"
      :class="{ 'md:flex-row-reverse': index % 2 !== 0 }"
    >
      <!-- Blurry Glow behind -->
      <div 
        class="absolute -inset-4 bg-custom-blue-500/10 blur-[80px] rounded-[30%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
        :class="index % 2 === 0 ? 'right-0' : 'left-0'"
      ></div>

      <!-- Image Section -->
      <div 
        class="w-full md:w-1/2 relative group/image perspective cursor-pointer"
        @click="$emit('select', item)"
      >
        <div class="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl bg-white/[0.02] transform transition-all duration-500 group-hover/image:scale-[1.02] group-hover/image:border-custom-blue-500/30 backdrop-blur-sm">
             <div class="aspect-video w-full overflow-hidden">
                <img
                    v-if="item.imageUrl"
                    :src="'/img/portfolio-' + item.imageUrl + '.webp'" 
                    :alt="item.name"
                    loading="lazy"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                    @error="$event.target.src = 'https://via.placeholder.com/800x600/1a1a1a/333333?text=Project'"
                />
             </div>
             
             <!-- Overlay on Image (Subtle) -->
             <div class="absolute inset-0 bg-black/0 group-hover/image:bg-custom-blue-500/10 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover/image:opacity-100">
                <span class="bg-black/60 backdrop-blur-xl border border-white/10 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-2xl transform translate-y-4 group-hover/image:translate-y-0 transition-all duration-500">
                  View Project
                </span>
             </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="w-full md:w-1/2 text-left space-y-4">
        <h3 
            class="text-3xl font-bold text-white font-display group-hover:text-custom-blue-300 transition-colors cursor-pointer"
            @click="$emit('select', item)"
        >
            {{ item.name }}
        </h3>
        
        <div class="flex flex-wrap gap-2">
             <span v-for="tech in item.tech.split(',')" :key="tech" 
                   class="text-[11px] font-mono font-medium px-3 py-1 rounded-lg bg-white/5 text-gray-400 border border-white/10 hover:border-custom-blue-500/50 transition-all cursor-default">
                {{ tech.trim() }}
            </span>
        </div>

        <p class="text-gray-400 leading-relaxed text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity">
            {{ item.status }}
        </p>

        <!-- Actions -->
        <div class="pt-4 flex items-center gap-6">
            <a
                v-if="item.github !== 'null'"
                :href="item.github"
                target="_blank"
                class="flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-custom-blue-300 transition-all duration-300 group/link"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-70 group-hover/link:opacity-100 transition-all"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                Github
            </a>
            <a
                v-if="item.demo !== 'null'"
                :href="item.demo"
                target="_blank"
                class="flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-emerald-400 transition-all duration-300 group/link"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-70 group-hover/link:opacity-100 transition-all"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Live Demo
            </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective {
    perspective: 1000px;
}
/* Optional simple fade in if intersection observer isn't setup globally, mostly for initial load */
.project-card {
  animation: fadeUp 0.8s ease-out backwards;
}
@keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>

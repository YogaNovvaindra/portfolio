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
  <div class="flex flex-col gap-20 md:gap-28">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="project-row group relative flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center"
      :class="{ 'md:flex-row-reverse': index % 2 !== 0 }"
    >
      <!-- Image Section -->
      <div
        class="w-full md:w-1/2 relative cursor-pointer"
        @click="$emit('select', item)"
      >
        <div class="relative rounded-xl overflow-hidden ring-1 ring-white/8 shadow-2xl bg-zinc-900">
          <div class="aspect-video w-full overflow-hidden">
            <img
              v-if="item.imageUrl"
              :src="'/img/portfolio-' + item.imageUrl + '.webp'"
              :alt="item.name"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              @error="$event.target.src = 'https://placehold.co/800x450/111111/333333?text=' + item.name"
            />
          </div>
          <!-- View overlay -->
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span class="bg-zinc-900/90 border border-zinc-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-xl">
              View Details
            </span>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="w-full md:w-1/2 text-left space-y-4" :class="{ 'md:text-right': index % 2 !== 0 }">
        <!-- Project number -->
        <p class="text-[11px] font-mono text-zinc-600 uppercase tracking-widest">
          {{ String(index + 1).padStart(2, '0') }}
        </p>

        <h3
          class="text-2xl md:text-3xl font-bold text-white tracking-tight cursor-pointer hover:text-blue-300 transition-colors"
          @click="$emit('select', item)"
        >
          {{ item.name }}
        </h3>

        <p class="text-zinc-500 leading-relaxed text-sm md:text-base">
          {{ item.status }}
        </p>

        <!-- Tech stack -->
        <div class="flex flex-wrap gap-1.5" :class="{ 'md:justify-end': index % 2 !== 0 }">
          <span
            v-for="tech in item.tech.split(',')"
            :key="tech"
            class="text-[11px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded"
          >
            {{ tech.trim() }}
          </span>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4 pt-2" :class="{ 'md:justify-end': index % 2 !== 0 }">
          <button
            @click="$emit('select', item)"
            class="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1.5"
          >
            Details
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <a
            v-if="item.github !== 'null'"
            :href="item.github"
            target="_blank"
            class="text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors inline-flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            Code
          </a>
          <a
            v-if="item.demo !== 'null'"
            :href="item.demo"
            target="_blank"
            class="text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors inline-flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Live
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-row {
  animation: fadeUpRow 0.6s ease-out backwards;
}
@keyframes fadeUpRow {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>

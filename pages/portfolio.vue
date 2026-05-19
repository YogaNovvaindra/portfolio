<template>
  <div class="min-h-screen py-24 px-4 md:px-8 relative">

    <div class="max-w-6xl mx-auto h-full relative">
        <!-- Header -->
        <div class="mb-12 text-left title-reveal">
          <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5 drop-shadow-sm">
            Featured <span class="text-blue-500">Projects</span><span class="text-blue-500">.</span>
          </h1>
          <p class="text-zinc-400 max-w-2xl text-lg md:text-xl leading-relaxed">
            A collection of <span class="text-zinc-200 font-medium">infrastructure</span>, <span class="text-zinc-200 font-medium">automation</span>, and <span class="text-zinc-200 font-medium">full-stack</span> projects I've built.
          </p>
        </div>

        <!-- Category Filter Pills -->
        <div class="flex flex-wrap gap-2 mb-12 title-reveal" style="animation-delay: 0.05s">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            :class="[
              'h-9 md:h-7 px-4 inline-flex items-center justify-center text-xs font-medium rounded-full border transition-all duration-200',
              activeCategory === cat
                ? 'bg-blue-500/15 border-blue-500/50 text-blue-400'
                : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'
            ]"
          >
            {{ cat }}
          </button>
        </div>

        <!-- List Component -->
        <ProjectList
            v-if="filteredProjects.length"
            :items="filteredProjects"
            class="title-reveal"
            style="animation-delay: 0.1s"
            @select="openModal"
        />

        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-28 text-center title-reveal" style="animation-delay: 0.1s">
          <div class="w-14 h-14 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex items-center justify-center mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-600"><path d="M3 7h18M3 12h18M3 17h9"/></svg>
          </div>
          <p class="text-zinc-500 text-sm">No projects in this category yet.</p>
        </div>
    </div>

    <!-- Modal -->
    <ProjectModal
        :is-open="isModalOpen"
        :project="selectedProject"
        @close="closeModal"
    />
  </div>
</template>

<script setup>
import rawData from '~/assets/data.json'

useSeoMeta({
  title: 'Portfolio — Yoga Novaindra',
  description: 'A collection of infrastructure, automation, and full-stack projects built by Yoga Novaindra — Kubernetes, GitOps, security, and more.',
  ogTitle: 'Portfolio — Yoga Novaindra',
  ogDescription: 'A collection of infrastructure, automation, and full-stack projects built by Yoga Novaindra.',
  ogUrl: 'https://yoganova.my.id/portfolio',
})

const portfolio = rawData.portfolio
const isModalOpen = ref(false)
const selectedProject = ref({})
const activeCategory = ref('All')

const categories = computed(() => {
  return ['All', ...new Set(portfolio.map(p => p.category).filter(Boolean))]
})

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') return portfolio
  return portfolio.filter(p => p.category === activeCategory.value)
})

function openModal(project) {
  selectedProject.value = project
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  isModalOpen.value = false
  document.body.style.overflow = ''
  setTimeout(() => {
    selectedProject.value = {}
  }, 300)
}
</script>

<style scoped>
.animate-pulse-slow {
    animation: pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse-glow {
    0%, 100% { opacity: 0.1; transform: scale(1); }
    50%      { opacity: 0.2; transform: scale(1.05); }
}
</style>

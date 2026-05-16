<script>
import data from '@/assets/data.json';
import ProjectList from '@/components/ProjectList.vue';
import ProjectModal from '@/components/ProjectModal.vue';

export default {
    name: 'PortfolioView',
    components: {
        ProjectList,
        ProjectModal,
    },
    data() {
        return {
            portfolio: data.portfolio,
            isModalOpen: false,
            selectedProject: {},
        };
    },
    methods: {
        openModal(project) {
            this.selectedProject = project;
            this.isModalOpen = true;
            document.body.style.overflow = 'hidden';
        },
        closeModal() {
            this.isModalOpen = false;
            document.body.style.overflow = '';
            setTimeout(() => {
                this.selectedProject = {};
            }, 300);
        }
    }
};
</script>

<template>
  <div class="min-h-screen py-24 px-4 md:px-8 relative">

    <div class="max-w-6xl mx-auto h-full relative">
        <!-- Header -->
        <div class="mb-16 text-left title-reveal">
          <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5 drop-shadow-sm">
            Featured <span class="text-blue-500">Projects</span><span class="text-blue-500">.</span>
          </h1>
          <p class="text-zinc-400 max-w-2xl text-lg md:text-xl leading-relaxed">
            A collection of <span class="text-zinc-200 font-medium">infrastructure</span>, <span class="text-zinc-200 font-medium">automation</span>, and <span class="text-zinc-200 font-medium">full-stack</span> projects I've built.
          </p>
        </div>

        <!-- List Component -->
        <ProjectList 
            :items="portfolio" 
            class="title-reveal" 
            style="animation-delay: 0.1s"
            @select="openModal"
        />
    </div>

    <!-- Modal -->
    <ProjectModal 
        :is-open="isModalOpen" 
        :project="selectedProject" 
        @close="closeModal" 
    />
  </div>
</template>

<style scoped>

.animate-pulse-slow {
    animation: pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-glow {
    0%, 100% {
        opacity: 0.1;
        transform: scale(1);
    }
    50% {
        opacity: 0.2;
        transform: scale(1.05);
    }
}
</style>
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
        <div class="mb-20 text-center animate-fade-up">
              <h2 class="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-custom-blue-200 to-purple-300 font-display mb-6">
                  Selected Works
              </h2>
              <p class="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed italic opacity-80">
                  A curation of infrastructure, automation, and full-stack protocol developments.
              </p>
              <div class="mt-8 flex justify-center">
                <div class="w-12 h-1 bg-custom-blue-500 rounded-full"></div>
              </div>
        </div>

        <!-- List Component -->
        <ProjectList 
            :items="portfolio" 
            class="animate-fade-up" 
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
.animate-fade-up {
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes fadeUp {
    from { 
        opacity: 0; 
        transform: translateY(30px);
    }
    to { 
        opacity: 1; 
        transform: translateY(0);
    }
}

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
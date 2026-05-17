<script>
export default {
  name: 'ProjectModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    project: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['close'],
  mounted() {
    document.addEventListener('keydown', this.handleKeydown);
  },
  unmounted() {
    document.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    close() {
      this.$emit('close');
    },
    handleKeydown(e) {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    },
  },
};
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-md transition-opacity duration-300" @click="close"></div>

      <!-- Modal Content -->
      <div class="relative w-full max-w-5xl bg-zinc-900/90 border border-zinc-700/50 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] modal-container">
        
        <!-- Close Button -->
        <button 
            @click="close"
            aria-label="Close project modal"
            class="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 rounded-full bg-black/40 md:bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors border border-white/5 md:border-zinc-700 backdrop-blur-md"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <!-- Image Side -->
        <div class="w-full md:w-1/2 h-64 md:h-auto relative bg-zinc-950 overflow-hidden">
            <img
                v-if="project.imageUrl"
                :src="'/img/portfolio-' + project.imageUrl + '.webp'" 
                :alt="project.name"
                class="w-full h-full object-cover"
                @error="$event.target.src = 'https://placehold.co/800x600/111111/333333?text=' + project.name"
            />
            <!-- Gradient overlay for mobile text readability -->
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:hidden"></div>
        </div>

        <!-- Content Side -->
        <div class="w-full md:w-1/2 flex flex-col relative bg-zinc-900">
            <div class="p-8 md:p-10 overflow-y-auto custom-scrollbar flex-1 space-y-8">
                <!-- Header -->
                <div>
                  <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">{{ project.name }}</h2>
                  <div class="flex flex-wrap gap-2">
                      <span v-for="tech in (project.tech ? project.tech.split(',') : [])" :key="tech" 
                            class="text-[11px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded">
                          {{ tech.trim() }}
                      </span>
                  </div>
                </div>

                <!-- Body -->
                <div class="space-y-6 text-zinc-400 leading-relaxed text-sm md:text-base">
                    <p>{{ project.description || project.status }}</p>
                    
                    <div class="bg-zinc-950/50 rounded-xl p-5 border border-zinc-800/80" v-if="project.key_feature">
                        <h4 class="text-blue-400 font-semibold text-xs uppercase tracking-wider mb-2">Key Feature</h4>
                        <p class="text-zinc-300 text-sm leading-relaxed">{{ project.key_feature }}</p>
                    </div>
                </div>

                <!-- Footer Actions -->
                <div class="pt-6 mt-auto border-t border-zinc-800 flex flex-col sm:flex-row gap-3">
                    <a
                        v-if="project.demo"
                        :href="project.demo"
                        target="_blank"
                        aria-label="View live demo"
                        class="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-center text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                        Live Demo
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                    <a
                        v-if="project.github"
                        :href="project.github"
                        target="_blank"
                        aria-label="View source code on GitHub"
                        class="flex-1 py-3 px-4 bg-transparent hover:bg-zinc-800 border border-zinc-700 rounded-lg text-center text-zinc-300 hover:text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        View Code
                    </a>
                </div>
            </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.96) translateY(20px);
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #3f3f46;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #52525b;
}
</style>

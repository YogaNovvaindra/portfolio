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
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/40 backdrop-blur-xl transition-opacity duration-500" @click="close"></div>

      <!-- Modal Content -->
      <div class="relative w-full max-w-5xl bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] shadow-[0_32px_128px_-12px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] backdrop-blur-2xl modal-container group">
        
        <!-- Close Button -->
        <button 
            @click="close" 
            class="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-all duration-300 border border-white/10"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <!-- Image Side (Left/Top) -->
        <div class="w-full md:w-3/5 h-64 md:h-auto relative bg-black/20 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden z-10"></div>
            <!-- Dynamic Glow Layer -->
            <div class="absolute -inset-20 bg-custom-blue-500/10 blur-[100px] rounded-full mix-blend-screen opacity-50 z-0"></div>

            <img
                v-if="project.imageUrl"
                :src="'/img/portfolio-' + project.imageUrl + '.webp'" 
                :alt="project.name"
                class="w-full h-full object-cover relative z-10 hover:scale-105 transition-transform duration-700"
                @error="$event.target.src = 'https://via.placeholder.com/800x600/1a1a1a/333333?text=Project'"
            />
        </div>

        <!-- Content Side (Right/Bottom) -->
        <div class="w-full md:w-2/5 flex flex-col relative bg-black/60 backdrop-blur-3xl">
            <div class="p-10 md:p-12 overflow-y-auto custom-scrollbar flex-1 space-y-8">
                <div>
                  <h2 class="text-3xl font-bold text-white font-display mb-3 drop-shadow-lg">{{ project.name }}</h2>
                  <div class="w-12 h-1 bg-custom-blue-500 rounded-full"></div>
                </div>
                
                <div class="flex flex-wrap gap-2">
                    <span v-for="tech in (project.tech ? project.tech.split(',') : [])" :key="tech" 
                          class="text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 border border-white/10 hover:border-custom-blue-500/50 transition-all cursor-default">
                        {{ tech.trim() }}
                    </span>
                </div>

                <div class="space-y-6 text-gray-200 leading-relaxed text-sm">
                    <p class="opacity-90">{{ project.status }}</p>
                    
                    <div class="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4" v-if="project.key_feature">
                         <div>
                            <h4 class="text-custom-blue-400 font-bold text-xs uppercase tracking-widest mb-2 opacity-80 font-mono">Key Feature</h4>
                            <p class="text-sm text-gray-100 leading-normal">{{ project.key_feature }}</p>
                         </div>
                    </div>
                </div>

                <div class="pt-6 border-t border-white/5 flex flex-col gap-3">
                    <a
                        v-if="project.github !== 'null'"
                        :href="project.github"
                        target="_blank"
                        class="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-center text-white font-bold transition-all flex items-center justify-center gap-3 group/btn shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-70 group-hover/btn:scale-110 transition-transform"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        View Code
                    </a>
                    <a
                        v-if="project.demo !== 'null'"
                        :href="project.demo"
                        target="_blank"
                        class="w-full py-4 bg-custom-blue-500/10 hover:bg-custom-blue-500/20 border border-custom-blue-500/30 rounded-2xl text-center text-custom-blue-200 font-bold transition-all shadow-xl shadow-custom-blue-900/20 flex items-center justify-center gap-3 group/btn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-70 group-hover/btn:scale-110 transition-transform"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        Live Demo
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
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9) translateY(40px);
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
</style>

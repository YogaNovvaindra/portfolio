<script>
export default {
  name: 'ProjectIDE',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeId: null,
    };
  },
  computed: {
    activeProject() {
      return this.items.find(p => p.id === this.activeId) || this.items[0];
    },
    files() {
      return this.items.map(p => ({
        ...p,
        filename: p.name.toLowerCase().replace(/[^a-z0-9]/g, '_') + this.getFileExtension(p.tech)
      }));
    }
  },
  mounted() {
    if (this.items.length > 0) {
      this.activeId = this.items[0].id;
    }
  },
  methods: {
    setActive(id) {
      this.activeId = id;
    },
    getFileExtension(tech) {
      if (!tech) return '.txt';
      const t = tech.toLowerCase();
      if (t.includes('vue')) return '.vue';
      if (t.includes('react')) return '.jsx';
      if (t.includes('python') || t.includes('django') || t.includes('flask')) return '.py';
      if (t.includes('javascript') || t.includes('node')) return '.js';
      if (t.includes('typescript')) return '.ts';
      if (t.includes('kubernetes') || t.includes('docker')) return '.yaml';
      return '.md';
    },
    getTechIcon(tech) {
        // Simple mapping for file icons
        const ext = this.getFileExtension(tech);
        if (ext === '.vue') return 'text-green-400';
        if (ext === '.js' || ext === '.jsx') return 'text-yellow-400';
        if (ext === '.ts') return 'text-blue-400';
        if (ext === '.py') return 'text-blue-300';
        if (ext === '.yaml') return 'text-red-400';
        return 'text-gray-400';
    }
  }
};
</script>

<template>
  <div class="project-ide w-full h-[80vh] min-h-[600px] flex flex-col md:flex-row bg-[#080808]/60 backdrop-blur-2xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl relative">
    
    <!-- Sidebar (Explorer) -->
    <div class="sidebar w-full md:w-64 bg-white/[0.02] border-r border-white/[0.08] flex flex-col shrink-0">
        <div class="p-4 text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase pl-6 opacity-60">Explorer</div>
        <div class="flex-1 overflow-y-auto custom-scrollbar">
            <!-- Project Folder -->
            <div class="px-3 pb-4">
                <div class="flex items-center text-gray-400 text-sm py-2 px-3 cursor-pointer hover:text-white group transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2 transition-transform group-hover:rotate-90 text-custom-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z"></path></svg>
                    <span class="font-bold tracking-tight text-white/70">projects</span>
                </div>
                
                <!-- File List -->
                <div class="ml-5 border-l border-white/5 pl-2 space-y-1 mt-1">
                    <div 
                        v-for="file in files" 
                        :key="file.id"
                        @click="setActive(file.id)"
                        class="flex items-center py-2 px-3 text-sm cursor-pointer transition-all rounded-xl group/file"
                        :class="activeId === file.id ? 'bg-custom-blue-500/10 text-white border border-custom-blue-500/20' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent'"
                    >
                        <!-- File Icon -->
                        <span class="mr-3 font-mono text-[10px] font-bold uppercase tracking-tighter w-8 text-right block" :class="getTechIcon(file.tech)">
                            {{ getFileExtension(file.tech).substring(1) }}
                        </span>
                        <span class="truncate font-mono text-xs opacity-80 group-hover/file:opacity-100">{{ file.filename }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Editor Area -->
    <div class="flex-1 flex flex-col min-w-0 bg-transparent">
        
        <!-- Tab Bar -->
        <div class="h-12 bg-white/[0.02] flex items-center overflow-x-auto text-sm border-b border-white/[0.08] scrollbar-hide">
             <div class="flex items-center px-6 h-full bg-white/[0.04] border-t-2 border-custom-blue-500 text-white min-w-fit pr-12 relative group cursor-pointer shadow-xl">
                <span class="mr-3 font-mono text-[10px] font-bold uppercase" :class="getTechIcon(activeProject?.tech)">
                    {{ getFileExtension(activeProject?.tech).substring(1) }}
                </span>
                <span class="font-mono text-xs tracking-tight">{{ files.find(f => f.id === activeId)?.filename || 'initializing...' }}</span>
                <span class="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-white transition-opacity">×</span>
             </div>
        </div>

        <!-- Breadcrumbs -->
        <div class="h-10 flex items-center px-6 text-[10px] text-gray-500 bg-black/20 border-b border-white/[0.04] font-mono tracking-widest uppercase opacity-60">
            src > {{ files.find(f => f.id === activeId)?.filename }} > readme.md
        </div>

        <!-- Content Split -->
        <div class="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative">
            <div v-if="activeProject" class="max-w-4xl mx-auto space-y-10 animate-fade-in">
                
                <!-- Hero Image (Preview) -->
                <div class="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/[0.08] shadow-2xl group bg-black/40">
                     <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity group-hover:opacity-40"></div>
                     <!-- Subtle Glow -->
                     <div class="absolute -inset-20 bg-custom-blue-500/10 blur-[100px] rounded-full mix-blend-screen opacity-30 z-0"></div>

                     <img 
                        :src="'/img/portfolio-' + activeProject.imageUrl + '.webp'" 
                        :alt="activeProject.name"
                        class="w-full h-full object-cover object-top transition-all duration-1000 group-hover:scale-105"
                        @error="$event.target.src = 'https://via.placeholder.com/800x600/1a1a1a/333333?text=Preview'"
                     />
                     <!-- Overlay Title -->
                     <div class="absolute bottom-0 left-0 p-8 z-20">
                        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4 font-display drop-shadow-2xl">{{ activeProject.name }}</h1>
                        <div class="flex flex-wrap gap-2">
                             <span v-for="tech in activeProject.tech.split(',')" :key="tech" 
                                   class="text-[10px] font-mono font-medium px-2.5 py-1 rounded-md bg-white/10 text-gray-300 border border-white/10 hover:border-custom-blue-500/30 hover:text-custom-blue-200 transition-all cursor-default">
                                {{ tech.trim() }}
                            </span>
                        </div>
                     </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <!-- Left: Description -->
                    <div class="lg:col-span-2 space-y-6">
                        <div class="flex items-center gap-3 border-b border-white/[0.08] pb-4">
                          <h2 class="text-xs font-bold text-custom-blue-400 font-mono tracking-[0.2em] uppercase opacity-80">Documentation</h2>
                        </div>
                        <div class="text-gray-300 leading-relaxed text-base font-sans space-y-6">
                            <p class="opacity-90">{{ activeProject.status }}</p>
                            
                            <div class="bg-black/40 p-6 rounded-2xl border border-white/[0.08] font-mono text-[11px] text-custom-blue-300/90 leading-loose shadow-inner relative overflow-hidden group/console">
                                <div class="absolute top-0 right-0 p-2 opacity-0 group-hover/console:opacity-100 transition-opacity">
                                  <span class="text-[10px] bg-white/5 border border-white/10 rounded px-2 py-1 text-gray-500">Read Only</span>
                                </div>
                                <span class="text-gray-600">$</span> npm start<br>
                                <span class="text-emerald-500/60 font-bold">> [SUCCESS] project_initialized</span><br>
                                <span class="text-custom-blue-400/60">> Trace: node_session active</span>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Actions -->
                    <div class="space-y-6">
                        <div class="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                            <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 opacity-50">Project Links</h3>
                            <div class="space-y-3">
                                <a v-if="activeProject.github !== 'null'" :href="activeProject.github" target="_blank" class="flex items-center w-full p-3 rounded-xl hover:bg-white/5 transition-all text-sm text-gray-300 font-bold border border-transparent hover:border-white/10 group/item">
                                    <svg class="w-4 h-4 mr-3 opacity-50 group-hover/item:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                    View Github
                                </a>
                                <a v-if="activeProject.demo !== 'null'" :href="activeProject.demo" target="_blank" class="flex items-center w-full p-3 rounded-xl bg-custom-blue-500/10 hover:bg-custom-blue-500/20 transition-all text-sm text-custom-blue-300 font-bold border border-custom-blue-500/20 group/item">
                                    <svg class="w-4 h-4 mr-3 opacity-70 group-hover/item:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                    Live Demo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
  background-color: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.animate-fade-in {
    animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.98) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>

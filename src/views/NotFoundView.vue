<template>
  <div class="h-[calc(100vh-120px)] md:h-[calc(100vh-100px)] flex items-center justify-center p-6 relative overflow-hidden">
    <!-- Background Decor -->
    <div class="fixed inset-0 pointer-events-none -z-10">
      <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-custom-blue-900/10 blur-[150px] rounded-full mix-blend-screen animate-pulse-slow"></div>
      <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full mix-blend-screen animate-pulse-slow" style="animation-delay: -1.5s"></div>
    </div>

    <!-- Main Glass Card -->
    <main class="relative z-10 max-w-2xl w-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-8 md:p-16 rounded-[2.5rem] shadow-2xl text-center animate-fade-up">
      
      <!-- Hacker Subtext -->
      <div class="mb-6 font-mono text-sm text-custom-blue-300/60 tracking-widest uppercase animate-pulse">
        [ Error: Route_Trace_Lost ]
      </div>

      <!-- Large 404 -->
      <h1 class="text-8xl md:text-[12rem] font-bold leading-none mb-4">
        <span class="text-transparent bg-clip-text bg-gradient-to-br from-white via-custom-blue-200 to-purple-400 drop-shadow-2xl font-display">
          404
        </span>
      </h1>

      <!-- Message Section -->
      <div class="space-y-4 mb-12">
        <h2 class="text-2xl md:text-3xl font-bold text-white font-display">
          Node Connection Failed
        </h2>
        <p class="text-gray-400 leading-relaxed max-w-md mx-auto">
          The infrastructure piece you are looking for has been relocated or is currently unreachable from your gateway.
        </p>
      </div>

      <!-- Navigation Actions -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <router-link to="/" class="group relative px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold transition-all duration-300 hover:bg-custom-blue-500/10 hover:border-custom-blue-500/30 overflow-hidden shadow-lg">
          <div class="absolute inset-0 bg-gradient-to-r from-custom-blue-500/0 via-custom-blue-500/5 to-custom-blue-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <span class="relative flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Return to Base
          </span>
        </router-link>

        <router-link to="/portfolio" class="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 font-bold transition-all duration-300 hover:text-white hover:border-white/20">
          Re-trace Works
        </router-link>
      </div>
    </main>

    <!-- Floating Data Nodes -->
    <div class="absolute inset-0 pointer-events-none opacity-20">
      <div v-for="i in 12" :key="i" 
           class="absolute w-1 h-1 bg-custom-blue-400 rounded-full animate-pulse-slow"
           :style="{
             top: `${Math.random() * 80 + 10}%`,
             left: `${Math.random() * 80 + 10}%`,
             animationDelay: `${Math.random() * 5}s`
           }">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>

<style scoped>
.animate-fade-up {
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes fadeUp {
    from { 
        opacity: 0; 
        transform: translateY(30px) scale(0.95);
    }
    to { 
        opacity: 1; 
        transform: translateY(0) scale(1);
    }
}

.animate-pulse-slow {
    animation: pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-glow {
    0%, 100% { opacity: 0.1; transform: scale(1); }
    50% { opacity: 0.2; transform: scale(1.1); }
}
</style>
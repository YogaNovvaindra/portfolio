<template>
  <div class="min-h-[calc(100vh-120px)] flex items-center justify-center px-6 py-16 relative overflow-hidden">

    <main class="flex flex-col items-center text-center max-w-2xl mx-auto w-full title-reveal">
      
      <!-- 404 Badge -->
      <div class="inline-flex items-center gap-2 text-sm font-mono text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full mb-8">
        <span class="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
        Error 404
      </div>

      <!-- Heading -->
      <h1 class="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-sm mb-6">
        Page not found<span class="text-blue-500">.</span>
      </h1>

      <!-- Description -->
      <p class="text-zinc-400 leading-relaxed text-base md:text-lg max-w-md mx-auto mb-10">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto">
        <button
          @click="$router.back()"
          class="px-6 py-3 bg-transparent border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-semibold rounded-lg transition-colors duration-200 text-center flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Go Back
        </button>
        <router-link
          to="/"
          class="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold rounded-lg transition-colors duration-200 text-center shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2"
        >
          Return Home
        </router-link>
      </div>
      
    </main>
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
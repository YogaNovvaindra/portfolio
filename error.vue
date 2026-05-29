<template>
  <!-- Clean minimal background -->
  <div class="fixed inset-0 -z-20 bg-[#0a0a0a] pointer-events-none"></div>
  <!-- Single restrained accent — top right only -->
  <div class="fixed top-[-10%] right-[-10%] -z-10 pointer-events-none w-[500px] h-[500px] bg-blue-600/[0.07] blur-[130px] rounded-full"></div>
  <!-- Bottom left subtle warmth -->
  <div class="fixed bottom-[-15%] left-[-10%] -z-10 pointer-events-none w-[400px] h-[400px] bg-blue-800/[0.05] blur-[120px] rounded-full"></div>

  <div class="min-h-screen flex items-center justify-center px-6 py-16">
    <div class="text-center max-w-2xl mx-auto space-y-8 title-reveal">
      
      <!-- 404 or Error Code -->
      <div class="space-y-4">
        <h1 class="text-7xl md:text-9xl font-bold text-white tracking-tight drop-shadow-sm font-mono">
          {{ error.statusCode }}<span class="text-blue-500">.</span>
        </h1>
        <p class="text-xl md:text-2xl font-medium text-zinc-300">
          {{ error.statusCode === 404 ? 'Page not found' : error.statusMessage || 'An error occurred' }}
        </p>
      </div>

      <!-- Detail message -->
      <p class="text-zinc-500 max-w-md mx-auto leading-relaxed">
        {{ error.statusCode === 404 
           ? "We couldn't find the page you were looking for. It might have been moved or deleted." 
           : "Something went wrong. We're looking into it." }}
      </p>

      <!-- Back Home Button -->
      <div class="pt-6">
        <button
          @click="handleError"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all font-medium group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-translate-x-1 transition-transform">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Return Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: Object,
    default: () => ({ statusCode: 404, statusMessage: 'Not Found' })
  }
})

const handleError = () => clearError({ redirect: '/' })
</script>

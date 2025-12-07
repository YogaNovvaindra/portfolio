<template>
  <main class="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 space-y-8 text-center">
    <!-- Animated number -->
    <div class="fadein-up">
      <div class="text-[120px] md:text-[200px] font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
        404
      </div>
    </div>

    <!-- Content Section -->
    <div class="max-w-2xl space-y-6">
      <div class="fade-in-from-left">
        <h1 class="text-3xl md:text-4xl font-bold text-white">
          Page Not Found
          <span class="wave">🔍</span>
        </h1>
        <p class="text-gray-300 mt-4 px-4 md:px-0">
          The page you're looking for seems to have been deleted, moved, or never existed. 
          Let's get you back on track.
        </p>
      </div>

      <!-- Navigation Buttons -->
      <div class="fade-in-links flex flex-col sm:flex-row gap-4 justify-center items-center">
        <router-link 
          to="/"
          class="inline-block px-6 py-3 text-base font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline-block mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          Go Home
        </router-link>
        <router-link 
          to="/portfolio"
          class="inline-block px-6 py-3 text-base font-medium text-blue-300 border-2 border-blue-300 rounded-xl hover:bg-blue-300 hover:text-black transition-all transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline-block mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          </svg>
          View Portfolio
        </router-link>
        <router-link 
          to="/about"
          class="inline-block px-6 py-3 text-base font-medium text-blue-300 border-2 border-blue-300 rounded-xl hover:bg-blue-300 hover:text-black transition-all transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline-block mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          About Me
        </router-link>
      </div>

      <!-- Quick Links -->
      <div class="fade-in-links mt-8 pt-8 border-t border-gray-700">
        <p class="text-gray-400 text-sm mb-4">Or try these popular pages:</p>
        <div class="flex flex-wrap justify-center gap-3">
          <router-link to="/" class="text-blue-300 hover:text-blue-200 text-sm transition-colors">Home</router-link>
          <span class="text-gray-600">•</span>
          <router-link to="/about" class="text-blue-300 hover:text-blue-200 text-sm transition-colors">About</router-link>
          <span class="text-gray-600">•</span>
          <router-link to="/portfolio" class="text-blue-300 hover:text-blue-200 text-sm transition-colors">Portfolio</router-link>
        </div>
      </div>
    </div>

    <!-- Decorative Tech Elements -->
    <div class="fixed w-full h-full top-0 left-0 pointer-events-none overflow-hidden">
      <div 
        v-for="i in 15" 
        :key="i"
        class="absolute w-1.5 h-1.5 bg-blue-500 rounded-full opacity-10"
        :style="{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.15}s`,
          animation: 'pulse 3s ease-in-out infinite'
        }"
      ></div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>

<style scoped>
/* Reuse key animations from home */
.wave {
  animation: wave-animation 2.5s infinite;
}

.fadein-up {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.fade-in-from-left {
  opacity: 0;
  animation: fadeInLeft 0.8s ease-out forwards;
  animation-delay: 300ms;
}

.fade-in-links {
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
  animation-delay: 600ms;
}

/* New space animation */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Custom pulse animation */
@keyframes pulse-star {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.05; transform: scale(0.8); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes wave-animation {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  to { transform: rotate(0deg); }
}
</style>
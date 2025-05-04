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
          Lost in Digital Space?
          <span class="wave">🚀</span>
        </h1>
        <p class="text-gray-300 mt-4 px-4 md:px-0">
          The page you're seeking has either drifted into orbit or never existed. 
          Let's get you back to familiar territory.
        </p>
      </div>

      <!-- Animated Button -->
      <div class="fade-in-links">
        <router-link 
          to="/"
          class="inline-block px-8 py-3 text-lg font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg"
        >
          Beam Me Home
        </router-link>
      </div>
    </div>

    <!-- Decorative Space Elements -->
    <div class="fixed w-full h-full top-0 left-0 pointer-events-none overflow-hidden">
      <div 
        v-for="i in 12" 
        :key="i"
        class="absolute w-2 h-2 bg-blue-500 rounded-full opacity-20 animate-pulse"
        :style="{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.2}s`
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
</style>
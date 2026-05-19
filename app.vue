<template>
  <!-- Clean minimal background -->
  <div class="fixed inset-0 -z-20 bg-[#0a0a0a] pointer-events-none"></div>
  <!-- Single restrained accent — top right only -->
  <div class="fixed top-[-10%] right-[-10%] -z-10 pointer-events-none w-[500px] h-[500px] bg-blue-600/[0.07] blur-[130px] rounded-full"></div>
  <!-- Bottom left subtle warmth -->
  <div class="fixed bottom-[-15%] left-[-10%] -z-10 pointer-events-none w-[400px] h-[400px] bg-blue-800/[0.05] blur-[120px] rounded-full"></div>

  <div :class="[$route.name === 'blog-slug' ? 'pb-0' : 'pb-20']" class="w-full flex flex-col relative md:pb-0 min-h-screen">
    <NuxtLoadingIndicator color="#3b82f6" :height="3" />
    <!-- Desktop Nav -->
    <nav class="w-full px-6 md:fixed top-0 z-[98] nav-bar">
      <div class="container mx-auto max-w-7xl flex flex-wrap items-center justify-between h-[60px]">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5 nav-fadein">
          <div class="w-12 h-7 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
            <span class="text-blue-400 text-xs font-bold font-mono">YGNV</span>
          </div>
          <span class="text-sm font-semibold text-white tracking-tight">Yoga Novaindra</span>
        </NuxtLink>

        <!-- GitHub link -->
        <div class="flex md:order-3 nav-fadein">
          <a
            href="https://github.com/yoganovvaindra"
            target="_blank"
            class="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors duration-200 px-3 py-1.5 rounded-md border border-transparent hover:border-zinc-700/60 hover:bg-white/[0.04]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>

        <!-- Nav links -->
        <div class="hidden md:flex justify-end items-center flex-grow md:order-2">
          <ul class="flex-col md:flex-row flex md:space-x-1 mt-4 md:mt-0">
            <li>
              <NuxtLink to="/" class="nav-fadein nav-link text-zinc-400 hover:text-white transition-colors duration-200 font-medium block px-3.5 py-1.5 rounded-md text-sm">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="nav-fadein fadein-1 nav-link text-zinc-400 hover:text-white transition-colors duration-200 font-medium block px-3.5 py-1.5 rounded-md text-sm">About</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/portfolio" class="nav-fadein fadein-2 nav-link text-zinc-400 hover:text-white transition-colors duration-200 font-medium block px-3.5 py-1.5 rounded-md text-sm">Portfolio</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="nav-fadein fadein-3 nav-link text-zinc-400 hover:text-white transition-colors duration-200 font-medium block px-3.5 py-1.5 rounded-md text-sm">Blog</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="md:mt-[60px]">
      <NuxtPage />
    </div>

    <!-- Back to Top Button -->
    <button
      v-show="showBackToTop"
      @click="scrollToTop"
      :class="$route.name === 'blog-slug' ? 'bottom-6' : 'bottom-20'"
      class="fixed right-6 z-[99] flex items-center justify-center w-12 h-12 bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:bg-zinc-800/50 hover:border-blue-500/50 text-zinc-400 hover:text-blue-400 rounded-full shadow-lg hover:shadow-blue-500/20 transition-all duration-300 md:bottom-8 md:right-8 group"
      title="Back to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  </div>

  <!-- Mobile Edge-to-Edge Navbar (hidden on article detail) -->
  <footer v-if="$route.name !== 'blog-slug'" class="block md:hidden fixed bottom-0 left-0 right-0 z-50 nav-bar border-t-0 border-[rgba(255,255,255,0.05)] transition-all duration-300 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
    <div class="absolute top-0 left-0 right-0 h-[1px] bg-[rgba(255,255,255,0.05)]"></div>
    <nav class="flex justify-around items-center h-12 text-xs font-medium tracking-wide">
      <NuxtLink to="/"         class="mobile-nav-link flex-1 flex justify-center items-center h-full text-zinc-400 hover:text-white transition-colors relative">Home</NuxtLink>
      <NuxtLink to="/about"    class="mobile-nav-link flex-1 flex justify-center items-center h-full text-zinc-400 hover:text-white transition-colors relative">About</NuxtLink>
      <NuxtLink to="/portfolio" class="mobile-nav-link flex-1 flex justify-center items-center h-full text-zinc-400 hover:text-white transition-colors relative">Portfolio</NuxtLink>
      <NuxtLink to="/blog"     class="mobile-nav-link flex-1 flex justify-center items-center h-full text-zinc-400 hover:text-white transition-colors relative">Blog</NuxtLink>
    </nav>
  </footer>
</template>

<script setup>
const route = useRoute()
const showBackToTop = ref(false)

function handleScroll() {
  showBackToTop.value = window.scrollY > 300
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

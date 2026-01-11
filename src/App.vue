<template>
  <div class="fixed inset-0 -z-20 bg-[#020202] pointer-events-none"></div>
  <div class="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
    <div 
      v-for="(blob, index) in blobs" 
      :key="index"
      class="absolute rounded-full mix-blend-screen animate-blob opacity-[0.15] blur-[100px] md:blur-[120px]"
      :style="blob.style"
    ></div>
  </div>

  <!-- Blue themed component -->
  <div
    class="max-w-7xl mx-auto flex flex-col relative pb-20 md:pb-0 min-h-screen"
  >
    <nav
      class="max-w-7xl px-5 md:fixed top-0 z-[98] w-full backdrop-blur-xl bg-black/20"
    >
      <div
        class="container mx-auto flex flex-wrap items-center justify-between"
      >
        <button @click="redirectToHome" class="flex px-4 py-2">
          <span
            class="self-center text-lg text-custom-blue-300 font-bold whitespace-nowrap fadein-bot hover:text-custom-blue-200 transition-colors"
            >Yoga Novaindra</span
          >
        </button>
        <div class="flex md:order-3 fadein-bot ml-8">
          <a href="https://github.com/yoganovvaindra" target="_blank" class="hover:opacity-80 transition-opacity"
            ><img class="w-8 h-8 rounded-full border border-white/10" src="/img/github.png" alt="github"
          /></a>
        </div>
        <!-- Updated menu div with justify-end and flex-grow -->
        <div
          class="hidden md:flex justify-end items-center flex-grow md:order-2"
          id="mobile-menu-3"
        >
          <ul
            class="flex-col md:flex-row flex md:space-x-12 mt-4 md:mt-0 md:text-sm md:font-medium uppercase tracking-widest"
          >
            <li>
              <router-link
                to="/"
                class="fadein-bot text-gray-400 hover:text-custom-blue-300 transition-colors font-bold block"
                aria-current="page"
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                to="/about"
                class="fadein-bot fadein-1 text-gray-400 hover:text-custom-blue-300 transition-colors font-bold block"
                >About</router-link
              >
            </li>
            <li>
              <router-link
                to="/portfolio"
                class="fadein-bot fadein-2 text-gray-400 hover:text-custom-blue-300 transition-colors font-bold block"
                >Portfolio</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="md:mt-[100px]">
      <router-view />
    </div>

    <!-- Back to Top Button -->
    <button
      v-show="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-24 right-6 z-[99] bg-custom-blue-600/20 backdrop-blur-xl border border-white/10 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 hover:bg-custom-blue-500/30 md:bottom-8 md:right-8 group"
      title="Back to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="3"
        stroke="currentColor"
        class="w-5 h-5 group-hover:-translate-y-1 transition-transform"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </button>
  </div>
  <footer
    class="block md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-black/40 backdrop-blur-2xl"
  >
    <nav class="flex justify-around py-5 text-[10px] uppercase font-bold tracking-[0.2em]">
      <router-link
        to="/"
        class="text-gray-400 hover:text-white transition-colors"
        >Home</router-link
      >
      <router-link
        to="/about"
        class="text-gray-400 hover:text-white transition-colors"
        >About</router-link
      >
      <router-link
        to="/portfolio"
        class="text-gray-400 hover:text-white transition-colors"
        >Works</router-link
      >
    </nav>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      showBackToTop: false,
      blobs: []
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.generateBlobs();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    generateBlobs() {
      const colors = [
        'rgba(46, 143, 255, 0.15)', // custom-blue-500
        'rgba(147, 51, 234, 0.15)', // purple-600
        'rgba(59, 130, 246, 0.15)', // blue-500
        'rgba(139, 92, 246, 0.15)', // violet-500
        'rgba(0, 119, 255, 0.12)',  // custom-blue-600
        'rgba(168, 85, 247, 0.12)'   // purple-500
      ];
      
      this.blobs = Array.from({ length: 6 }, () => {
        const size = Math.floor(Math.random() * 25) + 35; // 35% to 60%
        return {
          style: {
            width: `${size}%`,
            height: `${size}%`,
            top: `${Math.floor(Math.random() * 100) - 20}%`,
            left: `${Math.floor(Math.random() * 100) - 20}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animationDelay: `${Math.random() * -20}s`,
            animationDuration: `${Math.random() * 10 + 15}s`,
            opacity: (Math.random() * 0.1 + 0.1).toFixed(2)
          }
        };
      });
    },
    redirectToHome() {
      this.$router.push("/");
    },
    handleScroll() {
      this.showBackToTop = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style>
@import url('@/assets/css/animations.css');
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 5px; /* for vertical scrollbar */
  height: 5px; /* for horizontal scrollbar */
}

::-webkit-scrollbar-track {
  background: hsl(240, 1%, 17%);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: #8ABFFF;
  border-radius: 5px;
}

::-webkit-scrollbar-button {
  width: 20px;
}

body {
  font-family: "Poppins", sans-serif;
  background: hsl(0, 0%, 0%);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow-x: hidden;
}

html {
  overflow-x: hidden;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  transition: color 0.3s;
}

nav a.router-link-exact-active {
  display: inline-flex;
  flex-direction: column;
  color: white;
  transition: color 0.3s;
}

nav a.router-link-exact-active::after {
  display: inline-block;
  content: "";
  margin-top: 0.08em;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: #8ABFFF;
}

nav a.router-link-exact-active:hover {
  color: white;
}

footer nav a.router-link-exact-active {
  color: #8ABFFF;
  position: relative;
}

footer nav a.router-link-exact-active::after {
  display: block;
  content: "";
  width: 100%;
  height: 3px;
  background-color: #8ABFFF;
  border-radius: 2px;
  position: absolute;
  bottom: -12px;
  left: 0;
}
</style>

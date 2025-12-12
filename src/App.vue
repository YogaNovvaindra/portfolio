<template>
  <!-- Blue themed component -->
  <div
    class="max-w-7xl mx-auto flex flex-col relative pb-20 md:pb-0 overflow-x-hidden"
  >
    <nav
      class="max-w-7xl px-5 md:fixed top-0 z-[98] w-screen backdrop-blur-md bg-[#121212] bg-opacity-10"
    >
      <div
        class="container mx-auto flex flex-wrap items-center justify-between"
      >
        <button @click="redirectToHome" class="flex">
          <span
            class="self-center text-lg text-custom-blue-300 font-semibold whitespace-nowrap fadein-bot hover:text-custom-blue-200"
            >Yoga Novaindra</span
          >
        </button>
        <div class="flex md:order-3 fadein-bot ml-8">
          <a href="https://github.com/yoganovvaindra"
            ><img class="w-9 rounded-full" src="/img/github.png" alt="github"
          /></a>
        </div>
        <!-- Updated menu div with justify-end and flex-grow -->
        <div
          class="hidden md:flex justify-end items-center flex-grow md:order-2"
          id="mobile-menu-3"
        >
          <ul
            class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium"
          >
            <li>
              <router-link
                to="/"
                class="fadein-bot text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-500 md:p-0"
                aria-current="page"
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                to="/about"
                class="fadein-bot fadein-1 text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-500 md:p-0"
                >About</router-link
              >
            </li>
            <li>
              <router-link
                to="/portfolio"
                class="fadein-bot fadein-2 text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-500 md:p-0"
                >Portfolio</router-link
              >
            </li>
            <!-- <li>
          <router-link to="/blog"
            class="fadein-bot fadein-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-500 md:p-0 blog">Blog</router-link>
        </li> -->
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
      class="fixed bottom-24 right-6 z-[99] bg-custom-blue-500 hover:bg-custom-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 md:bottom-8 md:right-8"
      title="Back to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
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
    class="block md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-gray-700/50 bg-[#121212] bg-opacity-80 backdrop-blur-md"
  >
    <nav class="flex justify-around py-4 text-xs">
      <router-link
        to="/"
        class="text-gray-300 hover:text-white transition-colors"
        >Home</router-link
      >
      <router-link
        to="/about"
        class="text-gray-300 hover:text-white transition-colors"
        >About</router-link
      >
      <router-link
        to="/portfolio"
        class="text-gray-300 hover:text-white transition-colors"
        >Portfolio</router-link
      >
      <!-- <router-link to="/blog" class="text-gray-300 hover:text-white">Blog</router-link> -->
    </nav>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      showBackToTop: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
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

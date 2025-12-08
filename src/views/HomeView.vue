<template>
  <main
    class="mt-10 md:mt-1 flex flex-col-reverse gap-8 items-center md:flex-row md:gap-8 lg:gap-12 xl:gap-16 md:justify-center min-h-[70vh] md:min-h-[85vh] pb-32 md:pb-20 px-4 md:px-8 lg:px-12 xl:px-16 max-w-[1400px] mx-auto"
  >
    <div
      class="flex flex-col flex-1 space-y-6 md:space-y-8 text-center md:text-left max-w-2xl"
    >
      <div class="space-y-4 md:space-y-5">
        <p class="text-blue-400 text-sm md:text-base font-medium tracking-wide">
          Hello World, I'm
        </p>
        <h1
          class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white fadein-up leading-tight"
        >
          Yoga Novaindra
        </h1>
        <div class="py-2">
          <h2
            class="typewrite text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500 fadein-up min-h-[2rem] md:min-h-[2.5rem]"
            ref="typewriter"
          >
            <span class="wrap">{{ txt }}</span>
          </h2>
        </div>
        <p
          class="text-gray-300 leading-relaxed text-sm md:text-base lg:text-lg fade-in-from-left"
        >
          DevSecOps Engineer with hands-on experience building automated,
          secure, and observable infrastructure across on-premise and cloud
          environments. <span class="wave">👋🏼</span>
        </p>
      </div>

      <!-- CTA Buttons -->
      <div
        class="flex flex-col sm:flex-row gap-4 fade-in-from-left"
        style="animation-delay: 700ms"
      >
        <router-link
          to="/portfolio"
          class="px-8 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all text-center shadow-lg"
        >
          View Portfolio
        </router-link>
        <router-link
          to="/about"
          class="px-8 py-3.5 border-2 border-blue-400/60 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 font-semibold rounded-lg transition-all text-center"
        >
          About Me
        </router-link>
      </div>

      <!-- Quick Stats -->
      <div
        class="pt-6 md:pt-8 mt-4 border-t border-gray-700/50 fade-in-from-left"
        style="animation-delay: 900ms"
      >
        <div class="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <div class="text-center">
            <div
              class="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-400"
            >
              8+
            </div>
            <div
              class="mt-1 text-xs md:text-sm text-gray-400 uppercase tracking-wide font-medium"
            >
              Projects
            </div>
          </div>
          <div class="text-center">
            <div
              class="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-400"
            >
              4+
            </div>
            <div
              class="mt-1 text-xs md:text-sm text-gray-400 uppercase tracking-wide font-medium"
            >
              Years Exp
            </div>
          </div>
          <div class="text-center">
            <div
              class="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-400"
            >
              6
            </div>
            <div
              class="mt-1 text-xs md:text-sm text-gray-400 uppercase tracking-wide font-medium"
            >
              Skills
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Links -->
      <div class="pt-6 fade-in-links">
        <p
          class="text-sm text-gray-400 mb-4 text-center md:text-left font-medium"
        >
          Let's connect
        </p>
        <div class="flex flex-wrap gap-3 justify-center md:justify-start">
          <a
            href="mailto:yoganovaindra@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative p-3.5 bg-gradient-to-br from-[#1e1e1f] to-[#252525] border-2 border-gray-600/60 hover:border-blue-400 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            title="Email: yoganovaindra@gmail.com"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-300"
            ></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300 relative z-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/yoga-novaindra/"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative p-3.5 bg-gradient-to-br from-[#1e1e1f] to-[#252525] border-2 border-gray-600/60 hover:border-blue-400 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            title="LinkedIn"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-300"
            ></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300 relative z-10"
            >
              <path
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
              />
            </svg>
          </a>
          <a
            href="https://github.com/YogaNovvaindra"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative p-3.5 bg-gradient-to-br from-[#1e1e1f] to-[#252525] border-2 border-gray-600/60 hover:border-blue-400 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            title="GitHub"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-300"
            ></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300 relative z-10"
            >
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
          </a>
          <a
            href="https://yoganova.my.id"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative p-3.5 bg-gradient-to-br from-[#1e1e1f] to-[#252525] border-2 border-gray-600/60 hover:border-blue-400 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            title="Personal Website"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-300"
            ></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300 relative z-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div
      class="flex justify-center md:justify-start fadein-right md:flex-shrink-0"
    >
      <div class="relative">
        <div
          class="absolute -inset-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl"
        ></div>
        <img
          alt="avatar"
          fetchpriority="high"
          width="350"
          height="350"
          decoding="async"
          data-nimg="1"
          class="w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full border-4 border-blue-300/80 pict relative z-10 object-cover"
          src="/img/avatar.webp"
        />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      toRotate: [
        "DevSecOps Engineer",
        "Cloud Engineer",
        "Platform Engineer",
        "Passionate Homelabber",
      ],
      period: 2000,
      txt: "",
      loopNum: 0,
      isDeleting: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tick();
    });
  },
  methods: {
    tick() {
      let typewriter = this.$refs.typewriter;

      if (!typewriter) {
        return;
      }

      let i = this.loopNum % this.toRotate.length;
      let fullTxt = this.toRotate[i];

      this.txt = this.isDeleting
        ? fullTxt.substring(0, this.txt.length - 1)
        : fullTxt.substring(0, this.txt.length + 1);
      typewriter.innerHTML = `<span class="wrap">${this.txt}</span>`;

      let that = this;
      let delta = 200 - Math.random() * 100;

      if (this.isDeleting) {
        delta /= 2;
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(() => {
        that.tick();
      }, delta);
    },
  },
};
</script>

<style>
body {
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}

.typewrite > .wrap {
  border-right: 0.08em solid #fff;
}

.wave {
  animation-name: wave-animation;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;
  display: inline-block;
}

@keyframes wave-animation {
  0% {
    transform: rotate(0deg);
  }

  10% {
    transform: rotate(14deg);
  }

  20% {
    transform: rotate(-8deg);
  }

  30% {
    transform: rotate(14deg);
  }

  40% {
    transform: rotate(-4deg);
  }

  50% {
    transform: rotate(10deg);
  }

  60% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(0deg);
  }
}

.pict {
  box-shadow: 0px 0px 73px -9px rgba(112, 236, 255, 0.44);
  -webkit-box-shadow: 0px 0px 73px -9px rgba(112, 236, 255, 0.44);
  -moz-box-shadow: 0px 0px 73px -9px rgba(112, 236, 255, 0.44);
}

.fadein-up {
  opacity: 0;
  animation-name: fadeInUp;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-delay: 500ms;
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

.fade-in-from-left {
  opacity: 0;
  animation: fadeInLeft 0.5s ease-out forwards;
  animation-delay: 500ms;
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

.fadein-right {
  opacity: 0;
  animation: fadeInRight 0.5s ease-out forwards;
  animation-delay: 500ms;
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in-links {
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
  animation-delay: 700ms;
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
</style>

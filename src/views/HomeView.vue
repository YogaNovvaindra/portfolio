<template>
  <main
    class="mt-10 md:mt-1 flex flex-col-reverse gap-8 items-center md:flex-row md:gap-16 md:justify-center min-h-[65vh] md:min-h-[80vh]"
  >
    <div class="flex flex-col flex-1 space-y-2 text-center md:text-left px-10">
      <div>
        <p class="text-blue-300">Hello World, I'm</p>
        <h1 class="text-4xl font-bold md:text-5xl text-white fadein-up">
          Yoga Novaindra
        </h1>
        <div class="py-2">
          <h1
            class="typewrite text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-blue-500 md:text-2xl fadein-up"
            ref="typewriter"
          >
            <span class="wrap">{{ txt }}</span>
          </h1>
        </div>
        <p class="text-white pr-4 fade-in-from-left">
          DevSecOps Engineer with hands-on experience building automated,
          secure, and observable infrastructure across on-premise and cloud
          environments. <span class="wave">👋🏼</span>
        </p>
      </div>

      <!-- CTA Buttons -->
      <div class="mt-6 flex flex-col sm:flex-row gap-4 fade-in-from-left" style="animation-delay: 700ms;">
        <router-link
          to="/portfolio"
          class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all transform hover:scale-105 text-center"
        >
          View Portfolio
        </router-link>
        <router-link
          to="/about"
          class="px-6 py-3 border-2 border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-black font-medium rounded-lg transition-all transform hover:scale-105 text-center"
        >
          About Me
        </router-link>
      </div>

      <!-- Quick Stats -->
      <div class="mt-8 grid grid-cols-3 gap-4 fade-in-from-left" style="animation-delay: 900ms;">
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-blue-300">8+</div>
          <div class="text-xs md:text-sm text-gray-400">Projects</div>
        </div>
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-blue-300">4+</div>
          <div class="text-xs md:text-sm text-gray-400">Years Exp</div>
        </div>
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-blue-300">6</div>
          <div class="text-xs md:text-sm text-gray-400">Skills</div>
        </div>
      </div>

      <!-- Contact Links at Bottom -->
      <div class="mt-auto pt-8 fade-in-links">
        <div class="flex space-x-4 justify-center md:justify-start">
          <a
            href="mailto:yoganovaindra@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white hover:text-blue-300 transition-colors"
            title="Email: yoganovaindra@gmail.com"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
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
            class="text-white hover:text-blue-300 transition-colors"
            title="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
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
            class="text-white hover:text-blue-300 transition-colors"
            title="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
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
            class="text-white hover:text-blue-300 transition-colors"
            title="Personal Website"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="flex justify-center md:justify-start fadein-right">
      <img
        alt="avatar"
        fetchpriority="high"
        width="300"
        height="300"
        decoding="async"
        data-nimg="1"
        class="w-10/12 md:h-auto rounded-full border-4 border-blue-300 pict"
        src="/img/avatar.webp"
      />
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
        "Security Specialist",
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

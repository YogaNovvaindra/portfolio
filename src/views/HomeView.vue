<template>
  <div class="min-h-[calc(100vh-100px)] flex items-center justify-center p-4">

    <main
      class="flex flex-col-reverse gap-12 items-center lg:flex-row lg:gap-16 lg:justify-center max-w-7xl mx-auto"
    >
      <!-- Hero Content -->
      <div
        class="flex flex-col flex-1 space-y-8 text-center lg:text-left max-w-2xl animate-fade-up"
      >
        <div class="space-y-6">
          <div class="space-y-2">
            <p class="text-custom-blue-300 text-sm md:text-base font-mono font-medium tracking-widest uppercase">
              // Loading Infrastructure...
            </p>
            <h1
              class="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none"
            >
              Yoga <span class="text-transparent bg-clip-text bg-gradient-to-r from-custom-blue-300 to-purple-400">Novaindra</span>
            </h1>
          </div>

          <div class="py-2">
            <h2
              class="text-xl md:text-3xl font-semibold text-custom-blue-200/80 font-display min-h-[2.5rem]"
              ref="typewriter"
            >
              <span class="wrap">{{ txt }}</span>
            </h2>
          </div>

          <p
            class="text-gray-400 leading-relaxed text-base md:text-xl max-w-xl mx-auto lg:mx-0"
          >
            DevSecOps Engineer specializing in building 
            <span class="text-white font-medium">automated, secure, and observable</span> 
            infrastructure. <span class="wave inline-block ml-1">👋🏼</span>
          </p>
        </div>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
        >
          <router-link
            to="/portfolio"
            class="group relative px-8 py-4 bg-custom-blue-500/10 border border-custom-blue-400/30 text-white font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl backdrop-blur-md"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-custom-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span class="relative z-10">View Projects</span>
          </router-link>
          
          <router-link
            to="/about"
            class="px-8 py-4 bg-white/5 border border-white/10 text-gray-300 hover:text-white font-bold rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm text-center"
          >
            About Me
          </router-link>
        </div>

        <!-- Quick Stats Glass Card -->
        <div class="bg-white/[0.03] border border-white/[0.08] p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div class="grid grid-cols-3 gap-8">
            <div class="space-y-1">
              <div class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-custom-blue-300 to-custom-blue-500">
                8+
              </div>
              <div class="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em] font-bold">
                Deployments
              </div>
            </div>
            <div class="space-y-1">
              <div class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-300 to-purple-500">
                4+
              </div>
              <div class="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em] font-bold">
                Years Experience
              </div>
            </div>
            <div class="space-y-1">
              <div class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-emerald-500">
                15+
              </div>
              <div class="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em] font-bold">
                Stack Skills
              </div>
            </div>
          </div>
        </div>

        <!-- Social Connect -->
        <div class="pt-4">
          <div class="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank"
               class="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-custom-blue-300 hover:bg-custom-blue-500/10 hover:border-custom-blue-500/30 transition-all duration-300 group shadow-lg">
                <!-- Icon Logic Moved to Template for Reliability -->
                <svg v-if="link.icon === 'MailIcon'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:scale-110 transition-transform"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <svg v-else-if="link.icon === 'LinkedinIcon'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:scale-110 transition-transform"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                <svg v-else-if="link.icon === 'GithubIcon'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:scale-110 transition-transform"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                <svg v-else-if="link.icon === 'GlobeIcon'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:scale-110 transition-transform"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Hero Visual -->
      <div class="relative animate-fade-up" style="animation-delay: 0.2s">
        <!-- Decoration Glow -->
        <div class="absolute inset-0 bg-gradient-to-tr from-custom-blue-500 to-purple-500 rounded-full blur-[80px] opacity-20 animate-pulse-slow"></div>
        
        <!-- Glass Avatar Container -->
        <div class="relative z-10 p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
          <img
            alt="avatar"
            width="450"
            height="450"
            class="w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
            src="/img/avatar.webp"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: "HomeView",
    data() {
      return {
        toRotate: [
          "DevSecOps Engineer",
          "Cloud Infrastructure",
          "Platform Security",
          "Automation Expert",
        ],
        period: 2000,
        txt: "",
        loopNum: 0,
        isDeleting: false,
        socialLinks: [
          { name: 'Email', url: 'mailto:yoganovaindra@gmail.com', icon: 'MailIcon' },
          { name: 'LinkedIn', url: 'https://www.linkedin.com/in/yoga-novaindra/', icon: 'LinkedinIcon' },
          { name: 'GitHub', url: 'https://github.com/YogaNovvaindra', icon: 'GithubIcon' },
          { name: 'Website', url: 'https://yoganova.my.id', icon: 'GlobeIcon' }
        ]
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
        if (!typewriter) return;
  
        let i = this.loopNum % this.toRotate.length;
        let fullTxt = this.toRotate[i];
  
        this.txt = this.isDeleting
          ? fullTxt.substring(0, this.txt.length - 1)
          : fullTxt.substring(0, this.txt.length + 1);
        
        typewriter.innerHTML = `<span class="wrap">${this.txt}</span>`;
  
        let delta = 200 - Math.random() * 100;
        if (this.isDeleting) delta /= 2;
  
        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
          this.isDeleting = false;
          this.loopNum++;
          delta = 500;
        }
  
        setTimeout(() => this.tick(), delta);
      },
    }
  };
</script>

<style scoped>
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
  box-shadow: 0px 0px 73px -9px rgba(138, 191, 255, 0.44);
  -webkit-box-shadow: 0px 0px 73px -9px rgba(138, 191, 255, 0.44);
  -moz-box-shadow: 0px 0px 73px -9px rgba(138, 191, 255, 0.44);
}
</style>

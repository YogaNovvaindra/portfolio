<template>
  <div class="min-h-[calc(100vh-60px)] flex items-center justify-center px-6 py-16">
    <main class="flex flex-col-reverse gap-16 items-center lg:flex-row lg:gap-20 lg:justify-between max-w-6xl mx-auto w-full">

      <!-- Hero Content -->
      <div class="flex flex-col flex-1 space-y-10 text-center lg:text-left max-w-2xl title-reveal">

        <!-- Name + Role -->
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
            <div class="inline-flex items-center gap-2 text-sm font-mono text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full">
              <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
              DevSecOps Engineer
            </div>
            <div class="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 bg-zinc-800/60 border border-zinc-700/60 px-3 py-1.5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Jakarta, ID
            </div>
          </div>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-sm">
            Yoga <span class="text-blue-500 drop-shadow-md">Novaindra</span><span class="text-blue-500">.</span>
          </h1>

          <div class="min-h-[1.8rem] flex items-center justify-center lg:justify-start">
            <span class="text-base md:text-lg text-zinc-400 font-mono" ref="typewriter">{{ txt }}</span>
          </div>
        </div>

        <!-- Description -->
        <p class="text-zinc-400 leading-relaxed text-base md:text-lg max-w-lg mx-auto lg:mx-0">
          Building <span class="text-zinc-200 font-medium">automated, secure, and observable</span> infrastructure — from bare-metal clusters to cloud-native platforms. <span class="wave inline-block">👋🏼</span>
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
          <router-link
            to="/portfolio"
            class="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold rounded-lg transition-colors duration-200 text-center shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            View Projects
          </router-link>
          <router-link
            to="/about"
            class="px-6 py-3 bg-transparent border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-semibold rounded-lg transition-colors duration-200 text-center"
          >
            About Me
          </router-link>
        </div>

        <!-- Stats row -->
        <div class="flex gap-8 justify-center lg:justify-start pt-2">
          <div class="text-left group cursor-default">
            <div class="text-2xl font-bold text-white tabular-nums group-hover:text-blue-400 group-hover:-translate-y-1 transition-all duration-300">8+</div>
            <div class="text-xs text-zinc-500 mt-0.5 font-medium group-hover:text-zinc-400 transition-colors duration-300">Deployments</div>
          </div>
          <div class="w-px bg-zinc-800"></div>
          <div class="text-left group cursor-default">
            <div class="text-2xl font-bold text-white tabular-nums group-hover:text-blue-400 group-hover:-translate-y-1 transition-all duration-300">4+</div>
            <div class="text-xs text-zinc-500 mt-0.5 font-medium group-hover:text-zinc-400 transition-colors duration-300">Years Exp.</div>
          </div>
          <div class="w-px bg-zinc-800"></div>
          <div class="text-left group cursor-default">
            <div class="text-2xl font-bold text-white tabular-nums group-hover:text-blue-400 group-hover:-translate-y-1 transition-all duration-300">15+</div>
            <div class="text-xs text-zinc-500 mt-0.5 font-medium group-hover:text-zinc-400 transition-colors duration-300">Stack Skills</div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="flex gap-3 justify-center lg:justify-start">
          <a v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank"
             :title="link.name"
             class="p-2.5 rounded-lg border border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:text-zinc-200 bg-transparent hover:bg-zinc-800/50 transition-all duration-200">
            <svg v-if="link.icon === 'MailIcon'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <svg v-else-if="link.icon === 'LinkedinIcon'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <svg v-else-if="link.icon === 'GithubIcon'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <svg v-else-if="link.icon === 'GlobeIcon'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          </a>
        </div>
      </div>

      <!-- Hero Avatar -->
      <div class="relative title-reveal shrink-0" style="animation-delay: 0.15s">
        <!-- Restrained glow behind avatar -->
        <div class="absolute inset-[-10%] bg-blue-600/10 blur-[60px] rounded-full"></div>

        <!-- Avatar frame -->
        <div class="relative z-10">
          <img
            alt="Yoga Novaindra"
            width="400"
            height="400"
            class="w-56 h-56 md:w-72 md:h-72 lg:w-[340px] lg:h-[340px] rounded-full object-cover ring-1 ring-white/10 shadow-2xl"
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
          "Cloud Infrastructure",
          "Security Automation",
          "Continuous Integration",
          "Platform Engineering",
        ],
        period: 2200,
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
        let i = this.loopNum % this.toRotate.length;
        let fullTxt = this.toRotate[i];

        this.txt = this.isDeleting
          ? fullTxt.substring(0, this.txt.length - 1)
          : fullTxt.substring(0, this.txt.length + 1);

        let delta = 150 - Math.random() * 80;
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
/* Typewriter cursor via the span ref element directly */
span[ref="typewriter"]::after,
.font-mono.text-zinc-400::after {
  content: '|';
  color: #60a5fa;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.wave {
  animation: wave-animation 2.5s infinite;
  transform-origin: 70% 70%;
  display: inline-block;
}

@keyframes wave-animation {
  0%  { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  to  { transform: rotate(0deg); }
}

</style>


<template>
  <div class="min-h-[calc(100vh-60px)] flex items-center justify-center px-6 py-16">
    <main class="flex flex-col-reverse gap-16 items-center lg:flex-row lg:gap-20 lg:justify-between max-w-6xl mx-auto w-full">

      <!-- Hero Content -->
      <div class="flex flex-col flex-1 text-center lg:text-left max-w-2xl title-reveal">

        <!-- Name + Role -->
        <div class="space-y-5">
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
            <span class="text-base md:text-lg text-zinc-400 font-mono typewriter-text" ref="typewriter">{{ txt }}</span>
          </div>
        </div>

        <!-- Description -->
        <p class="mt-6 text-zinc-400 leading-relaxed text-base md:text-lg max-w-lg mx-auto lg:mx-0">
          Building <span class="text-zinc-200 font-medium">automated, secure, and observable</span> infrastructure — from bare-metal clusters to cloud-native platforms. <span class="wave inline-block">👋🏼</span>
        </p>

        <!-- CTA Buttons -->
        <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <router-link
            to="/portfolio"
            class="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold rounded-lg transition-colors duration-200 text-center shadow-[0_0_15px_rgba(59,130,246,0.3)] inline-flex items-center justify-center gap-2"
          >
            View Projects
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </router-link>
          <router-link
            to="/about"
            class="px-6 py-3 bg-transparent border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-semibold rounded-lg transition-all duration-200 text-center inline-flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            About Me
          </router-link>
          <a
            href="/pdf/cv.pdf"
            download
            class="px-6 py-3 bg-transparent border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-semibold rounded-lg transition-all duration-200 text-center inline-flex items-center justify-center gap-2"
            aria-label="Download Resume PDF"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Resume
          </a>
        </div>

        <!-- Stats row -->
        <div class="mt-12 flex gap-8 justify-center lg:justify-start">
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

        <!-- Socials & Latest Article Group -->
        <div class="mt-10 flex flex-col gap-6">
          <!-- Social Links -->
          <div class="flex gap-3 justify-center lg:justify-start">
            <a v-for="link in socialLinks" :key="link.name" :href="link.url"
               :target="link.icon === 'MailIcon' ? '_self' : '_blank'"
               :title="link.name"
               :aria-label="link.name"
               class="p-2.5 rounded-lg border border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:text-zinc-200 bg-transparent hover:bg-zinc-800/50 transition-all duration-200">
              <svg v-if="link.icon === 'MailIcon'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <svg v-else-if="link.icon === 'LinkedinIcon'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <svg v-else-if="link.icon === 'GithubIcon'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              <svg v-else-if="link.icon === 'GlobeIcon'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </a>
          </div>

          <!-- Latest Article Card Skeleton -->
          <div v-if="loadingArticle" class="flex items-center gap-4 p-3 pr-5 rounded-2xl bg-zinc-900/20 border border-zinc-800/50 w-full max-w-[400px] mx-auto lg:mx-0 backdrop-blur-sm animate-pulse h-[74px]">
            <div class="h-12 w-16 shrink-0 rounded-lg bg-zinc-800/50"></div>
            <div class="flex flex-col gap-2 flex-1 mt-0.5">
              <div class="h-2.5 w-24 bg-zinc-800/50 rounded-full"></div>
              <div class="h-3.5 w-3/4 bg-zinc-800/50 rounded-full"></div>
            </div>
          </div>

          <!-- Latest Article Card -->
          <router-link v-else-if="latestArticle" :to="`/blog/${latestArticle.slug}`" class="flex items-center gap-4 p-3 pr-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group w-full max-w-[400px] mx-auto lg:mx-0 backdrop-blur-sm">
          <div class="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-800 border border-zinc-700/50">
            <img v-if="latestArticle.feature_image" :src="latestArticle.feature_image" class="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
            <div v-else class="h-full w-full flex items-center justify-center text-zinc-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            </div>
          </div>
          <div class="flex flex-col overflow-hidden text-left flex-1">
            <span class="text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-0.5 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> Latest Article</span>
            <span class="text-sm font-medium text-zinc-300 group-hover:text-blue-400 truncate transition-colors">{{ latestArticle.title }}</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 shrink-0 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all"><path d="m9 18 6-6-6-6"/></svg>
        </router-link>
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
            class="w-56 h-56 md:w-72 md:h-72 lg:w-[340px] lg:h-[340px] rounded-full object-cover ring-2 ring-blue-500/20 shadow-2xl shadow-blue-500/10"
            src="/img/avatar.webp"
          />
        </div>
      </div>

    </main>
  </div>
</template>

<script>
  import { setPageMeta } from '@/services/pageMeta';
  import ghost from '@/services/ghost';
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
        period: 2000,
        txt: "",
        loopNum: 0,
        isDeleting: false,
        socialLinks: [
          { name: 'Email', url: 'mailto:yoganovaindra@gmail.com', icon: 'MailIcon' },
          { name: 'LinkedIn', url: 'https://www.linkedin.com/in/yoga-novaindra/', icon: 'LinkedinIcon' },
          { name: 'GitHub', url: 'https://github.com/YogaNovvaindra', icon: 'GithubIcon' },
          { name: 'Website', url: 'https://yoganova.my.id', icon: 'GlobeIcon' }
        ],
        latestArticle: null,
        loadingArticle: true
      };
    },
    mounted() {
      setPageMeta({
        title: 'Yoga Novaindra — DevSecOps Engineer',
        description: 'Building automated, secure, and observable infrastructure — from bare-metal Kubernetes clusters to cloud-native platforms.',
        url: 'https://yoganova.my.id/',
      });
      this.$nextTick(() => {
        this.tick();
      });
      this.fetchLatestArticle();
    },
    methods: {
      async fetchLatestArticle() {
        this.loadingArticle = true;
        try {
          const data = await ghost.getPosts(1);
          if (data && data.posts && data.posts.length > 0) {
            this.latestArticle = data.posts[0];
          }
        } catch (error) {
          console.error('Failed to fetch latest article:', error);
        } finally {
          this.loadingArticle = false;
        }
      },
      tick() {
        let i = this.loopNum % this.toRotate.length;
        let fullTxt = this.toRotate[i];

        this.txt = this.isDeleting
          ? fullTxt.substring(0, this.txt.length - 1)
          : fullTxt.substring(0, this.txt.length + 1);

        let delta = 100 - Math.random() * 50;
        if (this.isDeleting) delta /= 2;

        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
          this.isDeleting = false;
          this.loopNum++;
          delta = 400;
        }

        setTimeout(() => this.tick(), delta);
      },
    }
  };
</script>

<style scoped>
/* Typewriter cursor — scoped to typewriter span only */
.typewriter-text::after {
  content: '|';
  color: #60a5fa;
  animation: blink 1s step-end infinite;
  margin-left: 1px;
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


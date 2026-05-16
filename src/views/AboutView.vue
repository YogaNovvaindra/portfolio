<template>
  <div class="min-h-screen py-20 px-6 md:px-8 text-left">
    <div class="max-w-4xl mx-auto space-y-20">

      <!-- Profile Header -->
      <section class="about-fade-up">
        <div class="flex flex-col md:flex-row items-start gap-8 md:gap-12">
          <!-- Avatar -->
          <div class="relative shrink-0">
            <img
              src="/img/avatar2.webp"
              alt="Profile"
              class="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover ring-1 ring-white/10 shadow-xl"
            />
          </div>
          <!-- Intro Text -->
          <div class="space-y-4">
            <div>
              <h1 class="text-3xl md:text-4xl font-bold text-white tracking-tight">Yoga Novaindra</h1>
              <div class="flex flex-wrap gap-2 mt-3">
                <span class="text-xs font-semibold text-blue-400 bg-blue-500/15 px-3 py-1 rounded-full">DevSecOps Engineer</span>
                <span class="text-xs font-medium text-zinc-400 bg-zinc-800/60 px-3 py-1 rounded-full">Cloud Enthusiast</span>
              </div>
            </div>
            <p class="text-zinc-400 leading-relaxed text-sm md:text-base max-w-2xl">
              {{ summary }}
            </p>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="about-fade-up" style="animation-delay: 0.1s">
        <div class="section-header">
          <h2 class="text-xl font-semibold text-white">Experience</h2>
          <div class="section-line"></div>
        </div>

        <div class="space-y-6 mt-8">
          <div v-for="(exp, index) in experience" :key="exp.id" class="exp-card group">
            <!-- Timeline dot + connecting line -->
            <div class="exp-dot-col">
              <div class="exp-dot" :class="{ 'exp-dot--active': exp.date.toLowerCase().includes('present') }">
                <span v-if="exp.date.toLowerCase().includes('present')" class="exp-dot-ping"></span>
              </div>
              <div v-if="index < experience.length - 1" class="exp-line"></div>
            </div>

            <!-- Content -->
            <div class="exp-content">
              <!-- Header row -->
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{{ exp.position }}</h3>
                  <div class="flex flex-wrap items-center gap-2 mt-1">
                    <a v-if="exp.url" :href="exp.url" target="_blank"
                       class="text-base text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1.5 font-medium">
                      {{ exp.company }}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-hover:opacity-100 transition-opacity"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                    <div v-else class="text-base text-zinc-300 font-medium">{{ exp.company }}</div>
                    <span class="text-zinc-700 text-sm hidden sm:block">&bull;</span>
                    <span class="text-sm text-zinc-400 font-mono">{{ exp.location }}</span>
                  </div>
                </div>
                <div class="flex items-center shrink-0 sm:pt-1">
                  <span class="text-xs md:text-sm font-mono text-zinc-400 bg-zinc-800/60 border border-zinc-700/40 px-3 py-1 rounded">{{ exp.date }}</span>
                </div>
              </div>
              <!-- Summary -->
              <div class="text-zinc-400 text-base leading-relaxed experience-content" v-html="exp.summary"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="about-fade-up" style="animation-delay: 0.2s">
        <div class="section-header">
          <h2 class="text-xl font-semibold text-white">Technical Skills</h2>
          <div class="section-line"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div v-for="skill in skills" :key="skill.id" class="skill-card flex flex-col group">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-600/60 flex items-center justify-center shrink-0 group-hover:border-blue-500/50 transition-colors">
                <img
                  v-if="skill.icon"
                  :src="`https://cdn.simpleicons.org/${skill.icon}/60a5fa`"
                  class="w-5 h-5 group-hover:brightness-125 transition-all"
                  @error="handleImageError"
                />
              </div>
              <h3 class="text-base font-semibold text-zinc-100">{{ skill.name }}</h3>
            </div>
            <div class="flex flex-wrap gap-2 mt-auto">
              <span
                v-for="keyword in skill.description.split(', ')"
                :key="keyword"
                class="text-xs font-mono text-zinc-300 bg-zinc-800/80 border border-zinc-700/80 hover:border-zinc-500 hover:text-white px-2.5 py-1 rounded transition-colors cursor-default"
              >
                {{ keyword }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Education & Certifications -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 about-fade-up" style="animation-delay: 0.3s">

        <!-- Education -->
        <section>
          <div class="section-header">
            <h2 class="text-xl font-semibold text-white">Education</h2>
            <div class="section-line"></div>
          </div>
          <div class="space-y-4 mt-8">
            <div v-for="edu in education" :key="edu.id" class="skill-card flex flex-col group">
              <div class="flex justify-between items-start mb-2">
                <h4 class="text-base font-bold text-zinc-100 leading-snug group-hover:text-white transition-colors">{{ edu.institution }}</h4>
                <span class="text-xs font-mono text-zinc-400 ml-2 shrink-0 mt-1">{{ edu.date.split(' - ')[1] }}</span>
              </div>
              <p class="text-sm text-zinc-300">{{ edu.studyType }}</p>
              <p class="text-sm text-zinc-400 font-mono mt-1.5">{{ edu.date }}</p>
            </div>
          </div>
        </section>

        <!-- Certifications -->
        <section>
          <div class="section-header">
            <h2 class="text-xl font-semibold text-white">Certifications</h2>
            <div class="section-line"></div>
          </div>
          <div class="space-y-4 mt-8">
            <a
              v-for="cert in certifications"
              :key="cert.id"
              :href="cert.url"
              target="_blank"
              class="flex items-center gap-4 skill-card group no-underline"
            >
              <div class="flex items-center justify-center shrink-0 text-blue-400 group-hover:text-blue-300 transition-colors w-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors leading-snug">{{ cert.name }}</h4>
                <span class="text-xs text-zinc-400 font-medium uppercase tracking-wider">{{ cert.issuer }}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-500 group-hover:text-zinc-300 transition-colors opacity-0 group-hover:opacity-100 shrink-0"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script>
import data from '@/assets/data.json';

export default {
  name: 'AboutView',
  data() {
    return {
      summary: data.summary,
      experience: data.experience,
      education: data.education,
      certifications: data.certifications,
      skills: data.skills,
    };
  },
  methods: {
    handleImageError(event) {
      event.target.style.display = "none";
    },
  },
};
</script>

<style scoped>
.about-fade-up {
  animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Section header with line */
.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
}
.section-line {
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.06);
}

/* Skill / Education / Cert card */
.skill-card {
  background: #18181b; /* zinc-900 */
  border: 1px solid #27272a; /* zinc-800 */
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  position: relative;
}
.skill-card:hover {
  background: #27272a; /* zinc-800 */
  border-color: #3f3f46; /* zinc-700 */
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 4px 10px -4px rgba(59, 130, 246, 0.15);
  transform: translateY(-2px);
}

/* Experience timeline layout */
.exp-card {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 0 20px;
}
.exp-dot-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4px;
}
.exp-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3b82f6;
  border: 2px solid #0a0a0a;
  box-shadow: 0 0 0 1px #3b82f6;
  flex-shrink: 0;
  position: relative;
}
.exp-dot--active {
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.6), 0 0 0 1px #3b82f6;
}
.exp-dot-ping {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: rgba(59,130,246,0.25);
  animation: expPing 2s cubic-bezier(0,0,0.2,1) infinite;
}
@keyframes expPing {
  0%   { transform: scale(1); opacity: 0.8; }
  75%  { transform: scale(2); opacity: 0; }
  100% { transform: scale(2); opacity: 0; }
}
.exp-line {
  flex: 1;
  width: 1px;
  background: rgba(59,130,246,0.15);
  margin-top: 6px;
  margin-bottom: -16px;
}
.exp-content {
  padding-bottom: 32px;
}
.exp-content:last-child {
  padding-bottom: 0;
}

/* Experience list items */
.experience-content :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.experience-content :deep(li) {
  position: relative;
  padding-left: 14px;
  color: #71717a;
  font-size: 0.8125rem;
  line-height: 1.5;
  transition: color 0.2s ease;
}
.experience-content :deep(li:hover) {
  color: #a1a1aa;
}
.experience-content :deep(li::before) {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 4px;
  height: 4px;
  background: #3b82f6;
  border-radius: 50%;
  opacity: 0.6;
}
.experience-content :deep(p) {
  margin: 0;
}
</style>

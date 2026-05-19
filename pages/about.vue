<template>
  <div class="min-h-screen py-20 px-6 md:px-8 text-left">
    <div class="max-w-4xl mx-auto space-y-20">

      <!-- Profile Header -->
      <section class="title-reveal">
        <div class="flex flex-col md:flex-row items-start gap-8 md:gap-12">
          <div class="relative shrink-0 w-28 h-28 md:w-40 md:h-40">
            <img src="/img/avatar2.webp" alt="Profile" fetchpriority="high" decoding="async" class="w-full h-full rounded-full object-cover ring-1 ring-white/10 shadow-xl" />
          </div>
          <div class="space-y-4">
            <div>
              <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-sm">Yoga <span class="text-blue-500">Novaindra</span></h1>
              <div class="flex flex-wrap gap-2 mt-3">
                <span class="text-xs font-semibold text-blue-400 bg-blue-500/15 px-3 py-1 rounded-full">DevSecOps Engineer</span>
                <span class="text-xs font-medium text-zinc-400 bg-zinc-800/60 px-3 py-1 rounded-full">Cloud Enthusiast</span>
              </div>
            </div>
            <p class="text-zinc-400 leading-relaxed text-sm md:text-base max-w-2xl">{{ data.summary }}</p>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="title-reveal" style="animation-delay: 0.1s">
        <div class="section-header">
          <h2 class="text-xl font-semibold text-white">Experience</h2>
          <div class="section-line"></div>
        </div>
        <div class="space-y-6 mt-8">
          <div v-for="(exp, index) in data.experience" :key="exp.id" class="exp-card group">
            <div class="exp-dot-col">
              <div class="exp-dot" :class="{ 'exp-dot--active': exp.date.toLowerCase().includes('present') }">
                <span v-if="exp.date.toLowerCase().includes('present')" class="exp-dot-ping"></span>
              </div>
              <div v-if="index < data.experience.length - 1" class="exp-line"></div>
            </div>
            <div class="exp-content">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{{ exp.position }}</h3>
                  <div class="flex flex-wrap items-center gap-2 mt-1">
                    <a v-if="exp.url" :href="exp.url" target="_blank" class="text-base text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1.5 font-medium">
                      {{ exp.company }}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-hover:opacity-100 transition-opacity"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                    <div v-else class="text-base text-zinc-300 font-medium">{{ exp.company }}</div>
                    <span class="text-zinc-700 text-sm hidden sm:block">&bull;</span>
                    <span class="text-sm text-zinc-400 font-mono">{{ exp.location }}</span>
                  </div>
                </div>
                <div class="flex items-center shrink-0 sm:pt-1">
                  <span class="text-xs font-mono text-zinc-400 bg-zinc-800/60 px-3 py-1.5 rounded-full">{{ exp.date }}</span>
                </div>
              </div>
              <div class="text-zinc-300 text-sm leading-relaxed experience-content" v-html="exp.summary"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="title-reveal" style="animation-delay: 0.2s">
        <div class="section-header">
          <h2 class="text-xl font-semibold text-white">Technical Skills</h2>
          <div class="section-line"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          <div v-for="skill in data.skills" :key="skill.id" class="group relative p-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-10 h-10 rounded-xl bg-zinc-950/50 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all">
                <img v-if="skill.icon" :src="`https://cdn.simpleicons.org/${skill.icon}/60a5fa`" decoding="async" class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" @error="handleImageError" />
              </div>
              <h3 class="text-base font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">{{ skill.name }}</h3>
            </div>
            <div class="flex flex-wrap gap-2 mt-auto">
              <span v-for="keyword in skill.description.split(', ')" :key="keyword" class="text-xs font-mono text-zinc-400 bg-zinc-950/50 border border-zinc-800/80 px-2.5 py-1 rounded-md cursor-default group-hover:border-zinc-700/80 transition-colors">
                {{ keyword }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Education & Certifications -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 title-reveal" style="animation-delay: 0.3s">
        <section>
          <div class="section-header">
            <h2 class="text-xl font-semibold text-white">Education</h2>
            <div class="section-line"></div>
          </div>
          <div class="space-y-4 mt-8">
            <div v-for="edu in data.education" :key="edu.id" class="group relative p-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col">
              <div class="mb-2">
                <h4 class="text-base font-bold text-zinc-100 leading-snug group-hover:text-blue-400 transition-colors">{{ edu.institution }}</h4>
              </div>
              <p class="text-sm text-zinc-300">{{ edu.studyType }}</p>
              <p class="text-[11px] text-zinc-500 font-mono mt-2">{{ edu.date }}</p>
            </div>
          </div>
        </section>

        <section>
          <div class="section-header">
            <h2 class="text-xl font-semibold text-white">Certifications</h2>
            <div class="section-line"></div>
          </div>
          <div class="space-y-4 mt-8">
            <div v-for="cert in data.certifications" :key="cert.id" @click="openCertModal(cert)" class="group relative p-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex items-center gap-4 cursor-pointer overflow-hidden">
              <div class="flex items-center justify-center shrink-0 text-blue-400/80 group-hover:text-blue-400 group-hover:scale-110 transition-all w-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-base font-bold text-zinc-100 group-hover:text-blue-400 transition-colors leading-snug">{{ cert.name }}</h4>
                <span class="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mt-1 block">{{ cert.issuer }}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-600 group-hover:text-blue-400 transition-all opacity-0 group-hover:opacity-100 shrink-0 transform group-hover:scale-110"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Certificate Modal -->
    <Transition name="modal">
      <div v-if="selectedCert" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12" @click.self="closeCertModal">
        <div class="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-md transition-opacity duration-300" @click="closeCertModal"></div>
        <div class="relative w-full max-w-5xl bg-zinc-900/90 border border-zinc-700/50 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] transform transition-all">
          <button @click="closeCertModal" aria-label="Close certificate modal" class="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-3 md:p-2 rounded-full bg-black/40 md:bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors border border-white/5 md:border-zinc-700 backdrop-blur-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div class="w-full md:w-1/2 h-64 md:h-auto md:min-h-[450px] relative bg-zinc-950 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
            <img v-if="selectedCert.image" :src="'/img/cert-' + selectedCert.image + '.webp'" :alt="selectedCert.name" loading="lazy" decoding="async" class="w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
            <div v-else class="flex flex-col items-center justify-center text-zinc-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="mb-4 opacity-50"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              <p>Image not available</p>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:hidden pointer-events-none"></div>
          </div>
          <div class="w-full md:w-1/2 flex flex-col min-h-0 relative bg-zinc-900">
            <div class="p-8 md:p-10 overflow-y-auto flex-1 space-y-8">
              <div>
                <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4 leading-snug">{{ selectedCert.name }}</h2>
                <div class="flex flex-wrap gap-2">
                  <span class="text-[11px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded">{{ selectedCert.issuer }}</span>
                  <span class="text-[11px] font-mono text-zinc-500 bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded">{{ selectedCert.date }}</span>
                </div>
              </div>
              <div class="space-y-6 text-zinc-400 leading-relaxed text-sm md:text-base">
                <div class="bg-zinc-950/50 rounded-xl p-5 border border-zinc-800/80" v-if="selectedCert.summary">
                  <h4 class="text-blue-400 font-semibold text-xs uppercase tracking-wider mb-2">Overview</h4>
                  <p class="text-zinc-300 text-sm leading-relaxed">{{ selectedCert.summary }}</p>
                </div>
              </div>
            </div>
            <div v-if="selectedCert.url" class="p-6 md:p-8 pt-4 md:pt-6 border-t border-zinc-800 bg-zinc-900 mt-auto">
              <a :href="selectedCert.url" target="_blank" class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-center text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                Verify Credential
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import rawData from '~/assets/data.json'

useSeoMeta({
  title: 'About — Yoga Novaindra',
  description: 'DevSecOps Engineer with hands-on experience in Kubernetes, Docker, Ansible, GCP, Wazuh SIEM, and Zero Trust. Based in Jakarta, Indonesia.',
  ogTitle: 'About — Yoga Novaindra',
  ogDescription: 'DevSecOps Engineer with hands-on experience in Kubernetes, Docker, Ansible, GCP, Wazuh SIEM, and Zero Trust.',
  ogUrl: 'https://yoganova.my.id/about',
})

const data = rawData
const selectedCert = ref(null)

function handleImageError(event) {
  const img = event.target
  const container = img.parentElement
  img.style.display = 'none'
  const skillName = img.closest('.group')?.querySelector('h3')?.textContent?.trim() || '?'
  const fallback = document.createElement('span')
  fallback.className = 'text-blue-400 text-base font-bold font-mono'
  fallback.textContent = skillName.charAt(0).toUpperCase()
  container.appendChild(fallback)
}
function openCertModal(cert) {
  selectedCert.value = cert
  document.body.style.overflow = 'hidden'
}
function closeCertModal() {
  selectedCert.value = null
  document.body.style.overflow = 'auto'
}
onUnmounted(() => { document.body.style.overflow = 'auto' })
</script>

<style scoped>
.section-header { display: flex; align-items: center; gap: 16px; }
.section-line   { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
.exp-card       { display: grid; grid-template-columns: 20px 1fr; gap: 0 20px; }
.exp-dot-col    { display: flex; flex-direction: column; align-items: center; padding-top: 4px; }
.exp-dot        { width: 10px; height: 10px; border-radius: 50%; background: #3b82f6; border: 2px solid #0a0a0a; box-shadow: 0 0 0 1px #3b82f6; flex-shrink: 0; position: relative; }
.exp-dot--active{ box-shadow: 0 0 8px rgba(59,130,246,0.6), 0 0 0 1px #3b82f6; }
.exp-dot-ping   { position: absolute; inset: -3px; border-radius: 50%; background: rgba(59,130,246,0.25); animation: expPing 2s cubic-bezier(0,0,0.2,1) infinite; }
@keyframes expPing { 0% { transform: scale(1); opacity: 0.8; } 75%, 100% { transform: scale(2); opacity: 0; } }
.exp-line       { flex: 1; width: 1px; background: rgba(59,130,246,0.15); margin-top: 6px; margin-bottom: -16px; }
.exp-content    { padding-bottom: 32px; }
.experience-content :deep(ul) { list-style: none; padding-left: 0; margin-top: 8px; display: flex; flex-direction: column; gap: 6px; }
.experience-content :deep(li) { position: relative; padding-left: 14px; transition: color 0.2s ease; }
.experience-content :deep(li:hover) { color: #f4f4f5; }
.experience-content :deep(li::before) { content: ""; position: absolute; left: 0; top: 0.55rem; width: 4px; height: 4px; background: #3b82f6; border-radius: 50%; opacity: 0.85; }
.experience-content :deep(p) { margin: 0; }
.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from, .modal-leave-to       { opacity: 0; }
.modal-enter-active .transform, .modal-leave-active .transform { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-enter-from .transform { opacity: 0; transform: scale(0.95) translateY(10px); }
.modal-leave-to .transform   { opacity: 0; transform: scale(0.95) translateY(10px); }
</style>

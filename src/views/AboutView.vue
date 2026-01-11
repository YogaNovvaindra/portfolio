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
      const parent = event.target.parentElement;
      if (parent) {
        parent.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-custom-blue-300">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        `;
      }
    },
  },
};
</script>

<template>
  <div class="min-h-screen py-24 px-4 md:px-8 text-left">

    <div class="max-w-5xl mx-auto space-y-20">
      
      <!-- Glass Profile Header -->
      <section class="animate-fade-up" style="animation-delay: 0.1s">
        <div class="flex flex-col md:flex-row items-start md:items-center gap-10 bg-white/[0.03] border border-white/[0.08] hover:border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-xl transition-all duration-300">
             <!-- Avatar with Glow -->
            <div class="relative shrink-0 group">
               <div class="absolute inset-0 bg-gradient-to-tr from-custom-blue-500 to-purple-500 rounded-full blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
               <div class="w-40 h-40 md:w-48 md:h-48 rounded-full p-1 bg-white/5 border border-white/10 relative z-10 overflow-hidden">
                   <img src="/img/avatar2.webp" alt="Profile" class="w-full h-full object-cover rounded-full transition-all duration-500 group-hover:scale-110" />
               </div>
            </div>
            <!-- Intro Text -->
            <div class="text-left space-y-4 max-w-2xl">
                <h1 class="text-3xl md:text-5xl font-bold font-display text-white">
                    Hi, I'm <span class="text-transparent bg-clip-text bg-gradient-to-r from-custom-blue-300 to-purple-300">Yoga Novaindra</span>
                </h1>
                <div class="flex flex-wrap justify-start gap-3 text-sm font-mono text-custom-blue-200/80 mb-2">
                    <span class="px-3 py-1 rounded-full bg-custom-blue-500/10 border border-custom-blue-500/20 text-custom-blue-300/90 font-bold hover:bg-custom-blue-500/20 transition-colors cursor-default">DevSecOps Engineer</span>
                    <span class="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300/90 font-bold hover:bg-purple-500/20 transition-colors cursor-default">Cloud Efficiency Expert</span>
                </div>
                <p class="text-gray-400 leading-relaxed text-base md:text-lg">
                    {{ summary }}
                </p>
            </div>
        </div>
      </section>

      <!-- Experience Section (Enhanced Timeline) -->
      <section class="animate-fade-up" style="animation-delay: 0.2s">
        <div class="flex items-center gap-6 mb-12">
            <h2 class="text-3xl font-bold text-white font-display">Experience</h2>
            <div class="h-px bg-white/10 flex-1"></div>
        </div>
        
        <div class="space-y-12 relative">
            <div v-for="(exp, index) in experience" :key="exp.id" class="relative pl-12 group">
                 <!-- Timeline Dot with Glow - Perfectly Centered -->
                 <div class="absolute left-0 top-0 w-5 h-5 rounded-full bg-custom-blue-500 border-4 border-black shadow-[0_0_20px_rgba(59,130,246,0.8)] transition-all duration-300 z-10"
                      :class="{ 'animate-pulse-slow shadow-[0_0_25px_rgba(59,130,246,1)]': exp.date.toLowerCase().includes('present') }"></div>
                 
                 <!-- Connecting Line to Next Item (except for last item) - Centered on dot -->
                 <div v-if="index < experience.length - 1" class="absolute left-[9px] top-5 w-[2px] h-[calc(100%+3rem)] bg-gradient-to-b from-custom-blue-500/40 to-custom-blue-500/10"></div>

                 <!-- Glass Content Card -->
                 <div class="bg-white/[0.03] border border-white/[0.08] p-6 rounded-2xl hover:bg-white/[0.05] hover:border-custom-blue-500/30 transition-all duration-300 backdrop-blur-xl group shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_12px_48px_0_rgba(59,130,246,0.15)] hover:translate-x-1">
                    <!-- Date and Location Row -->
                    <div class="flex justify-between items-center mb-4 flex-wrap gap-2">
                       <div class="flex items-center gap-3">
                           <span class="inline-block text-custom-blue-300 font-mono text-sm font-bold bg-custom-blue-500/10 border border-custom-blue-500/30 px-4 py-1.5 rounded-full shadow-lg">
                               {{ exp.date }}
                           </span>
                           <span v-if="exp.date.toLowerCase().includes('present')" class="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" title="Active"></span>
                       </div>
                       <span class="text-xs text-gray-500 font-mono border border-white/10 bg-white/5 px-3 py-1.5 rounded backdrop-blur-sm">{{ exp.location }}</span>
                    </div>
                    
                    <!-- Position and Company -->
                    <div class="mb-5">
                       <div class="space-y-1">
                           <h3 class="text-2xl font-bold text-white group-hover:text-custom-blue-300 transition-colors">{{ exp.position }}</h3>
                           <a v-if="exp.url" :href="exp.url" target="_blank" class="inline-flex items-center gap-1.5 text-custom-blue-200/70 hover:text-custom-blue-300 transition-colors font-medium hover:underline decoration-custom-blue-500/30 underline-offset-4">
                               {{ exp.company }}
                               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-hover:opacity-100 transition-opacity"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                           </a>
                           <div v-else class="text-custom-blue-200/70 font-medium">{{ exp.company }}</div>
                       </div>
                    </div>
                    
                    <!-- Description -->
                    <div class="text-gray-400 text-sm leading-relaxed space-y-3 experience-content" v-html="exp.summary"></div>
                 </div>
            </div>
        </div>
      </section>

      <!-- Skills Section (Badge Grid) -->
      <section class="animate-fade-up" style="animation-delay: 0.3s">
        <div class="flex items-center gap-6 mb-12">
            <h2 class="text-3xl font-bold text-white font-display">Technical Arsenal</h2>
            <div class="h-px bg-white/10 flex-1"></div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="skill in skills" :key="skill.id" class="bg-white/[0.03] border border-white/[0.08] p-6 rounded-2xl transition-all duration-300 hover:bg-white/[0.05] hover:border-custom-blue-500/30 backdrop-blur-xl group shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_12px_48px_0_rgba(59,130,246,0.15)] hover:translate-y-1">
                <div class="flex items-center gap-4 mb-4">
                     <div class="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:border-custom-blue-500/30 group-hover:bg-custom-blue-500/10 transition-all duration-300">
                        <img v-if="skill.icon" :src="`https://cdn.simpleicons.org/${skill.icon}/70c6ff`" class="w-6 h-6 group-hover:scale-110 transition-transform" @error="handleImageError" />
                     </div>
                     <h3 class="font-bold text-lg text-white font-display">{{ skill.name }}</h3>
                </div>
                <!-- Clean Badge List -->
                <div class="flex flex-wrap gap-2">
                    <span v-for="keyword in (skill.description.split(', '))" :key="keyword" 
                          class="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-white/5 text-gray-400 border border-white/10 hover:border-custom-blue-500/30 hover:text-custom-blue-200 transition-all cursor-default">
                        {{ keyword }}
                    </span>
                </div>
            </div>
        </div>
      </section>

       <!-- Education & Certs -->
       <div class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-up" style="animation-delay: 0.5s">
            <!-- Education Panel -->
            <section class="animate-fade-up" style="animation-delay: 0.5s">
                 <div class="flex items-center gap-3 mb-8">
                    <div class="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                    </div>
                    <h2 class="text-2xl font-bold text-white font-display">Education</h2>
                 </div>
                 
                 <div class="space-y-6">
                     <div v-for="edu in education" :key="edu.id" class="group relative bg-white/[0.03] border border-white/[0.08] p-6 rounded-2xl transition-all duration-300 hover:bg-white/[0.05] hover:border-purple-500/30 hover:translate-y-[-2px] shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
                         <div class="flex justify-between items-start mb-3">
                             <h4 class="text-white font-bold text-lg leading-tight group-hover:text-purple-300 transition-colors">{{ edu.institution }}</h4>
                             <span class="text-[10px] font-mono font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded">
                                 {{ edu.date.split(' - ')[1] }}
                             </span>
                         </div>
                         <div class="flex flex-col gap-2">
                             <div class="text-purple-200/70 font-medium text-sm flex items-center gap-2">
                                 <span class="w-1.5 h-1.5 rounded-full bg-purple-500/50"></span>
                                 {{ edu.studyType }}
                             </div>
                             <div class="text-xs text-gray-500 font-mono flex items-center gap-2">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-50"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                 {{ edu.date }}
                             </div>
                         </div>
                     </div>
                 </div>
            </section>
            
             <!-- Certifications Panel -->
             <section class="animate-fade-up" style="animation-delay: 0.6s">
                 <div class="flex items-center gap-3 mb-8">
                    <div class="p-2 bg-custom-blue-500/10 rounded-lg text-custom-blue-400 border border-custom-blue-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </div>
                    <h2 class="text-2xl font-bold text-white font-display">Certifications</h2>
                 </div>

                  <div class="space-y-4">
                    <a v-for="cert in certifications" :key="cert.id" :href="cert.url" target="_blank" 
                       class="flex items-center gap-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-custom-blue-500/30 p-5 rounded-2xl transition-all duration-300 group backdrop-blur-sm shadow-[0_4px_20px_0_rgba(0,0,0,0.2)]">
                         <div class="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-custom-blue-500/10 border border-custom-blue-500/20 group-hover:bg-custom-blue-500/20 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-custom-blue-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                         </div>
                         <div class="flex-1 min-w-0">
                             <h4 class="text-sm font-bold text-white group-hover:text-custom-blue-200 transition-colors leading-tight mb-1 truncate">{{ cert.name }}</h4>
                             <div class="flex items-center gap-2">
                                 <span class="text-[10px] text-gray-500 font-medium px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase tracking-tighter">{{ cert.issuer }}</span>
                             </div>
                         </div>
                         <div class="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 hidden sm:block">
                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-custom-blue-400"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                         </div>
                    </a>
                  </div>
             </section>
       </div>

    </div>
  </div>
</template>

<style scoped>
.animate-fade-up {
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes fadeUp {
    from { 
        opacity: 0; 
        transform: translateY(30px);
    }
    to { 
        opacity: 1; 
        transform: translateY(0);
    }
}

.animate-pulse-slow {
    animation: pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-glow {
    0%, 100% {
        opacity: 0.8;
        transform: scale(1);
    }
    50% {
        opacity: 1;
        transform: scale(1.1);
        box-shadow: 0 0 25px rgba(59, 130, 246, 0.6);
    }
}

.experience-content :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin-top: 1rem;
}

.experience-content :deep(li) {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  color: #9ca3af; /* gray-400 */
  transition: all 0.3s ease;
}

.experience-content :deep(li:hover) {
  color: #f3f4f6; /* gray-100 */
  transform: translateX(4px);
}

.experience-content :deep(li::before) {
  content: "";
  position: absolute;
  left: 0;
  top: 0.6rem;
  width: 6px;
  height: 6px;
  background: #5CA7FF;
  border-radius: 2px;
  transform: rotate(45deg);
  box-shadow: 0 0 10px rgba(92, 167, 255, 0.5);
}
</style>
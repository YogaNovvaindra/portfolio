<script>
  import data from '@/assets/data.json';
  export default {
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
    <div class="space-y-5">
      <!-- About Me Section -->
      <div
        class="bg-[#202122] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 md:mx-12 relative overflow-hidden group hover:border-custom-blue-300/50 transition-all duration-500"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-custom-blue-300/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        <article data-page="about" class="relative z-10">
          <header>
            <div
              class="text-2xl font-bold text-white mb-8 fadein-bot title-section flex items-center"
            >
              About Me &nbsp;
              <div class="h-[2px] w-32 bg-custom-blue-300 md:w-96"></div>
            </div>
          </header>
  
          <section
            class="text-sm md:text-lg text-justify flex flex-col gap-6 md:flex-row md:gap-12 md:justify-left md:items-center"
          >
            <div class="flex justify-center items-center md:w-5/12 w-full">
              <div class="relative group/avatar w-9/12 md:w-full">
                <div class="absolute inset-0 bg-custom-blue-300/20 rounded-full blur-2xl group-hover/avatar:bg-custom-blue-300/30 transition-all duration-500"></div>
                <img
                  class="relative w-full rounded-full mb-3 fadein-up border-2 border-custom-blue-300/30 group-hover/avatar:border-custom-blue-300 transition-all duration-500 shadow-2xl"
                  src="/img/avatar2.webp"
                  alt="Profile Photo"
                />
              </div>
            </div>
            <div class="md:w-7/12">
              <p class="mb-3 md:mb-7 fadein-left fadeins-1 leading-relaxed text-gray-300">
                {{ summary }}
              </p>
            </div>
          </section>
        </article>
      </div>
  
      <!-- Experience Section -->
      <div
        class="bg-[#202122] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 md:mx-12 hover:border-custom-blue-300/50 transition-all duration-500"
      >
        <article data-page="about">
          <header>
            <div
              class="text-2xl font-bold text-white mb-8 fadein-bot title-section flex items-center"
            >
              <div class="h-[2px] w-10 bg-custom-blue-300 md:w-20"></div>
              &nbsp; Experience
            </div>
          </header>
          <section>
            <div class="space-y-8">
              <div
                v-for="exp in experience"
                :key="exp.id"
                class="relative border-l-2 border-custom-blue-300/50 pl-6 pb-8 last:pb-0 hover:border-custom-blue-300 transition-colors duration-300 group/exp"
              >
                <div class="absolute -left-[9px] top-0 w-4 h-4 bg-custom-blue-300 rounded-full ring-4 ring-[#202122] group-hover/exp:scale-125 group-hover/exp:ring-custom-blue-300/20 transition-all duration-300"></div>
                
                <div class="bg-[#1e1e1f] border border-[#383838] rounded-xl p-5 group-hover/exp:border-custom-blue-300/50 group-hover/exp:shadow-lg group-hover/exp:shadow-custom-blue-300/10 transition-all duration-300">
                  <div
                    class="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4"
                  >
                    <div>
                      <h3 class="text-xl font-semibold text-white mb-1">{{ exp.position }}</h3>
                      <p class="text-custom-blue-300 font-medium">
                        {{ exp.company }} <span class="text-gray-500">|</span> <span class="text-gray-400">{{ exp.location }}</span>
                      </p>
                    </div>
                    <span class="text-sm text-gray-400 whitespace-nowrap">{{ exp.date }}</span>
                  </div>
                  <div class="mt-3 text-sm text-gray-300 experience-content" v-html="exp.summary"></div>
                  <a
                    v-if="exp.url"
                    :href="exp.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-custom-blue-300 hover:text-custom-blue-200 text-sm mt-4 inline-flex items-center gap-2 group/link"
                  >
                    <span>Visit company website</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
  
      <!-- Education Section -->
      <div
        class="bg-[#202122] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 md:mx-12 hover:border-custom-blue-300/50 transition-all duration-500"
      >
        <article data-page="about">
          <header>
            <div
              class="text-2xl font-bold text-white mb-8 fadein-bot title-section flex items-center"
            >
              <div class="h-[2px] w-10 bg-custom-blue-300 md:w-20"></div>
              &nbsp; Education
            </div>
          </header>
          <section>
            <div class="space-y-8">
              <div
                v-for="edu in education"
                :key="edu.id"
                class="relative border-l-2 border-custom-blue-300/50 pl-6 pb-8 last:pb-0 hover:border-custom-blue-300 transition-colors duration-300 group/edu"
              >
                <div class="absolute -left-[9px] top-0 w-4 h-4 bg-custom-blue-300 rounded-full ring-4 ring-[#202122] group-hover/edu:scale-125 group-hover/edu:ring-custom-blue-300/20 transition-all duration-300"></div>
                
                <div class="bg-[#1e1e1f] border border-[#383838] rounded-xl p-5 group-hover/edu:border-custom-blue-300/50 group-hover/edu:shadow-lg group-hover/edu:shadow-custom-blue-300/10 transition-all duration-300">
                  <div
                    class="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4"
                  >
                    <div>
                      <h3 class="text-xl font-semibold text-white mb-1">{{ edu.institution }}</h3>
                      <p class="text-custom-blue-300 font-medium">
                        {{ edu.studyType }}{{ edu.area ? " - " + edu.area : "" }}
                      </p>
                    </div>
                    <span class="text-sm text-gray-400 whitespace-nowrap">{{ edu.date }}</span>
                  </div>
                  <div v-if="edu.score" class="flex items-center gap-3">
                    <span class="text-sm text-gray-400">GPA:</span>
                    <span class="text-sm text-custom-blue-300 font-semibold">{{ edu.score }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
  
      <!-- Certifications Section -->
      <div
        class="bg-[#202122] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 md:mx-12 hover:border-custom-blue-300/50 transition-all duration-500"
      >
        <article data-page="about">
          <header>
            <div
              class="text-2xl font-bold text-white mb-8 fadein-bot title-section flex items-center"
            >
              <div class="h-[2px] w-10 bg-custom-blue-300 md:w-20"></div>
              &nbsp; Certifications
            </div>
          </header>
          <section>
            <div class="grid grid-cols-1 gap-6 pb-10 md:grid-cols-2">
              <div
                v-for="cert in certifications"
                :key="cert.id"
                class="bg-[#1e1e1f] border border-[#383838] rounded-xl p-6 hover:border-custom-blue-300 transition-all duration-300 cert-card group/cert"
              >
                <div class="flex items-center gap-4 mb-4">
                  <div
                    class="flex-shrink-0 w-14 h-14 bg-[#282828] rounded-xl flex items-center justify-center group-hover/cert:bg-custom-blue-300/10 group-hover/cert:scale-110 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-custom-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-white">
                      {{ cert.name }}
                    </h3>
                  </div>
                </div>
                <p class="text-sm text-custom-blue-300 font-medium mb-3">{{ cert.issuer }}</p>
                <p class="text-xs text-gray-400 mb-4">{{ cert.date }}</p>
                <a
                  v-if="cert.url"
                  :href="cert.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-custom-blue-300 hover:text-custom-blue-200 text-sm inline-flex items-center gap-2 group/link"
                >
                  <span>View credential</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </article>
      </div>
  
      <!-- Skills Section -->
      <div
        class="bg-[#202122] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 md:mx-12 mb-5 hover:border-custom-blue-300/50 transition-all duration-500"
      >
        <article data-page="about">
          <header>
            <div
              class="text-2xl font-bold text-white mb-8 fadein-bot title-section flex items-center"
            >
              <div class="h-[2px] w-10 bg-custom-blue-300 md:w-20"></div>
              &nbsp; Skills
            </div>
          </header>
          <section>
            <div class="grid grid-cols-1 gap-6 pb-10 md:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="skill in skills"
                :key="skill.id"
                class="bg-[#1e1e1f] border border-[#383838] rounded-xl p-6 hover:border-custom-blue-300 transition-all duration-300 skill-card group/skill"
              >
                <div class="flex items-center gap-4 mb-4">
                  <div
                    class="flex-shrink-0 w-14 h-14 bg-[#282828] rounded-xl flex items-center justify-center group-hover/skill:bg-custom-blue-300/10 group-hover/skill:scale-110 transition-all duration-300"
                  >
                    <img
                      v-if="skill.icon"
                      :src="`https://cdn.simpleicons.org/${skill.icon}/70c6ff`"
                      :alt="skill.name"
                      class="w-8 h-8"
                      @error="handleImageError"
                    />
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-8 h-8 text-custom-blue-300"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                      />
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-white">
                    {{ skill.name }}
                  </h3>
                </div>
                <p class="text-sm text-gray-400 mb-5 leading-relaxed">{{ skill.description }}</p>
                <div class="flex items-center gap-3">
                  <div class="flex-1 bg-[#282828] rounded-full h-2 overflow-hidden">
                    <div
                      class="bg-gradient-to-r from-custom-blue-300 to-custom-blue-400 h-2 rounded-full transition-all duration-1000 ease-out skill-progress"
                      :style="{ width: (skill.level / 5) * 100 + '%' }"
                    ></div>
                  </div>
                  <span
                    class="text-sm text-custom-blue-300 font-semibold min-w-[3rem] text-right"
                  >{{ skill.level }}/5</span>
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  </template>
  
  <style scoped>
  .fadeins-1 {
    animation-delay: 500ms;
  }
  
  .skill-card {
    transition: all 0.3s ease;
  }
  
  .skill-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(138, 191, 255, 0.15);
    border-color: #8ABFFF;
  }
  
  .cert-card {
    transition: all 0.3s ease;
  }
  
  .cert-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(138, 191, 255, 0.15);
    border-color: #8ABFFF;
  }
  
  .skill-progress {
    box-shadow: 0 0 10px rgba(138, 191, 255, 0.5);
  }
  
  .experience-content :deep(ul) {
    list-style: none;
    padding-left: 0;
  }
  
  .experience-content :deep(li) {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  .experience-content :deep(li::before) {
    content: '•';
    position: absolute;
    left: 0;
    color: #8ABFFF;
    font-weight: bold;
    font-size: 1.2em;
  }
  
  .experience-content :deep(p) {
    margin: 0;
    line-height: 1.6;
  }
  </style>
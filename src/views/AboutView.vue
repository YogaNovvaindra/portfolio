<script>
  export default {
    data() {
      return {
        summary:
          "DevSecOps Engineer with hands-on experience building automated, secure, and observable infrastructure across on-premise and cloud environments. Skilled in Kubernetes, Docker, Ansible, GCP, and observability stacks (Grafana, Loki, Prometheus). Experienced with Wazuh SIEM, Zero Trust (Authentik), and ISO 27001 readiness. Strong foundation in virtualization (Proxmox, Ceph), Linux administration, and modern platform engineering practices.",
        experience: [
          {
            id: "kjlxqzisi4yyc10t0mufdivx",
            company: "Run System",
            position: "DevSecOps Engineer",
            location: "Yogyakarta",
            date: "April 2025 - Present",
            summary:
              "<ul><li><p>Optimized production infrastructure through container workload tuning, automated provisioning with Ansible, and consistent configuration enforcement.</p></li><li><p>Enhanced observability using Prometheus, Grafana, and Loki, cutting troubleshooting time significantly through refined dashboards and alerts.</p></li><li><p>Strengthened security operations by deploying Wazuh SIEM, integrating threat detection workflows, and supporting ISO 27001 audit evidence preparation.</p></li><li><p>Implemented platform capabilities including secure network access, Zero Trust/SSO with Authentik, and internal developer self-service tools.</p></li><li><p>Achieved improved deployment reliability and supported compliance readiness across multiple environments.</p></li></ul>",
            url: "https://runsystem.id/",
          },
          {
            id: "kn0j6wkk55uxi3go8mo3ymb0",
            company: "Run System",
            position: "DevSecOps Intern",
            location: "Yogyakarta",
            date: "August 2024 - December 2024",
            summary:
              "<ul><li><p>Supported infrastructure automation by writing basic Ansible playbooks and assisting in early Kubernetes environment testing.</p></li><li><p>Helped build initial observability components using Prometheus/Grafana/Loki for internal service monitoring.</p></li><li><p>Assisted in ISO 27001 preparation through documentation collection, Wazuh agent deployment, and vulnerability tracking.</p></li><li><p>Performed network support tasks including firewall adjustments, bandwidth checks, and evaluating VPN options.</p></li></ul>",
            url: "https://runsystem.id/",
          },
          {
            id: "o0c1uon7ss2qifvhgygvnpi5",
            company:
              "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
            position: "Cloud Computing Cohort 2024 Batch 1",
            location: "Online",
            date: "February 2024 - June 2024",
            summary:
              "<ul><li><p>Graduated from Bangkit with distinction (top 10% in Cloud Computing)</p></li><li><p>Developed backend services for an AI-powered Android app using Express.js, Docker, and GCP. Built Python inference endpoint, deployed APIs on VM, integrated Cloud Storage, and implemented automated CI/CD via GitHub Actions.</p></li></ul>",
            url: "",
          },
        ],
        education: [
          {
            id: "lj9x9gupqwhqqpf97cn1u07t",
            institution: "Politeknik Negeri Jember",
            studyType: "Informatics Engineering",
            area: "",
            score: "3.93/4",
            date: "July 2021 - June 2025",
            summary: "",
            url: "",
          },
          {
            id: "m0y4n2girg5rzje89ryq8tmh",
            institution: "SMKN 1 Nganjuk",
            studyType: "Network and Computer Engineering",
            area: "",
            score: "",
            date: "July 2016 - June 2019",
            summary: "",
            url: "",
          },
        ],
        certifications: [
          {
            id: "nd1qt82ojatws2lvuphkb38z",
            name: "Associate Cloud Engineer Certification",
            issuer: "Google",
            date: "October 2024 - October 2027",
            summary: "",
            url: "https://www.credly.com/badges/59776b45-4faf-4e4e-a4a2-ba4308993c61/linked_in_profile",
          },
          {
            id: "kld5ojnb492gxg22k2i6pvk6",
            name: "System Administration and IT Infrastructure Services",
            issuer: "Coursera",
            date: "February 2024 - No Expiration Date",
            summary: "",
            url: "https://coursera.org/verify/LTXMV8GMHVC4",
          },
          {
            id: "ebz6rg4a0go05jmrdx0qz834",
            name: "Applied Machine Learning for Cloud Engineer",
            issuer: "Dicoding Indonesia",
            date: "May 2024 - May 2027",
            summary: "",
            url: "https://www.dicoding.com/certificates/1OP8WN4OVXQK",
          },
          {
            id: "j51bliltby79is9prfpgrm6m",
            name: "Becoming a Google Cloud Engineer",
            issuer: "Dicoding Indonesia",
            date: "May 2024 - May 2027",
            summary: "",
            url: "https://www.dicoding.com/certificates/QLZ972GKEP5D",
          },
        ],
        skills: [
          {
            id: "kzx6mogfypx10twuqrpdqs29",
            name: "Containers & Orchestration",
            description: "Kubernetes, Docker",
            level: 4,
            keywords: [],
            icon: "kubernetes",
          },
          {
            id: "xj99jz2zkktw6c03gmu3vo70",
            name: "Automation",
            description:
              "CI/CD, ArgoCD, Ansible, GitHub Actions, Gitlab CI, Terraform",
            level: 4,
            keywords: [],
            icon: "ansible",
          },
          {
            id: "cjajcr7se30at0b826hmvavq",
            name: "Cloud & Infrastructure",
            description: "GCP, AWS, Linode, Proxmox, Ceph",
            level: 3,
            keywords: [],
            icon: "googlecloud",
          },
          {
            id: "cg0zgu39hpl6mwt3zk9aigfe",
            name: "Security & Observability",
            description: "Wazuh SIEM, Zero Trust, SSO, Prometheus, Grafana, Loki",
            level: 4,
            keywords: [],
            icon: "grafana",
          },
          {
            id: "hcfoseskc6x599bixuiwlge6",
            name: "Networking",
            description: "Firewalls, VPN, MikroTik",
            level: 3,
            keywords: [],
            icon: "cisco",
          },
          {
            id: "qosu7acs1q5gxjyllm7djb6l",
            name: "Core",
            description: "Linux (Ubuntu, Debian), Windows Server, Bash, Python",
            level: 4,
            keywords: [],
            icon: "linux",
          },
        ],
      };
    },
    methods: {
      handleImageError(event) {
        event.target.style.display = "none";
        const parent = event.target.parentElement;
        if (parent) {
          parent.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-blue-300">
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
        class="bg-[#202122] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 md:mx-12 relative overflow-hidden group hover:border-blue-300/50 transition-all duration-500"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-blue-300/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        <article data-page="about" class="relative z-10">
          <header>
            <div
              class="text-2xl font-bold text-white mb-8 fadein-bot title-section flex items-center"
            >
              About Me &nbsp;
              <div class="h-[2px] w-32 bg-blue-300 md:w-96"></div>
            </div>
          </header>
  
          <section
            class="text-sm md:text-lg text-justify flex flex-col gap-6 md:flex-row md:gap-12 md:justify-left md:items-center"
          >
            <div class="flex justify-center md:w-5/12">
              <div class="relative group/avatar">
                <div class="absolute inset-0 bg-blue-300/20 rounded-full blur-2xl group-hover/avatar:bg-blue-300/30 transition-all duration-500"></div>
                <img
                  class="relative w-9/12 md:w-full rounded-full mb-3 fadein-up border-2 border-blue-300/30 group-hover/avatar:border-blue-300 transition-all duration-500 shadow-2xl"
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
        class="bg-[#202122] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 md:mx-12 hover:border-blue-300/50 transition-all duration-500"
      >
        <article data-page="about">
          <header>
            <div
              class="text-2xl font-bold text-white mb-8 fadein-bot title-section flex items-center"
            >
              <div class="h-[2px] w-10 bg-blue-300 md:w-20"></div>
              &nbsp; Experience
            </div>
          </header>
          <section>
            <div class="space-y-8">
              <div
                v-for="exp in experience"
                :key="exp.id"
                class="relative border-l-2 border-blue-300/50 pl-6 pb-8 last:pb-0 hover:border-blue-300 transition-colors duration-300 group/exp"
              >
                <div class="absolute -left-[9px] top-0 w-4 h-4 bg-blue-300 rounded-full ring-4 ring-[#202122] group-hover/exp:scale-125 group-hover/exp:ring-blue-300/20 transition-all duration-300"></div>
                
                <div class="bg-[#1e1e1f] border border-[#383838] rounded-xl p-5 group-hover/exp:border-blue-300/50 group-hover/exp:shadow-lg group-hover/exp:shadow-blue-300/10 transition-all duration-300">
                  <div
                    class="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4"
                  >
                    <div>
                      <h3 class="text-xl font-semibold text-white mb-1">{{ exp.position }}</h3>
                      <p class="text-blue-300 font-medium">
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
                    class="text-blue-300 hover:text-blue-200 text-sm mt-4 inline-flex items-center gap-2 group/link"
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
        class="bg-[#202122] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 md:mx-12 hover:border-blue-300/50 transition-all duration-500"
      >
        <article data-page="about">
          <header>
            <div
              class="text-2xl font-bold text-white mb-8 fadein-bot title-section flex items-center"
            >
              <div class="h-[2px] w-10 bg-blue-300 md:w-20"></div>
              &nbsp; Education
            </div>
          </header>
          <section>
            <div class="space-y-8">
              <div
                v-for="edu in education"
                :key="edu.id"
                class="relative border-l-2 border-blue-300/50 pl-6 pb-8 last:pb-0 hover:border-blue-300 transition-colors duration-300 group/edu"
              >
                <div class="absolute -left-[9px] top-0 w-4 h-4 bg-blue-300 rounded-full ring-4 ring-[#202122] group-hover/edu:scale-125 group-hover/edu:ring-blue-300/20 transition-all duration-300"></div>
                
                <div class="bg-[#1e1e1f] border border-[#383838] rounded-xl p-5 group-hover/edu:border-blue-300/50 group-hover/edu:shadow-lg group-hover/edu:shadow-blue-300/10 transition-all duration-300">
                  <div
                    class="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4"
                  >
                    <div>
                      <h3 class="text-xl font-semibold text-white mb-1">{{ edu.institution }}</h3>
                      <p class="text-blue-300 font-medium">
                        {{ edu.studyType }}{{ edu.area ? " - " + edu.area : "" }}
                      </p>
                    </div>
                    <span class="text-sm text-gray-400 whitespace-nowrap">{{ edu.date }}</span>
                  </div>
                  <div v-if="edu.score" class="flex items-center gap-3">
                    <span class="text-sm text-gray-400">GPA:</span>
                    <span class="text-sm text-blue-300 font-semibold">{{ edu.score }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
  
      <!-- Certifications Section -->
      <div
        class="bg-[#202122] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 md:mx-12 hover:border-blue-300/50 transition-all duration-500"
      >
        <article data-page="about">
          <header>
            <div
              class="text-2xl font-bold text-white mb-8 fadein-bot title-section flex items-center"
            >
              <div class="h-[2px] w-10 bg-blue-300 md:w-20"></div>
              &nbsp; Certifications
            </div>
          </header>
          <section>
            <div class="grid grid-cols-1 gap-6 pb-10 md:grid-cols-2">
              <div
                v-for="cert in certifications"
                :key="cert.id"
                class="bg-[#1e1e1f] border border-[#383838] rounded-xl p-6 hover:border-blue-300 transition-all duration-300 cert-card group/cert"
              >
                <div class="flex items-center gap-4 mb-4">
                  <div
                    class="flex-shrink-0 w-14 h-14 bg-[#282828] rounded-xl flex items-center justify-center group-hover/cert:bg-blue-300/10 group-hover/cert:scale-110 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-white">
                      {{ cert.name }}
                    </h3>
                  </div>
                </div>
                <p class="text-sm text-blue-300 font-medium mb-3">{{ cert.issuer }}</p>
                <p class="text-xs text-gray-400 mb-4">{{ cert.date }}</p>
                <a
                  v-if="cert.url"
                  :href="cert.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-300 hover:text-blue-200 text-sm inline-flex items-center gap-2 group/link"
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
        class="bg-[#202122] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 md:mx-12 mb-5 hover:border-blue-300/50 transition-all duration-500"
      >
        <article data-page="about">
          <header>
            <div
              class="text-2xl font-bold text-white mb-8 fadein-bot title-section flex items-center"
            >
              <div class="h-[2px] w-10 bg-blue-300 md:w-20"></div>
              &nbsp; Skills
            </div>
          </header>
          <section>
            <div class="grid grid-cols-1 gap-6 pb-10 md:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="skill in skills"
                :key="skill.id"
                class="bg-[#1e1e1f] border border-[#383838] rounded-xl p-6 hover:border-blue-300 transition-all duration-300 skill-card group/skill"
              >
                <div class="flex items-center gap-4 mb-4">
                  <div
                    class="flex-shrink-0 w-14 h-14 bg-[#282828] rounded-xl flex items-center justify-center group-hover/skill:bg-blue-300/10 group-hover/skill:scale-110 transition-all duration-300"
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
                      class="w-8 h-8 text-blue-300"
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
                      class="bg-gradient-to-r from-blue-300 to-blue-400 h-2 rounded-full transition-all duration-1000 ease-out skill-progress"
                      :style="{ width: (skill.level / 5) * 100 + '%' }"
                    ></div>
                  </div>
                  <span
                    class="text-sm text-blue-300 font-semibold min-w-[3rem] text-right"
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
  .fadein-left {
    opacity: 0;
    animation: fadeInLeft 0.5s ease-out forwards;
  }
  
  .fadein-up {
    opacity: 0;
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  .fadein-bot {
    opacity: 0;
    animation: fadeInBot 0.5s ease-out forwards;
  }
  
  @keyframes fadeInLeft {
    0% {
      opacity: 0;
      transform: translateX(100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInBot {
    0% {
      opacity: 0;
      transform: translateY(-30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .fadeins-1 {
    animation-delay: 500ms;
  }
  
  .skill-card {
    transition: all 0.3s ease;
  }
  
  .skill-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(112, 198, 255, 0.15);
    border-color: #70c6ff;
  }
  
  .cert-card {
    transition: all 0.3s ease;
  }
  
  .cert-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(112, 198, 255, 0.15);
    border-color: #70c6ff;
  }
  
  .skill-progress {
    box-shadow: 0 0 10px rgba(112, 198, 255, 0.5);
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
    color: #70c6ff;
    font-weight: bold;
    font-size: 1.2em;
  }
  
  .experience-content :deep(p) {
    margin: 0;
    line-height: 1.6;
  }
  </style>
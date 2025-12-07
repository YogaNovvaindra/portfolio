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
          date: "February 2024- No Expiration Date",
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
          description: "CI/CD, Ansible, GitHub Actions, Gitlab CI, Terraform",
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
      activeTab: 1,
    };
  },
  methods: {
    handleImageError(event) {
      // Fallback to a default icon if image fails to load
      event.target.style.display = 'none';
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
  <div
    class="bg-[#202122] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 md:mx-12 mb-5"
  >
    <article data-page="about">
      <header>
        <div
          class="text-2xl font-bold text-white mb-5 fadein-bot title-section flex items-center"
        >
          About Me &nbsp;
          <div
            class="h-[1px] w-32 bg-blue-300 md:w-96 aos-init aos-animate"
            data-aos="zoom-in-left"
            data-aos-duration="600"
          ></div>
        </div>
      </header>

      <section
        class="text-sm md:text-lg text-justify flex flex-col gap-4 md:flex-row md:gap-8 md:justify-left md:items-center"
      >
        <div class="flex justify-center">
          <img
            class="w-9/12 rounded-full mb-3 fadein-up"
            src="/img/avatar2.webp"
            alt="Foto"
          />
        </div>
        <div class="md:w-7/12">
          <p class="mb-3 md:mb-7 fadein-left fadeins-1">{{ summary }}</p>
        </div>
      </section>
    </article>
  </div>

  <div
    class="bg-[#202122] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 md:mx-12 mb-5"
  >
    <article data-page="about">
      <header>
        <div
          class="text-2xl font-bold text-white mb-5 fadein-bot title-section flex items-center"
        >
          <div
            class="h-[1px] w-10 bg-blue-300 md:w-20 aos-init aos-animate"
            data-aos="zoom-in-left"
            data-aos-duration="600"
          ></div>
          &nbsp; Experience
        </div>
      </header>
      <section>
        <div class="space-y-6">
          <div
            v-for="exp in experience"
            :key="exp.id"
            class="border-l-2 border-blue-300 pl-4"
          >
            <div
              class="flex flex-col md:flex-row md:justify-between md:items-start"
            >
              <div>
                <h3 class="text-lg font-semibold">{{ exp.position }}</h3>
                <p class="text-blue-300">
                  {{ exp.company }} | {{ exp.location }}
                </p>
              </div>
              <span class="text-sm text-gray-400">{{ exp.date }}</span>
            </div>
            <div class="mt-2 text-sm" v-html="exp.summary"></div>
            <a
              v-if="exp.url"
              :href="exp.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-300 hover:text-blue-200 text-sm mt-2 inline-block"
              >Visit company website →</a
            >
          </div>
        </div>
      </section>
    </article>
  </div>

  <div
    class="bg-[#202122] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 md:mx-12 mb-5"
  >
    <article data-page="about">
      <header>
        <div
          class="text-2xl font-bold text-white mb-5 fadein-bot title-section flex items-center"
        >
          <div
            class="h-[1px] w-10 bg-blue-300 md:w-20 aos-init aos-animate"
            data-aos="zoom-in-left"
            data-aos-duration="600"
          ></div>
          &nbsp; Education
        </div>
      </header>
      <section>
        <div class="space-y-6">
          <div
            v-for="edu in education"
            :key="edu.id"
            class="border-l-2 border-blue-300 pl-4"
          >
            <div
              class="flex flex-col md:flex-row md:justify-between md:items-start"
            >
              <div>
                <h3 class="text-lg font-semibold">{{ edu.institution }}</h3>
                <p class="text-blue-300">
                  {{ edu.studyType }}{{ edu.area ? ", " + edu.area : "" }}
                </p>
                <p v-if="edu.score" class="text-sm text-gray-400">
                  GPA: {{ edu.score }}
                </p>
              </div>
              <span class="text-sm text-gray-400">{{ edu.date }}</span>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>

  <div
    class="bg-[#202122] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 md:mx-12 mb-5"
  >
    <article data-page="about">
      <header>
        <div
          class="text-2xl font-bold text-white mb-5 fadein-bot title-section flex items-center"
        >
          <div
            class="h-[1px] w-10 bg-blue-300 md:w-20 aos-init aos-animate"
            data-aos="zoom-in-left"
            data-aos-duration="600"
          ></div>
          &nbsp; Certifications
        </div>
      </header>
      <section>
        <div class="space-y-6">
          <div
            v-for="cert in certifications"
            :key="cert.id"
            class="border-l-2 border-blue-300 pl-4"
          >
            <div
              class="flex flex-col md:flex-row md:justify-between md:items-start"
            >
              <div>
                <h3 class="text-lg font-semibold">{{ cert.name }}</h3>
                <p class="text-blue-300">{{ cert.issuer }}</p>
              </div>
              <span class="text-sm text-gray-400">{{ cert.date }}</span>
            </div>
            <a
              v-if="cert.url"
              :href="cert.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-300 hover:text-blue-200 text-sm mt-2 inline-block"
              >View certification →</a
            >
          </div>
        </div>
      </section>
    </article>
  </div>

  <div
    class="bg-[#202122] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 md:mx-12 mb-5"
  >
    <article data-page="about">
      <header>
        <div
          class="text-2xl font-bold text-white mb-5 fadein-bot title-section flex items-center"
        >
          <div
            class="h-[1px] w-10 bg-blue-300 md:w-20 aos-init aos-animate"
            data-aos="zoom-in-left"
            data-aos-duration="600"
          ></div>
          &nbsp; Skills
        </div>
      </header>
      <section>
        <ul
          class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 mb-5"
        >
          <li class="mr-2">
            <button
              class="inline-block px-4 py-3 rounded-lg hover:text-white"
              :class="{
                'text-blue-300 bg-blue-300 bg-opacity-10': activeTab === 1,
              }"
              @click="activeTab = 1"
            >
              All Skills
            </button>
          </li>
        </ul>
        <div v-show="activeTab === 1">
          <div
            class="grid grid-cols-1 gap-4 pb-32 md:grid-cols-2 lg:grid-cols-3"
          >
            <div
              v-for="skill in skills"
              :key="skill.id"
              class="bg-[#1e1e1f] border border-[#383838] rounded-xl p-5 hover:border-blue-300 transition-all duration-300 skill-card"
            >
              <div class="flex items-center gap-3 mb-3">
                <div class="flex-shrink-0 w-12 h-12 bg-[#282828] rounded-lg flex items-center justify-center">
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
                <h3 class="text-lg font-semibold text-white">{{ skill.name }}</h3>
              </div>
              <p class="text-sm text-gray-400 mb-4">{{ skill.description }}</p>
              <div class="flex items-center gap-2">
                <div class="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    class="bg-blue-300 h-2.5 rounded-full transition-all duration-500"
                    :style="{ width: (skill.level / 5) * 100 + '%' }"
                  ></div>
                </div>
                <span class="text-xs text-gray-400 font-medium min-w-[3rem] text-right"
                  >{{ skill.level }}/5</span
                >
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<style>
.fadein-left {
  opacity: 0;
  animation: fadeInLeft 0.5s ease-out forwards;
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

.fadeins-1 {
  animation-delay: 500ms;
}

.fadeins-2 {
  animation-delay: 800ms;
}

.item-tech:hover .img-tech {
  transform: scale(1.3);
}

.item-tech:hover .tech {
  transform: translateY(-12px);
}

.item-tech:hover .status-tech {
  opacity: 1;
}

.skill-card {
  transition: all 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(112, 198, 255, 0.1);
}
</style>

<script>
  export default {
    data() {
      return {
        items: [
          {
            id: 1,
            name: "Kubernetes Homelab Platform",
            imageUrl: "kube",
            status:
              "A production-like, self-hosted Kubernetes environment for automation, observability, and security experimentation.",
            tech: "Kubernetes, Docker, Ansible, GitOps, Prometheus, Grafana, Loki, Wazuh SIEM, Authentik, Traefik, Nginx",
            github: "https://github.com/YogaNovvaindra/kube",
            demo: "null",
            featured: true,
          },
          {
            id: 2,
            name: "Virtualization & Distributed Storage Platform",
            imageUrl: "proxmox",
            status:
              "A high-availability on-prem virtualization and distributed storage environment powering multiple clusters and lab workloads.",
            tech: "Proxmox VE, Ceph, Virtualization, Networking, VLANs, Firewalls",
            github: "null",
            demo: "null",
            featured: false,
          },
          {
            id: 3,
            name: "Personal Blog",
            imageUrl: "ghost",
            status:
              "A personal blog about tech and lifestyle built with Ghost CMS, hosted on a homelab kubernetes cluster.",
            tech: "Ghost, Kubernetes, Mysql",
            github: "null",
            demo: "https://ygnv.my.id",
            featured: false,
          },
          {
            id: 4,
            name: "AaPanel Hosting",
            imageUrl: "aapanel",
            status:
              "A self-hosted web hosting control panel for managing websites, databases, and server configurations.",
            tech: "AaPanel, Docker, Proxmox",
            github: "null",
            demo: "null",
            featured: false,
          },
          {
            id: 5,
            name: "Craft It",
            imageUrl: "craftit",
            status:
              "CraftIt is a mobile application that allows users to search for images of items they have lying around the house and find creative ways to repurpose them.",
            tech: "Express, Kotlin, openCV, Python",
            github: "https://github.com/YogaNovvaindra/craft_backend",
            demo: "null",
            featured: false,
          },
          {
            id: 6,
            name: "Eco Guardian",
            imageUrl: "ecoguardian",
            status:
              "A platform utilizing Internet of Things to provide real-time environmental pollution monitoring through sensors and a web application",
            tech: "Next.js, Tailwind, Prisma, Python, Arduino",
            github: "https://github.com/YogaNovvaindra/EcoGuardian-web",
            demo: "https://ecoguardian.yoganova.my.id",
            featured: false,
          },
          {
            id: 7,
            name: "Bimbel Linear",
            imageUrl: "linear",
            status:
              "Bimbel Linear facilitates seamless communication between tutors and students, with tutors serving as instructors. The platform offers scheduling capabilities for organizing classes.",
            tech: "Next.js, Tailwind, Prisma",
            github: "https://github.com/YogaNovvaindra/bimbel_next13",
            demo: "https://linear.yoganova.my.id",
            featured: false,
          },
          {
            id: 8,
            name: "Tolonto Game App",
            imageUrl: "tolonto",
            status:
              "POS application for rental of playstation and computer games, this application is used to record transactions and manage stock of available playstation.",
            tech: "PHP, Tailwind",
            github: "https://github.com/YogaNovvaindra/Tolonto-TA",
            demo: "https://tolonto.yoganova.my.id",
            featured: false,
          },
        ],
      };
    },
  };
  </script>
  
  <template>
    <div class="space-y-5">
      <!-- Portfolio Section -->
      <div
        class="px-5 py-5 md:px-12 md:py-10 text-left text-amber-50 mx-3 md:mx-12 mb-5"
      >
        <article data-page="portfolio">
          <header>
            <div
              class="text-2xl font-bold text-white mb-3 fadein-bot title-section text-center"
            >
              Things I've Built
            </div>
            <p class="text-gray-400 text-sm md:text-base mb-10 text-center">
              From infrastructure to web applications
            </p>
          </header>
  
          <section>
            <div
              class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <div
                v-for="(item, index) in items"
                :key="item.id"
                class="project-card bg-[#1e1e1f] border border-[#383838] rounded-xl overflow-hidden group hover:border-blue-300/50 transition-all duration-300 flex flex-col"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <!-- Featured badge -->
                <div v-if="item.featured" class="absolute top-3 right-3 z-10">
                  <span
                    class="px-3 py-1 text-xs font-semibold rounded-full bg-blue-300 text-[#1e1e1f]"
                  >
                    Featured
                  </span>
                </div>
  
                <!-- Image container -->
                <div class="relative h-56 overflow-hidden">
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-[#1e1e1f] via-transparent to-transparent opacity-60 z-10"
                  ></div>
                  <img
                    :alt="item.name"
                    loading="lazy"
                    decoding="async"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    :src="'/img/portfolio-' + item.imageUrl + '.webp'"
                  />
                </div>
  
                <!-- Content -->
                <div class="p-5 flex flex-col h-full">
                  <h3 class="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {{ item.name }}
                  </h3>
  
                  <p class="text-sm text-gray-400 leading-relaxed line-clamp-3 mt-3 flex-grow">
                    {{ item.status }}
                  </p>
  
                  <div class="text-xs text-blue-300 mt-4">
                    {{ item.tech }}
                  </div>
  
                  <!-- Links - Always at bottom -->
                  <div class="flex gap-3 mt-4 pt-3 border-t border-[#383838]">
                    <a
                      v-if="item.github !== 'null'"
                      :href="item.github"
                      target="_blank"
                      rel="noreferrer"
                      title="View github repository"
                      class="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-300 transition-colors group/link"
                    >
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                        ></path>
                      </svg>
                      <span>Code</span>
                    </a>
  
                    <a
                      v-if="item.demo !== 'null'"
                      :href="item.demo"
                      target="_blank"
                      rel="noreferrer"
                      title="View live demo"
                      class="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-300 transition-colors group/link"
                    >
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                        ></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  </template>
  
  <style scoped>
  .fadein-bot {
    opacity: 0;
    animation: fadeInBot 0.5s ease-out forwards;
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
  
  .project-card {
    position: relative;
    transition: all 0.3s ease;
    animation: fadeZoomIn 0.6s ease-out backwards;
  }
  
  .project-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(112, 198, 255, 0.15);
    border-color: #70c6ff;
  }
  
  @keyframes fadeZoomIn {
    0% {
      opacity: 0;
      transform: scale(0.9) translateY(20px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>
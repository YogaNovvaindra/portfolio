<script>
  import data from '@/assets/data.json';
  export default {
    data() {
      return {
        items: data.portfolio,
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
                class="project-card bg-[#1e1e1f] border border-[#383838] rounded-xl overflow-hidden group hover:border-custom-blue-300/50 transition-all duration-300 flex flex-col"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <!-- Featured badge -->
                <div v-if="item.featured" class="absolute top-3 right-3 z-10">
                  <span
                    class="px-3 py-1 text-xs font-semibold rounded-full bg-custom-blue-300 text-[#1e1e1f]"
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
                  <h3 class="text-lg font-semibold text-white group-hover:text-custom-blue-300 transition-colors">
                    {{ item.name }}
                  </h3>
  
                  <p class="text-sm text-gray-400 leading-relaxed line-clamp-3 mt-3 flex-grow">
                    {{ item.status }}
                  </p>
  
                  <div class="text-xs text-custom-blue-300 mt-4">
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
                      class="flex items-center gap-2 text-sm text-gray-400 hover:text-custom-blue-300 transition-colors group/link"
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
                      class="flex items-center gap-2 text-sm text-gray-400 hover:text-custom-blue-300 transition-colors group/link"
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
  .project-card {
    position: relative;
    transition: all 0.3s ease;
    animation: fadeZoomIn 0.6s ease-out backwards;
  }
  
  .project-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(138, 191, 255, 0.15);
    border-color: #8ABFFF;
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
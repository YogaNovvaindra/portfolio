<script>
export default {
  data() {
    return {
      activeTab: 1,
      tech: [
        {
          id: 1,
          name: 'Kubernetes',
          imageUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/kubernetes.png',
          status: 'Expert'
        },
        {
          id: 2,
          name: 'Docker',
          imageUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/docker.png',
          status: 'Expert'
        },
        {
          id: 3,
          name: 'Terraform',
          imageUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/terraform.png',
          status: 'Advanced'
        },
        {
          id: 4,
          name: 'Ansible',
          imageUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/ansible.png',
          status: 'Advanced'
        },
        {
          id: 5,
          name: 'Grafana',
          imageUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/grafana.png',
          status: 'Advanced'
        },
        {
          id: 6,
          name: 'ArgoCD',
          imageUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/argo-cd.png',
          status: 'Advanced'
        },
        {
          id: 7,
          name: 'Python',
          imageUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/python.png',
          status: 'Advanced'
        },
        {
          id: 8,
          name: 'GitOps',
          imageUrl: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png',
          status: 'Methodology'
        },
      ],
      tools: [
        {
          id: 1,
          name: 'GCP',
          imageUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/google-cloud-platform.png',
          status: 'Cloud Platform'
        },
        {
          id: 2,
          name: 'AWS',
          imageUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/aws-light.png',
          status: 'Cloud Platform'
        },
        {
          id: 3,
          name: 'Azure',
          imageUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/azure.png',
          status: 'Cloud Platform'
        },
        {
          id: 4,
          name: 'Ceph',
          imageUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/ceph.png',
          status: 'Storage'
        },
        {
          id: 5,
          name: 'Proxmox',
          imageUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/proxmox-light.png',
          status: 'Virtualization'
        }
      ]
    };
  }
}
</script>
<template>
  <div
    class="bg-[#202122] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-12 mb-5">
    <article data-page="about">

      <header>
        <div class="text-2xl font-bold text-white mb-5 fadein-bot title-section flex items-center">
          About Me &nbsp;
          <div class="h-[1px] w-32 bg-blue-300 md:w-96 aos-init aos-animate" data-aos="zoom-in-left"
            data-aos-duration="600"></div>
        </div>
      </header>

      <section
        class="text-sm md:text-lg text-justify flex flex-col gap-4 md:flex-row md:gap-8 md:justify-left md:items-center">
        <div class="flex justify-center">
          <img class="w-9/12 rounded-full mb-3 fadein-up"
            src="/img/avatar2.png" alt="Foto">
        </div>
        <div class="md:w-7/12">
          <p class="mb-3 md:mb-7 fadein-left fadeins-1">
            Hello! I'm Yoga Novaindra,
          </p>
          <p class="mb-3 fadein-left fadeins-1">
            🛠 DevOps Engineer specializing in GitOps-driven Kubernetes deployments and cloud-native architectures.
            Passionate about automating workflows, optimizing deployments, and building resilient infrastructure.
          </p>
          <p class="mb-3 fadein-left fadeins-2">
            🏡 Homelab enthusiast running self-hosted Kubernetes clusters with MicroK8s and ArgoCD. Focused on secure
            secret management, monitoring, and continuous improvement of cloud-native systems.
          </p>
        </div>

      </section>

    </article>
  </div>

  <div class="px-5 py-5 md:px-12 md:py-10 text-left text-amber-50 mx-3">
    <article data-page="about">
      <header>
        <div class="text-2xl font-bold text-white mb-5 fadein-bot title-section flex items-center">
          <div class="h-[1px] w-10 bg-blue-300 md:w-20 aos-init aos-animate" data-aos="zoom-in-left"
            data-aos-duration="600"></div>
          &nbsp; Skills
        </div>
      </header>
      <section>
        <div>
          <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 mb-5">
            <li class="mr-2">
              <button class="inline-block px-4 py-3 rounded-lg hover:text-white"
                :class="{ 'text-blue-300 bg-blue-300 bg-opacity-10': activeTab === 1 }" @click="activeTab = 1">Core
                Tech</button>
            </li>
            <li class="mr-2">
              <button class="inline-block px-4 py-3 rounded-lg hover:text-white"
                :class="{ 'text-blue-300 bg-blue-300 bg-opacity-10': activeTab === 2 }" @click="activeTab = 2">Cloud &
                platform</button>
            </li>
          </ul>
        </div>
        <div v-show="activeTab === 1">
          <div class="grid grid-cols-2 gap-4 pb-32 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-10 2xl:gap-12">
            <div v-for="item in tech" :key="item.id">
              <div
                class="item-tech flex cursor-pointer items-center gap-2 rounded border border-blue-300 px-2 py-2 hover:bg-blue-300 hover:bg-opacity-10 md:gap-3 lg:px-3">
                <div
                  class="flex h-12 w-12 items-center justify-center p-0 lg:h-16 lg:w-16 lg:p-2 zoom-in aspect-square">
                  <img alt="Tech icon"
                    class="img-tech drop-shadow-xl transition-all duration-300 h-full w-full object-contain p-1"
                    :src="item.imageUrl">
                </div>
                <div class="flex items-center text-sm md:text-base lg:text-lg">
                  <div class="tech font-medium text-secondary transition-all duration-300 translate-y-0 ">{{ item.name
                  }}
                  </div>
                  <div
                    class="status-tech opacity-0 absolute mt-5 text-[10px] text-blue-300 transition-all duration-300 md:text-xs lg:text-sm">
                    {{ item.status }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="activeTab === 2">
          <div class="grid grid-cols-2 gap-4 pb-32 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-10 2xl:gap-12">
            <div v-for="item in tools" :key="item.id">
              <div
                class="item-tech flex cursor-pointer items-center gap-2 rounded border border-blue-300 px-2 py-2 hover:bg-blue-300 hover:bg-opacity-10 md:gap-3 lg:px-3">
                <div
                  class="flex h-12 w-12 items-center justify-center p-0 lg:h-16 lg:w-16 lg:p-2 zoom-in aspect-square">
                  <img alt="Tech icon"
                    class="img-tech drop-shadow-xl transition-all duration-300 h-full w-full object-contain p-1"
                    :src="item.imageUrl">
                </div>
                <div class="flex items-center text-sm md:text-base lg:text-lg">
                  <div class="tech font-medium text-secondary transition-all duration-300 translate-y-0 ">{{ item.name
                  }}
                  </div>
                  <div
                    class="status-tech opacity-0 absolute mt-5 text-[10px] text-blue-300 transition-all duration-300 md:text-xs lg:text-sm">
                    {{ item.status }}</div>
                </div>
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

.img-tech,
.tech {
  transition: transform 0.3s ease;
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
</style>

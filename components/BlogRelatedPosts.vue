<template>
  <div v-if="posts && posts.length > 0" class="mt-32 pt-20 border-t border-zinc-900 text-left">
    <!-- Section Header -->
    <div class="flex items-end justify-between mb-10">
      <div>
        <span class="text-xs font-bold tracking-widest text-blue-500 uppercase font-mono">Recommended</span>
        <h2 class="text-3xl font-extrabold tracking-tight text-white mt-2">More from the blog</h2>
      </div>
      <NuxtLink to="/blog" class="group flex items-center gap-1.5 text-sm font-semibold text-zinc-400 hover:text-blue-400 transition-colors">
        View all posts
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="transform group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </NuxtLink>
    </div>

    <!-- Medium-style Horizontal Row Stack -->
    <div class="flex flex-col">
      <div 
        v-for="post in posts" 
        :key="post.id"
        class="group border-b border-zinc-900/60 py-8 first:pt-0 last:border-b-0 last:pb-0"
      >
        <NuxtLink :to="`/blog/${post.slug}`" class="block">
          <div class="flex flex-col-reverse md:flex-row justify-between items-stretch md:items-center gap-6 md:gap-12">
            
            <!-- Left Side: Content & Typography (Takes primary weight) -->
            <div class="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <!-- Metadata line -->
                <div class="flex items-center gap-2 mb-3">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                    {{ post.primary_tag?.name || 'Article' }}
                  </span>
                  <span class="text-zinc-700">&bull;</span>
                  <span class="text-[10px] font-mono text-zinc-500">{{ post.reading_time || 3 }} min read</span>
                </div>

                <!-- Title (High-contrast, clean bold hover states) -->
                <h3 class="text-xl lg:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 leading-snug tracking-tight">
                  {{ post.title }}
                </h3>
                
                <!-- Excerpt (Faded, perfectly padded, 2 lines max) -->
                <p class="mt-2.5 text-sm text-zinc-400 leading-relaxed line-clamp-2 max-w-3xl">
                  {{ post.custom_excerpt || post.excerpt }}
                </p>
              </div>

              <!-- Footer info (Author & Date) -->
              <div class="mt-6 flex items-center gap-4 text-xs text-zinc-500">
                <div class="flex items-center gap-2">
                  <img v-if="post.primary_author?.profile_image" :src="post.primary_author.profile_image" alt="" class="w-5 h-5 rounded-full object-cover border border-zinc-800" />
                  <span class="font-medium text-zinc-400">{{ post.primary_author?.name || 'Yoga Novaindra' }}</span>
                </div>
                <span class="text-zinc-700">&bull;</span>
                <span class="font-mono text-[10px]">{{ formatDate(post.published_at) }}</span>
                
                <!-- Tiny desktop-only arrow reveal -->
                <span class="ml-auto hidden md:flex items-center gap-1 text-xs font-bold text-blue-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  Read post
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
              </div>
            </div>

            <!-- Right Side: Thumbnail Cover (Sleek horizontal block on desktop, full-width on mobile) -->
            <div class="w-full md:w-[200px] shrink-0 aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950/60 border border-zinc-900 relative">
              <img 
                v-if="post.feature_image" 
                :src="post.feature_image" 
                :alt="post.title"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 ease-out absolute inset-0" 
              />
              <div v-else class="w-full h-full bg-zinc-900/50 flex items-center justify-center absolute inset-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-zinc-700"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              </div>
            </div>

          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  posts: {
    type: Array,
    required: true,
    default: () => []
  }
})

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })
}
</script>

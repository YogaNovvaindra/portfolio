<template>
  <div class="min-h-screen bg-zinc-950">
    <!-- Reading Progress Bar -->
    <div class="fixed top-0 left-0 w-full h-1 bg-zinc-900 z-50">
      <div class="h-full bg-blue-500 transition-all duration-150 ease-out" :style="{ width: readingProgress + '%' }"></div>
    </div>
    <!-- Full-Width Title Hero -->
    <!-- Skeleton Hero (shown while loading) -->
    <div v-if="loading" class="relative w-full h-[40vh] md:h-[55vh] skeleton-shimmer flex items-end">
      <div class="w-full px-4 pb-12 md:pb-20 max-w-5xl mx-auto">
        <div class="h-8 w-2/3 mx-auto rounded mb-4 bg-zinc-800/80"></div>
        <div class="h-8 w-1/2 mx-auto rounded bg-zinc-800/80"></div>
      </div>
    </div>

    <header v-if="!loading && !error && post" class="relative w-full h-[40vh] md:h-[55vh] flex items-end justify-center overflow-hidden title-reveal">
      <!-- Background Image & Overlay -->
      <div class="absolute inset-0 z-0 overflow-hidden">
        <img v-if="post.feature_image" ref="heroImg" :src="post.feature_image" :alt="post.title" :style="{ transform: 'translateY(' + heroParallaxY + 'px) scale(1.1)' }" class="w-full h-full object-cover will-change-transform" />
        <div v-else class="w-full h-full bg-zinc-900/80"></div>
        <!-- Dark Gradient Overlay for Title -->
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent"></div>
      </div>

      <!-- Overlaid Title Only -->
      <div class="relative z-10 container mx-auto px-4 max-w-5xl text-center pb-12 md:pb-20">
        <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl">
          {{ post.title }}
        </h1>
      </div>
    </header>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 max-w-4xl">
      <!-- Back Button -->
      <div class="mb-12 fadein-bot text-left">
        <router-link to="/blog" class="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-blue-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </router-link>
      </div>

      <!-- Skeleton Loading State -->
      <div v-if="loading">
        <!-- Meta skeleton -->
        <div class="mb-16">
          <div class="flex items-center gap-3 mb-8">
            <div class="h-3 w-16 rounded-full skeleton-shimmer"></div>
            <div class="h-3 w-4 rounded skeleton-shimmer"></div>
            <div class="h-3 w-24 rounded-full skeleton-shimmer"></div>
          </div>
          <!-- Excerpt skeleton -->
          <div class="h-6 w-full rounded mb-3 skeleton-shimmer"></div>
          <div class="h-6 w-5/6 rounded mb-3 skeleton-shimmer"></div>
          <div class="h-6 w-3/4 rounded mb-10 skeleton-shimmer"></div>
          <!-- Author skeleton -->
          <div class="flex items-center gap-4">
            <div class="h-14 w-14 rounded-full skeleton-shimmer"></div>
            <div>
              <div class="h-4 w-36 rounded mb-2 skeleton-shimmer"></div>
              <div class="h-3 w-16 rounded skeleton-shimmer"></div>
            </div>
          </div>
        </div>
        <!-- Body skeleton lines -->
        <div class="space-y-3">
          <div class="h-4 w-full rounded skeleton-shimmer"></div>
          <div class="h-4 w-full rounded skeleton-shimmer"></div>
          <div class="h-4 w-5/6 rounded skeleton-shimmer"></div>
          <div class="h-4 w-full rounded skeleton-shimmer"></div>
          <div class="h-4 w-4/5 rounded skeleton-shimmer"></div>
          <div class="h-4 w-0 rounded mt-8"></div>
          <div class="h-5 w-1/3 rounded skeleton-shimmer mt-8"></div>
          <div class="h-4 w-full rounded skeleton-shimmer"></div>
          <div class="h-4 w-full rounded skeleton-shimmer"></div>
          <div class="h-4 w-3/4 rounded skeleton-shimmer"></div>
          <div class="h-4 w-full rounded skeleton-shimmer"></div>
          <div class="h-4 w-5/6 rounded skeleton-shimmer"></div>
          <div class="h-5 w-1/4 rounded skeleton-shimmer mt-8"></div>
          <div class="h-4 w-full rounded skeleton-shimmer"></div>
          <div class="h-4 w-full rounded skeleton-shimmer"></div>
          <div class="h-4 w-2/3 rounded skeleton-shimmer"></div>
        </div>
      </div>
      <div v-else-if="error" class="text-center py-20 fadein-bot">
        <div class="inline-block bg-red-500/10 border border-red-500/20 rounded-xl px-6 py-4">
          <p class="text-red-400">{{ error }}</p>
          <button @click="fetchPost" class="mt-4 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm font-medium">
            Try Again
          </button>
        </div>
      </div>

      <!-- Article Content -->
      <article v-else-if="post" class="fadein-bot">
        <!-- Post Meta Information Below Hero -->
        <div class="mb-16 text-left">
          <div class="flex items-center justify-start gap-4 text-sm font-medium mb-8 flex-wrap">
            <div v-if="post.tags && post.tags.length > 0" class="flex items-center gap-2 flex-wrap">
              <template v-if="!showAllTags">
                <span class="inline-flex items-center gap-1.5 uppercase tracking-widest text-xs">
                  <router-link
                    :to="{ path: '/blog', query: { tag: (post.primary_tag || post.tags[0]).slug } }"
                    class="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                  >
                    {{ (post.primary_tag || post.tags[0]).name }}
                  </router-link>
                  <button
                    v-if="post.tags.length > 1"
                    @click="showAllTags = true"
                    class="text-zinc-500 font-bold opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                    :title="`View all ${post.tags.length} tags`"
                  >+{{ post.tags.length - 1 }}</button>
                </span>
              </template>
              <template v-else>
                <span
                  v-for="(tag, index) in post.tags"
                  :key="tag.id"
                  class="inline-flex items-center uppercase tracking-widest text-xs"
                >
                  <router-link
                    :to="{ path: '/blog', query: { tag: tag.slug } }"
                    class="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                  >{{ tag.name }}</router-link>
                  <span v-if="index < post.tags.length - 1" class="text-zinc-600 ml-2 mr-2">Â·</span>
                </span>
                <button @click="showAllTags = false" class="text-zinc-600 hover:text-zinc-400 transition-colors text-xs ml-1" title="Collapse">â†‘</button>
              </template>
            </div>
            <router-link v-else-if="post.primary_tag" :to="{ path: '/blog', query: { tag: post.primary_tag.slug } }" class="text-blue-400 uppercase tracking-widest text-xs hover:text-blue-300 hover:underline transition-colors">
              {{ post.primary_tag.name }}
            </router-link>
            <span class="text-zinc-700">|</span>
            <time :datetime="post.published_at" :title="formatDate(post.published_at)" class="text-zinc-500 uppercase tracking-widest text-xs cursor-help">
              {{ getRelativeTime(post.published_at) }}
            </time>
          </div>

          <p v-if="post.custom_excerpt || post.excerpt" class="text-lg md:text-xl lg:text-2xl text-zinc-300 mb-10 leading-relaxed max-w-3xl italic">
            "{{ post.custom_excerpt || post.excerpt }}"
          </p>

          <div class="flex items-center gap-4">
            <img v-if="post.primary_author?.profile_image" :src="post.primary_author.profile_image" alt="" class="h-14 w-14 rounded-full object-cover border-2 border-zinc-800" />
            <div v-else class="h-14 w-14 rounded-full bg-blue-500/20 flex items-center justify-center border-2 border-blue-500/30 text-blue-400 font-bold text-xl">
              Y
            </div>
            <div class="text-left">
              <p class="font-medium text-white">{{ post.primary_author?.name || 'Yoga Novaindra' }}</p>
              <p class="text-xs text-zinc-600 uppercase tracking-widest mt-1">Author</p>
            </div>
          </div>
        </div>

        <!-- Article Body -->
        <div ref="articleContent" class="prose prose-invert prose-blue max-w-none prose-img:rounded-xl prose-img:border prose-img:border-zinc-800/80 prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800" v-html="post.html">
        </div>

        <!-- More Stories Navigation -->
        <div v-if="recentPosts.length > 0" class="mt-24 pt-16 border-t border-zinc-800/50 fadein-bot">
          <div class="flex items-center justify-between mb-10">
            <h2 class="text-2xl font-bold text-white tracking-tight">More from the blog</h2>
            <router-link to="/blog" class="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
              View all posts &rarr;
            </router-link>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <router-link 
              v-for="recent in recentPosts" 
              :key="recent.id" 
              :to="`/blog/${recent.slug}`"
              class="group block relative"
            >
              <div class="aspect-video rounded-2xl overflow-hidden mb-6 border border-zinc-800/50 bg-zinc-900/40 relative">
                <img
                  v-if="recent.feature_image"
                  :src="recent.feature_image"
                  :alt="recent.title"
                  loading="lazy"
                  @error="$event.target.style.display='none'"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <!-- Fallback when no feature image -->
                <div v-else class="w-full h-full bg-zinc-900/80 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-700"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent"></div>
              </div>
              <h3 class="text-xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                {{ recent.title }}
              </h3>
              <p class="mt-3 text-sm text-zinc-500 line-clamp-2">
                {{ recent.custom_excerpt || recent.excerpt }}
              </p>
            </router-link>
          </div>
        </div>

        <!-- Article Footer -->
        <footer class="mt-24 pt-12 border-t border-zinc-900 text-center fadein-bot">
          <p class="text-zinc-600 text-sm flex items-center justify-center gap-2">
            <span>&copy; {{ new Date().getFullYear() }} Yoga Novaindra</span>
            <span class="text-zinc-800">&bull;</span>
            <span class="flex items-center gap-1.5">
              Powered by 
              <a href="https://ghost.org" target="_blank" class="inline-flex items-center gap-1 font-medium text-zinc-400 hover:text-blue-400 transition-colors">
                <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M11.96 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.04zm7.25 15.11c-.53 1.48-1.59 2.54-3.1 3.1-1.51.56-3.1.56-4.6 0-1.5-.56-2.57-1.62-3.1-3.1-.53-1.48-.53-3.1 0-4.6.53-1.5 1.59-2.56 3.1-3.1 1.51-.56 3.1-.56 4.6 0 1.5.56 2.57 1.62 3.1 3.1.53 1.49.53 3.09 0 4.6z"/></svg>
                Ghost
              </a>
            </span>
          </p>
        </footer>
      </article>
    </div>

    <!-- Floating TOC (fixed, minimal) -->
    <Transition name="toc-float">
      <aside
        v-if="post && toc.length > 0 && readingProgress > 4"
        class="hidden lg:block fixed right-8 2xl:right-12 top-1/2 -translate-y-1/2 z-40 overflow-y-auto hide-scrollbar"
        style="max-height: calc(100vh - 10rem); width: 10rem;"
        aria-label="Table of Contents"
      >
        <p class="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-4 pl-4">On this page</p>
        <nav>
          <ul class="flex flex-col gap-2 border-l border-zinc-800/80" role="list">
            <li
              v-for="item in toc"
              :key="item.id"
              :class="[
                '-ml-[1px] border-l pl-4 transition-all duration-200',
                item.level === 3 ? 'ml-3 border-transparent' : '',
                item.level !== 3 && activeTocId === item.id ? 'border-blue-500' : '',
                item.level !== 3 && activeTocId !== item.id ? 'border-transparent hover:border-zinc-700' : ''
              ]"
            >
              <a
                :href="`#${item.id}`"
                :class="[
                  'block text-xs leading-snug transition-colors duration-200 line-clamp-2',
                  activeTocId === item.id ? 'text-blue-400 font-medium' : 'text-zinc-500 hover:text-zinc-300'
                ]"
              >
                {{ item.text }}
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </Transition>

    <!-- Floating Share (bottom-right) -->
    <Transition name="share-float">
      <div
        v-if="post && readingProgress > 4"
        class="flex fixed bottom-[5.5rem] right-6 md:right-8 z-40 flex-col-reverse items-center gap-2"
        aria-label="Share article"
      >
        <!-- Share toggle -->
        <button
          @click="showShare = !showShare"
          :title="showShare ? 'Close share' : 'Share this article'"
          :aria-expanded="showShare"
          class="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:bg-zinc-800/50 text-zinc-400 hover:text-blue-400 shadow-lg transition-all duration-300"
          :class="showShare
            ? 'border-blue-500/50 text-blue-400 shadow-blue-500/20'
            : 'hover:border-blue-500/50 hover:shadow-blue-500/20'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
        </button>

        <!-- Platform icons — expand upward -->
        <Transition name="share-expand">
          <div v-if="showShare" class="flex flex-col-reverse items-center gap-2">

            <!-- Copy link -->
            <button
              @click="copyLink"
              :title="copied ? 'Copied!' : 'Copy link'"
              class="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:bg-zinc-800/50 hover:border-blue-500/50 text-zinc-400 shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </button>

            <!-- WhatsApp -->
            <a :href="`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`"
              target="_blank" rel="noopener noreferrer" title="Share on WhatsApp"
              class="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:bg-zinc-800/50 text-zinc-400 shadow-lg transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>

            <!-- Telegram -->
            <a :href="`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`"
              target="_blank" rel="noopener noreferrer" title="Share on Telegram"
              class="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:bg-zinc-800/50 text-zinc-400 shadow-lg hover:text-sky-400 hover:border-sky-500/40 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>

            <!-- X -->
            <a :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`"
              target="_blank" rel="noopener noreferrer" title="Share on X"
              class="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:bg-zinc-800/50 text-zinc-400 shadow-lg hover:text-white hover:border-zinc-500 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>

            <!-- LinkedIn -->
            <a :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`"
              target="_blank" rel="noopener noreferrer" title="Share on LinkedIn"
              class="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:bg-zinc-800/50 text-zinc-400 shadow-lg hover:text-blue-400 hover:border-blue-500/40 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>

            <!-- Reddit -->
            <a :href="`https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`"
              target="_blank" rel="noopener noreferrer" title="Share on Reddit"
              class="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:bg-zinc-800/50 text-zinc-400 shadow-lg hover:text-orange-400 hover:border-orange-500/40 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
            </a>

          </div>
        </Transition>
      </div>
    </Transition>

  </div>
</template>

<script>
import ghost from '@/services/ghost';
import { nextTick } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

export default {
  name: 'ArticleView',
  data() {
    return {
      post: null,
      recentPosts: [],
      loading: true,
      error: null,
      readingProgress: 0,
      toc: [],
      showAllTags: false,
      activeTocId: null,
      tocObserver: null,
      heroParallaxY: 0,
      copied: false,
      showShare: false,
    };
  },
  computed: {
    // Portfolio URL for sharing (not Ghost instance URL)
    shareUrl() {
      return window.location.href;
    },
    // Use Ghost's custom OG/Twitter title for share text if set in Ghost editor
    shareText() {
      return this.post?.og_title || this.post?.twitter_title || this.post?.title || '';
    },
    currentUrl() {
      return window.location.href;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.updateProgress);
    window.addEventListener('scroll', this.updateHeroParallax, { passive: true });
  },
  unmounted() {
    window.removeEventListener('scroll', this.updateProgress);
    window.removeEventListener('scroll', this.updateHeroParallax);
    if (this.tocObserver) this.tocObserver.disconnect();
  },
  watch: {
    '$route.params.slug': {
      handler: 'fetchPost',
      immediate: true
    }
  },
  methods: {
    updateHeroParallax() {
      this.heroParallaxY = Math.min(window.scrollY * 0.12, 60);
    },
    async copyLink() {
      try {
        await navigator.clipboard.writeText(this.currentUrl);
        this.copied = true;
        setTimeout(() => { this.copied = false; }, 2000);
      } catch {
        // Fallback for browsers without clipboard API
        const el = document.createElement('input');
        el.value = this.currentUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.copied = true;
        setTimeout(() => { this.copied = false; }, 2000);
      }
    },
    async fetchPost() {
      this.loading = true;
      this.error = null;
      const slug = this.$route.params.slug;
      try {
        const [postResponse, postsResponse] = await Promise.all([
          ghost.getPostBySlug(slug),
          ghost.getPosts({ limit: 3 })
        ]);

        if (postResponse.posts && postResponse.posts.length > 0) {
          this.post = postResponse.posts[0];
          this.updateMeta();
          
          nextTick(() => {
            this.setupArticleEnhancements();
          });
          
          // Filter out current post from recent posts
          this.recentPosts = (postsResponse.posts || [])
            .filter(p => p.id !== this.post.id)
            .slice(0, 2);
        } else {
          this.error = 'Post not found.';
        }
      } catch (err) {
        this.error = 'Failed to load the article.';
        console.error(err);
      } finally {
        this.loading = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    },
    getRelativeTime(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
      
      const units = [
        { name: 'year', seconds: 31536000 },
        { name: 'month', seconds: 2592000 },
        { name: 'week', seconds: 604800 },
        { name: 'day', seconds: 86400 },
        { name: 'hour', seconds: 3600 },
        { name: 'minute', seconds: 60 },
        { name: 'second', seconds: 1 }
      ];

      for (const unit of units) {
        if (diffInSeconds >= unit.seconds) {
          const count = Math.floor(diffInSeconds / unit.seconds);
          return `${count} ${unit.name}${count !== 1 ? 's' : ''} ago`;
        }
      }
      return 'just now';
    },
    updateMeta() {
      if (!this.post) return;
      document.title = `${this.post.title} - Yoga Novaindra`;
      
      const updateTag = (name, content) => {
        const attr = name.startsWith('og:') ? 'property' : 'name';
        let tag = document.querySelector(`meta[${attr}="${name}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute(attr, name);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };

      const desc = this.post.custom_excerpt || this.post.excerpt || '';
      updateTag('description', desc);
      updateTag('og:title', this.post.title);
      updateTag('og:description', desc);
      updateTag('og:image', this.post.feature_image || '');
      updateTag('twitter:card', 'summary_large_image');
    },
    updateProgress() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.readingProgress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    },
    setupArticleEnhancements() {
      const article = this.$refs.articleContent;
      if (!article) return;

      // 1. Generate TOC
      const headings = article.querySelectorAll('h2, h3');
      this.toc = Array.from(headings).map((h, index) => {
        if (!h.id) h.id = `heading-${index}`;
        return {
          id: h.id,
          text: h.innerText,
          level: h.tagName === 'H2' ? 2 : 3
        };
      });

      // 2. Set up IntersectionObserver for active TOC highlight
      this.setupTocObserver(headings);

      // 3. Syntax Highlighting & Copy Button
      const blocks = article.querySelectorAll('pre code');
      blocks.forEach((block) => {
        hljs.highlightElement(block);
        
        const pre = block.parentElement;
        if (!pre.classList.contains('relative')) {
          pre.classList.add('relative', 'group');
          const btn = document.createElement('button');
          btn.innerHTML = `Copy`;
          btn.className = 'absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-700 font-medium tracking-wide';
          btn.onclick = () => {
            navigator.clipboard.writeText(block.innerText);
            btn.innerHTML = 'Copied!';
            btn.classList.add('text-blue-400', 'border-blue-500/50');
            setTimeout(() => {
              btn.innerHTML = 'Copy';
              btn.classList.remove('text-blue-400', 'border-blue-500/50');
            }, 2000);
          };
          pre.appendChild(btn);
        }
      });
    },
    setupTocObserver(headings) {
      if (this.tocObserver) this.tocObserver.disconnect();
      if (!headings || headings.length === 0) return;

      const visibleHeadings = new Map();

      this.tocObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            visibleHeadings.set(entry.target.id, entry.isIntersecting);
          });
          // Highlight the topmost currently-visible heading
          const firstVisible = Array.from(headings).find(h => visibleHeadings.get(h.id));
          if (firstVisible) {
            this.activeTocId = firstVisible.id;
          }
        },
        {
          // -80px top accounts for fixed navbar; -55% bottom means only headings
          // scrolled into the upper 45% of the viewport are considered "active"
          rootMargin: '-80px 0px -55% 0px',
          threshold: 0,
        }
      );

      headings.forEach(h => this.tocObserver.observe(h));
    },
  },
};
</script>

<style>
/* Skeleton shimmer */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton-shimmer {
  background: linear-gradient(90deg, #18181b 25%, #27272a 50%, #18181b 75%);
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
}

/* Enhancing the typography from Ghost HTML */
.prose {
  font-size: 1rem;
  line-height: 1.75;
}
@media (min-width: 768px) {
  .prose {
    font-size: 1.125rem;
    line-height: 1.8;
  }
}
.prose h2 {
  margin-top: 2em;
  margin-bottom: 1em;
  font-size: 1.5em;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #f4f4f5;
}
.prose h3 {
  margin-top: 1.6em;
  margin-bottom: 0.8em;
  font-size: 1.25em;
  font-weight: 600;
  color: #e4e4e7;
}
.prose h4 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-size: 1.1em;
  font-weight: 600;
  color: #e4e4e7;
}
.prose p {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  color: #d4d4d8; /* zinc-300 for better contrast */
}
.prose ul, .prose ol {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-left: 1.625em;
}
.prose ul {
  list-style-type: disc;
}
.prose ol {
  list-style-type: decimal;
}
.prose li {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  color: #d4d4d8; /* zinc-300 for better contrast */
}
.prose li > p {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.prose blockquote {
  border-left-color: #3b82f6; /* blue-500 */
  background-color: rgba(59, 130, 246, 0.05);
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  font-style: italic;
  color: #e4e4e7;
}
.prose figure {
  margin: 2em 0;
}
.prose figcaption {
  text-align: center;
  color: #71717a; /* zinc-500 */
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

/* Better Code Block Separation */
.prose pre {
  padding: 1.5rem;
  margin-top: 1.5em;
  margin-bottom: 2em;
  border-radius: 0.75rem;
  overflow-x: auto;
  background-color: #121214 !important; /* Very dark background to pop against #0a0a0a */
  border: 1px solid #27272a !important; /* Distinct zinc-800 border */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25);
}

/* Code text inside Pre blocks */
.prose pre code {
  background-color: transparent !important;
  padding: 0 !important;
  color: #e4e4e7; /* zinc-200 */
  font-family: "JetBrains Mono", monospace;
  font-size: 0.9em;
  border: none !important;
}

/* Inline Code Elements */
.prose p code, .prose li code {
  background-color: rgba(59, 130, 246, 0.1);
  color: #60a5fa; /* blue-400 */
  padding: 0.25em 0.4em;
  border-radius: 0.375rem;
  font-size: 0.875em;
  border: 1px solid rgba(59, 130, 246, 0.2);
  font-family: "JetBrains Mono", monospace;
}

/* Floating TOC slide-in from right */
.toc-float-enter-active,
.toc-float-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.toc-float-enter-from,
.toc-float-leave-to {
  opacity: 0;
  transform: translateX(1rem) translateY(-50%);
}
.toc-float-enter-to,
.toc-float-leave-from {
  opacity: 1;
  transform: translateX(0) translateY(-50%);
}
/* TOC: offset scroll target below fixed navbar (nav ~64px + breathing room) */
.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  scroll-margin-top: 88px;
}
/* Share section expand/collapse */
.share-expand-enter-active,
.share-expand-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.share-expand-enter-from,
.share-expand-leave-to {
  opacity: 0;
  transform: translateX(-6px);
}
/* Share float entry (bottom-right, slides up) */
.share-float-enter-active,
.share-float-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.share-float-enter-from,
.share-float-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
.share-float-enter-to,
.share-float-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>


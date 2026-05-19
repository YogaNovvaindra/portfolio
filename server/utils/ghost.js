// Nuxt 3 Ghost API Service
// Runs server-side — ghostKey is never exposed to the browser

/**
 * internalUrl — strips the Ghost origin so all asset paths are relative.
 * Matches the behaviour of the old Vue CLI ghost.js service.
 */
function internalUrl(obj, ghostUrl) {
  if (obj === null || obj === undefined) return obj
  const origin = ghostUrl?.replace(/\/$/, '') || 'https://ygnv.my.id'
  if (typeof obj === 'string') return obj.replaceAll(origin, '')
  if (Array.isArray(obj)) return obj.map(i => internalUrl(i, ghostUrl))
  if (typeof obj === 'object') {
    const out = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        out[key] = internalUrl(obj[key], ghostUrl)
      }
    }
    return out
  }
  return obj
}

export function useGhostApi() {
  const config = useRuntimeConfig()
  const BASE = (config.public.ghostUrl || 'https://ygnv.my.id').replace(/\/$/, '')
  const KEY = config.ghostKey || ''

  const defaultParams = `key=${KEY}&include=tags,authors&formats=html`

  async function getPosts(limit = 'all', page = 1, filter = null) {
    let url = `${BASE}/ghost/api/content/posts/?${defaultParams}&limit=${limit}&page=${page}`
    if (filter) url += `&filter=${encodeURIComponent(filter)}`
    const data = await $fetch(url)
    return internalUrl(data, BASE)
  }

  async function getPostBySlug(slug) {
    const url = `${BASE}/ghost/api/content/posts/slug/${slug}/?${defaultParams}`
    const data = await $fetch(url)
    return internalUrl(data, BASE)
  }

  async function getSearchIndex() {
    const fields = 'id,title,slug,custom_excerpt,excerpt,published_at,feature_image,primary_author'
    const url = `${BASE}/ghost/api/content/posts/?key=${KEY}&limit=all&fields=${fields}&include=authors,tags`
    const data = await $fetch(url)
    return internalUrl(data, BASE)
  }

  async function getTags() {
    const url = `${BASE}/ghost/api/content/tags/?key=${KEY}&limit=all&include=count.posts&filter=visibility:public`
    const data = await $fetch(url)
    const tags = (data?.tags || []).sort(
      (a, b) => (b.count?.posts || 0) - (a.count?.posts || 0)
    )
    return internalUrl(tags, BASE)
  }

  return { getPosts, getPostBySlug, getSearchIndex, getTags }
}

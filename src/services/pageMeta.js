/**
 * pageMeta.js
 * Shared utility for updating document <title> and OG/Twitter meta tags
 * per route. Mirrors the pattern used in ArticleView.updateMeta().
 *
 * Usage:
 *   import { setPageMeta } from '@/services/pageMeta';
 *   setPageMeta({ title, description, url, image });
 */

const BASE_URL = 'https://yoganova.my.id';
const DEFAULT_IMAGE = `${BASE_URL}/img/avatar.webp`;

/**
 * @param {object} opts
 * @param {string} opts.title       - Full page title (shown in tab + og:title)
 * @param {string} [opts.description] - Page description for meta + og:description
 * @param {string} [opts.url]       - Canonical URL (defaults to current href)
 * @param {string} [opts.image]     - OG image URL (defaults to avatar)
 */
export function setPageMeta({ title, description, url, image } = {}) {
  // 1. Document title
  if (title) document.title = title;

  const desc = description || 'DevSecOps Engineer building automated, secure, and observable infrastructure — from bare-metal Kubernetes clusters to cloud-native platforms.';
  const pageUrl = url || window.location.href;
  const img = image || DEFAULT_IMAGE;

  const tags = [
    // Standard
    { name: 'description', content: desc },
    // OG
    { property: 'og:title', content: title },
    { property: 'og:description', content: desc },
    { property: 'og:url', content: pageUrl },
    { property: 'og:image', content: img },
    // Twitter
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: desc },
    { name: 'twitter:url', content: pageUrl },
    { name: 'twitter:image', content: img },
  ];

  tags.forEach(({ name, property, content }) => {
    if (!content) return;
    const attr = property ? 'property' : 'name';
    const key = property || name;
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  });
}

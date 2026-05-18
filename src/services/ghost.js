import axios from 'axios';

const envUrl = process.env.VUE_APP_GHOST_URL;
const GHOST_URL = envUrl !== undefined ? envUrl.replace(/\/$/, '') : 'https://ygnv.my.id';
const GHOST_KEY = process.env.VUE_APP_GHOST_KEY || 'YOUR_API_KEY_HERE';

const api = axios.create({
  baseURL: `${GHOST_URL}/ghost/api/content`,
  params: {
    key: GHOST_KEY,
    include: 'tags,authors',
  },
});

export default {
  async getPosts(limit = 'all', page = 1, filter = null) {
    try {
      const params = { limit, page };
      if (filter) params.filter = filter;

      const response = await api.get('/posts/', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching Ghost posts:', error);
      throw error;
    }
  },

  async getSearchIndex() {
    try {
      const response = await axios.get(`${GHOST_URL}/ghost/api/content/posts/`, {
        params: {
          key: GHOST_KEY,
          limit: 'all',
          fields: 'id,title,slug,custom_excerpt,excerpt,published_at,feature_image,primary_author',
          include: 'authors,tags'
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Ghost search index:', error);
      throw error;
    }
  },

  async getTags() {
    try {
      const response = await api.get('/tags/', {
        params: {
          limit: 'all',
          include: 'count.posts',
          filter: 'visibility:public'
        }
      });
      // Sort tags by post count descending
      let tags = response.data.tags || [];
      tags.sort((a, b) => (b.count?.posts || 0) - (a.count?.posts || 0));
      return tags;
    } catch (error) {
      console.error('Error fetching Ghost tags:', error);
      throw error;
    }
  },

  async getPostBySlug(slug) {
    try {
      const response = await api.get(`/posts/slug/${slug}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching Ghost post (${slug}):`, error);
      throw error;
    }
  },
};

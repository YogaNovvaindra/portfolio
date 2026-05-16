import axios from 'axios';

const GHOST_URL = process.env.VUE_APP_GHOST_URL || 'https://ygnv.my.id';
const GHOST_KEY = process.env.VUE_APP_GHOST_KEY || 'YOUR_API_KEY_HERE';

const api = axios.create({
  baseURL: `${GHOST_URL}/ghost/api/content`,
  params: {
    key: GHOST_KEY,
    include: 'tags,authors',
  },
});

export default {
  async getPosts(limit = 'all', page = 1) {
    try {
      const response = await api.get('/posts/', {
        params: {
          limit,
          page,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Ghost posts:', error);
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

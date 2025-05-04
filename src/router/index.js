import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Home' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'About' }
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('../views/PortfolioView.vue'),
    meta: { title: 'Portfolio' }
  },
  // {
  //   path: '/blog',
  //   name: 'blog',
  //   component: () => import('../views/BlogView.vue'),
  //   meta: { title: 'Blog' }
  // },
  // {
  //   path: '/read/:slug/:id',
  //   name: 'articleDetail',
  //   component: () => import('../views/ArticleView.vue'),
  //   meta: { title: 'Blog' }
  // }
  {
    path: '/:pathMatch(.*)*', // Will match any path not matched above
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: 'Page Not Found' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' - Yoga Novaindra'; // Mengambil judul dari meta atau mengatur judul default jika tidak ada
  next();
});

export default router

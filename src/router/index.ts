import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/brewery/:id',
    name: 'BreweryDetail',
    component: () => import('@/views/BreweryDetailPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/'),  // Changed from process.env.BASE_URL
  routes
})

export default router;
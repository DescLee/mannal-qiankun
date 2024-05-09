import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/sub1',
    name: 'sub1',
    component: () => import('../App.vue')
  },
  {
    path: '/sub2',
    name: 'sub2',
    component: () => import('../App.vue')
  },
  {
    path: '/sub3',
    name: 'sub3',
    component: () => import('../App.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/Page/HomeView.vue'
import AdminView from '@/views/Admin/AdminView.vue'
import AdminQnAView from '@/views/Admin/AdminQnA/AdminQnAView.vue'

const BASE_URL = 'http://localhost:5173/'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    children: [
      { path: '', name: 'default', component: AdminQnAView },
      { path: '/qna/list', name: 'qnaList', component: AdminQnAView }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes
})

router.beforeEach(() => {
  window.scrollTo(0, 0)
})

export default router

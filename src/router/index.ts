import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/Page/HomeView.vue'
import AdminView from '@/views/Admin/AdminView.vue'
import AdminQnAList from '@/views/Admin/AdminQnA/AdminQnAList.vue'
import AdminQnAForm from '@/views/Admin/AdminQnA/AdminQnAForm.vue'
import AdminContactList from '@/views/Admin/AdminContact/AdminContactList.vue'
import AdminGalleryList from '@/views/Admin/AdminGallery/AdminGalleryList.vue'

const BASE_URL = '/'

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
      { path: '', name: 'default', component: AdminQnAList },
      { path: 'qna/list', name: 'qnaList', component: AdminQnAList },
      { path: 'qna/form/:id', name: 'qnaForm', component: AdminQnAForm },
      { path: 'contact/list', name: 'contactList', component: AdminContactList },
      { path: 'gallery/list', name: 'galleryList', component: AdminGalleryList }
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

import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/pages/login/login'
import Main from '@/pages/main/main'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

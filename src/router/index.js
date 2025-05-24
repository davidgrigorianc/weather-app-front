import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guest: true },
    },
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/success',
      name: 'success',
      meta: { requiresAuth: true },
      component: () => import('../views/SuccessView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      meta: { requiresAuth: true },
      component: () => import('../views/SearchView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const isLoggedIn = !!auth.user || !!localStorage.getItem('token')
  const remainingRequests = auth.user?.remaining_requests ?? 0

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' })
  } else if (to.meta.guest && isLoggedIn) {
    next({ name: 'home' })
  } else if (to.name === 'home' && isLoggedIn && remainingRequests > 0) {
    next({ name: 'search' })
  } else if (to.name === 'search' && isLoggedIn && remainingRequests <= 0) {
    next()
    //next({ name: 'home' })
  } else {
    next()
  }
})
export default router

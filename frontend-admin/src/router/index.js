import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true } // Etiqueta para saber que requiere login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guardián de navegación global
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('barber_token')

  // Si la ruta requiere autenticación y no hay token, lo mandamos al login
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } 
  // Si ya tiene token e intenta entrar al login, lo mandamos al dashboard
  else if (to.path === '/login' && token) {
    next('/dashboard')
  } 
  else {
    next()
  }
})

export default router
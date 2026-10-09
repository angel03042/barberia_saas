import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BarberiaDetalleView from '../views/BarberiaDetalleView.vue'
import ReservaView from '../views/ReservaView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/barberia/:id', name: 'barberia-detalle', component: BarberiaDetalleView },
  { path: '/reserva/:servicioId', name: 'reserva', component: ReservaView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
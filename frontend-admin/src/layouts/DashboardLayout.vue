<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const usuario = ref(null)
const mostrarDropdown = ref(false) // Nueva variable para controlar el menú

const menu = [
  { nombre: 'Overview', ruta: '/dashboard/overview' },
  { nombre: 'Barberías', ruta: '/dashboard' },
  { nombre: 'Servicios', ruta: '/dashboard/servicios' },
  { nombre: 'Citas', ruta: '/dashboard/citas' }
]

onMounted(() => {
  const userStr = localStorage.getItem('barber_user')
  if (userStr) {
    usuario.value = JSON.parse(userStr)
  }
})

const cerrarSesion = () => {
  localStorage.removeItem('barber_token')
  localStorage.removeItem('barber_user')
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-[#f4f5f9] font-sans p-4 lg:p-6 flex flex-col gap-6">
    
    <nav class="flex items-center justify-between bg-white px-6 py-4 rounded-3xl shadow-sm border border-slate-100">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-200">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
        </div>
        <div>
          <h1 class="font-bold text-slate-800 leading-none">BarberSaaS</h1>
          <p class="text-[10px] text-slate-500 font-medium tracking-wide">SMART MANAGEMENT</p>
        </div>
      </div>

      <!-- Menú Central (Píldora Oscura) -->
      <div class="hidden md:flex bg-[#1c1c24] rounded-full p-1 items-center gap-1">
        <router-link 
          v-for="item in menu" 
          :key="item.nombre"
          :to="item.ruta"
          exact-active-class="bg-indigo-500 text-white shadow-md"
          class="text-slate-300 hover:text-white hover:bg-slate-800 px-5 py-2 rounded-full text-sm font-medium transition-all"
        >
          {{ item.nombre }}
        </router-link>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex gap-2">
          <button class="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-600 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </button>
          <button class="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-600 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors relative">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span class="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </button>
        </div>
        
        <!-- Contenedor relativo para el Dropdown -->
        <div class="relative">
          <div class="flex items-center gap-3 cursor-pointer group" @click="mostrarDropdown = !mostrarDropdown">
            <img :src="`https://ui-avatars.com/api/?name=${usuario?.nombre || 'Admin'}&background=6366f1&color=fff`" class="w-9 h-9 rounded-full shadow-sm group-hover:ring-2 ring-indigo-200 transition-all" alt="Avatar">
          </div>

          <!-- Menú Flotante -->
          <div v-if="mostrarDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-slate-100 z-50">
            <div class="px-4 py-2 border-b border-slate-100 mb-1">
              <p class="text-sm font-semibold text-slate-800">{{ usuario?.nombre || 'Admin' }}</p>
              <p class="text-xs text-slate-500 truncate">{{ usuario?.rol || 'Administrador' }}</p>
            </div>
            <button @click="cerrarSesion" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Cerrar sesión
            </button>
          </div>
        </div>

      </div>
    </nav>

    <router-view />

  </div>
</template>
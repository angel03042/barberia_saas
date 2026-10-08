<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const barberias = ref([])
const busqueda = ref('')
const cargando = ref(true)

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/barberias')
    barberias.value = res.data
  } catch (error) {
    console.error('Error al cargar las barberías', error)
  } finally {
    cargando.value = false
  }
})

// Filtrar las barberías en tiempo real mientras el usuario escribe
const barberiasFiltradas = computed(() => {
  if (!busqueda.value) return barberias.value
  return barberias.value.filter(b => 
    b.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) || 
    b.direccion.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})
</script>

<template>
  <!-- Contenedor principal centrado, simulando pantalla de celular en escritorio -->
  <main class="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative pb-20">
    
    <!-- Header decorativo -->
    <header class="bg-[#1c1c24] px-6 pt-12 pb-6 rounded-b-[2.5rem] relative overflow-hidden">
      <!-- Círculo de fondo para darle textura -->
      <div class="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
      
      <div class="relative z-10 flex justify-between items-center mb-6">
        <div>
          <p class="text-indigo-300 text-sm font-medium mb-1">Bienvenido a BarberSaaS</p>
          <h1 class="text-2xl font-bold text-white">Encuentra tu estilo</h1>
        </div>
        <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </div>
      </div>

      <!-- Barra de búsqueda -->
      <div class="relative z-10 mt-2">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <input 
          v-model="busqueda"
          type="text" 
          class="w-full bg-white rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg shadow-black/10 placeholder:text-slate-400 placeholder:font-normal"
          placeholder="Buscar barbería o zona..."
        >
      </div>
    </header>

    <!-- Lista de Barberías -->
    <section class="px-6 py-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-bold text-slate-800">Sucursales Disponibles</h2>
        <span class="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg">{{ barberiasFiltradas.length }}</span>
      </div>

      <div v-if="cargando" class="flex flex-col gap-4 animate-pulse">
        <div v-for="i in 3" :key="i" class="h-28 bg-slate-100 rounded-2xl w-full"></div>
      </div>

      <div v-else-if="barberiasFiltradas.length === 0" class="text-center py-10">
        <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg class="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <p class="text-slate-500 font-medium">No encontramos sucursales.</p>
        <p class="text-sm text-slate-400">Intenta con otra búsqueda.</p>
      </div>

      <div v-else class="flex flex-col gap-4">
        <!-- Tarjeta de Barbería -->
        <router-link 
          v-for="barberia in barberiasFiltradas" 
          :key="barberia.id"
          :to="`/barberia/${barberia.id}`"
          class="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 cursor-pointer">
          <!-- Logo dinámico -->
          <div class="w-16 h-16 rounded-xl shrink-0 overflow-hidden bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            <img :src="`https://ui-avatars.com/api/?name=${barberia.nombre}&background=4f46e5&color=ffffff&size=100`" class="w-full h-full object-cover" alt="Logo">
          </div>
          
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-start mb-1">
              <h3 class="font-bold text-slate-800 truncate text-base">{{ barberia.nombre }}</h3>
              <div class="flex items-center gap-1 text-amber-400">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <span class="text-xs font-bold text-slate-600">5.0</span>
              </div>
            </div>
            
            <p class="text-xs text-slate-500 flex items-center gap-1 truncate mb-3">
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {{ barberia.direccion }}
            </p>

            <button class="w-full bg-[#f8f9fc] text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 font-bold text-xs py-2.5 rounded-xl transition-colors border border-indigo-50">
              Ver servicios y reservar
            </button>
          </div>
        </router-link>
      </div>
    </section>

  </main>
</template>
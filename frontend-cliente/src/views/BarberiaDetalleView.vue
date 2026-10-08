<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const servicios = ref([])
const cargando = ref(true)

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/servicios/${route.params.id}`)
    servicios.value = res.data
  } catch (error) {
    console.error('Error al cargar servicios:', error)
  } finally {
    cargando.value = false
  }
})
</script>

<template>
  <main class="max-w-md mx-auto min-h-screen bg-slate-50 relative pb-20">
    
    <!-- Navbar superior con botón de regreso -->
    <header class="bg-white px-6 py-4 flex items-center gap-4 sticky top-0 z-10 border-b border-slate-100">
      <router-link to="/" class="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </router-link>
      <div>
        <h1 class="font-bold text-slate-800 text-lg leading-tight">Selecciona un Servicio</h1>
        <p class="text-xs text-slate-500 font-medium">Catálogo disponible</p>
      </div>
    </header>

    <!-- Lista de Servicios -->
    <section class="p-6">
      <div v-if="cargando" class="flex flex-col gap-4 animate-pulse">
        <div v-for="i in 3" :key="i" class="h-24 bg-white rounded-2xl w-full border border-slate-100"></div>
      </div>
      
      <div v-else-if="servicios.length === 0" class="text-center py-12">
        <p class="text-slate-500 font-medium">No hay servicios registrados.</p>
      </div>

      <div v-else class="flex flex-col gap-4">
        <div 
          v-for="servicio in servicios" 
          :key="servicio.id"
          class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center group cursor-pointer hover:border-indigo-200 transition-colors"
        >
          <div>
            <h3 class="font-bold text-slate-800 text-base mb-1">{{ servicio.nombre }}</h3>
            <p class="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {{ servicio.duracion || 30 }} min
            </p>
          </div>
          
          <div class="flex flex-col items-end gap-2">
            <span class="font-black text-indigo-600 text-lg">${{ servicio.precio }}</span>
            <button class="bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">
              Elegir
            </button>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>
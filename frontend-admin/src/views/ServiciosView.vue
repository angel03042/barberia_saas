<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

const barberias = ref([])
const barberiaSeleccionadaId = ref('')
const servicios = ref([])
const cargando = ref(true)

// Variables del Slide-over
const mostrarPanel = ref(false)
const guardando = ref(false)
const formServicio = ref({ nombre: '', descripcion: '', precio: '', duracion_minutos: '' })

onMounted(async () => {
  await obtenerBarberias()
})

// Cuando el selector cambia, buscamos los servicios de esa sucursal
watch(barberiaSeleccionadaId, async (nuevoId) => {
  if (nuevoId) {
    await obtenerServicios(nuevoId)
  }
})

const obtenerBarberias = async () => {
  try {
    const token = localStorage.getItem('barber_token')
    const res = await axios.get('http://localhost:3000/api/barberias', {
      headers: { Authorization: `Bearer ${token}` }
    })
    barberias.value = res.data
    if (barberias.value.length > 0) {
      barberiaSeleccionadaId.value = barberias.value[0].id
    }
  } catch (error) {
    console.error(error)
  } finally {
    cargando.value = false
  }
}

const obtenerServicios = async (barberia_id) => {
  cargando.value = true
  try {
    const res = await axios.get(`http://localhost:3000/api/servicios/${barberia_id}`)
    servicios.value = res.data
  } catch (error) {
    console.error(error)
  } finally {
    cargando.value = false
  }
}

const registrarServicio = async () => {
  guardando.value = true
  try {
    const token = localStorage.getItem('barber_token')
    await axios.post('http://localhost:3000/api/servicios', {
      barberia_id: barberiaSeleccionadaId.value,
      ...formServicio.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    mostrarPanel.value = false
    formServicio.value = { nombre: '', descripcion: '', precio: '', duracion_minutos: '' }
    await obtenerServicios(barberiaSeleccionadaId.value)
  } catch (error) {
    alert('Error al guardar el servicio')
  } finally {
    guardando.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 h-full relative">
    
    <!-- Header -->
    <header class="flex flex-col sm:flex-row sm:items-center justify-between px-2 gap-4">
      <div>
        <h2 class="text-3xl font-bold text-slate-800 tracking-tight">Catálogo de Servicios</h2>
        <p class="text-slate-500 text-sm mt-1">Configura cortes, precios y duraciones por sucursal.</p>
      </div>
      
      <div class="flex items-center gap-3">
        <!-- Selector de Sucursal -->
        <select 
          v-model="barberiaSeleccionadaId" 
          class="bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none text-slate-700 focus:border-indigo-500 shadow-sm font-medium text-sm"
        >
          <option v-for="b in barberias" :key="b.id" :value="b.id">
            Sucursal: {{ b.nombre }}
          </option>
        </select>

        <button @click="mostrarPanel = true" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-200/50 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          Añadir Servicio
        </button>
      </div>
    </header>

    <!-- Grid de Servicios -->
    <div class="bg-white rounded-[2rem] p-6 lg:p-8 border border-slate-100 shadow-sm min-h-[500px]">
      <div v-if="cargando" class="text-center py-12 text-slate-400 font-medium">Cargando catálogo...</div>
      
      <div v-else-if="servicios.length === 0" class="flex flex-col items-center justify-center py-20 text-slate-400">
        <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <svg class="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>
        </div>
        <p class="text-lg font-semibold text-slate-600">Catálogo vacío</p>
        <p class="text-sm">Esta sucursal aún no tiene servicios registrados.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="servicio in servicios" 
          :key="servicio.id" 
          class="bg-[#f8f9fc] border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-shadow group relative overflow-hidden"
        >
          <div class="absolute top-0 right-0 w-20 h-20 bg-indigo-500 rounded-bl-[100px] -z-0 opacity-5 group-hover:opacity-10 transition-opacity"></div>
          
          <div class="flex justify-between items-start mb-4 relative z-10">
            <div class="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>
            </div>
            <span class="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              ${{ servicio.precio }}
            </span>
          </div>
          
          <h3 class="font-bold text-slate-800 text-lg mb-1 relative z-10">{{ servicio.nombre }}</h3>
          <p class="text-sm text-slate-500 mb-4 line-clamp-2 relative z-10 h-10">{{ servicio.descripcion || 'Sin descripción' }}</p>
          
          <div class="flex items-center gap-2 text-xs font-medium text-slate-400 bg-white px-3 py-2 rounded-lg border border-slate-100 relative z-10 w-max">
            <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {{ servicio.duracion_minutos }} minutos
          </div>
        </div>
      </div>
    </div>

    <!-- Slide-over Registro Servicio -->
    <div v-if="mostrarPanel" class="fixed inset-0 z-[100] overflow-hidden">
      <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" @click="mostrarPanel = false"></div>
      <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div class="w-screen max-w-md transform transition-all bg-white shadow-2xl rounded-l-[2rem] flex flex-col h-full">
          
          <div class="bg-[#1c1c24] px-6 py-8 rounded-tl-[2rem] relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
            <div class="flex items-center justify-between relative z-10">
              <h2 class="text-2xl font-bold text-white tracking-tight">Nuevo Servicio</h2>
              <button @click="mostrarPanel = false" class="text-slate-400 hover:text-white transition-colors"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <p class="mt-2 text-sm text-slate-400 relative z-10">Define el precio y tiempo para tu catálogo.</p>
          </div>

          <form @submit.prevent="registrarServicio" class="flex-1 flex flex-col justify-between overflow-y-auto">
            <div class="px-6 py-8 space-y-6">
              <div>
                <label class="block text-sm font-semibold text-slate-800 mb-2">Nombre del Servicio *</label>
                <input v-model="formServicio.nombre" type="text" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="Ej. Corte Clásico">
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-800 mb-2">Precio ($) *</label>
                <input v-model="formServicio.precio" type="number" step="0.01" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="0.00">
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-800 mb-2">Duración (minutos) *</label>
                <input v-model="formServicio.duracion_minutos" type="number" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="Ej. 45">
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-800 mb-2">Descripción breve</label>
                <textarea v-model="formServicio.descripcion" rows="3" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none" placeholder="Detalles sobre lo que incluye..."></textarea>
              </div>
            </div>

            <div class="px-6 py-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button type="button" @click="mostrarPanel = false" class="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-100">Cancelar</button>
              <button type="submit" :disabled="guardando" class="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200">
                {{ guardando ? 'Guardando...' : 'Guardar Servicio' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>
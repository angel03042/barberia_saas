<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

const barberias = ref([])
const barberiaSeleccionadaId = ref('')
const citas = ref([])
const cargando = ref(true)

onMounted(async () => {
  await obtenerBarberias()
})

watch(barberiaSeleccionadaId, async (nuevoId) => {
  if (nuevoId) {
    await obtenerCitas(nuevoId)
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

const obtenerCitas = async (barberia_id) => {
  cargando.value = true
  try {
    const token = localStorage.getItem('barber_token')
    const res = await axios.get(`http://localhost:3000/api/citas/${barberia_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    citas.value = res.data
  } catch (error) {
    console.error(error)
  } finally {
    cargando.value = false
  }
}

const formatearFechaHora = (fechaString) => {
  const fecha = new Date(fechaString)
  return new Intl.DateTimeFormat('es-ES', { 
    day: 'numeric', month: 'short', year: 'numeric', 
    hour: '2-digit', minute: '2-digit' 
  }).format(fecha)
}

const colorEstado = (estado) => {
  switch(estado?.toLowerCase()) {
    case 'completado': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
    case 'cancelado': return 'bg-red-100 text-red-700 border-red-200'
    default: return 'bg-amber-100 text-amber-700 border-amber-200'
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 h-full relative">
    
    <header class="flex flex-col sm:flex-row sm:items-center justify-between px-2 gap-4">
      <div>
        <h2 class="text-3xl font-bold text-slate-800 tracking-tight">Agenda de Citas</h2>
        <p class="text-slate-500 text-sm mt-1">Revisa y gestiona las reservas de los clientes.</p>
      </div>
      
      <div class="flex items-center gap-3">
        <select 
          v-model="barberiaSeleccionadaId" 
          class="bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none text-slate-700 focus:border-indigo-500 shadow-sm font-medium text-sm"
        >
          <option v-for="b in barberias" :key="b.id" :value="b.id">
            Sucursal: {{ b.nombre }}
          </option>
        </select>
      </div>
    </header>

    <div class="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm min-h-[500px] flex flex-col">
      
      <div v-if="cargando" class="flex-1 flex items-center justify-center text-slate-400 font-medium">
        Cargando agenda...
      </div>
      
      <div v-else-if="citas.length === 0" class="flex-1 flex flex-col items-center justify-center text-slate-400">
        <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <svg class="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
        <p class="text-lg font-semibold text-slate-600">No hay citas registradas</p>
        <p class="text-sm mt-1">Esta sucursal aún no tiene reservas en su agenda.</p>
      </div>

      <!-- Tabla Moderna -->
      <div v-else class="overflow-x-auto custom-scrollbar -mx-6 px-6">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr class="border-b border-slate-100">
              <th class="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Ref</th>
              <th class="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Cliente</th>
              <th class="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Servicio</th>
              <th class="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Barbero</th>
              <th class="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Fecha y Hora</th>
              <th class="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Precio</th>
              <th class="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Estado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr 
              v-for="cita in citas" 
              :key="cita.id" 
              class="hover:bg-[#f8f9fc] transition-colors group"
            >
              <!-- ID -->
              <td class="py-4 px-4 text-sm font-medium text-slate-500">
                #{{ cita.id.toString().padStart(5, '0') }}
              </td>
              
              <!-- Cliente -->
              <td class="py-4 px-4">
                <div class="flex items-center gap-3">
                  <img :src="`https://ui-avatars.com/api/?name=${cita.cliente}&background=e2e8f0&color=475569`" class="w-8 h-8 rounded-full shadow-sm" alt="Avatar">
                  <span class="text-sm font-bold text-slate-800">{{ cita.cliente }}</span>
                </div>
              </td>
              
              <!-- Servicio -->
              <td class="py-4 px-4">
                <span class="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
                  {{ cita.servicio }}
                </span>
              </td>
              
              <!-- Barbero -->
              <td class="py-4 px-4">
                <div class="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <div class="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-400">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>
                  </div>
                  {{ cita.barbero }}
                </div>
              </td>
              
              <!-- Fecha -->
              <td class="py-4 px-4">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span class="text-sm font-semibold text-slate-700">{{ formatearFechaHora(cita.fecha_hora) }}</span>
                </div>
              </td>
              
              <!-- Precio -->
              <td class="py-4 px-4 text-right">
                <span class="text-sm font-bold text-slate-800">${{ cita.precio }}</span>
              </td>
              
              <!-- Estado -->
              <td class="py-4 px-4 text-center">
                <span :class="['text-[10px] font-bold px-3 py-1.5 rounded-full border uppercase tracking-wider', colorEstado(cita.estado)]">
                  {{ cita.estado || 'Pendiente' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<style>
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}
</style>
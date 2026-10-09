<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import TarjetaBarbero from '../components/TarjetaBarbero.vue'

const route = useRoute()

// Simulamos barberos para la UI (en un proyecto real los traeríamos con otro Axios GET)
const barberos = ref([
  { id: 1, nombre: 'Carlos' },
  { id: 2, nombre: 'Miguel' },
  { id: 3, nombre: 'David' }
])

const fechas = ref(['Hoy', 'Mañana', 'Jueves 10', 'Viernes 11'])
const horas = ref(['10:00 AM', '11:30 AM', '01:00 PM', '04:00 PM', '05:30 PM'])

// Estado del formulario
const barberoSeleccionado = ref(null)
const fechaSeleccionada = ref('Hoy')
const horaSeleccionada = ref(null)
const nombreCliente = ref('')
const telefonoCliente = ref('')

// Estado de la vista
const cargando = ref(false)
const reservaExitosa = ref(false)

const confirmarReserva = async () => {
  if(!nombreCliente.value || !horaSeleccionada.value) {
    alert("Por favor ingresa tu nombre y selecciona un horario.")
    return
  }

  cargando.value = true

  try {
    const payload = {
      servicio_id: route.params.servicioId,
      barberia_id: route.query.barberiaId || null,
      barbero_id: barberoSeleccionado.value || null,
      cliente: nombreCliente.value,
      telefono: telefonoCliente.value,
      fecha_hora: `2026-10-10 ${horaSeleccionada.value.split(' ')[0]}:00`, 
      estado: 'Pendiente'
    }

    await axios.post('http://localhost:3000/api/citas', payload)
    reservaExitosa.value = true

  } catch (error) {
    console.error("Error al guardar la cita:", error)
    alert("Hubo un error al procesar tu reserva: " + (error.response?.data?.error || error.message))
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <main class="max-w-md mx-auto min-h-screen bg-slate-50 relative pb-24">
    
    <!-- Pantalla de Éxito (Se muestra solo si la reserva se guardó) -->
    <div v-if="reservaExitosa" class="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6 text-center">
      <div class="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
        <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
      </div>
      <h2 class="text-2xl font-bold text-slate-800 mb-2">¡Cita Confirmada!</h2>
      <p class="text-slate-500 mb-8">Te esperamos en la barbería. Hemos guardado tu lugar.</p>
      <router-link to="/" class="w-full bg-slate-800 text-white font-bold py-4 rounded-2xl hover:bg-slate-900 transition-colors">
        Volver al inicio
      </router-link>
    </div>

    <!-- Contenido normal de la reserva -->
    <template v-else>
      <header class="bg-white px-6 py-4 flex items-center gap-4 sticky top-0 z-10 border-b border-slate-100">
        <a @click="$router.back()" class="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </a>
        <div>
          <h1 class="font-bold text-slate-800 text-lg leading-tight">Agendar Cita</h1>
          <p class="text-xs text-slate-500 font-medium">Paso final</p>
        </div>
      </header>

      <section class="p-6 flex flex-col gap-8">
        
        <!-- Datos del Cliente -->
        <div>
          <h2 class="text-sm font-bold text-slate-800 mb-4">1. Tus datos</h2>
          <div class="flex flex-col gap-3">
            <input 
              v-model="nombreCliente" 
              type="text" 
              placeholder="Tu nombre completo"
              class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
            <input 
              v-model="telefonoCliente" 
              type="tel" 
              placeholder="Número de teléfono"
              class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
          </div>
        </div>

        <!-- Selección de Barbero -->
        <div>
          <h2 class="text-sm font-bold text-slate-800 mb-4">2. Elige a tu barbero</h2>
          <div class="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
            <TarjetaBarbero 
              v-for="barbero in barberos" 
              :key="barbero.id"
              :nombre="barbero.nombre"
              :seleccionado="barberoSeleccionado === barbero.id"
              @seleccionar="barberoSeleccionado = barbero.id"
            />
          </div>
        </div>

        <!-- Selección de Hora -->
        <div>
          <h2 class="text-sm font-bold text-slate-800 mb-4">3. Horarios disponibles para {{ fechaSeleccionada }}</h2>
          <div class="grid grid-cols-3 gap-3">
            <button 
              v-for="hora in horas" 
              :key="hora"
              @click="horaSeleccionada = hora"
              :class="['py-2.5 rounded-xl text-sm font-bold transition-all border', horaSeleccionada === hora ? 'bg-indigo-500 text-white border-indigo-500 shadow-md shadow-indigo-500/20' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300']"
            >
              {{ hora }}
            </button>
          </div>
        </div>

      </section>

      <!-- Botón Flotante de Confirmación -->
      <div class="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 p-4 pb-6 z-20">
        <button 
          @click="confirmarReserva"
          :disabled="cargando"
          class="w-full bg-indigo-600 text-white font-bold text-base py-4 rounded-2xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="cargando">Procesando...</span>
          <template v-else>
            Confirmar Reserva
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          </template>
        </button>
      </div>
    </template>
  </main>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 0px;
}
</style>
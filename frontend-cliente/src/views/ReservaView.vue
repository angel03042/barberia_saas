<script setup>
import { ref } from 'vue'
import TarjetaBarbero from '../components/TarjetaBarbero.vue'

// Simularemos los datos por ahora para construir la UI
const barberos = ref([
  { id: 1, nombre: 'Carlos' },
  { id: 2, nombre: 'Miguel' },
  { id: 3, nombre: 'David' }
])

const fechas = ref(['Hoy', 'Mañana', 'Jueves 10', 'Viernes 11'])
const horas = ref(['10:00 AM', '11:30 AM', '01:00 PM', '04:00 PM', '05:30 PM'])

const barberoSeleccionado = ref(null)
const fechaSeleccionada = ref('Hoy')
const horaSeleccionada = ref(null)

const confirmarReserva = () => {
  if(!barberoSeleccionado.value || !horaSeleccionada.value) {
    alert("Por favor selecciona un barbero y un horario.")
    return
  }
  alert("¡Cita reservada con éxito!")
}
</script>

<template>
  <main class="max-w-md mx-auto min-h-screen bg-slate-50 relative pb-24">
    
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
      
      <!-- Selección de Barbero (Usando nuestro componente modular) -->
      <div>
        <h2 class="text-sm font-bold text-slate-800 mb-4">1. Elige a tu barbero</h2>
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

      <!-- Selección de Fecha -->
      <div>
        <h2 class="text-sm font-bold text-slate-800 mb-4">2. ¿Qué día prefieres?</h2>
        <div class="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          <button 
            v-for="fecha in fechas" 
            :key="fecha"
            @click="fechaSeleccionada = fecha"
            :class="['whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-bold transition-colors border', fechaSeleccionada === fecha ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300']"
          >
            {{ fecha }}
          </button>
        </div>
      </div>

      <!-- Selección de Hora -->
      <div>
        <h2 class="text-sm font-bold text-slate-800 mb-4">3. Horarios disponibles</h2>
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
    <div class="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 p-4 pb-6">
      <button 
        @click="confirmarReserva"
        class="w-full bg-indigo-600 text-white font-bold text-base py-4 rounded-2xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-colors flex justify-center items-center gap-2"
      >
        Confirmar Reserva
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
      </button>
    </div>

  </main>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 0px;
}
</style>
<script setup>
import { ref } from 'vue'
import axios from 'axios'

// Recibe la orden de mostrarse desde el padre
const props = defineProps({
  show: Boolean
})

// Define los eventos para comunicarse con el padre
const emit = defineEmits(['close', 'registrado'])

const guardando = ref(false)
const formBarberia = ref({ nombre: '', direccion: '', telefono: '' })
const errorMsg = ref('')

const registrarBarberia = async () => {
  errorMsg.value = ''
  guardando.value = true
  
  try {
    const token = localStorage.getItem('barber_token')
    await axios.post('http://localhost:3000/api/barberias', formBarberia.value, {
      headers: { Authorization: `Bearer ${token}` }
    })

    formBarberia.value = { nombre: '', direccion: '', telefono: '' }
    emit('registrado') // Avisa que se guardó exitosamente
    emit('close')      // Pide que se cierre el panel

  } catch (error) {
    if (error.response && error.response.data.error) {
      errorMsg.value = error.response.data.error
    } else {
      errorMsg.value = 'Error al registrar la sucursal'
    }
  } finally {
    guardando.value = false
  }
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-[100] overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 overflow-hidden">
        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div class="pointer-events-auto w-screen max-w-md transform transition-all duration-300 ease-in-out">
            <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl rounded-l-[2rem]">
              
              <div class="bg-indigo-600 px-6 py-8 rounded-tl-[2rem]">
                <div class="flex items-center justify-between">
                  <h2 class="text-2xl font-bold text-white tracking-tight" id="slide-over-title">Nueva Sucursal</h2>
                  <button @click="$emit('close')" class="text-indigo-200 hover:text-white transition-colors p-1">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <p class="mt-2 text-sm text-indigo-200">Ingresa los datos para registrar y habilitar una nueva barbería en la plataforma.</p>
              </div>

              <form @submit.prevent="registrarBarberia" class="flex flex-1 flex-col justify-between">
                <div class="px-6 pt-8 pb-4 space-y-6">
                  <div>
                    <label class="block text-sm font-semibold text-slate-800 mb-2">Nombre Comercial *</label>
                    <input v-model="formBarberia.nombre" type="text" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-slate-700 font-medium placeholder:text-slate-400" placeholder="Ej. Barbería Norte Central">
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-slate-800 mb-2">Dirección Física *</label>
                    <input v-model="formBarberia.direccion" type="text" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-slate-700 font-medium placeholder:text-slate-400" placeholder="Calle, Número, Colonia, Ciudad">
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-slate-800 mb-2">Teléfono de Contacto</label>
                    <input v-model="formBarberia.telefono" type="text" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-slate-700 font-medium placeholder:text-slate-400" placeholder="Ej. 555-123-4567">
                  </div>

                  <div v-if="errorMsg" class="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100 flex items-start gap-3">
                    <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span class="font-medium">{{ errorMsg }}</span>
                  </div>
                </div>

                <div class="flex flex-shrink-0 justify-end px-6 py-6 border-t border-slate-100 gap-3 bg-slate-50">
                  <button type="button" @click="$emit('close')" class="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">Cancelar</button>
                  <button type="submit" :disabled="guardando" class="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 shadow-lg shadow-indigo-200 flex items-center gap-2">
                    <svg v-if="guardando" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    {{ guardando ? 'Registrando...' : 'Confirmar Registro' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
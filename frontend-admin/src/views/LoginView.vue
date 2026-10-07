<script setup>
import { ref } from 'vue'
import axios from 'axios'
// import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const mostrarPassword = ref(false)
const errorMsg = ref('')
const cargando = ref(false)
// const router = useRouter()

const handleLogin = async () => {
  errorMsg.value = ''
  cargando.value = true
  
  try {
    const respuesta = await axios.post('http://localhost:3000/api/usuarios/login', {
      email: email.value,
      password: password.value
    })
    
    // Guardar el token en el almacenamiento local del navegador
    localStorage.setItem('barber_token', respuesta.data.token)
    localStorage.setItem('barber_user', JSON.stringify(respuesta.data.usuario))
    
    // Aquí redirigiremos al dashboard (lo activaremos en el siguiente módulo)
    alert('¡Login exitoso! Token guardado.')
    // router.push('/dashboard')
    
  } catch (error) {
    if (error.response && error.response.data.error) {
      errorMsg.value = error.response.data.error
    } else {
      errorMsg.value = 'Error al conectar con el servidor'
    }
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 relative overflow-hidden flex items-center justify-center">
    
    <!-- Fondo Ondulado simulando el diseño -->
    <div class="absolute bottom-0 left-0 w-full leading-none z-0">
      <svg class="block w-full h-auto fill-indigo-500" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>

    <!-- Tarjeta de Login -->
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative z-10 mx-4 border border-indigo-50">
      
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-slate-800">Iniciar Sesion</h1>
        <p class="text-sm text-slate-500 mt-1">Panel de Administración</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        
        <!-- Campo Correo -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Correo o Usuario</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <!-- SVG Icono Correo -->
              <svg class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input 
              v-model="email" 
              type="email" 
              required
              placeholder="Enter your email address"
              class="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <!-- Campo Contraseña -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <!-- SVG Icono Candado -->
              <svg class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input 
              v-model="password" 
              :type="mostrarPassword ? 'text' : 'password'" 
              required
              placeholder="Enter your password"
              class="w-full pl-10 pr-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" @click="mostrarPassword = !mostrarPassword">
              <!-- SVG Icono Ojo -->
              <svg v-if="!mostrarPassword" class="h-5 w-5 text-slate-400 hover:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="h-5 w-5 text-slate-400 hover:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </div>
          </div>
          
          <div class="flex justify-end mt-1">
            <a href="#" class="text-xs text-indigo-600 hover:text-indigo-800">Forget Password?</a>
          </div>
        </div>

        <div v-if="errorMsg" class="text-red-500 text-sm text-center bg-red-50 py-2 rounded">
          {{ errorMsg }}
        </div>

        <!-- Botón Sign in -->
        <button 
          type="submit" 
          :disabled="cargando"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-4 shadow-md shadow-indigo-200 disabled:bg-indigo-400"
        >
          {{ cargando ? 'Iniciando...' : 'Iniciar Sesion' }}
        </button>
      </form>
      
    </div>
  </div>
</template>
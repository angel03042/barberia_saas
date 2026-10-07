<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const usuario = ref(null)

// Al cargar el componente, leemos los datos del usuario guardados
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
  <div class="min-h-screen bg-slate-100 font-sans">
    <!-- Navbar simple -->
    <header class="bg-indigo-600 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-white">Barber SaaS Admin</h1>
        <div class="flex items-center gap-4">
          <span class="text-indigo-100 text-sm">
            Hola, {{ usuario?.nombre || 'Administrador' }}
          </span>
          <button @click="cerrarSesion" class="bg-indigo-700 hover:bg-indigo-800 text-white px-3 py-1.5 rounded-md text-sm transition-colors">
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Bienvenido al Panel de Control</h2>
        <p class="text-gray-600">Desde aquí podrás gestionar barberías, servicios y citas.</p>
      </div>
    </main>
  </div>
</template>
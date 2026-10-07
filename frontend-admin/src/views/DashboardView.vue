<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const barberias = ref([])
const cargando = ref(true)
const barberiaSeleccionada = ref(null)

onMounted(async () => {
  await obtenerBarberias()
})

const obtenerBarberias = async () => {
  try {
    const token = localStorage.getItem('barber_token')
    const respuesta = await axios.get('http://localhost:3000/api/barberias', {
      headers: { Authorization: `Bearer ${token}` }
    })
    barberias.value = respuesta.data
    if (barberias.value.length > 0) {
      barberiaSeleccionada.value = barberias.value[0]
    }
  } catch (error) {
    console.error('Error', error)
  } finally {
    cargando.value = false
  }
}

const seleccionarBarberia = (barberia) => {
  barberiaSeleccionada.value = barberia
}
</script>

<template>
  <div class="flex flex-col gap-6 h-full">
    
    <!-- Header de la Vista -->
    <header class="flex items-center justify-between px-2">
      <div class="flex items-center gap-4">
        <h2 class="text-3xl font-bold text-slate-800 tracking-tight">Barberías</h2>
        <p class="text-slate-500 text-sm mt-1">Gestiona y rastrea tus sucursales en un solo lugar.</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
        </button>
        <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-indigo-200/50 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          Registrar sucursal
        </button>
      </div>
    </header>

    <!-- Tarjetas de Estadísticas Avanzadas -->
    <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      
      <!-- Card 1: Ilustración CSS -->
      <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-[150px] relative overflow-hidden group">
        <div class="flex justify-between items-start">
          <span class="text-[13px] font-semibold text-slate-500">Ingresos (Mes)</span>
          <div class="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
        <div class="relative z-10">
          <h3 class="text-2xl font-bold text-slate-800">$ 24,850.00</h3>
          <p class="text-xs text-red-500 font-medium mt-1 flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
            12.5% <span class="text-slate-400 font-normal">desde el mes pasado</span>
          </p>
        </div>
        <!-- Ilustración CSS Pura (Escritorio/Laptop/Planta) -->
        <div class="absolute bottom-2 right-4 w-20 h-16 opacity-90 transition-transform group-hover:scale-105">
          <div class="absolute bottom-0 w-16 h-1.5 bg-[#e2d5c3] rounded-full left-2"></div>
          <div class="absolute bottom-1.5 right-4 w-6 h-4 bg-slate-800 rounded-t-sm flex justify-center border-b-2 border-slate-900">
            <div class="w-4 h-2.5 bg-slate-100 mt-0.5 rounded-sm"></div>
          </div>
          <div class="absolute bottom-1.5 left-4 w-4 h-4 bg-slate-300 rounded-b-md"></div>
          <div class="absolute bottom-5 left-3 w-2.5 h-6 bg-emerald-500 rounded-full origin-bottom rotate-[-25deg]"></div>
          <div class="absolute bottom-5 left-5 w-2 h-5 bg-emerald-600 rounded-full origin-bottom rotate-[20deg]"></div>
          <!-- Lámpara -->
          <div class="absolute bottom-1.5 right-1 w-1 h-8 bg-slate-400 rotate-12"></div>
          <div class="absolute bottom-8 right-0 w-3 h-3 bg-slate-700 rounded-full"></div>
        </div>
      </div>

      <!-- Card 2: Gráfica de Barras -->
      <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[150px]">
        <div class="flex justify-between items-start">
          <span class="text-[13px] font-semibold text-slate-500">Citas proyectadas</span>
          <div class="w-6 h-6 rounded-md bg-indigo-50 text-indigo-500 flex items-center justify-center">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
        </div>
        <div class="flex items-center gap-3 mt-1">
          <h3 class="text-2xl font-bold text-slate-800">1,425</h3>
          <p class="text-xs text-indigo-500 font-medium flex items-center gap-0.5">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            8.2%
          </p>
        </div>
        <!-- Barras -->
        <div class="flex items-end justify-between h-10 mt-auto gap-1">
          <div class="w-full bg-indigo-100 rounded-t h-[30%]"></div>
          <div class="w-full bg-indigo-100 rounded-t h-[45%]"></div>
          <div class="w-full bg-indigo-100 rounded-t h-[35%]"></div>
          <div class="w-full bg-indigo-500 rounded-t h-[80%] shadow-sm shadow-indigo-200"></div>
          <div class="w-full bg-indigo-100 rounded-t h-[60%]"></div>
          <div class="w-full bg-indigo-100 rounded-t h-[95%]"></div>
        </div>
        <div class="flex justify-between mt-1 text-[9px] text-slate-400 font-medium uppercase">
          <span>Jul</span><span>Ago</span><span>Sep</span><span class="text-indigo-600 font-bold">Oct</span><span>Nov</span><span>Dic</span>
        </div>
      </div>

      <!-- Card 3: Gráfica de Línea SVG -->
      <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[150px]">
        <div class="flex justify-between items-start">
          <span class="text-[13px] font-semibold text-slate-500">Tiempo de atención prom.</span>
          <div class="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-bold text-slate-800">45 <span class="text-sm font-medium text-slate-500">min</span></h3>
          <p class="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            2 min <span class="text-slate-400 font-normal">mejora vs mes pasado</span>
          </p>
        </div>
        <!-- Línea Curva Suave -->
        <div class="h-10 mt-auto w-full relative -mx-1">
          <svg viewBox="0 0 200 40" class="w-full h-full overflow-visible" preserveAspectRatio="none">
            <!-- Relleno inferior difuminado -->
            <path d="M0,35 C50,25 80,40 130,20 C160,5 180,20 200,10 L200,45 L0,45 Z" fill="rgba(16, 185, 129, 0.1)" />
            <!-- Línea de trazado -->
            <path d="M0,35 C50,25 80,40 130,20 C160,5 180,20 200,10" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Puntos -->
            <circle cx="130" cy="20" r="3.5" fill="white" stroke="#10b981" stroke-width="2"/>
            <circle cx="200" cy="10" r="3.5" fill="white" stroke="#10b981" stroke-width="2"/>
          </svg>
        </div>
      </div>

      <!-- Card 4: Pagos y Stripe -->
      <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[150px]">
        <div class="flex justify-between items-start">
          <span class="text-[13px] font-semibold text-slate-500">Ingresos Disponibles</span>
          <div class="w-6 h-6 rounded-md bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
        </div>
        <div class="flex justify-between items-center mt-1">
          <h3 class="text-2xl font-bold text-slate-800">$ 186,540.00</h3>
          <button class="bg-[#1c1c24] hover:bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md transition-colors">
            Retirar ahora
          </button>
        </div>
        <!-- Tarjetas Miniatura -->
        <div class="flex gap-2 mt-auto">
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-2 flex-1 relative overflow-hidden">
            <span class="text-[9px] text-slate-400 font-bold tracking-widest block mb-1">VISA</span>
            <p class="text-xs font-bold text-slate-700">.... 4242</p>
            <div class="absolute -bottom-2 -right-2 w-6 h-6 bg-slate-200 rounded-full opacity-50"></div>
          </div>
          <div class="bg-indigo-500 rounded-xl p-2 flex-1 relative overflow-hidden shadow-md shadow-indigo-200">
            <span class="text-[9px] text-indigo-200 font-bold tracking-widest block mb-1">STRIPE</span>
            <p class="text-xs font-bold text-white">.... 6789</p>
            <div class="absolute -bottom-2 -right-2 w-6 h-6 bg-white rounded-full opacity-20"></div>
          </div>
        </div>
      </div>

    </section>

    <!-- Filtros Secundarios -->
    <div class="flex flex-wrap items-center gap-3 px-2 text-sm">
      <div class="bg-slate-800 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md">
        Filtros activos <span class="bg-indigo-500 text-white w-4 h-4 inline-flex items-center justify-center rounded-full ml-1 text-[10px]">2</span>
      </div>
      <select class="bg-white border border-slate-200 rounded-full px-4 py-1.5 outline-none text-slate-600 hover:border-indigo-300 transition-colors font-medium text-xs shadow-sm">
        <option>Todas las sucursales</option>
      </select>
      <select class="bg-white border border-slate-200 rounded-full px-4 py-1.5 outline-none text-slate-600 hover:border-indigo-300 transition-colors font-medium text-xs shadow-sm">
        <option>Solo activas</option>
      </select>
      
      <div class="ml-auto relative w-full sm:w-auto">
        <svg class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input type="text" placeholder="Buscar por ID o nombre..." class="bg-white border border-slate-200 rounded-full pl-9 pr-4 py-1.5 outline-none text-slate-600 focus:border-indigo-500 w-full sm:w-64 text-sm shadow-sm transition-all">
      </div>
    </div>

    <!-- Área de Trabajo Dividida -->
    <section class="flex-1 bg-[#1c1c24] rounded-[2rem] p-3 flex flex-col md:flex-row gap-3 min-h-[500px] shadow-xl">
      
      <!-- Lista Izquierda Oscura -->
      <div class="w-full md:w-1/3 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
        
        <div class="p-3 flex items-center justify-between text-white">
          <h3 class="font-semibold tracking-wide">Sucursales Registradas</h3>
          <div class="flex gap-2">
            <span class="bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-full border border-slate-700">Total: {{ barberias.length }}</span>
          </div>
        </div>

        <div v-if="cargando" class="text-slate-400 text-center py-8 text-sm">Cargando datos...</div>
        
        <button 
          v-for="(barberia, index) in barberias" 
          :key="barberia.id"
          @click="seleccionarBarberia(barberia)"
          :class="[
            barberiaSeleccionada?.id === barberia.id ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-900/50' : 'bg-[#252530] border-[#2d2d3b] hover:bg-[#2a2a36]',
            'w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 group'
          ]"
        >
          <!-- Avatar Falso para diseño -->
          <div class="relative">
            <img :src="`https://ui-avatars.com/api/?name=${barberia.nombre}&background=${barberiaSeleccionada?.id === barberia.id ? 'ffffff' : '4f46e5'}&color=${barberiaSeleccionada?.id === barberia.id ? '4f46e5' : 'ffffff'}`" class="w-10 h-10 rounded-full shadow-sm" alt="Logo">
            <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#1c1c24] rounded-full"></div>
          </div>
          
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-start mb-0.5">
              <h4 :class="[barberiaSeleccionada?.id === barberia.id ? 'text-white' : 'text-slate-200', 'font-semibold text-sm truncate']">
                {{ barberia.nombre }}
              </h4>
              <span :class="[barberiaSeleccionada?.id === barberia.id ? 'bg-white text-indigo-700' : 'bg-slate-700 text-slate-300', 'text-[10px] px-2 py-0.5 rounded-full font-bold']">
                Activa
              </span>
            </div>
            <p :class="[barberiaSeleccionada?.id === barberia.id ? 'text-indigo-200' : 'text-slate-400', 'text-xs truncate font-medium']">
              #SUC-{{ barberia.id.toString().padStart(4, '0') }} • Creada hace {{ index + 2 }} días
            </p>
          </div>
        </button>

      </div>

      <!-- Panel de Detalles Derecho (Violeta) -->
      <div class="w-full md:w-2/3 bg-[#5c5cd6] rounded-[1.5rem] p-6 lg:p-8 relative overflow-y-auto text-white flex flex-col shadow-inner border border-indigo-400/20">
        
        <template v-if="barberiaSeleccionada">
          <!-- Etiqueta superior y Título -->
          <div class="flex items-start justify-between mb-8">
            <div>
              <p class="text-indigo-200 text-xs font-bold tracking-widest uppercase mb-1 flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-300"></span> Detalles Operativos
              </p>
              <h2 class="text-3xl lg:text-4xl font-bold tracking-tight">#SUC-{{ barberiaSeleccionada.id.toString().padStart(4, '0') }}</h2>
            </div>
            <div class="text-right">
              <p class="text-indigo-200 text-xs font-bold tracking-widest uppercase mb-1">Empresa</p>
              <div class="flex items-center gap-2 justify-end">
                <span class="text-2xl font-bold">{{ barberiaSeleccionada.nombre }}</span>
                <svg class="w-6 h-6 text-indigo-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              </div>
            </div>
          </div>

          <!-- Sub-tarjetas de información simulando el diseño -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div class="bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur-md">
              <span class="block text-indigo-200 text-xs font-bold uppercase tracking-wider mb-2">Servicios Config.</span>
              <p class="font-bold text-2xl flex items-center justify-between">
                12 <svg class="w-5 h-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>
              </p>
            </div>
            <div class="bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur-md">
              <span class="block text-indigo-200 text-xs font-bold uppercase tracking-wider mb-2">Barberos Asig.</span>
              <p class="font-bold text-2xl flex items-center justify-between">
                4 <svg class="w-5 h-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </p>
            </div>
            
            <!-- Bloque punteado interactivo (Add Item replica) -->
            <button class="bg-transparent border-2 border-dashed border-indigo-300/50 rounded-2xl p-5 hover:bg-white/5 transition-colors flex flex-col items-center justify-center gap-2 group">
              <div class="w-8 h-8 rounded-full bg-indigo-400/30 flex items-center justify-center group-hover:bg-indigo-400/50 transition-colors">
                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
              </div>
              <span class="text-sm font-semibold text-indigo-200 group-hover:text-white">Añadir Módulo</span>
            </button>
          </div>

          <!-- Fila de Detalles Exactos -->
          <div class="bg-[#4a4ac9] rounded-2xl p-6 border border-indigo-400/30 flex justify-between items-center mt-auto shadow-inner">
            <div>
              <p class="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">Dirección Registrada</p>
              <p class="font-bold text-lg">{{ barberiaSeleccionada.direccion }}</p>
            </div>
            <div class="text-center px-6 border-x border-indigo-400/30">
              <p class="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">Teléfono</p>
              <p class="font-bold text-lg">{{ barberiaSeleccionada.telefono || 'N/A' }}</p>
            </div>
            <div class="flex items-center gap-3">
              <button class="w-10 h-10 border border-indigo-300 rounded-full flex items-center justify-center hover:bg-indigo-400 transition-colors">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>
              <button class="bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-2.5 rounded-full text-sm font-bold shadow-lg transition-colors">
                Gestionar Agenda
              </button>
            </div>
          </div>
        </template>

      </div>
    </section>
  </div>
</template>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #3f3f4e;
  border-radius: 10px;
}
</style>
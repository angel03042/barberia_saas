<script setup>
defineProps({
  barberia: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <div class="w-full md:w-2/3 bg-[#5c5cd6] rounded-[1.5rem] p-6 lg:p-8 relative overflow-y-auto text-white flex flex-col shadow-inner border border-indigo-400/20">
    <template v-if="barberia">
      <div class="flex items-start justify-between mb-8">
        <div>
          <p class="text-indigo-200 text-xs font-bold tracking-widest uppercase mb-1 flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-300"></span> Detalles Operativos
          </p>
          <h2 class="text-3xl lg:text-4xl font-bold tracking-tight">#SUC-{{ barberia.id.toString().padStart(4, '0') }}</h2>
        </div>
        <div class="text-right">
          <p class="text-indigo-200 text-xs font-bold tracking-widest uppercase mb-1">Empresa</p>
          <div class="flex items-center gap-2 justify-end">
            <span class="text-2xl font-bold">{{ barberia.nombre }}</span>
            <svg class="w-6 h-6 text-indigo-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          </div>
        </div>
      </div>

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
        <button class="bg-transparent border-2 border-dashed border-indigo-300/50 rounded-2xl p-5 hover:bg-white/5 transition-colors flex flex-col items-center justify-center gap-2 group">
          <div class="w-8 h-8 rounded-full bg-indigo-400/30 flex items-center justify-center group-hover:bg-indigo-400/50 transition-colors">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          </div>
          <span class="text-sm font-semibold text-indigo-200 group-hover:text-white">Añadir Módulo</span>
        </button>
      </div>

      <div class="bg-[#4a4ac9] rounded-2xl p-6 border border-indigo-400/30 flex justify-between items-center mt-auto shadow-inner">
        <div>
          <p class="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">Dirección Registrada</p>
          <p class="font-bold text-lg">{{ barberia.direccion }}</p>
        </div>
        <div class="text-center px-6 border-x border-indigo-400/30">
          <p class="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">Teléfono</p>
          <p class="font-bold text-lg">{{ barberia.telefono || 'N/A' }}</p>
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
    
    <template v-else>
      <div class="h-full flex flex-col items-center justify-center text-indigo-200 opacity-70">
        <svg class="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <p class="text-lg font-medium">Selecciona una barbería para ver sus detalles</p>
      </div>
    </template>
  </div>
</template>
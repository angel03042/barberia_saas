<script setup>
defineProps({
  nombre: String,
  seleccionado: Boolean
})
defineEmits(['seleccionar'])
</script>

<template>
  <div 
    @click="$emit('seleccionar')"
    :class="[
      'p-4 rounded-2xl border cursor-pointer transition-all flex flex-col items-center gap-2 min-w-[100px]',
      seleccionado ? 'border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-500/10' : 'border-slate-200 bg-white hover:border-indigo-200'
    ]"
  >
    <img :src="`https://ui-avatars.com/api/?name=${nombre}&background=e2e8f0&color=475569`" class="w-12 h-12 rounded-full shadow-sm" alt="Barbero">
    <span :class="['text-sm font-bold', seleccionado ? 'text-indigo-700' : 'text-slate-600']">{{ nombre }}</span>
  </div>
</template>
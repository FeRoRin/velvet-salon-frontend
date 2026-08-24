<template>
  <div class='group bg-white border border-stone-200 hover:border-stone-900
              transition-colors duration-300 p-8 flex flex-col h-full relative'>

    <div class='flex items-start justify-between mb-8'>
      <span class='text-xs font-medium tracking-[0.15em] uppercase text-stone-400'>
        {{ service.duration }} Min
      </span>
      <span v-if='service.is_active === false'
        class='text-xs font-medium tracking-[0.15em] uppercase text-stone-400 border border-stone-200 px-2 py-0.5'>
        Unavailable
      </span>
    </div>

    <h3 class='font-serif text-2xl text-stone-900 mb-3 leading-snug'>{{ displayName }}</h3>
    <p class='text-stone-600 text-sm leading-relaxed mb-8 line-clamp-3 flex-1'>
      {{ service.description }}
    </p>

    <div class='flex items-center justify-between pt-6 border-t border-stone-100'>
      <span class='font-serif text-2xl text-stone-900'>${{ service.price }}</span>
      <RouterLink :to='bookingLink'
        class='inline-flex items-center gap-2 text-sm font-medium text-stone-900
               border-b border-stone-900 pb-0.5
               group-hover:text-velvet-800 group-hover:border-velvet-800 transition-colors'>
        Book
        <svg class='w-4 h-4' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24'>
          <path stroke-linecap='round' stroke-linejoin='round' d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'/>
        </svg>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  service: { type: Object, required: true }
})

// API may return 'name' or 'title' — handle both
const displayName = computed(() => props.service.name || props.service.title || 'Service')

// Pre-select this service in the booking page
const bookingLink = computed(() => `/booking?service=${props.service.id}`)
</script>
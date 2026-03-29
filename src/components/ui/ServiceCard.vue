<template>
  <div class='bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl
              hover:border-pink-200 transition-all duration-300 hover:-translate-y-1 group'>

    <div class='flex items-start justify-between mb-4'>
      <div class='w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center
                  group-hover:bg-pink-100 transition-colors text-2xl'>
        {{ icon }}
      </div>
      <span class='text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full'>
        ⏱ {{ service.duration }}min
      </span>
    </div>

    <h3 class='text-base font-semibold text-gray-900 mb-2'>{{ displayName }}</h3>
    <p class='text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2'>
      {{ service.description }}
    </p>

    <div class='flex items-center justify-between'>
      <span class='text-2xl font-bold text-pink-700'>${{ service.price }}</span>
      <RouterLink :to='bookingLink'
        class='bg-pink-50 text-pink-700 px-4 py-2 rounded-xl text-sm font-medium
               group-hover:bg-pink-700 group-hover:text-white transition-all'>
        Book →
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

const icon = computed(() => {
  const t = displayName.value.toLowerCase()
  if (t.includes('cut') || t.includes('kids'))          return '✂️'
  if (t.includes('color'))                               return '🎨'
  if (t.includes('keratin'))                             return '✨'
  if (t.includes('highlight') || t.includes('balayage')) return '🌟'
  if (t.includes('bridal'))                              return '👰'
  if (t.includes('condition') || t.includes('deep'))     return '💧'
  if (t.includes('scalp'))                               return '💆'
  if (t.includes('blow') || t.includes('style'))         return '💨'
  return '💇'
})
</script>

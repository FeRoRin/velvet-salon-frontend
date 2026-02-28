<!-- Used in many places: dashboard, my-reservations, admin table -->
<template>
  <span :class='classes' class='px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide'>
    {{ status }}
  </span>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({ status: String })
const classes = computed(() => ({
  'bg-yellow-100 text-yellow-800': props.status === 'pending',
  'bg-green-100  text-green-800':  props.status === 'confirmed',
  'bg-blue-100   text-blue-800':   props.status === 'completed',
  'bg-gray-100   text-gray-500':   props.status === 'cancelled',
}))
</script>

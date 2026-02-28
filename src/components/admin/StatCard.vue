<template>
  <div class='bg-gray-900 rounded-2xl p-6 border border-gray-800
              hover:border-purple-700 transition-colors'>
    <div class='flex items-center justify-between mb-4'>
      <div :class='iconBg'
           class='w-12 h-12 rounded-xl flex items-center justify-center text-2xl'>
        {{ icon }}
      </div>
      <span v-if='change'
        :class='change > 0 ? "text-green-400" : "text-red-400"'
        class='text-xs font-medium'
      >{{ change > 0 ? '+' : '' }}{{ change }}%</span>
    </div>
    <div class='text-3xl font-bold text-white mb-1'>{{ value }}</div>
    <div class='text-gray-400 text-sm'>{{ label }}</div>
  </div>
</template>
<script setup>
defineProps({
  icon:    String,
  value:   [String, Number],
  label:   String,
  iconBg:  { type: String, default: 'bg-purple-900/50' },
  change:  { type: Number, default: null }
})
</script>
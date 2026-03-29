<template>
  <section id='contact' class='py-24 bg-white'>
    <div class='max-w-6xl mx-auto px-4'>
      <div class='text-center mb-14'>
        <h2 class='text-4xl font-serif font-bold text-gray-900'>Visit Us</h2>
        <p class='text-gray-500 mt-3'>We would love to see you</p>
      </div>

      <div class='grid grid-cols-1 md:grid-cols-3 gap-6'>

        <!-- Location (static) -->
        <div class='text-center bg-pink-50 rounded-2xl p-8 hover:bg-pink-100 transition-colors'>
          <div class='text-4xl mb-4'>📍</div>
          <h3 class='font-semibold text-gray-900 mb-2'>Our Location</h3>
          <p class='text-gray-500 text-sm leading-relaxed'>123 Rose Avenue, Fashion District</p>
        </div>

        <!-- Working Hours — loaded from API -->
        <div class='text-center bg-pink-50 rounded-2xl p-8 hover:bg-pink-100 transition-colors'>
          <div class='text-4xl mb-4'>🕐</div>
          <h3 class='font-semibold text-gray-900 mb-2'>Working Hours</h3>
          <div v-if='loadingHours' class='text-gray-400 text-sm'>Loading...</div>
          <div v-else class='text-gray-500 text-sm leading-relaxed space-y-1'>
            <p>{{ hoursText }}</p>
            <p class='font-medium text-pink-700'>{{ openCloseText }}</p>
          </div>
        </div>

        <!-- Contact (static) -->
        <div class='text-center bg-pink-50 rounded-2xl p-8 hover:bg-pink-100 transition-colors'>
          <div class='text-4xl mb-4'>📞</div>
          <h3 class='font-semibold text-gray-900 mb-2'>Get in Touch</h3>
          <p class='text-gray-500 text-sm leading-relaxed'>
            Phone: +1 (555) 234-5678<br>Email: hello@velvetsalon.com
          </p>
        </div>

      </div>

      <!-- CTA banner -->
      <div class='mt-14 bg-gradient-to-r from-pink-700 to-rose-600 rounded-3xl p-10 text-center text-white'>
        <h3 class='text-3xl font-serif font-bold mb-3'>Ready to look amazing?</h3>
        <p class='text-pink-100 mb-6'>Book your appointment today and experience the Velvet difference.</p>
        <RouterLink to='/booking'
          class='bg-white text-pink-700 px-8 py-3 rounded-full font-semibold
                 hover:bg-pink-50 transition-colors inline-block'>
          Book Now ✨
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { publicAPIService } from '../../services/api'

const settings     = ref(null)
const loadingHours = ref(true)

const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const hoursText = computed(() => {
  if (!settings.value) return 'Mon – Sat'
  const days = settings.value.working_days || [1,2,3,4,5,6]
  if (!days.length) return 'Closed'
  const names = days.map(d => DAY_NAMES[d])
  return names.join(', ')
})

const openCloseText = computed(() => {
  if (!settings.value) return '9:00 AM – 7:00 PM'
  const open  = settings.value.open_time?.slice(0,5)  || '09:00'
  const close = settings.value.close_time?.slice(0,5) || '19:00'
  return `${open} – ${close}`
})

onMounted(async () => {
  try {
    const res = await publicAPIService.getBusinessSettings()
    settings.value = res.data.data || res.data
  } catch {
    // silently use defaults
  } finally {
    loadingHours.value = false
  }
})
</script>

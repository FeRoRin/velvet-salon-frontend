<template>
  <section id='contact' class='py-24 bg-white'>
    <div class='max-w-6xl mx-auto px-4'>
      <div class='text-center mb-14'>
        <h2 class='text-4xl font-serif font-bold text-gray-900'>Visit Us</h2>
        <p class='text-gray-500 mt-3'>We would love to see you</p>
      </div>
      <div class='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div v-for='item in contactItems' :key='item.title'
             class='text-center bg-pink-50 rounded-2xl p-8 hover:bg-pink-100 transition-colors'>
          <div class='text-4xl mb-4'>{{ item.icon }}</div>
          <h3 class='font-semibold text-gray-900 mb-2'>{{ item.title }}</h3>
          <p class='text-gray-500 text-sm leading-relaxed'>{{ item.content }}</p>
        </div>
      </div>
      <!-- CTA banner -->
      <div class='mt-14 bg-gradient-to-r from-pink-700 to-rose-600 rounded-3xl
                  p-10 text-center text-white'>
        <h3 class='text-3xl font-serif font-bold mb-3'>Ready to look amazing?</h3>
        <p class='text-pink-100 mb-6'>Book your appointment today and experience the Velvet difference.</p>
        <RouterLink to='/booking'
          class='bg-white text-pink-700 px-8 py-3 rounded-full font-semibold
                 hover:bg-pink-50 transition-colors inline-block'
        >Book Now ✨</RouterLink>
      </div>
    </div>
  </section>
</template>
<script setup>
import { RouterLink } from 'vue-router'
const contactItems = [
  { icon:'📍', title:'Our Location',  content:'123 Rose Avenue, Fashion District, New York, NY 10001' },
  { icon:'🕐', title:'Working Hours', content:'Monday – Saturday\n9:00 AM – 7:00 PM\nSunday: Closed' },
  { icon:'📞', title:'Get in Touch',  content:'Phone: +1 (555) 234-5678\nEmail: hello@velvetsalon.com' },
]
</script>

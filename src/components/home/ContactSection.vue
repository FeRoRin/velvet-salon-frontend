<template>
  <section id='contact' class='py-24 bg-white'>
    <div class='max-w-6xl mx-auto px-4'>
      <div class='text-center mb-14'>
        <p class="text-xs font-medium tracking-[0.2em] uppercase text-stone-500 mb-4">Get In Touch</p>
        <h2 class='font-serif text-4xl text-stone-900'>Visit Us</h2>
        <p class='text-stone-500 mt-3'>We would love to see you</p>
      </div>
      
      <div class='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div v-for='item in contactItems' :key='item.title'
             class='bg-white rounded-2xl p-8 border border-stone-200 hover:border-pink-300 hover:shadow-lg hover:shadow-stone-200/30 transition-all duration-300 group'>
          
          <div class="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center mb-5 text-pink-700 group-hover:bg-pink-700 group-hover:text-white transition-colors duration-300">
            <svg v-if="item.icon === 'location'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
            </svg>
            <svg v-else-if="item.icon === 'hours'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
            </svg>
          </div>
          
          <h3 class='font-semibold text-stone-900 mb-3 text-lg'>{{ item.title }}</h3>
          <div class='text-stone-600 leading-relaxed text-sm space-y-1'>
            <p v-for="(line, i) in item.lines" :key="i">{{ line }}</p>
          </div>
        </div>
      </div>
      
      <!-- CTA banner -->
      <div class='mt-14 bg-gradient-to-r from-pink-700 to-rose-800  p-10 text-center text-white'>
        <h3 class='text-3xl font-serif font-bold mb-3'>Ready to look amazing?</h3>
        <p class='text-pink-100 mb-6'>Book your appointment today and experience the Velvet difference.</p>
        <RouterLink to='/booking'
          class='bg-white text-pink-700 px-8 py-3 font-semibold hover:bg-pink-50 transition-colors inline-block'
        >Book Your Appointment →</RouterLink>
      </div>
    </div>
  </section>
</template>
<script setup>
import { RouterLink } from 'vue-router'

const contactItems = [
  { 
    icon: 'location', 
    title: 'Our Location',  
    lines: ['123 Rose Avenue, Fashion District', 'New York, NY 10001'] 
  },
  { 
    icon: 'hours', 
    title: 'Working Hours', 
    lines: ['Monday – Saturday: 9:00 AM – 7:00 PM', 'Sunday: Closed'] 
  },
  { 
    icon: 'contact', 
    title: 'Get in Touch',  
    lines: ['Phone: +1 (555) 234-5678', 'Email: hello@velvetsalon.com'] 
  },
]
</script>
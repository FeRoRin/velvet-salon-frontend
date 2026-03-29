<template>
  <!-- min-h-screen = full viewport height -->
  <!-- bg-gradient-to-br = diagonal gradient bottom-right -->
  <section class='relative min-h-screen flex items-center justify-center
                  bg-gradient-to-br from-pink-50 via-white to-rose-50 overflow-hidden'>
 
    <!-- Decorative background blobs (visual polish) -->
    <div class='absolute -top-32 -left-32 w-96 h-96 bg-pink-200 rounded-full
                opacity-30 blur-3xl pointer-events-none'></div>
    <div class='absolute -bottom-32 -right-32 w-96 h-96 bg-rose-200 rounded-full
                opacity-30 blur-3xl pointer-events-none'></div>
 
    <!-- Main hero content -->
    <div class='relative z-10 text-center max-w-5xl mx-auto px-4 py-20'>
 
      <!-- Eyebrow label above title -->
      <div class='inline-flex items-center gap-2 bg-pink-100 text-pink-700
                  text-sm font-medium px-4 py-2 rounded-full mb-8'>
        <span>✨</span>
        <span>Premium Hair & Beauty Services</span>
      </div>
 
      <!-- Main heading — font-serif uses Playfair Display -->
      <h1 class='text-5xl md:text-6xl lg:text-7xl font-serif font-bold
                 text-gray-900 mb-6 leading-tight'>
        Where Beauty
        <span class='text-pink-700 italic'> Meets</span><br>
        <span class='text-gray-900'>Elegance</span>
      </h1>
 
      <p class='text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed'>
        Experience the art of hair care at Velvet Salon. From classic cuts
        to stunning transformations — we make you feel your most beautiful.
      </p>
 
      <!-- CTA buttons -->
      <div class='flex flex-col sm:flex-row gap-4 justify-center mb-20'>
        <RouterLink to='/booking'
          class='bg-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold
                 hover:bg-pink-800 shadow-lg shadow-pink-200 hover:shadow-pink-300
                 hover:scale-105 transition-all duration-200'
        >Book Appointment ✨</RouterLink>
        <a href='#services'
          class='border-2 border-pink-200 text-pink-700 px-8 py-4 rounded-full text-lg
                 font-semibold hover:bg-pink-50 hover:border-pink-400 transition-all'
        >Explore Services</a>
      </div>
 
      <!-- Stats row -->
      <!-- flex-wrap = wraps on small screens -->
      <div class='flex flex-wrap justify-center gap-12 border-t border-pink-100 pt-10'>
        <div v-for='stat in stats' :key='stat.label' class='text-center'>
          <div class='text-3xl font-bold text-pink-700'>{{ stat.value }}</div>
          <div class='text-gray-400 text-sm mt-1'>{{ stat.label }}</div>
        </div>
      </div>
 
    </div>
  </section>
</template>
 
<script setup>
import { RouterLink } from 'vue-router'
const stats = [
  { value:'500+', label:'Happy Clients'    },
  { value:'8+',   label:'Years Experience' },
  { value:'15+',  label:'Expert Stylists'  },
  { value:'4.9★', label:'Average Rating'   },
]
</script>

<template>
  <section class="bg-stone-50 overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 min-h-[85vh] items-center">
        
        <!-- Text -->
        <div class="px-6 sm:px-8 lg:px-12 py-16 lg:py-0 order-2 lg:order-1">
          <p class="text-xs font-medium tracking-[0.2em] uppercase text-stone-500 mb-6">
            Velvet Salon — Est. 2016
          </p>
          
          <h1 class="font-serif text-5xl sm:text-6xl lg:text-7xl text-stone-900 leading-[0.95] mb-8">
            The Art of<br>
            <span class="italic text-velvet-800">Beautiful</span> Hair.
          </h1>
          
          <p class="text-stone-600 text-lg leading-relaxed max-w-md mb-10">
            Personalized cuts, color and treatments in a calm, elegant salon experience. 
            Where your vision meets our craft.
          </p>
          
          <div class="flex flex-col sm:flex-row items-start gap-4 mb-16">
            <RouterLink to="/booking"
              class="inline-flex items-center gap-3 bg-stone-900 text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-stone-800 transition-colors"
            >
              Book an Appointment
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
              </svg>
            </RouterLink>
            <RouterLink to="/services"
              class="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors border-b border-stone-300 hover:border-stone-900 pb-1"
            >
              Explore Services
            </RouterLink>
          </div>
          
          <div class="flex items-center gap-8 text-sm text-stone-500">
            <div class="flex flex-col">
              <span class="font-serif text-2xl text-stone-900">500+</span>
              <span class="text-xs tracking-wide uppercase mt-1">Clients</span>
            </div>
            <div class="w-px h-8 bg-stone-300"></div>
            <div class="flex flex-col">
              <span class="font-serif text-2xl text-stone-900">4.9</span>
              <span class="text-xs tracking-wide uppercase mt-1">Rating</span>
            </div>
            <div class="w-px h-8 bg-stone-300"></div>
            <div class="flex flex-col">
              <span class="font-serif text-2xl text-stone-900">8+</span>
              <span class="text-xs tracking-wide uppercase mt-1">Years</span>
            </div>
          </div>
        </div>
        
        <!-- Image -->
        <div class="relative h-[50vh] lg:h-[85vh] order-1 lg:order-2">
          <img 
            src="/images/pexels-hairlust-official-2158267570-35267458.jpg" 
            alt="Luxury hair styling at Velvet Salon"
            class="absolute inset-0 w-full h-full object-cover"
          >
          <div class="absolute inset-0 bg-gradient-to-r from-stone-50/20 to-transparent lg:hidden"></div>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
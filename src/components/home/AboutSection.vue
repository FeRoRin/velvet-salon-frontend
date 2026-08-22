<template>
  <section class="bg-stone-100 py-24 lg:py-32">
    <div class="max-w-7xl mx-auto px-6 sm:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        <!-- Image -->
        <div class="relative">
          <div class="aspect-[4/5] overflow-hidden">
            <img 
              src="/images/pexels-by-natallia-311038782-13714796.jpg" 
              alt="Velvet Salon stylist at work"
              class="w-full h-full object-cover"
            >
          </div>
          <div class="absolute -bottom-6 -right-6 w-48 h-48 bg-stone-200 -z-10 hidden lg:block"></div>
        </div>
        
        <!-- Content -->
        <div>
          <p class="text-xs font-medium tracking-[0.2em] uppercase text-stone-500 mb-4">
            Our Story
          </p>
          <h2 class="font-serif text-4xl sm:text-5xl text-stone-900 mb-8 leading-tight">
            Beauty should feel<br>
            <span class="italic text-velvet-800">personal.</span>
          </h2>
          
          <div class="space-y-5 text-stone-600 leading-relaxed mb-10">
            <p>
              Founded in 2016, Velvet Salon has been the destination of choice for clients 
              who demand excellence. Our team of passionate stylists brings years of 
              international training and a deep dedication to craft.
            </p>
            <p>
              We believe every client deserves a personalized experience. From your first 
              consultation to the final reveal, we are committed to making you look and 
              feel absolutely stunning.
            </p>
          </div>
          
          <ul class="space-y-4 mb-10">
            <li v-for="feature in features" :key="feature" class="flex items-start gap-3 text-stone-700 text-sm">
              <svg class="w-5 h-5 text-velvet-800 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
              </svg>
              {{ feature }}
            </li>
          </ul>
          
          <RouterLink to="/services"
            class="inline-flex items-center gap-2 text-sm font-medium text-stone-900 border-b border-stone-900 pb-1 hover:text-velvet-800 hover:border-velvet-800 transition-colors"
          >
            Explore our services
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
            </svg>
          </RouterLink>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const features = [
  'Premium professional hair products only',
  'Fully certified and trained stylists',
  'Comfortable, relaxing atmosphere',
  'Flexible booking — online and by phone',
  'Satisfaction guaranteed on every service'
]
</script>
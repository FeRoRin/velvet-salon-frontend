<template>
  <section id='services' class='bg-white py-24 lg:py-32'>
    <div class='max-w-7xl mx-auto px-6 sm:px-8'>

      <div class='max-w-2xl mx-auto text-center mb-16 lg:mb-20'>
        <p class='text-xs font-medium tracking-[0.2em] uppercase text-stone-500 mb-4'>
          What We Offer
        </p>
        <h2 class='font-serif text-4xl sm:text-5xl text-stone-900 leading-tight mb-6'>
          Our <span class='italic text-velvet-800'>Services</span>
        </h2>
        <p class='text-stone-600 leading-relaxed'>
          From everyday styles to special occasion transformations, every service is
          tailored to you.
        </p>
      </div>

      <!-- Show first 6 services (preview) -->
      <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
        <ServiceCard
          v-for='service in services.slice(0, 6)'
          :key='service.id'
          :service='service'
        />
      </div>

      <div class='text-center mt-16'>
        <RouterLink to='/services'
          class='inline-flex items-center gap-2 text-sm font-medium text-stone-900
                 border-b border-stone-900 pb-1 hover:text-velvet-800 hover:border-velvet-800
                 transition-colors'
        >
          View All Services
          <svg class='w-4 h-4' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24'>
            <path stroke-linecap='round' stroke-linejoin='round' d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'/>
          </svg>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink }     from 'vue-router'
import ServiceCard        from '../ui/ServiceCard.vue'
import { fakeServices, servicesAPI } from '../../services/api'

const services = ref(fakeServices)  // Start with fake data

// Uncomment when backend is running:
// onMounted(async () => {
//   const res = await servicesAPI.getAll()
//   services.value = res.data.data
// })
</script>
<template>
  <section id='services' class='py-24 bg-white'>
    <div class='max-w-7xl mx-auto px-4'>
 
      <div class='text-center mb-16'>
        <span class='text-pink-700 text-sm font-semibold uppercase tracking-widest'>
          What We Offer
        </span>
        <h2 class='text-4xl font-serif font-bold text-gray-900 mt-3'>Our Services</h2>
        <p class='text-gray-500 mt-3 max-w-xl mx-auto'>
          From everyday styles to special occasion transformations.
        </p>
      </div>
 
      <!-- Show first 6 services (preview) -->
      <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <ServiceCard
          v-for='service in services.slice(0, 6)'
          :key='service.id'
          :service='service'
        />
      </div>
 
      <div class='text-center mt-12'>
        <RouterLink to='/services'
          class='inline-flex items-center gap-2 border-2 border-pink-700 text-pink-700
                 px-8 py-3 rounded-full font-semibold hover:bg-pink-700 hover:text-white
                 transition-all'
        >View All Services →</RouterLink>
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

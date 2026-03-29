<template>
  <section class='py-24 bg-pink-50'>
    <div class='max-w-6xl mx-auto px-4'>
      <div class='text-center mb-14'>
        <span class='text-pink-700 text-sm font-semibold uppercase tracking-widest'>
          Client Stories
        </span>
        <h2 class='text-4xl font-serif font-bold text-gray-900 mt-3'>
          What Our Clients Say
        </h2>
      </div>
      <div class='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div v-for='t in testimonials' :key='t.name'
             class='bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow'>
          <!-- Stars -->
          <div class='flex gap-1 text-yellow-400 text-lg mb-4'>
            <span v-for='i in 5' :key='i'>★</span>
          </div>
          <p class='text-gray-600 text-sm leading-relaxed mb-5 italic'>
            "{{ t.text }}"
          </p>
          <div class='flex items-center gap-3'>
            <div class='w-10 h-10 bg-pink-200 rounded-full flex items-center
                        justify-center text-pink-700 font-bold'>
              {{ t.name.charAt(0) }}
            </div>
            <div>
              <div class='font-semibold text-gray-900 text-sm'>{{ t.name }}</div>
              <div class='text-gray-400 text-xs'>{{ t.service }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const testimonials = [
  { name:'Emma Wilson',  service:'Balayage Highlights', text:'Absolutely stunning result! The team at Velvet Salon transformed my hair completely. I have never felt more confident.' },
  { name:'Sofia Garcia', service:'Bridal Package',      text:'They made my wedding day perfect. The bridal package was worth every penny and the team was so professional.' },
  { name:'Aisha Johnson',service:'Keratin Treatment',   text:'My frizzy hair is now silky smooth. I visit every 3 months and always leave feeling like a new person!' },
]
</script>

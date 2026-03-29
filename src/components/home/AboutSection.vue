<!-- src/components/home/AboutSection.vue -->
<template>
  <section id="about" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        <!-- ── Left: Text content ── -->
        <div>
          <span class="text-pink-700 font-semibold text-sm uppercase tracking-widest">
            Our Story
          </span>
          <h2 class="text-4xl font-serif font-bold text-gray-900 mt-3 mb-6">
            About Velvet Salon
          </h2>
          <p class="text-gray-600 leading-relaxed mb-4">
            Founded in 2016, Velvet Salon has been the destination of choice
            for clients who demand excellence. Our team of passionate stylists
            brings years of international training and a deep dedication to craft.
          </p>
          <p class="text-gray-600 leading-relaxed mb-8">
            We believe every client deserves a personalized experience.
            From your first consultation to the final reveal, we are committed
            to making you look and feel absolutely stunning.
          </p>

          <!-- Features list -->
          <ul class="space-y-3">
            <li
              v-for="feature in features"
              :key="feature"
              class="flex items-center gap-3 text-gray-700"
            >
              <span class="w-6 h-6 bg-pink-700 rounded-full flex items-center
                           justify-center text-white text-xs flex-shrink-0">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>

        <!-- ── Right: Highlight cards ── -->
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="item in highlights"
            :key="item.label"
            class="bg-pink-50 rounded-2xl p-6 text-center
                   hover:bg-pink-100 transition-colors"
          >
            <div class="text-3xl mb-3">{{ item.icon }}</div>
            <div class="text-2xl font-bold text-pink-700">{{ item.value }}</div>
            <div class="text-gray-500 text-sm mt-1">{{ item.label }}</div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  'Premium professional hair products only',
  'Fully certified and trained stylists',
  'Comfortable, relaxing atmosphere',
  'Flexible booking — online and by phone',
  'Satisfaction guaranteed on every service',
]

const highlights = [
  { icon: '💇', value: '500+', label: 'Happy Clients'    },
  { icon: '⭐', value: '4.9',  label: 'Average Rating'   },
  { icon: '👩‍🎨', value: '15+',  label: 'Expert Stylists' },
  { icon: '🏆', value: '8+',   label: 'Years of Service' },
]
</script>
<template>
  <section class="bg-stone-50 py-20 lg:py-24">
    <div class="max-w-4xl mx-auto px-6 sm:px-8 text-center">

      <!-- Section Heading -->
      <div class="mb-12">
        <p class="text-xs font-medium tracking-[0.2em] uppercase text-stone-500 mb-4">
          Client Stories
        </p>

        <h2 class="font-serif text-3xl sm:text-4xl text-stone-900">
          What Our Clients Say
        </h2>
<!--
        <p class="text-sm text-stone-500 mt-3">
          Real experiences from clients who trust us with their hair.
        </p> -->
      </div>

      <!-- Testimonial -->
      <div
        class="min-h-[280px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
        style="touch-action: pan-y;"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @pointerleave="onPointerUp"
      >
        <Transition name="fade" mode="out-in">
          <div
            :key="active"
            class="max-w-3xl"
          >
            <!-- Stars -->
            <div class="flex justify-center gap-1 mb-6">
              <svg
                v-for="n in 5"
                :key="n"
                class="w-4 h-4 text-amber-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>

            <blockquote class="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-800 italic leading-relaxed mb-8">
              "{{ testimonials[active].text }}"
            </blockquote>

            <div>
              <p class="font-semibold text-xs text-stone-900 uppercase tracking-[0.15em]">
                {{ testimonials[active].name }}
              </p>

              <p class="text-sm text-[#a33a61] mt-2">
                {{ testimonials[active].service }}
              </p>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center gap-3 mt-8">
        <button
          v-for="(_, i) in testimonials"
          :key="i"
          @click="active = i"
          class="h-2 rounded-full transition-all duration-300"
          :class="active === i
            ? 'bg-[#a33a61] w-6'
            : 'bg-stone-300 hover:bg-stone-400 w-2'"
          :aria-label="`Show testimonial ${i + 1}`"
        />
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(0)

function next() {
  active.value = (active.value + 1) % testimonials.length
}
function prev() {
  active.value = (active.value - 1 + testimonials.length) % testimonials.length
}

// Desktop mouse-drag + mobile touch-swipe, unified via the Pointer Events API
let dragging = false
let startX = 0
const DRAG_THRESHOLD = 40 // px before a drag counts as a swipe

function onPointerDown(e) {
  dragging = true
  startX = e.clientX
}
function onPointerMove(e) {
  if (!dragging) return
  // prevent the browser from treating this as a text/image drag
  e.preventDefault()
}
function onPointerUp(e) {
  if (!dragging) return
  dragging = false
  const delta = e.clientX - startX
  if (delta <= -DRAG_THRESHOLD) next()
  else if (delta >= DRAG_THRESHOLD) prev()
}

const testimonials = [
  {
    name: 'Emma Wilson',
    service: 'Balayage Highlights',
    text: 'Absolutely stunning result. The team at Velvet Salon transformed my hair completely. I have never felt more confident.'
  },
  {
    name: 'Sofia Garcia',
    service: 'Bridal Package',
    text: 'They made my wedding day perfect. The bridal package was worth every penny and the team was so professional.'
  },
  {
    name: 'Aisha Johnson',
    service: 'Keratin Treatment',
    text: 'My frizzy hair is now silky smooth. I visit every 3 months and always leave feeling like a new person.'
  }
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
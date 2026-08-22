<template>
  <!-- =========================================================
       RECENT WORK / PORTFOLIO SECTION
       This section displays the salon's work in an editorial grid.
       ========================================================= -->
  <section id="portfolio" class="bg-white py-24 lg:py-32">
    <div class="max-w-7xl mx-auto px-6 sm:px-8">

      <!-- =====================================================
           SECTION HEADER
           Small label + main title + description
           ===================================================== -->
      <div class="mb-12 lg:mb-16 text-center">

        <!-- Small section label -->
        <p
          class="text-xs font-medium tracking-[0.2em] uppercase text-stone-500 mb-4"
        >
          Recent Work
        </p>

        <!-- Main section title -->
        <h2 class="font-serif text-4xl sm:text-5xl text-stone-900">
          Our Latest Transformations
        </h2>

        <!-- Small description explaining the gallery -->
        <p class="max-w-xl mx-auto mt-4 text-sm sm:text-base text-stone-500 leading-relaxed">
          Explore some of our latest transformations and signature styles.
        </p>
      </div>


      <!-- =====================================================
           IMAGE GALLERY
           4-column grid on desktop and 2 columns on mobile.
           The first image is larger to create an editorial look.
           ===================================================== -->
      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[280px]"
      >

        <!-- ===================================================
             LARGE IMAGE
             col-span-2 + row-span-2 makes this image bigger.
             =================================================== -->
        <div
          class="col-span-2 row-span-2 overflow-hidden group relative cursor-pointer"
          @click="openImage({
            image: '/images/pexels-ionela-mat-268382825-20894394.jpg',
            title: 'Balayage Highlights',
            description: 'Beautiful dimension and natural-looking color.'
          })"
        >
          <!-- Image -->
          <img
            src="/images/pexels-ionela-mat-268382825-20894394.jpg"
            alt="Balayage highlights and hair coloring"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          >

          <!-- =================================================
               HOVER OVERLAY
               Appears when the user hovers over the image.
               ================================================= -->
          <div
            class="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end"
          >
            <div class="p-6 text-left">
              <p class="text-xs uppercase tracking-[0.2em] text-white/70 mb-2">
                Hair Color
              </p>

              <h3 class="font-serif text-2xl text-white">
                Balayage Highlights
              </h3>

              <!-- Stops this click from opening the lightbox -->
              <button
                @click.stop="goToService('balayage-highlights')"
                class="mt-3 text-sm text-white border-b border-white/60 hover:border-white transition-colors"
              >
                View Service →
              </button>
            </div>
          </div>
        </div>


        <!-- ===================================================
             IMAGE 2
             =================================================== -->
        <div
          class="overflow-hidden group relative cursor-pointer"
          @click="openImage({
            image: '/images/pexels-oleksandra-23349908.jpg',
            title: 'Deep Conditioning',
            description: 'Nourishing care for healthy and hydrated hair.'
          })"
        >
          <img
            src="/images/pexels-oleksandra-23349908.jpg"
            alt="Hair treatment"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          >

          <div
            class="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end"
          >
            <div class="p-4">
              <h3 class="font-serif text-lg text-white">
                Deep Conditioning
              </h3>

              <button
                @click.stop="goToService('deep-conditioning')"
                class="mt-2 text-xs text-white/80 hover:text-white transition-colors"
              >
                View Service →
              </button>
            </div>
          </div>
        </div>


        <!-- ===================================================
             IMAGE 3
             =================================================== -->
        <div
          class="overflow-hidden group relative cursor-pointer"
          @click="openImage({
            image: '/images/pexels-alinaskazka-15507420.jpg',
            title: 'Bridal Styling',
            description: 'Elegant styling for your special day.'
          })"
        >
          <img
            src="/images/pexels-alinaskazka-15507420.jpg"
            alt="Bridal hair styling"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          >

          <div
            class="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end"
          >
            <div class="p-4">
              <h3 class="font-serif text-lg text-white">
                Bridal Styling
              </h3>

              <button
                @click.stop="goToService('bridal-package')"
                class="mt-2 text-xs text-white/80 hover:text-white transition-colors"
              >
                View Service →
              </button>
            </div>
          </div>
        </div>


        <!-- ===================================================
             IMAGE 4
             =================================================== -->
        <div
          class="overflow-hidden group relative cursor-pointer"
          @click="openImage({
            image: '/images/pexels-enginakyurt-3065171.jpg',
            title: 'Styled Waves',
            description: 'Soft, elegant waves for a beautiful finish.'
          })"
        >
          <img
            src="/images/pexels-enginakyurt-3065171.jpg"
            alt="Styled waves"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          >

          <div
            class="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end"
          >
            <div class="p-4">
              <h3 class="font-serif text-lg text-white">
                Styled Waves
              </h3>

              <button
                @click.stop="goToService('classic-haircut')"
                class="mt-2 text-xs text-white/80 hover:text-white transition-colors"
              >
                View Service →
              </button>
            </div>
          </div>
        </div>


        <!-- ===================================================
             IMAGE 5
             =================================================== -->
        <div
          class="overflow-hidden group relative cursor-pointer"
          @click="openImage({
            image: '/images/pexels-element5-973401.jpg',
            title: 'Silky Hair Finish',
            description: 'Smooth, healthy-looking hair with a natural shine.'
          })"
        >
          <img
            src="/images/pexels-element5-973401.jpg"
            alt="Silky smooth hair"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          >

          <div
            class="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end"
          >
            <div class="p-4">
              <h3 class="font-serif text-lg text-white">
                Silky Hair Finish
              </h3>

              <button
                @click.stop="goToService('keratin-treatment')"
                class="mt-2 text-xs text-white/80 hover:text-white transition-colors"
              >
                View Service →
              </button>
            </div>
          </div>
        </div>

      </div>


      <!-- =====================================================
           SECTION CTA
           This gives the user an action after viewing the images.
           =====================================================
      <div class="flex justify-center mt-10 lg:mt-12">
        <button
          @click="viewAllWork"
          class="inline-flex items-center gap-2 border border-[#b32d5b] px-6 py-3 rounded-full text-sm font-medium text-[#b32d5b] hover:bg-[#b32d5b] hover:text-white transition-all duration-300"
        >
          View All Our Work
          <span>→</span>
        </button>
      </div>
 -->
    </div>


    <!-- =======================================================
         IMAGE LIGHTBOX
         This appears after the user clicks an image.
         It shows the selected image in a larger view.
         ======================================================= -->
    <Transition name="lightbox">
      <div
        v-if="selectedImage"
        class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-8"
        @click="closeImage"
      >

        <!-- This stops clicking inside the content from closing it -->
        <div
          class="relative max-w-5xl w-full"
          @click.stop
        >

          <!-- Close button -->
          <button
            @click="closeImage"
            class="absolute -top-12 right-0 text-white text-sm hover:text-white/70 transition-colors"
          >
            Close ✕
          </button>

          <!-- Selected large image -->
          <img
            :src="selectedImage.image"
            :alt="selectedImage.title"
            class="w-full max-h-[75vh] object-contain bg-black"
          >

          <!-- Image information -->
          <div class="bg-white p-5 sm:p-6">
            <h3 class="font-serif text-2xl text-stone-900">
              {{ selectedImage.title }}
            </h3>

            <p class="text-sm text-stone-500 mt-2">
              {{ selectedImage.description }}
            </p>
          </div>

        </div>
      </div>
    </Transition>

  </section>
</template>


<script setup>
import { ref } from 'vue'


// =============================================================
// SELECTED IMAGE
// Stores the image the user clicked.
// If it is null, the lightbox is closed.
// =============================================================
const selectedImage = ref(null)


// =============================================================
// OPEN IMAGE
// Receives the image data and opens it inside the lightbox.
// =============================================================
const openImage = (imageData) => {
  selectedImage.value = imageData
}


// =============================================================
// CLOSE IMAGE
// Sets the selected image back to null.
// This hides the lightbox.
// =============================================================
const closeImage = () => {
  selectedImage.value = null
}


// =============================================================
// GO TO SERVICE
// Currently this example scrolls to the services section.
//
// IMPORTANT:
// Change '#services' if your actual services section has
// a different ID.
//
// Example:
// <section id="services">
// =============================================================
const goToService = (service) => {
  console.log('Selected service:', service)

  document.querySelector('#services')?.scrollIntoView({
    behavior: 'smooth'
  })
}


// =============================================================
// VIEW ALL WORK
// For now, this scrolls back to the gallery.
//
// Later, when you create a full gallery page,
// you can replace this with Vue Router navigation.
// =============================================================
const viewAllWork = () => {
  document.querySelector('#portfolio')?.scrollIntoView({
    behavior: 'smooth'
  })
}
</script>


<style scoped>
/* =============================================================
   LIGHTBOX ANIMATION
   Controls the fade effect when opening and closing the image.
   ============================================================= */

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
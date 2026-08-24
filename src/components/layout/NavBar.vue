<template>
  <!-- sticky top-0 = stays at top when scrolling -->
  <!-- z-50 = appears above all other content -->
  <nav
    class='sticky top-0 z-50 transition-all duration-300'
    :class="scrolled
      ? 'bg-white/80 backdrop-blur-md border-b border-stone-200/70 shadow-[0_1px_0_0_rgba(0,0,0,0.02)]'
      : 'bg-white/60 backdrop-blur-sm border-b border-transparent'"
  >
    <div class='max-w-7xl mx-auto px-6 sm:px-8'>
      <div class='flex items-center justify-between h-16 lg:h-20'>

        <!-- ── LOGO ──────────────────────────────────── -->
        <RouterLink to='/' class='flex items-center gap-2 group' @click='closeMobile'>
          <img src='../../assets/logo.png' alt='Velvet Salon' class='h-9 lg:h-10 w-auto object-contain' />
        </RouterLink>

        <!-- ── CENTER LINKS (hidden on mobile) ──────── -->
        <div class='hidden md:flex items-center gap-10'>
          <RouterLink to='/'
            class='text-stone-600 hover:text-stone-900 font-medium transition-colors text-sm'
            active-class='text-stone-900'
          >Home</RouterLink>

          <RouterLink to='/services'
            class='text-stone-600 hover:text-stone-900 font-medium transition-colors text-sm'
            active-class='text-stone-900'
          >Services</RouterLink>

          <!-- Only show when client is logged in -->
          <RouterLink v-if='auth.isClient' to='/dashboard'
            class='text-stone-600 hover:text-stone-900 font-medium transition-colors text-sm'
            active-class='text-stone-900'
          >Dashboard</RouterLink>

          <RouterLink v-if='auth.isClient' to='/my-reservations'
            class='text-stone-600 hover:text-stone-900 font-medium transition-colors text-sm'
            active-class='text-stone-900'
          >My Bookings</RouterLink>

          <!-- Admin link -->
          <RouterLink v-if='auth.isAdmin' to='/admin'
            class='text-admin-700 hover:text-admin-900 font-medium transition-colors text-sm'
          >Admin Panel</RouterLink>
        </div>

        <!-- ── RIGHT SIDE (desktop) ─────────────────────── -->
        <div class='hidden md:flex items-center gap-5'>

          <!-- Not logged in -->
          <template v-if='!auth.isLoggedIn'>
            <RouterLink to='/login'
              class='text-stone-600 hover:text-stone-900 font-medium text-sm transition-colors'
            >Login</RouterLink>
            <RouterLink to='/booking'
              class='inline-flex items-center bg-stone-900 text-white px-6 py-2.5
                     text-sm font-medium tracking-wide hover:bg-stone-800 transition-colors'
            >Book Now</RouterLink>
          </template>

          <!-- Logged in -->
          <template v-else>
            <!-- User avatar circle -->
            <div class='relative group'>
              <button class='flex items-center gap-2 border border-stone-200 hover:border-stone-300
                            px-3 py-1.5 transition-colors'>
                <div class='w-6 h-6 bg-stone-900 rounded-full flex items-center
                            justify-center text-white text-xs font-medium'>
                  {{ auth.userName.charAt(0).toUpperCase() }}
                </div>
                <span class='text-sm font-medium text-stone-700'>
                  {{ auth.userName.split(' ')[0] }}
                </span>
                <span class='text-stone-400 text-xs'>▾</span>
              </button>

              <!-- Dropdown menu -->
              <div class='absolute right-0 mt-1 w-48 bg-white shadow-lg
                          border border-stone-100 py-1 opacity-0 invisible
                          group-hover:opacity-100 group-hover:visible transition-all'>
                <RouterLink to='/profile'
                  class='block px-4 py-2 text-sm text-stone-700
                         hover:bg-stone-50 hover:text-stone-900 transition-colors'
                >My Profile</RouterLink>
                <RouterLink to='/my-reservations'
                  class='block px-4 py-2 text-sm text-stone-700
                         hover:bg-stone-50 hover:text-stone-900 transition-colors'
                >My Bookings</RouterLink>
                <hr class='my-1 border-stone-100'>
                <button @click='handleLogout'
                  class='block px-4 py-2 text-sm text-rose-600
                         hover:bg-rose-50 w-full text-left transition-colors'
                >Logout</button>
              </div>
            </div>
          </template>
        </div>

        <!-- ── MOBILE TOGGLE ─────────────────────────────── -->
        <button
          class='md:hidden relative w-9 h-9 flex items-center justify-center text-stone-900'
          @click='mobileOpen = !mobileOpen'
          :aria-expanded='mobileOpen'
          aria-label='Toggle menu'
        >
          <svg class='w-6 h-6' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24'>
            <path v-if='!mobileOpen' stroke-linecap='round' stroke-linejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'/>
            <path v-else stroke-linecap='round' stroke-linejoin='round' d='M6 18L18 6M6 6l12 12'/>
          </svg>
        </button>
      </div>
    </div>

    <!-- ── MOBILE PANEL ─────────────────────────────────── -->
    <Transition
      enter-active-class='transition-all duration-300 ease-out'
      enter-from-class='opacity-0 -translate-y-2'
      enter-to-class='opacity-100 translate-y-0'
      leave-active-class='transition-all duration-200 ease-in'
      leave-from-class='opacity-100 translate-y-0'
      leave-to-class='opacity-0 -translate-y-2'
    >
      <div v-if='mobileOpen' class='md:hidden bg-white border-t border-stone-100 shadow-lg'>
        <div class='max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1'>

          <RouterLink to='/' @click='closeMobile'
            class='py-3 text-base text-stone-700 hover:text-stone-900 border-b border-stone-100 transition-colors'
            active-class='text-stone-900 font-medium'
          >Home</RouterLink>

          <RouterLink to='/services' @click='closeMobile'
            class='py-3 text-base text-stone-700 hover:text-stone-900 border-b border-stone-100 transition-colors'
            active-class='text-stone-900 font-medium'
          >Services</RouterLink>

          <RouterLink v-if='auth.isClient' to='/dashboard' @click='closeMobile'
            class='py-3 text-base text-stone-700 hover:text-stone-900 border-b border-stone-100 transition-colors'
            active-class='text-stone-900 font-medium'
          >Dashboard</RouterLink>

          <RouterLink v-if='auth.isClient' to='/my-reservations' @click='closeMobile'
            class='py-3 text-base text-stone-700 hover:text-stone-900 border-b border-stone-100 transition-colors'
            active-class='text-stone-900 font-medium'
          >My Bookings</RouterLink>

          <RouterLink v-if='auth.isAdmin' to='/admin' @click='closeMobile'
            class='py-3 text-base text-admin-700 hover:text-admin-900 border-b border-stone-100 transition-colors'
          >Admin Panel</RouterLink>

          <template v-if='!auth.isLoggedIn'>
            <RouterLink to='/login' @click='closeMobile'
              class='py-3 text-base text-stone-700 hover:text-stone-900 border-b border-stone-100 transition-colors'
            >Login</RouterLink>
            <RouterLink to='/booking' @click='closeMobile'
              class='mt-4 inline-flex items-center justify-center bg-stone-900 text-white
                     px-6 py-3.5 text-sm font-medium tracking-wide hover:bg-stone-800 transition-colors'
            >Book Now</RouterLink>
          </template>

          <template v-else>
            <RouterLink to='/profile' @click='closeMobile'
              class='py-3 text-base text-stone-700 hover:text-stone-900 border-b border-stone-100 transition-colors'
            >My Profile</RouterLink>
            <RouterLink to='/my-reservations' @click='closeMobile'
              class='py-3 text-base text-stone-700 hover:text-stone-900 border-b border-stone-100 transition-colors'
            >My Bookings</RouterLink>
            <button @click='handleLogout'
              class='py-3 text-base text-left text-rose-600 hover:text-rose-700 transition-colors'
            >Logout</button>
          </template>

        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useAuthStore }  from '../../stores/auth'
import { useRouter, useRoute } from 'vue-router'
import { authAPI }       from '../../services/api'

const auth   = useAuthStore()
const router = useRouter()
const route  = useRoute()

async function handleLogout() {
  try { await authAPI.logout() } catch (e) {}  // Call API (ignore errors)
  auth.logout()            // Clear Pinia + localStorage
  router.push('/')         // Go to homepage
}

// ── Scroll-triggered frosted-glass effect ─────────────────
const scrolled = ref(false)
function onScroll() {
  scrolled.value = window.scrollY > 24
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// ── Mobile menu ────────────────────────────────────────────
const mobileOpen = ref(false)
function closeMobile() {
  mobileOpen.value = false
}
watch(() => route.fullPath, closeMobile)
</script>
<template>
  <!-- sticky top-0 = stays at top when scrolling -->
  <!-- z-50 = appears above all other content -->
  <nav class='bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50
              border-b border-pink-100'>
    <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div class='flex items-center justify-between h-16'>
 
        <!-- ── LOGO ──────────────────────────────────── -->
        <RouterLink to='/' class='flex items-center gap-2 group'>
          <span class='text-2xl group-hover:scale-110 transition-transform'>🌸</span>
          <span class='text-xl font-serif font-bold text-pink-700'>
            Velvet Salon
          </span>
        </RouterLink>
 
        <!-- ── CENTER LINKS (hidden on mobile) ──────── -->
        <div class='hidden md:flex items-center gap-8'>
          <RouterLink to='/'
            class='text-gray-600 hover:text-pink-700 font-medium transition-colors
                   text-sm'
            active-class='text-pink-700 font-semibold'
          >Home</RouterLink>
 
          <RouterLink to='/services'
            class='text-gray-600 hover:text-pink-700 font-medium transition-colors text-sm'
            active-class='text-pink-700 font-semibold'
          >Services</RouterLink>
 
          <!-- Only show when client is logged in -->
          <RouterLink v-if='auth.isClient' to='/dashboard'
            class='text-gray-600 hover:text-pink-700 font-medium transition-colors text-sm'
            active-class='text-pink-700 font-semibold'
          >Dashboard</RouterLink>
 
          <RouterLink v-if='auth.isClient' to='/my-reservations'
            class='text-gray-600 hover:text-pink-700 font-medium transition-colors text-sm'
            active-class='text-pink-700 font-semibold'
          >My Bookings</RouterLink>
 
          <!-- Admin link -->
          <RouterLink v-if='auth.isAdmin' to='/admin'
            class='text-purple-700 hover:text-purple-900 font-medium transition-colors text-sm'
          >Admin Panel</RouterLink>
        </div>
 
        <!-- ── RIGHT SIDE ─────────────────────────────── -->
        <div class='flex items-center gap-3'>
 
          <!-- Not logged in -->
          <template v-if='!auth.isLoggedIn'>
            <RouterLink to='/login'
              class='text-gray-600 hover:text-pink-700 font-medium text-sm transition-colors'
            >Login</RouterLink>
            <RouterLink to='/register'
              class='bg-pink-700 text-white px-4 py-2 rounded-full text-sm font-medium
                     hover:bg-pink-800 transition-all shadow-sm hover:shadow-md'
            >Book Now</RouterLink>
          </template>
 
          <!-- Logged in -->
          <template v-else>
            <!-- User avatar circle -->
            <div class='relative group'>
              <button class='flex items-center gap-2 bg-pink-50 hover:bg-pink-100
                            rounded-full px-3 py-1.5 transition-colors'>
                <div class='w-7 h-7 bg-pink-700 rounded-full flex items-center
                            justify-center text-white text-xs font-bold'>
                  {{ auth.userName.charAt(0).toUpperCase() }}
                </div>
                <span class='text-sm font-medium text-gray-700'>
                  {{ auth.userName.split(' ')[0] }}
                </span>
                <span class='text-gray-400 text-xs'>▾</span>
              </button>
 
              <!-- Dropdown menu -->
              <div class='absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg
                          border border-gray-100 py-1 opacity-0 invisible
                          group-hover:opacity-100 group-hover:visible transition-all'>
                <RouterLink to='/profile'
                  class='flex items-center gap-2 px-4 py-2 text-sm text-gray-700
                         hover:bg-pink-50 hover:text-pink-700 transition-colors'
                >👤 My Profile</RouterLink>
                <RouterLink to='/my-reservations'
                  class='flex items-center gap-2 px-4 py-2 text-sm text-gray-700
                         hover:bg-pink-50 hover:text-pink-700 transition-colors'
                >📅 My Bookings</RouterLink>
                <hr class='my-1 border-gray-100'>
                <button @click='handleLogout'
                  class='flex items-center gap-2 px-4 py-2 text-sm text-rose-600
                         hover:bg-rose-50 w-full text-left transition-colors'
                >🚪 Logout</button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>
 
<script setup>
import { useAuthStore }  from '../../stores/auth'
import { useRouter }     from 'vue-router'
import { authAPI }       from '../../services/api'
 
const auth   = useAuthStore()
const router = useRouter()
 
async function handleLogout() {
  try { await authAPI.logout() } catch (e) {}  // Call API (ignore errors)
  auth.logout()            // Clear Pinia + localStorage
  router.push('/')         // Go to homepage
}
</script>

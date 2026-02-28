<template>
  <div class='min-h-screen bg-pink-50 py-10 px-4'>
    <div class='max-w-xl mx-auto space-y-6'>
 
      <h1 class='text-3xl font-serif font-bold text-gray-900'>My Profile</h1>
 
      <!-- Profile card -->
      <div class='bg-white rounded-2xl p-6 shadow-sm'>
        <div class='flex items-center gap-4 mb-6'>
          <div class='w-16 h-16 bg-pink-700 rounded-full flex items-center
                      justify-center text-white text-2xl font-bold'>
            {{ auth.userName.charAt(0).toUpperCase() }}
          </div>
          <div>
            <h2 class='text-xl font-semibold text-gray-900'>{{ auth.userName }}</h2>
            <p class='text-gray-500 text-sm'>{{ auth.user?.email }}</p>
            <span class='inline-block mt-1 bg-pink-100 text-pink-700 text-xs
                        font-medium px-2 py-0.5 rounded-full capitalize'>
              {{ auth.userRole }}
            </span>
          </div>
        </div>
        <div class='grid grid-cols-2 gap-4 text-sm'>
          <div class='bg-pink-50 rounded-xl p-3'>
            <div class='text-gray-400 text-xs mb-0.5'>Phone</div>
            <div class='font-medium text-gray-900'>{{ auth.user?.phone || 'Not set' }}</div>
          </div>
          <div class='bg-pink-50 rounded-xl p-3'>
            <div class='text-gray-400 text-xs mb-0.5'>Member Since</div>
            <div class='font-medium text-gray-900'>
              {{ new Date(auth.user?.created_at).getFullYear() }}
            </div>
          </div>
        </div>
      </div>
 
      <!-- Quick actions -->
      <div class='grid grid-cols-2 gap-4'>
        <RouterLink to='/booking'
          class='bg-pink-700 text-white rounded-2xl p-5 text-center hover:bg-pink-800
                 transition-colors'
        >
          <div class='text-2xl mb-1'>✨</div>
          <div class='font-medium text-sm'>Book Appointment</div>
        </RouterLink>
        <RouterLink to='/my-reservations'
          class='bg-white border border-pink-100 rounded-2xl p-5 text-center
                 hover:border-pink-300 hover:bg-pink-50 transition-colors'
        >
          <div class='text-2xl mb-1'>📅</div>
          <div class='font-medium text-sm text-gray-700'>My Bookings</div>
        </RouterLink>
      </div>
 
      <!-- Logout button -->
      <button @click='handleLogout'
        class='w-full border-2 border-rose-200 text-rose-600 py-3 rounded-xl
               font-semibold hover:bg-rose-50 transition-colors'
      >🚪 Sign Out</button>
 
    </div>
  </div>
</template>
 
<script setup>
import { useAuthStore } from '../../stores/auth'
import { useRouter }    from 'vue-router'
import { authAPI }      from '../../services/api'
import { RouterLink }   from 'vue-router'
 
const auth   = useAuthStore()
const router = useRouter()
 
async function handleLogout() {
  try { await authAPI.logout() } catch(e) {}
  auth.logout()
  router.push('/')
}
</script>

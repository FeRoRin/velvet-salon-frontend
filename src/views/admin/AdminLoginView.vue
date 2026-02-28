<template>
  <div class='min-h-screen bg-gray-950 flex items-center justify-center px-4'>
    <div class='w-full max-w-md'>
 
      <!-- Card -->
      <div class='bg-gray-900 rounded-3xl border border-gray-800 p-8 shadow-2xl'>
 
        <!-- Header -->
        <div class='text-center mb-8'>
          <div class='w-14 h-14 bg-purple-900 rounded-2xl flex items-center
                      justify-center mx-auto mb-4'>
            <span class='text-2xl'>💜</span>
          </div>
          <h1 class='text-2xl font-bold text-white'>Admin Portal</h1>
          <p class='text-gray-400 text-sm mt-1'>Velvet Salon Management</p>
        </div>
 
        <!-- Error -->
        <div v-if='error'
          class='bg-red-900/30 border border-red-700 text-red-400 rounded-xl
                 px-4 py-3 mb-6 text-sm'
        >{{ error }}</div>
 
        <form @submit.prevent='handleLogin' class='space-y-5'>
 
          <div>
            <label class='block text-sm font-medium text-gray-300 mb-1'>
              Email Address
            </label>
            <input v-model='form.email' type='email' required
              placeholder='admin@salon.com'
              class='w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3
                     text-white text-sm placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-purple-500 transition'
            />
          </div>
 
          <div>
            <label class='block text-sm font-medium text-gray-300 mb-1'>Password</label>
            <input v-model='form.password' type='password' required
              placeholder='••••••••'
              class='w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3
                     text-white text-sm placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-purple-500 transition'
            />
          </div>
 
          <button type='submit' :disabled='loading'
            class='w-full bg-purple-700 text-white py-3 rounded-xl font-semibold
                   hover:bg-purple-600 transition-all disabled:opacity-50 mt-2'
          >
            {{ loading ? 'Signing in...' : 'Sign In to Admin Panel' }}
          </button>
        </form>
 
        <p class='text-center text-gray-500 text-xs mt-6'>
          <RouterLink to='/' class='hover:text-gray-300 transition-colors'>
            ← Back to Velvet Salon
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { authAPI } from '../../services/api'
 
const router  = useRouter()
const auth    = useAuthStore()
const form    = ref({ email:'', password:'' })
const loading = ref(false)
const error   = ref('')
 
async function handleLogin() {
  loading.value = true
  error.value   = ''
  try {
    const res = await authAPI.login(form.value)
    auth.setUser(res.data.data.user, res.data.data.token)
 
    // Only allow admin and super_admin into admin panel
    if (!auth.isAdmin) {
      auth.logout()
      error.value = 'Access denied. Admin accounts only.'
      return
    }
    router.push('/admin')
  } catch(err) {
    error.value = err.response?.data?.message || 'Login failed.'
  } finally {
    loading.value = false
  }
}
</script>

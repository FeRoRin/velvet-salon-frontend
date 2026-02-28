<template>
  <div class='min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50
              flex items-center justify-center px-4 py-16'>
    <div class='w-full max-w-md'>
 
      <!-- Card -->
      <div class='bg-white rounded-3xl shadow-xl shadow-pink-100 p-8'>
 
        <!-- Header -->
        <div class='text-center mb-8'>
          <RouterLink to='/' class='text-3xl'>🌸</RouterLink>
          <h1 class='text-2xl font-serif font-bold text-gray-900 mt-3'>Welcome Back</h1>
          <p class='text-gray-500 text-sm mt-1'>Sign in to your Velvet Salon account</p>
        </div>
 
        <!-- Error alert — v-if shows only when error has text -->
        <div v-if='error'
          class='bg-rose-50 border border-rose-200 text-rose-700 rounded-xl
                 px-4 py-3 mb-6 text-sm flex items-center gap-2'
        >
          <span>⚠️</span> {{ error }}
        </div>
 
        <!-- Rate limit warning -->
        <div v-if='rateLimitSeconds > 0'
          class='bg-orange-50 border border-orange-200 text-orange-700 rounded-xl
                 px-4 py-3 mb-6 text-sm text-center'
        >
          Too many attempts. Wait {{ rateLimitSeconds }}s before retrying.
        </div>
 
        <!-- @submit.prevent = prevent form from refreshing the page -->
        <form @submit.prevent='handleLogin' class='space-y-5'>
 
          <div>
            <label class='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input
              v-model='form.email'
              type='email'
              required
              placeholder='jane@example.com'
              class='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-pink-400 transition'
            />
          </div>
 
          <div>
            <div class='flex items-center justify-between mb-1'>
              <label class='text-sm font-medium text-gray-700'>Password</label>
            </div>
            <input
              v-model='form.password'
              type='password'
              required
              placeholder='••••••••'
              class='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-pink-400 transition'
            />
          </div>
 
          <!-- :disabled disables button while loading -->
          <button
            type='submit'
            :disabled='loading || rateLimitSeconds > 0'
            class='w-full bg-pink-700 text-white py-3 rounded-xl font-semibold
                   hover:bg-pink-800 transition-all disabled:opacity-50
                   disabled:cursor-not-allowed mt-2'
          >
            <!-- Show different text while loading -->
            <span v-if='loading' class='flex items-center justify-center gap-2'>
              <span class='w-4 h-4 border-2 border-white border-t-transparent
                          rounded-full animate-spin'></span>
              Signing in...
            </span>
            <span v-else>Sign In</span>
          </button>
        </form>
 
        <p class='text-center text-gray-500 text-sm mt-6'>
          Don't have an account?
          <RouterLink to='/register' class='text-pink-700 font-medium hover:underline'>
            Create one free
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
 
const router = useRouter()
const auth   = useAuthStore()
 
const form    = ref({ email: '', password: '' })
const loading = ref(false)
const error   = ref('')
const rateLimitSeconds = ref(0)  // Countdown for rate limit
 
async function handleLogin() {
  loading.value = true
  error.value   = ''
 
  try {
    const res = await authAPI.login(form.value)
    // res.data.data contains { user, token } from Laravel
    auth.setUser(res.data.data.user, res.data.data.token)
 
    // Redirect based on role
    if (auth.isAdmin) router.push('/admin')
    else              router.push('/dashboard')
 
  } catch (err) {
    const status = err.response?.status
 
    if (status === 429) {
      // Rate limited — start a 60 second countdown
      rateLimitSeconds.value = 60
      const interval = setInterval(() => {
        rateLimitSeconds.value--
        if (rateLimitSeconds.value <= 0) clearInterval(interval)
      }, 1000)
    } else if (status === 401) {
      error.value = 'Invalid email or password.'
    } else {
      error.value = err.response?.data?.message || 'Login failed. Try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>

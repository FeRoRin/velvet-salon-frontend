<template>
  <div class='min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50
              flex items-center justify-center px-4 py-16'>
    <div class='w-full max-w-md'>
      <div class='bg-white rounded-3xl shadow-xl shadow-pink-100 p-8'>

        <div class='text-center mb-8'>
          <RouterLink to='/' class='text-3xl'>🌸</RouterLink>
          <h1 class='text-2xl font-serif font-bold text-gray-900 mt-3'>Welcome Back</h1>
          <p class='text-gray-500 text-sm mt-1'>Sign in to your Velvet Salon account</p>
        </div>

        <div v-if='error'
          class='bg-rose-50 border border-rose-200 text-rose-700 rounded-xl
                 px-4 py-3 mb-6 text-sm flex items-center gap-2'>
          <span>⚠️</span> {{ error }}
        </div>

        <div v-if='rateLimitSeconds > 0'
          class='bg-orange-50 border border-orange-200 text-orange-700 rounded-xl
                 px-4 py-3 mb-6 text-sm text-center'>
          Too many attempts. Wait {{ rateLimitSeconds }}s before retrying.
        </div>

        <form @submit.prevent='handleLogin' class='space-y-5'>
          <div>
            <label class='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input v-model='form.email' type='email' required placeholder='jane@example.com'
              class='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-pink-400 transition'/>
          </div>
          <div>
            <label class='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <input v-model='form.password' type='password' required placeholder='••••••••'
              class='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-pink-400 transition'/>
          </div>
          <button type='submit' :disabled='loading || rateLimitSeconds > 0'
            class='w-full bg-pink-700 text-white py-3 rounded-xl font-semibold
                   hover:bg-pink-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2'>
            <span v-if='loading' class='flex items-center justify-center gap-2'>
              <span class='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
              Signing in...
            </span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <!-- Guest booking CTA -->
        <div class='mt-5 pt-5 border-t border-gray-100 text-center'>
          <p class='text-gray-500 text-sm mb-3'>No account? No problem.</p>
          <RouterLink to='/booking'
            class='inline-block w-full border-2 border-pink-200 text-pink-700 py-2.5
                   rounded-xl text-sm font-semibold hover:bg-pink-50 transition-colors'>
            🌸 Book as Guest — No Account Needed
          </RouterLink>
        </div>

        <p class='text-center text-gray-500 text-sm mt-4'>
          New here?
          <RouterLink to='/register' class='text-pink-700 font-medium hover:underline'>
            Create an account
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { authAPI } from '../../services/api'

const router = useRouter()
const route  = useRoute()
const auth   = useAuthStore()

const form             = ref({ email: '', password: '' })
const loading          = ref(false)
const error            = ref('')
const rateLimitSeconds = ref(0)

async function handleLogin() {
  loading.value = true
  error.value   = ''

  try {
    const res = await authAPI.login(form.value)

    // Handle both response shapes: { data: { user, token } } or { user, token }
    const payload = res.data.data ?? res.data
    const user    = payload.user
    const token   = payload.token

    if (!user || !token) throw new Error('Unexpected response from server.')

    auth.setUser(user, token)

    // Redirect to intended page if bounced here, otherwise by role
    const redirect = route.query.redirect
    if (redirect) return router.push(redirect)

    if (auth.isAdmin) router.push('/admin')
    else              router.push('/dashboard')

  } catch (err) {
    const status = err.response?.status
    if (status === 429) {
      rateLimitSeconds.value = 60
      const interval = setInterval(() => {
        rateLimitSeconds.value--
        if (rateLimitSeconds.value <= 0) clearInterval(interval)
      }, 1000)
    } else if (status === 401 || status === 422) {
      error.value = 'Invalid email or password.'
    } else {
      error.value = err.response?.data?.message || 'Login failed. Try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>

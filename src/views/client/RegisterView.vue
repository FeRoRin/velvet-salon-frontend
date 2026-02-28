<template>
  <div class='min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50
              flex items-center justify-center px-4 py-16'>
    <div class='w-full max-w-md'>
      <div class='bg-white rounded-3xl shadow-xl shadow-pink-100 p-8'>
 
        <div class='text-center mb-8'>
          <RouterLink to='/' class='text-3xl'>🌸</RouterLink>
          <h1 class='text-2xl font-serif font-bold text-gray-900 mt-3'>
            Create Your Account
          </h1>
          <p class='text-gray-500 text-sm mt-1'>Join Velvet Salon today</p>
        </div>
 
        <!-- Validation errors (object) -->
        <!-- v-if='errors.name' shows only when name field has an error -->
        <div v-if='serverError'
          class='bg-rose-50 border border-rose-200 text-rose-700 rounded-xl
                 px-4 py-3 mb-6 text-sm'
        >{{ serverError }}</div>
 
        <form @submit.prevent='handleRegister' class='space-y-4'>
 
          <!-- Name -->
          <div>
            <label class='block text-sm font-medium text-gray-700 mb-1'>Full Name *</label>
            <input v-model='form.name' type='text' required placeholder='Jane Doe'
              :class='inputClass(errors.name)'
            />
            <p v-if='errors.name' class='text-rose-500 text-xs mt-1'>{{ errors.name }}</p>
          </div>
 
          <!-- Email -->
          <div>
            <label class='block text-sm font-medium text-gray-700 mb-1'>Email Address *</label>
            <input v-model='form.email' type='email' required placeholder='jane@example.com'
              :class='inputClass(errors.email)'
            />
            <p v-if='errors.email' class='text-rose-500 text-xs mt-1'>{{ errors.email }}</p>
          </div>
 
          <!-- Phone -->
          <div>
            <label class='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
            <input v-model='form.phone' type='tel' placeholder='+1 234 567 8900'
              :class='inputClass(errors.phone)'
            />
            <p v-if='errors.phone' class='text-rose-500 text-xs mt-1'>{{ errors.phone }}</p>
          </div>
 
          <!-- Password -->
          <div>
            <label class='block text-sm font-medium text-gray-700 mb-1'>Password *</label>
            <input v-model='form.password' type='password' required
              placeholder='Minimum 8 characters'
              :class='inputClass(errors.password)'
            />
            <p v-if='errors.password' class='text-rose-500 text-xs mt-1'>{{ errors.password }}</p>
          </div>
 
          <!-- Confirm Password -->
          <div>
            <label class='block text-sm font-medium text-gray-700 mb-1'>
              Confirm Password *
            </label>
            <input v-model='form.password_confirmation' type='password' required
              placeholder='Repeat your password'
              :class='inputClass()'
            />
          </div>
 
          <button type='submit' :disabled='loading'
            class='w-full bg-pink-700 text-white py-3 rounded-xl font-semibold
                   hover:bg-pink-800 transition-all disabled:opacity-50 mt-2'
          >
            {{ loading ? 'Creating account...' : 'Create Account' }}
          </button>
 
        </form>
 
        <p class='text-center text-gray-500 text-sm mt-6'>
          Already have an account?
          <RouterLink to='/login' class='text-pink-700 font-medium hover:underline'>
            Sign in
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
 
const form = ref({
  name: '', email: '', phone: '',
  password: '', password_confirmation: ''
})
const loading     = ref(false)
const serverError = ref('')
const errors      = ref({})  // Field-specific errors from Laravel validation
 
// Returns CSS classes — red border if field has error, normal if not
function inputClass(fieldError = null) {
  const base = 'w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition'
  return fieldError
    ? base + ' border-rose-300 focus:ring-rose-400'
    : base + ' border-gray-200 focus:ring-pink-400'
}
 
async function handleRegister() {
  loading.value     = true
  serverError.value = ''
  errors.value      = {}
 
  try {
    const res = await authAPI.register(form.value)
    auth.setUser(res.data.data.user, res.data.data.token)
    router.push('/dashboard')
 
  } catch (err) {
    if (err.response?.status === 422) {
      // Laravel validation errors — each field can have multiple messages
      // We take the first message for each field
      const rawErrors = err.response.data.errors || {}
      Object.keys(rawErrors).forEach(key => {
        errors.value[key] = rawErrors[key][0]
      })
    } else {
      serverError.value = err.response?.data?.message || 'Registration failed.'
    }
  } finally {
    loading.value = false
  }
}
</script>

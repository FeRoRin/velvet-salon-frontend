
<template>
  <AdminLayout>
    <div class='mb-6'>
      <h1 class='text-2xl font-bold text-white'>Create Admin User</h1>
      <p class='text-gray-400 text-sm mt-1'>
        Create a new admin account with management access
      </p>
    </div>
 
    <div class='max-w-lg'>
      <div class='bg-gray-900 rounded-2xl border border-gray-800 p-6'>
 
        <!-- Success state -->
        <div v-if='created'
          class='text-center py-10'
        >
          <div class='text-5xl mb-4'>🎉</div>
          <h3 class='text-white font-semibold text-lg'>Admin Created!</h3>
          <p class='text-gray-400 text-sm mt-1'>
            {{ created.name }} can now log in at /admin/login
          </p>
          <button @click='created=null'
            class='mt-5 bg-purple-700 text-white px-5 py-2 rounded-xl text-sm
                   font-medium hover:bg-purple-600 transition-colors'
          >Create Another</button>
        </div>
 
        <!-- Form -->
        <form v-else @submit.prevent='handleCreate' class='space-y-4'>
 
          <div v-if='serverError'
            class='bg-red-900/30 border border-red-700 text-red-400 rounded-xl
                   px-4 py-3 text-sm'
          >{{ serverError }}</div>
 
          <div>
            <label class='block text-gray-300 text-sm mb-1'>Full Name *</label>
            <input v-model='form.name' required placeholder='Sarah Manager'
              :class='fieldClass(errors.name)'
            />
            <p v-if='errors.name' class='text-red-400 text-xs mt-1'>{{ errors.name }}</p>
          </div>
 
          <div>
            <label class='block text-gray-300 text-sm mb-1'>Email Address *</label>
            <input v-model='form.email' type='email' required placeholder='admin@salon.com'
              :class='fieldClass(errors.email)'
            />
            <p v-if='errors.email' class='text-red-400 text-xs mt-1'>{{ errors.email }}</p>
          </div>
 
          <div>
            <label class='block text-gray-300 text-sm mb-1'>Phone</label>
            <input v-model='form.phone' type='tel' placeholder='+1 234 567 8900'
              :class='fieldClass()'
            />
          </div>
 
          <div>
            <label class='block text-gray-300 text-sm mb-1'>Password *</label>
            <input v-model='form.password' type='password' required
              placeholder='Minimum 8 characters'
              :class='fieldClass(errors.password)'
            />
            <p v-if='errors.password' class='text-red-400 text-xs mt-1'>{{ errors.password }}</p>
          </div>
 
          <div>
            <label class='block text-gray-300 text-sm mb-1'>Confirm Password *</label>
            <input v-model='form.password_confirmation' type='password' required
              placeholder='Repeat password'
              :class='fieldClass()'
            />
          </div>
 
          <!-- Role is always admin — fixed -->
          <div class='bg-gray-800 rounded-xl px-4 py-3 text-sm text-gray-400'>
            <span>Role: </span>
            <span class='text-purple-400 font-medium'>Admin (fixed)</span>
            <span class='ml-2 text-gray-500'>— only super admins can change roles</span>
          </div>
 
          <button type='submit' :disabled='loading'
            class='w-full bg-purple-700 text-white py-3 rounded-xl font-semibold
                   hover:bg-purple-600 transition-colors disabled:opacity-50 mt-2'
          >{{ loading ? 'Creating...' : 'Create Admin Account' }}</button>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>
 
<script setup>
import { ref } from 'vue'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import { superAdminAPI } from '../../services/api'
 
const form = ref({
  name:'', email:'', phone:'',
  password:'', password_confirmation:''
})
const loading     = ref(false)
const serverError = ref('')
const errors      = ref({})
const created     = ref(null)
 
function fieldClass(fieldError=null) {
  const base = 'w-full bg-gray-800 border rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 transition'
  return fieldError
    ? base + ' border-red-600 focus:ring-red-500'
    : base + ' border-gray-700 focus:ring-purple-500'
}

 
async function handleCreate() {
  loading.value     = true
  serverError.value = ''
  errors.value      = {}
  try {
    const res = await superAdminAPI.createAdmin(form.value)
    created.value = res.data.data
    form.value = { name:'', email:'', phone:'', password:'', password_confirmation:'' }
  } catch(err) {
    if (err.response?.status === 422) {
      const raw = err.response.data.errors || {}
      Object.keys(raw).forEach(k => errors.value[k] = raw[k][0])
    } else {
      serverError.value = err.response?.data?.message || 'Create failed.'
    }
  } finally {
    loading.value = false
  }
}
</script>

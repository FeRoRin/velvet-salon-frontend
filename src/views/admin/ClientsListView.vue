<template>
  <AdminLayout>
    <div class='mb-6'>
      <h1 class='text-2xl font-bold text-white'>Clients</h1>
      <p class='text-gray-400 text-sm mt-1'>{{ filtered.length }} registered clients</p>
    </div>

    <!-- Search bar -->
    <div class='bg-gray-900 rounded-2xl p-4 border border-gray-800 mb-6 flex gap-3'>
      <input v-model='search' placeholder='🔍 Search by name or email...'
        class='flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-500
               rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'/>
      <button @click='search=""' class='text-gray-400 hover:text-white text-sm px-2 transition-colors'>
        Reset
      </button>
    </div>

    <!-- Table -->
    <div class='bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden'>
      <div v-if='loading' class='flex justify-center py-16'>
        <div class='w-8 h-8 border-4 border-purple-800 border-t-purple-400 rounded-full animate-spin'></div>
      </div>

      <div v-else class='overflow-x-auto'>
        <table class='w-full'>
          <thead>
            <tr class='border-b border-gray-800'>
              <th class='text-left px-5 py-3 text-xs font-semibold text-purple-400 uppercase tracking-wider'>Client</th>
              <th class='text-left px-5 py-3 text-xs font-semibold text-purple-400 uppercase tracking-wider'>Phone</th>
              <th class='text-left px-5 py-3 text-xs font-semibold text-purple-400 uppercase tracking-wider'>Joined</th>
              <th v-if='auth.isSuperAdmin'
                class='text-left px-5 py-3 text-xs font-semibold text-purple-400 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody class='divide-y divide-gray-800'>
            <tr v-for='client in filtered' :key='client.id'
                class='hover:bg-gray-800/50 transition-colors'>
              <td class='px-5 py-4'>
                <div class='flex items-center gap-3'>
                  <div class='w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center
                              text-purple-400 text-sm font-bold flex-shrink-0'>
                    {{ client.name?.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <div class='font-medium text-white text-sm'>{{ client.name }}</div>
                    <div class='text-gray-500 text-xs'>{{ client.email }}</div>
                  </div>
                </div>
              </td>
              <td class='px-5 py-4 text-gray-300 text-sm'>{{ client.phone || '—' }}</td>
              <td class='px-5 py-4 text-gray-400 text-sm'>
                {{ client.created_at ? new Date(client.created_at).toLocaleDateString() : '—' }}
              </td>
              <td v-if='auth.isSuperAdmin' class='px-5 py-4'>
                <button @click='openPasswordModal(client)'
                  class='text-purple-400 hover:text-purple-300 text-sm transition-colors'>
                  Change Password
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if='!loading && filtered.length === 0'
             class='text-center py-16 text-gray-500 text-sm'>
          No clients found.
        </div>
      </div>
    </div>

    <!-- Change Password Modal (super admin only) -->
    <div v-if='showPwModal'
         class='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4'
         @click.self='showPwModal=false'>
      <div class='bg-gray-900 rounded-2xl border border-gray-700 p-6 w-full max-w-sm'>
        <h3 class='text-white font-semibold mb-1'>Change Password</h3>
        <p class='text-gray-400 text-sm mb-5'>For: {{ selectedClient?.name }}</p>

        <div v-if='pwError'
          class='bg-red-900/30 border border-red-700 text-red-400 rounded-xl px-4 py-3 mb-4 text-sm'>
          {{ pwError }}
        </div>
        <div v-if='pwSuccess'
          class='bg-green-900/30 border border-green-700 text-green-400 rounded-xl px-4 py-3 mb-4 text-sm'>
          Password changed successfully!
        </div>

        <div class='space-y-3'>
          <input v-model='newPassword' type='password' placeholder='New password (min 8 chars)'
            class='w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5
                   text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'/>
          <div class='flex gap-3'>
            <button @click='changeClientPassword' :disabled='pwLoading'
              class='flex-1 bg-purple-700 text-white py-2.5 rounded-xl text-sm font-medium
                     hover:bg-purple-600 transition-colors disabled:opacity-50'>
              {{ pwLoading ? 'Saving...' : 'Save' }}
            </button>
            <button @click='showPwModal=false'
              class='flex-1 bg-gray-800 text-gray-300 py-2.5 rounded-xl text-sm font-medium
                     hover:bg-gray-700 transition-colors'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import { adminAPI, superAdminAPI } from '../../services/api'
import { useAuthStore } from '../../stores/auth'

const auth    = useAuthStore()
const clients = ref([])
const loading = ref(true)
const search  = ref('')

const filtered = computed(() => {
  if (!search.value.trim()) return clients.value
  const q = search.value.toLowerCase()
  return clients.value.filter(c =>
    c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q)
  )
})

onMounted(async () => {
  try {
    const res = await adminAPI.getClients()
    clients.value = res.data.data || []
  } catch (e) { console.error(e) }
  finally { loading.value = false }
})

// Change password (super admin)
const showPwModal      = ref(false)
const selectedClient   = ref(null)
const newPassword      = ref('')
const pwLoading        = ref(false)
const pwError          = ref('')
const pwSuccess        = ref(false)

function openPasswordModal(client) {
  selectedClient.value = client
  newPassword.value    = ''
  pwError.value        = ''
  pwSuccess.value      = false
  showPwModal.value    = true
}

async function changeClientPassword() {
  if (!newPassword.value || newPassword.value.length < 8) {
    pwError.value = 'Password must be at least 8 characters.'
    return
  }
  pwLoading.value = true
  pwError.value   = ''
  try {
    await superAdminAPI.changeClientPassword(selectedClient.value.id, { password: newPassword.value })
    pwSuccess.value = true
    setTimeout(() => { showPwModal.value = false }, 1500)
  } catch (err) {
    pwError.value = err.response?.data?.message || 'Failed to change password.'
  } finally {
    pwLoading.value = false
  }
}
</script>

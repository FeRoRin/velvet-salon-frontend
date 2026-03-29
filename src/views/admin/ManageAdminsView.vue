<template>
  <AdminLayout>
    <div class='mb-6 flex items-center justify-between'>
      <div>
        <h1 class='text-2xl font-bold text-white'>Manage Admins</h1>
        <p class='text-gray-400 text-sm mt-1'>{{ admins.length }} admin accounts</p>
      </div>
      <RouterLink to='/admin/create-admin'
        class='bg-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium
               hover:bg-purple-600 transition-colors'>
        + Create Admin
      </RouterLink>
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
              <th class='text-left px-5 py-3 text-xs font-semibold text-purple-400 uppercase tracking-wider'>Admin</th>
              <th class='text-left px-5 py-3 text-xs font-semibold text-purple-400 uppercase tracking-wider'>Status</th>
              <th class='text-left px-5 py-3 text-xs font-semibold text-purple-400 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody class='divide-y divide-gray-800'>
            <tr v-for='admin in admins' :key='admin.id' class='hover:bg-gray-800/50 transition-colors'>
              <td class='px-5 py-4'>
                <div class='flex items-center gap-3'>
                  <div class='w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center
                              text-purple-400 text-sm font-bold flex-shrink-0'>
                    {{ admin.name?.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <div class='font-medium text-white text-sm'>{{ admin.name }}</div>
                    <div class='text-gray-500 text-xs'>{{ admin.email }}</div>
                  </div>
                </div>
              </td>
              <td class='px-5 py-4'>
                <span :class='admin.is_active
                  ? "bg-green-900/50 text-green-400"
                  : "bg-gray-800 text-gray-500"'
                  class='px-3 py-1 rounded-full text-xs font-medium'>
                  {{ admin.is_active ? '✓ Active' : '✗ Frozen' }}
                </span>
              </td>
              <td class='px-5 py-4'>
                <div class='flex items-center gap-3 text-sm'>
                  <button @click='toggleAdmin(admin)'
                    class='text-amber-400 hover:text-amber-300 transition-colors'>
                    {{ admin.is_active ? 'Freeze' : 'Unfreeze' }}
                  </button>
                  <span class='text-gray-700'>|</span>
                  <button @click='openPwModal(admin)'
                    class='text-purple-400 hover:text-purple-300 transition-colors'>
                    Password
                  </button>
                  <span class='text-gray-700'>|</span>
                  <button @click='deleteAdmin(admin)'
                    class='text-rose-500 hover:text-rose-400 transition-colors'>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if='!loading && admins.length === 0'
             class='text-center py-16 text-gray-500 text-sm'>
          No admins found.
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div v-if='showPwModal'
         class='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4'
         @click.self='showPwModal=false'>
      <div class='bg-gray-900 rounded-2xl border border-gray-700 p-6 w-full max-w-sm'>
        <h3 class='text-white font-semibold mb-1'>Change Password</h3>
        <p class='text-gray-400 text-sm mb-5'>For: {{ selectedAdmin?.name }}</p>

        <div v-if='pwError'
          class='bg-red-900/30 border border-red-700 text-red-400 rounded-xl px-4 py-3 mb-4 text-sm'>
          {{ pwError }}
        </div>

        <div class='space-y-3'>
          <input v-model='newPassword' type='password' placeholder='New password (min 8 chars)'
            class='w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5
                   text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'/>
          <div class='flex gap-3'>
            <button @click='changeAdminPassword' :disabled='pwLoading'
              class='flex-1 bg-purple-700 text-white py-2.5 rounded-xl text-sm font-medium
                     hover:bg-purple-600 disabled:opacity-50 transition-colors'>
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
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import { superAdminAPI } from '../../services/api'

const admins  = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await superAdminAPI.getAdmins()
    admins.value = res.data.data || []
  } catch (e) { console.error(e) }
  finally { loading.value = false }
})

async function toggleAdmin(admin) {
  try {
    await superAdminAPI.toggleAdmin(admin.id)
    admin.is_active = !admin.is_active
  } catch (e) { alert('Failed to update status.') }
}

async function deleteAdmin(admin) {
  if (!confirm(`Delete admin "${admin.name}"? This cannot be undone.`)) return
  try {
    await superAdminAPI.deleteAdmin(admin.id)
    admins.value = admins.value.filter(a => a.id !== admin.id)
  } catch (e) { alert(e.response?.data?.message || 'Delete failed.') }
}

// Password modal
const showPwModal   = ref(false)
const selectedAdmin = ref(null)
const newPassword   = ref('')
const pwLoading     = ref(false)
const pwError       = ref('')

function openPwModal(admin) {
  selectedAdmin.value = admin
  newPassword.value   = ''
  pwError.value       = ''
  showPwModal.value   = true
}

async function changeAdminPassword() {
  if (!newPassword.value || newPassword.value.length < 8) {
    pwError.value = 'Password must be at least 8 characters.'
    return
  }
  pwLoading.value = true
  pwError.value   = ''
  try {
    await superAdminAPI.changeAdminPassword(selectedAdmin.value.id, { password: newPassword.value })
    showPwModal.value = false
  } catch (err) {
    pwError.value = err.response?.data?.message || 'Failed to change password.'
  } finally {
    pwLoading.value = false
  }
}
</script>

<!-- src/views/admin/ServicesManagementView.vue -->
<template>
  <AdminLayout>
    <div class='mb-6 flex items-center justify-between'>
      <h1 class='text-2xl font-bold text-white'>Services Management</h1>
      <button @click='openCreateModal'
        class='bg-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium
               hover:bg-purple-600 transition-colors'
      >+ Add Service</button>
    </div>
 
    <!-- Services table -->
    <div class='bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden'>
      <table class='w-full'>
        <thead>
          <tr class='border-b border-gray-800'>
            <th class='text-left px-5 py-3 text-xs font-semibold text-purple-400 uppercase tracking-wider'>Service</th>
            <th class='text-left px-5 py-3 text-xs font-semibold text-purple-400 uppercase tracking-wider'>Duration</th>
            <th class='text-left px-5 py-3 text-xs font-semibold text-purple-400 uppercase tracking-wider'>Price</th>
            <th class='text-left px-5 py-3 text-xs font-semibold text-purple-400 uppercase tracking-wider'>Status</th>
            <th class='text-left px-5 py-3 text-xs font-semibold text-purple-400 uppercase tracking-wider'>Actions</th>
          </tr>
        </thead>
        <tbody class='divide-y divide-gray-800'>
          <tr v-for='service in services' :key='service.id'
              class='hover:bg-gray-800/50 transition-colors'
          >
            <td class='px-5 py-4'>
              <div class='font-medium text-white text-sm'>{{ service.name || service.title }}</div>
              <div class='text-gray-500 text-xs mt-0.5 max-w-xs truncate'>
                {{ service.description }}
              </div>
            </td>
            <td class='px-5 py-4 text-gray-300 text-sm'>{{ service.duration }} min</td>
            <td class='px-5 py-4 text-white font-semibold text-sm'>${{ service.price }}</td>
            <td class='px-5 py-4'>
              <!-- Toggle active/inactive -->
              <button @click='toggleActive(service)'
                :class='service.is_active
                  ? "bg-green-900/50 text-green-400"
                  : "bg-gray-800 text-gray-500"'
                class='px-3 py-1 rounded-full text-xs font-medium transition-all
                       hover:opacity-80'
              >{{ service.is_active ? '✓ Active' : '✗ Inactive' }}</button>
            </td>
            <td class='px-5 py-4'>
              <div class='flex items-center gap-2'>
                <button @click='openEditModal(service)'
                  class='text-purple-400 hover:text-purple-300 text-sm transition-colors'
                >Edit</button>
                <span class='text-gray-700'>|</span>
                <button @click='deleteService(service)'
                  class='text-rose-500 hover:text-rose-400 text-sm transition-colors'
                >Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
 
    <!-- ── CREATE / EDIT MODAL ────────────────────────── -->
    <div v-if='showModal'
         class='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4'
         @click.self='closeModal'
    >
      <div class='bg-gray-900 rounded-2xl border border-gray-700 p-6 w-full max-w-md'>
        <h3 class='text-white font-semibold text-lg mb-5'>
          {{ editingId ? 'Edit Service' : 'Add New Service' }}
        </h3>
 
        <div v-if='modalError'
          class='bg-red-900/30 border border-red-700 text-red-400 rounded-xl
                 px-4 py-3 mb-4 text-sm'
        >{{ modalError }}</div>
 
        <form @submit.prevent='saveService' class='space-y-4'>
          <div>
            <label class='block text-gray-300 text-sm mb-1'>Service Name *</label>
            <input v-model='form.name' required
              class='w-full bg-gray-800 border border-gray-700 text-white rounded-xl
                     px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
          </div>
          <div>
            <label class='block text-gray-300 text-sm mb-1'>Description</label>
            <textarea v-model='form.description' rows='2'
              class='w-full bg-gray-800 border border-gray-700 text-white rounded-xl
                     px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none'
            ></textarea>
          </div>
          <div class='grid grid-cols-2 gap-3'>
            <div>
              <label class='block text-gray-300 text-sm mb-1'>Duration (min) *</label>
              <input v-model.number='form.duration' type='number' required min='1'
                class='w-full bg-gray-800 border border-gray-700 text-white rounded-xl
                       px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
            </div>
            <div>
              <label class='block text-gray-300 text-sm mb-1'>Price ($) *</label>
              <input v-model.number='form.price' type='number' required min='0' step='0.01'
                class='w-full bg-gray-800 border border-gray-700 text-white rounded-xl
                       px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
            </div>
          </div>
          <div class='flex items-center gap-2'>
            <input v-model='form.is_active' type='checkbox' id='active'
              class='w-4 h-4 accent-purple-600'
            />
            <label for='active' class='text-gray-300 text-sm'>Active (visible to clients)</label>
          </div>
          <div class='flex gap-3 pt-2'>
            <button type='submit' :disabled='saving'
              class='flex-1 bg-purple-700 text-white py-2.5 rounded-xl text-sm font-medium
                     hover:bg-purple-600 transition-colors disabled:opacity-50'
            >{{ saving ? 'Saving...' : (editingId ? 'Update' : 'Create Service') }}</button>
            <button type='button' @click='closeModal'
              class='flex-1 bg-gray-800 text-gray-300 py-2.5 rounded-xl text-sm font-medium
                     hover:bg-gray-700 transition-colors'
            >Cancel</button>
          </div>
        </form>
      </div>
    </div>
 
  </AdminLayout>
</template>
 
<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import { fakeServices, superAdminAPI, servicesAPI } from '../../services/api'
 
//const services   = ref([...fakeServices])
const services   = ref([])
const loading  = ref(true)

const showModal  = ref(false)
const editingId  = ref(null)
const saving     = ref(false)
const modalError = ref('')
const form = ref({ title:'', description:'', duration:30, price:0, is_active:true })
 
// Add onMounted 
onMounted(async () => {
  try {
    const res = await servicesAPI.getAll()
    services.value = res.data.data || []
  } catch (e) {
    services.value = [...fakeServices]
  } finally {
    loading.value = false
  }
})


function openCreateModal() {
  editingId.value = null
  form.value = { title:'', description:'', duration:30, price:0, is_active:true }
  modalError.value = ''
  showModal.value = true
}
 
function openEditModal(service) {
  editingId.value = service.id
  // Spread copies all fields into the form
  form.value = { ...service }
  modalError.value = ''
  showModal.value = true
}
 
function closeModal() { showModal.value = false }
 
async function saveService() {
  saving.value = true
  modalError.value = ''
  try {
    if (editingId.value) {
      // UPDATE existing
      const res = await superAdminAPI.updateService(editingId.value, form.value)
      const idx = services.value.findIndex(s => s.id === editingId.value)
      if (idx !== -1) services.value[idx] = res.data.data
    } else {
      // CREATE new
      const res = await superAdminAPI.createService(form.value)
      services.value.push(res.data.data)
    }
    closeModal()
  } catch(err) {
    modalError.value = err.response?.data?.message || 'Save failed.'
  } finally {
    saving.value = false
  }
}
 
async function toggleActive(service) {
  const updated = { ...service, is_active: !service.is_active }
  await superAdminAPI.updateService(service.id, { is_active: updated.is_active })
  service.is_active = !service.is_active
}
 
async function deleteService(service) {
  if (!confirm(`Delete "${service.name || service.title}"? This cannot be undone.`)) return
  try {
    await superAdminAPI.deleteService(service.id)
    services.value = services.value.filter(s => s.id !== service.id)
  } catch(err) {
    alert(err.response?.data?.message || 'Delete failed.')
  }
}
</script>

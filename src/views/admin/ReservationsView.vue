<template>
  <AdminLayout>
    <div class='mb-6 flex flex-wrap items-center justify-between gap-4'>
      <div>
        <h1 class='text-2xl font-bold text-white'>Reservations</h1>
        <p class='text-gray-400 text-sm mt-0.5'>
          {{ total }} total · {{ filtered.length }} shown
        </p>
      </div>
      <!-- Manual booking button -->
      <button @click='showCreateModal = true'
        class='bg-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium
               hover:bg-purple-600 transition-colors flex items-center gap-2'
      >+ Manual Booking</button>
    </div>
 
    <!-- ── FILTER BAR ───────────────────────────────────── -->
    <div class='bg-gray-900 rounded-2xl p-4 border border-gray-800 mb-6
                flex flex-wrap gap-3'>
 
      <!-- Search by name -->
      <input v-model='filters.client_name' placeholder='🔍 Search by name...'
        class='bg-gray-800 border border-gray-700 text-white placeholder-gray-500
               rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2
               focus:ring-purple-500 flex-1 min-w-36'
      />
 
      <!-- Search by phone -->
      <input v-model='filters.phone' placeholder='📞 Phone...'
        class='bg-gray-800 border border-gray-700 text-white placeholder-gray-500
               rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2
               focus:ring-purple-500 w-36'
      />
 
      <!-- Date filter -->
      <input v-model='filters.date' type='date'
        class='bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-2
               text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
      />
 
      <!-- Status filter -->
      <select v-model='filters.status'
        class='bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-2
               text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
      >
        <option value=''>All Status</option>
        <option value='pending'>Pending</option>
        <option value='confirmed'>Confirmed</option>
        <option value='completed'>Completed</option>
        <option value='cancelled'>Cancelled</option>
      </select>
 
      <!-- Sort -->
      <select v-model='filters.sort'
        class='bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-2
               text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
      >
        <option value='desc'>Newest First</option>
        <option value='asc'>Oldest First</option>
      </select>
 
      <button @click='resetFilters'
        class='text-gray-400 hover:text-white text-sm transition-colors px-2'
      >Reset</button>
    </div>
 
    <!-- ── TABLE ────────────────────────────────────────── -->
    <div class='bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden'>
 
      <!-- Loading -->
      <div v-if='loading' class='flex justify-center py-16'>
        <div class='w-8 h-8 border-4 border-purple-800 border-t-purple-400
                    rounded-full animate-spin'></div>
      </div>
 
      <div v-else class='overflow-x-auto'>
        <table class='w-full'>
          <thead>
            <tr class='border-b border-gray-800'>
              <th class='text-left px-5 py-3 text-xs font-semibold text-purple-400
                         uppercase tracking-wider'>Client</th>
              <th class='text-left px-5 py-3 text-xs font-semibold text-purple-400
                         uppercase tracking-wider'>Service</th>
              <th class='text-left px-5 py-3 text-xs font-semibold text-purple-400
                         uppercase tracking-wider'>Date & Time</th>
              <th class='text-left px-5 py-3 text-xs font-semibold text-purple-400
                         uppercase tracking-wider'>Status</th>
              <th class='text-left px-5 py-3 text-xs font-semibold text-purple-400
                         uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody class='divide-y divide-gray-800'>
            <tr v-for='res in paginatedReservations' :key='res.id'
                class='hover:bg-gray-800/50 transition-colors'
            >
              <td class='px-5 py-4'>
                <div class='font-medium text-white text-sm'>{{ res.user?.name }}</div>
                <div class='text-gray-500 text-xs mt-0.5'>{{ res.user?.phone }}</div>
              </td>
              <td class='px-5 py-4 text-gray-300 text-sm'>{{ res.service?.title }}</td>
              <td class='px-5 py-4'>
                <div class='text-white text-sm'>{{ res.reservation_date }}</div>
                <div class='text-gray-500 text-xs'>{{ res.start_time }} – {{ res.end_time }}</div>
              </td>
              <td class='px-5 py-4'>
                <StatusBadge :status='res.status' dark />
              </td>
              <td class='px-5 py-4'>
                <!-- Status update dropdown -->
                <select
                  :value='res.status'
                  @change='updateStatus(res.id, $event.target.value, res)'
                  class='bg-gray-800 border border-gray-700 text-gray-300 rounded-lg
                         px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500'
                >
                  <option value='pending'>Pending</option>
                  <option value='confirmed'>Confirmed</option>
                  <option value='completed'>Completed</option>
                  <option value='cancelled'>Cancelled</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
 
      <!-- Pagination -->
      <div v-if='totalPages > 1'
           class='flex items-center justify-between px-5 py-4 border-t border-gray-800'>
        <span class='text-gray-400 text-sm'>
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <div class='flex gap-2'>
          <button @click='currentPage--' :disabled='currentPage===1'
            class='px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm
                   hover:bg-gray-700 disabled:opacity-40 transition-colors'
          >← Prev</button>
          <button @click='currentPage++' :disabled='currentPage===totalPages'
            class='px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm
                   hover:bg-gray-700 disabled:opacity-40 transition-colors'
          >Next →</button>
        </div>
      </div>
    </div>
 
    <!-- ── CREATE RESERVATION MODAL ──────────────────── -->
    <!-- v-if completely removes modal from DOM when closed (performance) -->
    <div v-if='showCreateModal'
         class='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4'
         @click.self='showCreateModal=false'
    >
      <div class='bg-gray-900 rounded-2xl border border-gray-700 p-6
                  w-full max-w-md shadow-2xl'>
        <h3 class='text-white font-semibold text-lg mb-5'>Manual Booking</h3>
 
        <div v-if='createError'
          class='bg-red-900/30 border border-red-700 text-red-400 rounded-xl
                 px-4 py-3 mb-4 text-sm'
        >{{ createError }}</div>
 
        <form @submit.prevent='createReservation' class='space-y-4'>
 
          <div>
            <label class='block text-gray-300 text-sm mb-1'>Client User ID *</label>
            <input v-model='createForm.user_id' type='number' required
              placeholder='Enter user ID'
              class='w-full bg-gray-800 border border-gray-700 text-white rounded-xl
                     px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
          </div>
 
          <div>
            <label class='block text-gray-300 text-sm mb-1'>Service *</label>
            <select v-model='createForm.service_id' required
              class='w-full bg-gray-800 border border-gray-700 text-white rounded-xl
                     px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
            >
              <option value=''>Select service...</option>
              <option v-for='s in services' :key='s.id' :value='s.id'>
                {{ s.title }} — ${{ s.price }}
              </option>
            </select>
          </div>
 
          <div>
            <label class='block text-gray-300 text-sm mb-1'>Date *</label>
            <input v-model='createForm.reservation_date' type='date' required
              class='w-full bg-gray-800 border border-gray-700 text-white rounded-xl
                     px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
          </div>
 
          <div>
            <label class='block text-gray-300 text-sm mb-1'>Start Time *</label>
            <input v-model='createForm.start_time' type='time' required
              class='w-full bg-gray-800 border border-gray-700 text-white rounded-xl
                     px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
          </div>
 
          <div>
            <label class='block text-gray-300 text-sm mb-1'>Notes</label>
            <textarea v-model='createForm.notes' rows='2'
              placeholder='Optional notes...'
              class='w-full bg-gray-800 border border-gray-700 text-white rounded-xl
                     px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none'
            ></textarea>
          </div>
 
          <div class='flex gap-3 pt-2'>
            <button type='submit' :disabled='createLoading'
              class='flex-1 bg-purple-700 text-white py-2.5 rounded-xl text-sm font-medium
                     hover:bg-purple-600 transition-colors disabled:opacity-50'
            >{{ createLoading ? 'Booking...' : 'Create Booking' }}</button>
            <button type='button' @click='showCreateModal=false'
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
import { ref, computed, onMounted, watch } from 'vue'
import AdminLayout  from '../../components/layout/AdminLayout.vue'
import StatusBadge  from '../../components/ui/StatusBadge.vue'
//import { adminAPI, fakeServices } from '../../services/api'
import { adminAPI, fakeServices, servicesAPI } from '../../services/api'
 
const reservations     = ref([])
const loading          = ref(true)
const total            = ref(0)
const currentPage      = ref(1)
const perPage          = 10
const showCreateModal  = ref(false)
const createLoading    = ref(false)
const createError      = ref('')
//const services         = ref(fakeServices)
 
const services = ref([])
 
// In your existing onMounted, ADD the services call alongside loadReservations:
onMounted(async () => {
  loadReservations()  // your existing function — keep it
  try {               // add this block:
    const res = await servicesAPI.getAll()
    services.value = res.data.data || []
  } catch (e) {
    services.value = fakeServices
  }
})

const filters = ref({
  client_name: '', phone: '', date: '', status: '', sort: 'desc'
})
 
const createForm = ref({
  user_id: '', service_id: '', reservation_date: '', start_time: '', notes: ''
})
 
// Local filtering for instant UI response
const filtered = computed(() => {
  let r = reservations.value
  if (filters.value.client_name)
    r = r.filter(x => x.user?.name?.toLowerCase().includes(filters.value.client_name.toLowerCase()))
  if (filters.value.phone)
    r = r.filter(x => x.user?.phone?.includes(filters.value.phone))
  if (filters.value.date)
    r = r.filter(x => x.reservation_date === filters.value.date)
  if (filters.value.status)
    r = r.filter(x => x.status === filters.value.status)
  return [...r].sort((a,b) =>
    filters.value.sort === 'asc'
      ? new Date(a.reservation_date) - new Date(b.reservation_date)
      : new Date(b.reservation_date) - new Date(a.reservation_date)
  )
})
 
const totalPages = computed(() => Math.ceil(filtered.value.length / perPage))
const paginatedReservations = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filtered.value.slice(start, start + perPage)
})
 
async function loadReservations() {
  loading.value = true
  try {
    const res = await adminAPI.getReservations()
    reservations.value = res.data.data?.data || []
    total.value = res.data.data?.total || reservations.value.length
  } catch(e) { console.error(e) }
  finally { loading.value = false }
}
 
async function updateStatus(id, status, res) {
  await adminAPI.updateReservation(id, { status })
  res.status = status  // Update locally without refetching
}
 
async function createReservation() {
  createLoading.value = true
  createError.value   = ''
  try {
    const res = await adminAPI.createReservation(createForm.value)
    reservations.value.unshift(res.data.data)  // Add to top of list
    showCreateModal.value = false
    createForm.value = { user_id:'', service_id:'', reservation_date:'', start_time:'', notes:'' }
  } catch(err) {
    createError.value = err.response?.data?.message || 'Booking failed.'
  } finally {
    createLoading.value = false
  }
}
 
function resetFilters() {
  filters.value = { client_name:'', phone:'', date:'', status:'', sort:'desc' }
  currentPage.value = 1
}
 
//onMounted(loadReservations)
</script>

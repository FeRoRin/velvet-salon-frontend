<template>
  <div class='min-h-screen bg-pink-50 py-10 px-4'>
    <div class='max-w-3xl mx-auto'>
 
      <!-- Header -->
      <div class='flex flex-wrap items-center justify-between gap-4 mb-8'>
        <div>
          <h1 class='text-3xl font-serif font-bold text-gray-900'>My Bookings</h1>
          <p class='text-gray-500 text-sm mt-1'>
            {{ filteredReservations.length }} reservation{{ filteredReservations.length!==1?'s':'' }}
          </p>
        </div>
        <RouterLink to='/booking'
          class='bg-pink-700 text-white px-5 py-2.5 rounded-full font-medium text-sm
                 hover:bg-pink-800 transition-colors'
        >+ New Booking</RouterLink>
      </div>
 
      <!-- Status filter tabs -->
      <div class='flex gap-2 flex-wrap mb-6'>
        <button v-for='tab in tabs' :key='tab.value'
          @click='activeTab = tab.value'
          :class='[
            "px-4 py-2 rounded-full text-sm font-medium transition-all",
            activeTab === tab.value
              ? "bg-pink-700 text-white"
              : "bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-700"
          ]'
        >{{ tab.label }} ({{ tab.count }})</button>
      </div>
 
      <!-- Sort -->
      <div class='flex justify-end mb-4'>
        <select v-model='sortOrder'
          class='border border-gray-200 rounded-xl px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-pink-400'
        >
          <option value='desc'>Newest First</option>
          <option value='asc'>Oldest First</option>
        </select>
      </div>
 
      <!-- Loading -->
      <div v-if='loading' class='flex justify-center py-20'>
        <div class='w-8 h-8 border-4 border-pink-200 border-t-pink-700 rounded-full animate-spin'></div>
      </div>
 
      <!-- Empty -->
      <div v-else-if='filteredReservations.length===0'
           class='bg-white rounded-3xl p-16 text-center shadow-sm'>
        <div class='text-5xl mb-4'>📅</div>
        <h3 class='text-lg font-semibold text-gray-700'>No reservations found</h3>
        <RouterLink to='/booking'
          class='inline-block mt-4 text-pink-700 font-medium hover:underline text-sm'
        >Book your first appointment →</RouterLink>
      </div>
 
      <!-- Reservation cards -->
      <div v-else class='space-y-4'>
        <div v-for='res in paginatedReservations' :key='res.id'
          class='bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow'
        >
          <div class='flex items-start justify-between gap-4'>
            <div class='flex-1'>
              <div class='flex items-center gap-3 mb-2'>
                <h3 class='font-semibold text-gray-900'>{{ res.service?.name || res.service?.title }}</h3>
                <StatusBadge :status='res.status' />
              </div>
              <div class='text-sm text-gray-500 space-y-1'>
                <div>📅 {{ formatDate(res.reservation_date) }}  🕐 {{ res.start_time }} – {{ res.end_time }}</div>
                <div v-if='res.notes' class='italic text-xs'>📝 {{ res.notes }}</div>
              </div>
            </div>
            <div class='flex flex-col items-end gap-2'>
              <span class='text-pink-700 font-bold'>${{ res.service?.price }}</span>
              <button
                v-if='["pending","confirmed"].includes(res.status)'
                @click='cancel(res.id)'
                class='text-rose-500 hover:text-rose-700 text-xs transition-colors'
              >Cancel booking</button>
            </div>
          </div>
        </div>
      </div>
 
      <!-- Pagination -->
      <div v-if='totalPages > 1'
           class='flex justify-center gap-2 mt-8'
      >
        <button v-for='page in totalPages' :key='page'
          @click='currentPage = page'
          :class='[
            "w-9 h-9 rounded-full text-sm font-medium transition-all",
            page === currentPage
              ? "bg-pink-700 text-white"
              : "bg-white text-gray-600 hover:bg-pink-50"
          ]'
        >{{ page }}</button>
      </div>
 
    </div>
  </div>
</template>
 
<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink }     from 'vue-router'
import { useAuthStore }   from '../../stores/auth'
import { reservationsAPI } from '../../services/api'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { useFormatDate } from '../../composables/useFormatDate'

const { formatDate } = useFormatDate()
 
const reservations = ref([])
const loading      = ref(true)
const activeTab    = ref('all')
const sortOrder    = ref('desc')
const currentPage  = ref(1)
const perPage      = 5
 
// Filter tabs with dynamic counts
const tabs = computed(() => [
  { label:'All',       value:'all',       count: reservations.value.length },
  { label:'Upcoming',  value:'upcoming',  count: reservations.value.filter(r=>['pending','confirmed'].includes(r.status)).length },
  { label:'Completed', value:'completed', count: reservations.value.filter(r=>r.status==='completed').length },
  { label:'Cancelled', value:'cancelled', count: reservations.value.filter(r=>r.status==='cancelled').length },
])
 
const filteredReservations = computed(() => {
  let r = reservations.value
  if (activeTab.value === 'upcoming')  r = r.filter(x => ['pending','confirmed'].includes(x.status))
  if (activeTab.value === 'completed') r = r.filter(x => x.status === 'completed')
  if (activeTab.value === 'cancelled') r = r.filter(x => x.status === 'cancelled')
  return [...r].sort((a,b) => {
    return sortOrder.value === 'desc'
      ? new Date(b.reservation_date) - new Date(a.reservation_date)
      : new Date(a.reservation_date) - new Date(b.reservation_date)
  })
})
 
const totalPages = computed(() => Math.ceil(filteredReservations.value.length / perPage))
const paginatedReservations = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredReservations.value.slice(start, start + perPage)
})
 
onMounted(async () => {
  try {
    const res = await reservationsAPI.myBookings()
    reservations.value = res.data.data || []
  } catch(e) { console.error(e) }
  finally { loading.value = false }
})
 
async function cancel(id) {
  if (!confirm('Cancel this appointment?')) return
  await reservationsAPI.cancel(id)
  const r = reservations.value.find(r => r.id === id)
  if (r) r.status = 'cancelled'
}
</script>

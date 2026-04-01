<template>
  <div class='min-h-screen bg-pink-50 py-10 px-4'>
    <div class='max-w-4xl mx-auto'>
 
      <!-- Welcome banner -->
      <div class='bg-gradient-to-r from-pink-700 to-rose-600 rounded-3xl
                  p-8 text-white mb-8 relative overflow-hidden'>
        <div class='absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full'></div>
        <div class='absolute -right-4 -bottom-8 w-24 h-24 bg-white/10 rounded-full'></div>
        <div class='relative z-10'>
          <p class='text-pink-200 text-sm mb-1'>Welcome back 🌸</p>
          <h1 class='text-3xl font-serif font-bold'>{{ auth.userName }}</h1>
          <p class='text-pink-100 mt-1 text-sm'>
            {{ upcomingCount }} upcoming reservation{{ upcomingCount !== 1 ? 's' : '' }}
          </p>
          <RouterLink to='/booking'
            class='inline-block mt-4 bg-white text-pink-700 px-5 py-2 rounded-full
                   text-sm font-semibold hover:bg-pink-50 transition-colors'
          >+ Book New Appointment</RouterLink>
        </div>
      </div>
 
      <!-- Stats cards -->
      <div class='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
        <div v-for='stat in stats' :key='stat.label'
             class='bg-white rounded-2xl p-5 shadow-sm text-center'
        >
          <div class='text-2xl mb-1'>{{ stat.icon }}</div>
          <div class='text-2xl font-bold text-pink-700'>{{ stat.value }}</div>
          <div class='text-gray-400 text-xs mt-0.5'>{{ stat.label }}</div>
        </div>
      </div>
 
      <!-- Upcoming reservations -->
      <div class='bg-white rounded-2xl shadow-sm p-6'>
        <div class='flex items-center justify-between mb-5'>
          <h2 class='font-semibold text-gray-900'>Upcoming Appointments</h2>
          <RouterLink to='/my-reservations'
            class='text-pink-700 text-sm font-medium hover:underline'
          >View all →</RouterLink>
        </div>
 
        <div v-if='loading' class='text-center py-8 text-gray-400'>Loading...</div>
 
        <div v-else-if='upcoming.length === 0'
             class='text-center py-10 text-gray-400'
        >
          <div class='text-4xl mb-3'>📅</div>
          <p class='text-sm'>No upcoming appointments</p>
          <RouterLink to='/booking'
            class='inline-block mt-4 text-pink-700 font-medium text-sm hover:underline'
          >Book one now →</RouterLink>
        </div>
 
        <div v-else class='space-y-3'>
          <div v-for='res in upcoming.slice(0,3)' :key='res.id'
               class='flex items-center justify-between p-4 bg-pink-50
                      rounded-xl hover:bg-pink-100 transition-colors'
          >
            <div>
              <p class='font-medium text-gray-900 text-sm'>{{ res.service?.name || res.service?.title }}</p>
              <p class='text-gray-400 text-xs mt-0.5'>
                📅 {{ formatDate(res.reservation_date) }}  🕐 {{ res.start_time }}
              </p>
            </div>
            <div class='flex items-center gap-3'>
              <!-- StatusBadge component (defined below) -->
              <StatusBadge :status='res.status' />
              <button
                v-if='["pending","confirmed"].includes(res.status)'
                @click='cancelReservation(res.id)'
                class='text-rose-500 hover:text-rose-700 text-xs transition-colors'
              >Cancel</button>
            </div>
          </div>
        </div>
      </div>
 
    </div>
  </div>
</template>
 
<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink }   from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { reservationsAPI } from '../../services/api'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { useFormatDate } from '../../composables/useFormatDate'

const { formatDate } = useFormatDate()
 
const auth         = useAuthStore()
const reservations = ref([])
const loading      = ref(true)
 
// Upcoming = pending or confirmed, date >= today
const upcoming = computed(() =>
  reservations.value.filter(r =>
    ['pending','confirmed'].includes(r.status)
  )
)
const upcomingCount = computed(() => upcoming.value.length)
 
const stats = computed(() => [
  { icon:'📅', value: reservations.value.length, label:'Total Bookings'    },
  { icon:'🕐', value: upcomingCount.value,        label:'Upcoming'          },
  { icon:'✅', value: reservations.value.filter(r=>r.status==='completed').length, label:'Completed' },
  { icon:'❌', value: reservations.value.filter(r=>r.status==='cancelled').length, label:'Cancelled' },
])
 
onMounted(async () => {
  try {
    const res = await reservationsAPI.myBookings()
    reservations.value = res.data.data || []
  } catch(e) { console.error(e) }
  finally { loading.value = false }
})
 
async function cancelReservation(id) {
  if (!confirm('Cancel this appointment?')) return
  await reservationsAPI.cancel(id)
  const r = reservations.value.find(r => r.id === id)
  if (r) r.status = 'cancelled'
}
</script>

<template>
  <div class='min-h-screen bg-pink-50 py-12 px-4'>
    <div class='max-w-2xl mx-auto'>

      <div class='text-center mb-10'>
        <h1 class='text-4xl font-serif font-bold text-gray-900'>Book Appointment</h1>
        <p class='text-gray-500 mt-2'>
          {{ auth.isLoggedIn ? 'Welcome back, ' + auth.userName + '!' : 'No account needed — book as a guest.' }}
        </p>
      </div>

      <!-- Tab switcher — only shown to guests (not logged-in users) -->
      <div v-if='!auth.isLoggedIn'
        class='flex bg-white rounded-2xl p-1 mb-8 shadow-sm border border-pink-100'>
        <button @click='activeTab = "guest"'
          :class='["flex-1 py-3 rounded-xl text-sm font-semibold transition-all",
            activeTab==="guest" ? "bg-pink-700 text-white shadow-sm" : "text-gray-500 hover:text-pink-700"]'>
          🌸 Book as Guest
        </button>
        <button @click='activeTab = "login"'
          :class='["flex-1 py-3 rounded-xl text-sm font-semibold transition-all",
            activeTab==="login" ? "bg-pink-700 text-white shadow-sm" : "text-gray-500 hover:text-pink-700"]'>
          🔐 I Have an Account
        </button>
      </div>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- TAB 1 — GUEST BOOKING                             -->
      <!-- ══════════════════════════════════════════════════ -->
      <div v-if='!auth.isLoggedIn && activeTab === "guest"'>

        <!-- Success screen -->
        <div v-if='guestSuccess' class='bg-white rounded-3xl shadow-sm p-10 text-center'>
          <div class='text-6xl mb-4'>🎉</div>
          <h2 class='text-2xl font-serif font-bold text-gray-900 mb-2'>Booking Confirmed!</h2>
          <p class='text-gray-500 text-sm mb-6'>
            {{ guestResult?.reservation?.service }} —
            {{ guestResult?.reservation?.reservation_date }} at
            {{ guestResult?.reservation?.start_time }}
          </p>

          <div class='bg-pink-50 border-2 border-pink-200 rounded-2xl p-6 mb-6 text-left'>
            <p class='text-pink-800 font-semibold text-sm mb-3'>🔑 Your Account Has Been Created</p>
            <div class='space-y-2 text-sm'>
              <div class='flex items-center justify-between bg-white rounded-xl px-4 py-2.5'>
                <span class='text-gray-500'>Email</span>
                <span class='font-mono font-medium text-gray-900'>{{ guestResult?.account?.email }}</span>
              </div>
              <div class='flex items-center justify-between bg-white rounded-xl px-4 py-2.5'>
                <span class='text-gray-500'>Password</span>
                <span class='font-mono font-bold text-pink-700 text-lg'>{{ guestResult?.account?.password }}</span>
              </div>
            </div>
            <p class='text-pink-600 text-xs mt-3'>
              ⚠️ Save this password! It was also sent to your email. You can change it after logging in.
            </p>
          </div>

          <div class='flex gap-3 justify-center'>
            <RouterLink to='/login'
              class='bg-pink-700 text-white px-6 py-2.5 rounded-full font-medium
                     hover:bg-pink-800 transition-colors text-sm'>
              Login to My Account
            </RouterLink>
            <button @click='resetGuest'
              class='border-2 border-pink-200 text-pink-700 px-6 py-2.5 rounded-full
                     font-medium hover:bg-pink-50 transition-colors text-sm'>
              Book Another
            </button>
          </div>
        </div>

        <!-- Guest form -->
        <div v-else class='bg-white rounded-3xl shadow-sm p-8 space-y-6'>

          <div v-if='guestError'
            class='bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-sm'>
            <span v-if='shouldLogin'>
              {{ guestError }}
              <button @click='activeTab = "login"' class='underline font-medium ml-1'>
                Click here to login →
              </button>
            </span>
            <span v-else>{{ guestError }}</span>
          </div>

          <!-- Step 1: Personal info -->
          <div>
            <h3 class='font-semibold text-gray-900 mb-4'>
              <span class='bg-pink-700 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs mr-2'>1</span>
              Your Details
            </h3>
            <div class='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label class='block text-sm font-medium text-gray-700 mb-1'>Full Name *</label>
                <input v-model='guestForm.name' type='text' required placeholder='Jane Doe'
                  class='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-pink-400'/>
              </div>
              <div>
                <label class='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
                <input v-model='guestForm.phone' type='tel' placeholder='+212 6XX XXX XXX'
                  class='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-pink-400'/>
              </div>
              <div class='sm:col-span-2'>
                <label class='block text-sm font-medium text-gray-700 mb-1'>
                  Email Address *
                  <span class='text-gray-400 font-normal'>(your password will be sent here)</span>
                </label>
                <input v-model='guestForm.email' type='email' required placeholder='jane@example.com'
                  class='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-pink-400'/>
              </div>
            </div>
          </div>

          <!-- Step 2: Service -->
          <div>
            <h3 class='font-semibold text-gray-900 mb-4'>
              <span class='bg-pink-700 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs mr-2'>2</span>
              Select a Service
            </h3>
            <div v-if='loadingServices' class='text-center py-6 text-gray-400'>Loading services...</div>
            <div v-else class='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              <button v-for='s in services' :key='s.id' type='button' @click='selectService(s, "guest")'
                :class='["p-4 rounded-xl border-2 text-left transition-all",
                  guestForm.service_id === s.id ? "border-pink-700 bg-pink-50" : "border-gray-100 hover:border-pink-300"]'>
                <div class='font-semibold text-gray-900 text-sm'>{{ s.name || s.title }}</div>
                <div class='flex items-center gap-2 mt-1'>
                  <span class='text-pink-700 font-bold'>${{ s.price }}</span>
                  <span class='text-gray-400 text-xs'>• {{ s.duration }}min</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Step 3: Date -->
          <div>
            <h3 class='font-semibold text-gray-900 mb-3'>
              <span class='bg-pink-700 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs mr-2'>3</span>
              Choose Date
            </h3>
            <input v-model='guestForm.reservation_date' type='date' :min='today'
              class='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-pink-400'/>
          </div>

          <!-- Step 4: Time -->
          <div>
            <h3 class='font-semibold text-gray-900 mb-3'>
              <span class='bg-pink-700 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs mr-2'>4</span>
              Select Time
              <span v-if='guestSelectedService' class='text-gray-400 text-xs font-normal ml-2'>
                ends at {{ guestEstimatedEnd }}
              </span>
            </h3>
            <div class='grid grid-cols-4 sm:grid-cols-6 gap-2'>
              <button v-for='slot in timeSlots' :key='slot' type='button'
                @click='guestForm.start_time = slot'
                :class='["py-2.5 rounded-xl text-xs font-medium border-2 transition-all",
                  guestForm.start_time === slot
                    ? "bg-pink-700 text-white border-pink-700"
                    : "border-gray-100 text-gray-600 hover:border-pink-300"]'>
                {{ slot }}
              </button>
            </div>
          </div>

          <!-- Notes -->
          <div>
            <label class='block text-sm font-medium text-gray-700 mb-1'>
              Notes <span class='text-gray-400 font-normal'>(optional)</span>
            </label>
            <textarea v-model='guestForm.notes' rows='2'
              placeholder='Any preferences or special requests...'
              class='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none'></textarea>
          </div>

          <button @click='handleGuestBooking'
            :disabled='guestLoading || !guestForm.service_id || !guestForm.start_time
                       || !guestForm.reservation_date || !guestForm.name || !guestForm.email'
            class='w-full bg-pink-700 text-white py-4 rounded-xl font-semibold text-lg
                   hover:bg-pink-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed'>
            {{ guestLoading ? 'Processing...' : 'Confirm Booking & Create Account ✨' }}
          </button>
        </div>
      </div>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- TAB 2 — LOGIN THEN BOOK                           -->
      <!-- ══════════════════════════════════════════════════ -->
      <div v-if='!auth.isLoggedIn && activeTab === "login"'>
        <div class='bg-white rounded-3xl shadow-sm p-8'>
          <p class='text-gray-500 text-sm text-center mb-6'>Sign in to book with your account</p>

          <div v-if='loginError'
            class='bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 mb-5 text-sm'>
            {{ loginError }}
          </div>

          <form @submit.prevent='handleInlineLogin' class='space-y-4'>
            <div>
              <label class='block text-sm font-medium text-gray-700 mb-1'>Email</label>
              <input v-model='loginForm.email' type='email' required placeholder='jane@example.com'
                class='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-pink-400'/>
            </div>
            <div>
              <label class='block text-sm font-medium text-gray-700 mb-1'>Password</label>
              <input v-model='loginForm.password' type='password' required placeholder='••••••••'
                class='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-pink-400'/>
            </div>
            <button type='submit' :disabled='loginLoading'
              class='w-full bg-pink-700 text-white py-3 rounded-xl font-semibold
                     hover:bg-pink-800 transition-all disabled:opacity-50'>
              {{ loginLoading ? 'Signing in...' : 'Sign In' }}
            </button>
          </form>

          <p class='text-center text-gray-400 text-sm mt-4'>
            No account?
            <button @click='activeTab = "guest"' class='text-pink-700 font-medium hover:underline'>
              Book as guest instead
            </button>
          </p>
        </div>
      </div>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- LOGGED-IN BOOKING FORM                            -->
      <!-- ══════════════════════════════════════════════════ -->
      <div v-if='auth.isLoggedIn'>

        <div class='bg-pink-50 rounded-2xl px-5 py-3 mb-6 flex items-center justify-between border border-pink-100'>
          <span class='text-pink-700 text-sm font-medium'>✓ Booked as {{ auth.userName }}</span>
          <button @click='handleLogout' class='text-gray-400 hover:text-gray-600 text-xs transition-colors'>
            Logout
          </button>
        </div>

        <!-- Auth success screen -->
        <div v-if='authSuccess' class='bg-white rounded-3xl shadow-sm p-10 text-center'>
          <div class='text-6xl mb-4'>🎉</div>
          <h2 class='text-2xl font-serif font-bold text-gray-900 mb-2'>Booking Confirmed!</h2>
          <p class='text-gray-500 mb-6'>
            {{ authSuccessData.service }} on {{ authSuccessData.date }} at {{ authSuccessData.time }}
          </p>
          <div class='flex gap-3 justify-center'>
            <RouterLink to='/my-reservations'
              class='bg-pink-700 text-white px-6 py-2.5 rounded-full font-medium
                     hover:bg-pink-800 transition-colors text-sm'>
              View My Bookings
            </RouterLink>
            <button @click='authSuccess = false'
              class='border-2 border-pink-200 text-pink-700 px-6 py-2.5 rounded-full
                     font-medium hover:bg-pink-50 transition-colors text-sm'>
              Book Another
            </button>
          </div>
        </div>

        <!-- Auth booking form -->
        <div v-else class='bg-white rounded-3xl shadow-sm p-8 space-y-6'>

          <div v-if='authError'
            class='bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-sm'>
            {{ authError }}
          </div>

          <!-- Service -->
          <div>
            <h3 class='font-semibold text-gray-900 mb-4'>
              <span class='bg-pink-700 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs mr-2'>1</span>
              Select a Service
            </h3>
            <div v-if='loadingServices' class='text-center py-6 text-gray-400'>Loading services...</div>
            <div v-else class='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              <button v-for='s in services' :key='s.id' type='button' @click='selectService(s, "auth")'
                :class='["p-4 rounded-xl border-2 text-left transition-all",
                  authForm.service_id === s.id ? "border-pink-700 bg-pink-50" : "border-gray-100 hover:border-pink-300"]'>
                <div class='font-semibold text-gray-900 text-sm'>{{ s.name || s.title }}</div>
                <div class='flex items-center gap-2 mt-1'>
                  <span class='text-pink-700 font-bold'>${{ s.price }}</span>
                  <span class='text-gray-400 text-xs'>• {{ s.duration }}min</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Date -->
          <div>
            <h3 class='font-semibold text-gray-900 mb-3'>
              <span class='bg-pink-700 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs mr-2'>2</span>
              Choose Date
            </h3>
            <input v-model='authForm.reservation_date' type='date' :min='today'
              class='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-pink-400'/>
          </div>

          <!-- Time -->
          <div>
            <h3 class='font-semibold text-gray-900 mb-3'>
              <span class='bg-pink-700 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs mr-2'>3</span>
              Select Time
              <span v-if='authSelectedService' class='text-gray-400 text-xs font-normal ml-2'>
                ends at {{ authEstimatedEnd }}
              </span>
            </h3>
            <div class='grid grid-cols-4 sm:grid-cols-6 gap-2'>
              <button v-for='slot in timeSlots' :key='slot' type='button'
                @click='authForm.start_time = slot'
                :class='["py-2.5 rounded-xl text-xs font-medium border-2 transition-all",
                  authForm.start_time === slot
                    ? "bg-pink-700 text-white border-pink-700"
                    : "border-gray-100 text-gray-600 hover:border-pink-300"]'>
                {{ slot }}
              </button>
            </div>
          </div>

          <!-- Notes -->
          <div>
            <label class='block text-sm font-medium text-gray-700 mb-1'>
              Notes <span class='text-gray-400 font-normal'>(optional)</span>
            </label>
            <textarea v-model='authForm.notes' rows='2' placeholder='Any preferences...'
              class='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none'></textarea>
          </div>

          <button @click='handleAuthBooking'
            :disabled='authLoading || !authForm.service_id || !authForm.start_time || !authForm.reservation_date'
            class='w-full bg-pink-700 text-white py-4 rounded-xl font-semibold text-lg
                   hover:bg-pink-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed'>
            {{ authLoading ? 'Booking...' : 'Confirm Booking ✨' }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { fakeServices, guestBookingAPI, reservationsAPI, servicesAPI, authAPI } from '../../services/api'

const auth = useAuthStore()
const today = new Date().toISOString().split('T')[0]

// Services loaded from API
const services       = ref([])
const loadingServices = ref(false)

onMounted(async () => {
  loadingServices.value = true
  try {
    const res = await servicesAPI.getAll()
    services.value = res.data.data || res.data || []
  } catch {
    services.value = fakeServices
  } finally {
    loadingServices.value = false
  }
})

const timeSlots = [
  '09:00','09:30','10:00','10:30','11:00','11:30',
  '12:00','13:00','13:30','14:00','14:30','15:00',
  '15:30','16:00','16:30','17:00','17:30','18:00',
]

const activeTab = ref(auth.isLoggedIn ? 'login' : 'guest')

// Guest state
const guestForm = ref({ name:'', email:'', phone:'', service_id:null, reservation_date:'', start_time:'', notes:'' })
const guestSelectedService = ref(null)
const guestLoading         = ref(false)
const guestError           = ref('')
const guestSuccess         = ref(false)
const guestResult          = ref(null)
const shouldLogin          = ref(false)

// Inline login state
const loginForm    = ref({ email:'', password:'' })
const loginLoading = ref(false)
const loginError   = ref('')

// Auth booking state
const authForm = ref({ service_id:null, reservation_date:'', start_time:'', notes:'' })
const authSelectedService = ref(null)
const authLoading         = ref(false)
const authError           = ref('')
const authSuccess         = ref(false)
const authSuccessData     = ref({})

// End time calculators
const guestEstimatedEnd = computed(() => calcEnd(guestForm.value.start_time, guestSelectedService.value))
const authEstimatedEnd  = computed(() => calcEnd(authForm.value.start_time,  authSelectedService.value))

function calcEnd(startTime, service) {
  if (!startTime || !service) return '--:--'
  const [h, m]   = startTime.split(':').map(Number)
  const totalMin = h * 60 + m + service.duration
  return `${String(Math.floor(totalMin/60)).padStart(2,'0')}:${String(totalMin%60).padStart(2,'0')}`
}

function selectService(service, tab) {
  if (tab === 'guest') {
    guestForm.value.service_id = service.id
    guestSelectedService.value = service
    guestForm.value.start_time = ''
  } else {
    authForm.value.service_id = service.id
    authSelectedService.value = service
    authForm.value.start_time = ''
  }
}

async function handleGuestBooking() {
  guestLoading.value = true
  guestError.value   = ''
  shouldLogin.value  = false
  try {
    const res         = await guestBookingAPI.book(guestForm.value)
    guestResult.value = res.data.data
    guestSuccess.value = true
  } catch (err) {
    if (err.response?.status === 409) shouldLogin.value = true
    guestError.value = err.response?.data?.message || 'Booking failed. Please try again.'
  } finally {
    guestLoading.value = false
  }
}

async function handleInlineLogin() {
  loginLoading.value = true
  loginError.value   = ''
  try {
    const res     = await authAPI.login(loginForm.value)
    const payload = res.data.data ?? res.data
    auth.setUser(payload.user, payload.token)
    loginForm.value = { email:'', password:'' }
  } catch (err) {
    loginError.value = err.response?.data?.message || 'Invalid email or password.'
  } finally {
    loginLoading.value = false
  }
}

async function handleAuthBooking() {
  authLoading.value = true
  authError.value   = ''
  try {
    await reservationsAPI.create(authForm.value)
    authSuccessData.value = {
      service: authSelectedService.value?.name || authSelectedService.value?.title,
      date:    authForm.value.reservation_date,
      time:    authForm.value.start_time,
    }
    authSuccess.value = true
  } catch (err) {
    authError.value = err.response?.data?.message || 'Booking failed. Please try again.'
  } finally {
    authLoading.value = false
  }
}

async function handleLogout() {
  try { await authAPI.logout() } catch {}
  auth.logout()
}

function resetGuest() {
  guestForm.value = { name:'', email:'', phone:'', service_id:null, reservation_date:'', start_time:'', notes:'' }
  guestSelectedService.value = null
  guestSuccess.value = false
  guestResult.value  = null
}
</script>

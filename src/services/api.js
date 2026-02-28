import axios from 'axios'
 
// ── BASE URL ─────────────────────────────────────────────
// Change to your production URL when deploying
const BASE_URL = 'http://127.0.0.1:8000/api'
 
// Create an axios instance with default config
// Every API call we make will use this instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept':        'application/json',
  }
})
 
// ── REQUEST INTERCEPTOR ──────────────────────────────────
// This runs BEFORE every single API call automatically
// It reads the token from localStorage and adds it to the request
// So you NEVER have to manually add Authorization header anywhere
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    // This is what Laravel Sanctum expects
    config.headers.Authorization = `Bearer ${token}`
  }
  return config  // Must return config or the request won't go
})
 
// ── RESPONSE INTERCEPTOR ─────────────────────────────────
// This runs AFTER every response
// If token expired (401), automatically log the user out
api.interceptors.response.use(
  (response) => response,  // Success — just pass through
  (error) => {
    if (error.response?.status === 401) {
      // Token is expired or invalid — clear local data
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)  // Pass error to the calling function
  }
)
 
// ── FAKE DATA (use until backend is running) ─────────────
export const fakeServices = [
  { id:1, title:'Classic Haircut',     description:'Precision cut and blow dry.',        duration:45,  price:35,  is_active:true  },
  { id:2, title:'Hair Coloring',        description:'Full color with premium dyes.',      duration:120, price:120, is_active:true  },
  { id:3, title:'Keratin Treatment',    description:'Frizz-free smoothing treatment.',   duration:90,  price:150, is_active:true  },
  { id:4, title:'Balayage Highlights',  description:'Hand-painted sun-kissed highlights.',duration:150, price:180, is_active:true  },
  { id:5, title:'Deep Conditioning',    description:'Intensive repair treatment.',        duration:45,  price:55,  is_active:true  },
  { id:6, title:'Bridal Hair Package',  description:'Full bridal styling and trial.',     duration:180, price:250, is_active:true  },
  { id:7, title:'Scalp Treatment',      description:'Therapeutic scalp massage.',         duration:30,  price:40,  is_active:true  },
  { id:8, title:'Blowout & Styling',    description:'Professional blowout and finish.',   duration:45,  price:50,  is_active:true  },
  { id:9, title:'Kids Haircut',         description:'Gentle cut for children under 12.',  duration:30,  price:20,  is_active:true  },
]
 
// Add inside services/api.js
export const guestBookingAPI = {
  // POST /api/guest-booking — no auth token needed
  book: (data) => api.post('/guest-booking', data),
}



// ── AUTH ENDPOINTS ───────────────────────────────────────
export const authAPI = {
  // POST /api/login — returns { token, user }
  login:    (data) => api.post('/login', data),
 
  // POST /api/register — returns { token, user }
  register: (data) => api.post('/register', data),
 
  // POST /api/logout — deletes token on server
  logout:   ()     => api.post('/logout'),
 
  // GET /api/me — returns current user profile
  me:       ()     => api.get('/me'),
}
 


// ── CLIENT ENDPOINTS ─────────────────────────────────────
export const servicesAPI = {
  // GET /api/services — returns array of active services
  getAll: () => api.get('/services'),
}
 
export const reservationsAPI = {
  // POST /api/reservations — book an appointment
  create:     (data) => api.post('/reservations', data),
 
  // GET /api/my-reservations — client's own bookings
  myBookings: ()     => api.get('/my-reservations'),
 
  // DELETE /api/reservation/{id} — cancel a booking
  cancel:     (id)   => api.delete(`/reservation/${id}`),
}
 
// ── ADMIN ENDPOINTS ──────────────────────────────────────
export const adminAPI = {
  // GET /api/admin/dashboard
  dashboard:         ()          => api.get('/admin/dashboard'),
 
  // GET /api/admin/reservations?status=&date=&client_name=&sort=
  getReservations:   (params)    => api.get('/admin/reservations', { params }),
 
  // POST /api/admin/reservations — manual phone booking
  createReservation: (data)      => api.post('/admin/reservations', data),
 
  // PUT /api/admin/reservations/{id}
  updateReservation: (id, data)  => api.put(`/admin/reservations/${id}`, data),
}
 
// ── SUPER ADMIN ENDPOINTS ────────────────────────────────
export const superAdminAPI = {
  // GET /api/business-settings
  getSettings:    ()          => api.get('/business-settings'),
 
  // PUT /api/business-settings
  updateSettings: (data)      => api.put('/business-settings', data),
 
  // POST /api/services
  createService:  (data)      => api.post('/services', data),
 
  // PUT /api/services/{id}
  updateService:  (id, data)  => api.put(`/services/${id}`, data),
 
  // DELETE /api/services/{id}
  deleteService:  (id)        => api.delete(`/services/${id}`),
 
  // POST /api/create-admin
  createAdmin:    (data)      => api.post('/create-admin', data),
}
 
export default api

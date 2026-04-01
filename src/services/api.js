import axios from 'axios'

//const BASE_URL = 'http://127.0.0.1:8000/api'
//Vercel
const BASE_URL = import.meta.env.VITE_API_URL + '/api'

// ── AUTHENTICATED INSTANCE ────────────────────────────────────────────────────
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      const path = window.location.pathname
      if (path !== '/login' && path !== '/admin/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// ── PUBLIC INSTANCE — NEVER sends Authorization header ───────────────────────
const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
})

// ── FAKE DATA fallback ────────────────────────────────────────────────────────
export const fakeServices = [
  { id:1, title:'Classic Haircut',    description:'Precision cut and blow dry.',          duration:45,  price:35,  is_active:true },
  { id:2, title:'Hair Coloring',       description:'Full color with premium dyes.',        duration:120, price:120, is_active:true },
  { id:3, title:'Keratin Treatment',   description:'Frizz-free smoothing treatment.',      duration:90,  price:150, is_active:true },
  { id:4, title:'Balayage Highlights', description:'Hand-painted sun-kissed highlights.', duration:150, price:180, is_active:true },
  { id:5, title:'Deep Conditioning',   description:'Intensive repair treatment.',          duration:45,  price:55,  is_active:true },
  { id:6, title:'Bridal Hair Package', description:'Full bridal styling and trial.',       duration:180, price:250, is_active:true },
  { id:7, title:'Scalp Treatment',     description:'Therapeutic scalp massage.',           duration:30,  price:40,  is_active:true },
  { id:8, title:'Blowout & Styling',   description:'Professional blowout and finish.',     duration:45,  price:50,  is_active:true },
  { id:9, title:'Kids Haircut',        description:'Gentle cut for children under 12.',    duration:30,  price:20,  is_active:true },
]

export const authAPI = {
  login:          (data) => api.post('/login', data),
  register:       (data) => api.post('/register', data),
  logout:         ()     => api.post('/logout'),
  me:             ()     => api.get('/me'),
  changePassword: (data) => api.put('/change-password', data),
}

export const publicAPIService = {
  getBusinessSettings: () => publicApi.get('/business-settings'),
}

// Guest booking uses publicApi — zero token, zero auth header
export const guestBookingAPI = {
  book: (data) => publicApi.post('/guest-booking', data),
}

export const servicesAPI = {
  getAll: () => publicApi.get('/services'),
}

export const reservationsAPI = {
  create:     (data) => api.post('/reservations', data),
  myBookings: ()     => api.get('/my-reservations'),
  cancel:     (id)   => api.delete(`/reservation/${id}`),
}

export const adminAPI = {
  dashboard:         ()         => api.get('/admin/dashboard'),
  getReservations:   (params)   => api.get('/admin/reservations', { params }),
  createReservation: (data)     => api.post('/admin/reservations', data),
  updateReservation: (id, data) => api.put(`/admin/reservations/${id}`, data),
  getClients:        ()         => api.get('/admin/clients'),
}

export const superAdminAPI = {
  getSettings:          ()          => api.get('/business-settings'),
  updateSettings:       (data)      => api.put('/business-settings', data),
  createService:        (data)      => api.post('/services', data),
  updateService:        (id, data)  => api.put(`/services/${id}`, data),
  deleteService:        (id)        => api.delete(`/services/${id}`),
  createAdmin:          (data)      => api.post('/create-admin', data),
  getAdmins:            ()          => api.get('/super-admin/admins'),
  toggleAdmin:          (id)        => api.patch(`/super-admin/admins/${id}/toggle-active`),
  changeAdminPassword:  (id, data)  => api.put(`/super-admin/admins/${id}/password`, data),
  deleteAdmin:          (id)        => api.delete(`/super-admin/admins/${id}`),
  changeClientPassword: (id, data)  => api.put(`/super-admin/clients/${id}/password`, data),
}

export default api

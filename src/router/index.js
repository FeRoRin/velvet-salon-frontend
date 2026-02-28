import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
 
const routes = [
 
  // ── PUBLIC CLIENT ROUTES ────────────────────────────
  { path:'/',               name:'Home',
    component: () => import('../views/client/HomeView.vue') },
 
  { path:'/services',       name:'Services',
    component: () => import('../views/client/ServicesView.vue') },
 
  { path:'/login',          name:'Login',
    component: () => import('../views/client/LoginView.vue'),
    meta: { guestOnly: true } },   // Redirect if already logged in
 
  { path:'/register',       name:'Register',
    component: () => import('../views/client/RegisterView.vue'),
    meta: { guestOnly: true } },
 
  // ── AUTHENTICATED CLIENT ROUTES ──────────────────────
  { path:'/dashboard',      name:'Dashboard',
    component: () => import('../views/client/DashboardView.vue'),
    meta: { requiresAuth: true, role: 'client' } },
 
  { path:'/booking',        name:'Booking',
    component: () => import('../views/client/BookingView.vue'),
    meta: { requiresAuth: true } },
 
  { path:'/my-reservations',name:'MyReservations',
    component: () => import('../views/client/MyReservationsView.vue'),
    meta: { requiresAuth: true } },
 
  { path:'/profile',        name:'Profile',
    component: () => import('../views/client/ProfileView.vue'),
    meta: { requiresAuth: true } },
 
  // ── ADMIN ROUTES ─────────────────────────────────────
  { path:'/admin/login',    name:'AdminLogin',
    component: () => import('../views/admin/AdminLoginView.vue'),
    meta: { guestOnly: true } },
 
  { path:'/admin',          name:'AdminDashboard',
    component: () => import('../views/admin/AdminDashboardView.vue'),
    meta: { requiresAdmin: true } },
 
  { path:'/admin/reservations', name:'AdminReservations',
    component: () => import('../views/admin/ReservationsView.vue'),
    meta: { requiresAdmin: true } },
 
  // ── SUPER ADMIN ROUTES ────────────────────────────────
  { path:'/admin/services', name:'ServicesManagement',
    component: () => import('../views/admin/ServicesManagementView.vue'),
    meta: { requiresSuperAdmin: true } },
 
  { path:'/admin/settings', name:'BusinessSettings',
    component: () => import('../views/admin/BusinessSettingsView.vue'),
    meta: { requiresSuperAdmin: true } },
 
  { path:'/admin/create-admin', name:'CreateAdmin',
    component: () => import('../views/admin/CreateAdminView.vue'),
    meta: { requiresSuperAdmin: true } },
 
  // ── 404 ──────────────────────────────────────────────
  { path:'/:pathMatch(.*)*', redirect: '/' },
]
 
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})
 
// ── NAVIGATION GUARD ──────────────────────────────────
// Runs before EVERY route change
router.beforeEach((to) => {
  const auth = useAuthStore()
 
  // Page needs login, user is not logged in → go to login
  if (to.meta.requiresAuth && !auth.isLoggedIn)
    return { name: 'Login' }
 
  // Page needs admin, user is not admin → go to home
  if (to.meta.requiresAdmin && !auth.isAdmin)
    return { name: 'Home' }
 
  // Page needs super admin, user is not super admin → go to home
  if (to.meta.requiresSuperAdmin && !auth.isSuperAdmin)
    return { name: 'Home' }
 
  // Guest-only page (login/register) but user is already logged in
  if (to.meta.guestOnly && auth.isLoggedIn) {
    // Redirect based on role
    if (auth.isAdmin)   return { name: 'AdminDashboard' }
    return { name: 'Dashboard' }
  }
})
 
export default router

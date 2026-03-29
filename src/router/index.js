import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [

  // ── PUBLIC — no guard ────────────────────────────────
  { path: '/',         name: 'Home',     component: () => import('../views/client/HomeView.vue') },
  { path: '/services', name: 'Services', component: () => import('../views/client/ServicesView.vue') },

  // /booking is PUBLIC — any visitor can reach it without a token.
  // Guest booking must work here. DO NOT add requiresAuth.
  { path: '/booking',  name: 'Booking',  component: () => import('../views/client/BookingView.vue') },

  // ── GUEST-ONLY (redirect away if already logged in) ──
  { path: '/login',    name: 'Login',    component: () => import('../views/client/LoginView.vue'),    meta: { guestOnly: true } },
  { path: '/register', name: 'Register', component: () => import('../views/client/RegisterView.vue'), meta: { guestOnly: true } },

  // ── CLIENT — requires any valid token ────────────────
  { path: '/dashboard',        name: 'Dashboard',       component: () => import('../views/client/DashboardView.vue'),      meta: { requiresAuth: true } },
  { path: '/my-reservations',  name: 'MyReservations',  component: () => import('../views/client/MyReservationsView.vue'), meta: { requiresAuth: true } },
  { path: '/profile',          name: 'Profile',         component: () => import('../views/client/ProfileView.vue'),        meta: { requiresAuth: true } },

  // ── ADMIN LOGIN ───────────────────────────────────────
  { path: '/admin/login', name: 'AdminLogin', component: () => import('../views/admin/AdminLoginView.vue'), meta: { guestOnly: true } },

  // ── ADMIN ─────────────────────────────────────────────
  { path: '/admin',               name: 'AdminDashboard',   component: () => import('../views/admin/AdminDashboardView.vue'),   meta: { requiresAdmin: true } },
  { path: '/admin/reservations',  name: 'AdminReservations',component: () => import('../views/admin/ReservationsView.vue'),     meta: { requiresAdmin: true } },
  { path: '/admin/clients',       name: 'AdminClients',     component: () => import('../views/admin/ClientsListView.vue'),      meta: { requiresAdmin: true } },

  // ── SUPER ADMIN ───────────────────────────────────────
  { path: '/admin/services',      name: 'ServicesManagement', component: () => import('../views/admin/ServicesManagementView.vue'), meta: { requiresSuperAdmin: true } },
  { path: '/admin/settings',      name: 'BusinessSettings',   component: () => import('../views/admin/BusinessSettingsView.vue'),   meta: { requiresSuperAdmin: true } },
  { path: '/admin/create-admin',  name: 'CreateAdmin',        component: () => import('../views/admin/CreateAdminView.vue'),        meta: { requiresSuperAdmin: true } },
  { path: '/admin/manage-admins', name: 'ManageAdmins',       component: () => import('../views/admin/ManageAdminsView.vue'),       meta: { requiresSuperAdmin: true } },

  // ── 404 ───────────────────────────────────────────────
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

// Navigation guard — runs before every route change
router.beforeEach((to) => {
  // useAuthStore() MUST be called inside beforeEach (not at module level)
  // so that Pinia is already initialised when this runs.
  const auth = useAuthStore()

  // 1. Guest-only pages (login/register) — bounce logged-in users
  if (to.meta.guestOnly && auth.isLoggedIn) {
    return auth.isAdmin ? { name: 'AdminDashboard' } : { name: 'Dashboard' }
  }

  // 2. Any auth-required page — bounce guests to login
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }

  // 3. Admin pages — must be admin or super_admin
  if (to.meta.requiresAdmin) {
    if (!auth.isLoggedIn) return { name: 'AdminLogin' }
    if (!auth.isAdmin)    return { name: 'Home' }
  }

  // 4. Super admin pages
  if (to.meta.requiresSuperAdmin) {
    if (!auth.isLoggedIn)    return { name: 'AdminLogin' }
    if (!auth.isSuperAdmin)  return { name: 'AdminDashboard' }
  }
})

export default router

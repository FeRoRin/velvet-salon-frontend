// Pinia store — holds logged-in user data globally
// Any component can read from this store without prop drilling
 
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
 
export const useAuthStore = defineStore('auth', () => {
 
  // ── STATE ─────────────────────────────────────────────
  // ref() = reactive variable (Vue watches it for changes)
  // We read from localStorage so user stays logged in after page refresh
  const user  = ref(JSON.parse(localStorage.getItem('user'))  || null)
  const token = ref(localStorage.getItem('token') || null)
 
  // ── GETTERS (computed) ────────────────────────────────
  // computed() = auto-recalculates when dependencies change
  // !! converts to boolean: !!null = false, !!'abc' = true
  const isLoggedIn   = computed(() => !!token.value)
  const isClient     = computed(() => user.value?.role === 'client')
  const isAdmin      = computed(() => ['admin','super_admin'].includes(user.value?.role))
  const isSuperAdmin = computed(() => user.value?.role === 'super_admin')
  const userName     = computed(() => user.value?.name || '')
  const userRole     = computed(() => user.value?.role || '')
 
  // ── ACTIONS ───────────────────────────────────────────
  function setUser(userData, tokenValue) {
    user.value  = userData
    token.value = tokenValue
    // Persist to localStorage so refresh doesn't log out
    localStorage.setItem('user',  JSON.stringify(userData))
    localStorage.setItem('token', tokenValue)
  }
 
  function logout() {
    user.value  = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
 
  // Update user data without changing token (for profile updates)
  function updateUser(userData) {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }
 
  return {
    user, token,
    isLoggedIn, isClient, isAdmin, isSuperAdmin, userName, userRole,
    setUser, logout, updateUser
  }
})

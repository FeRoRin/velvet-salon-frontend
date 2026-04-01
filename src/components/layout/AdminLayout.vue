<template>
  <div class='flex h-screen bg-gray-950 text-white overflow-hidden'>

    <!-- SIDEBAR -->
    <aside :class='sidebarOpen ? "w-64" : "w-16"'
      class='bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300 flex-shrink-0'>

      <div class='h-16 flex items-center px-4 border-b border-gray-800'>
        <!--span class='text-lg'>🌸</span>
        <span v-if='sidebarOpen'
          class='ml-2 font-serif font-bold text-purple-400 text-sm whitespace-nowrap'>
          Velvet Admin
        </span-->
        <img src='../../assets/logo.png' alt='Velvet Salon' class='h-10 w-auto object-contain' />
      </div>

      <nav class='flex-1 py-4 overflow-y-auto'>
        <router-link v-for='item in navItems' :key='item.to' :to='item.to' :title='item.label'
          class='flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white
                 hover:bg-gray-800 transition-colors relative group'
          active-class='bg-purple-900/50 text-purple-400 border-r-2 border-purple-500'>
          <span class='text-lg flex-shrink-0'>{{ item.icon }}</span>
          <span v-if='sidebarOpen' class='text-sm font-medium whitespace-nowrap'>{{ item.label }}</span>
          <span v-if='!sidebarOpen'
            class='absolute left-full ml-2 bg-gray-800 text-white text-xs px-2 py-1
                   rounded whitespace-nowrap opacity-0 group-hover:opacity-100
                   pointer-events-none z-50 transition-opacity'>{{ item.label }}</span>
        </router-link>
      </nav>

      <div class='p-4 border-t border-gray-800'>
        <div v-if='sidebarOpen' class='flex items-center gap-3'>
          <div class='w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center
                      text-white text-xs font-bold'>
            {{ auth.userName.charAt(0).toUpperCase() }}
          </div>
          <div class='min-w-0'>
            <p class='text-xs font-medium text-white truncate'>{{ auth.userName }}</p>
            <p class='text-xs text-gray-500 capitalize'>{{ auth.userRole }}</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <div class='flex-1 flex flex-col min-w-0 overflow-hidden'>
      <header class='h-16 bg-gray-900 border-b border-gray-800 flex items-center
                     justify-between px-4 flex-shrink-0'>
        <div class='flex items-center gap-3'>
          <button @click='sidebarOpen = !sidebarOpen'
            class='text-gray-400 hover:text-white transition-colors p-1 rounded'>
            <span class='text-xl'>{{ sidebarOpen ? "◀" : "▶" }}</span>
          </button>
          <div class='text-sm text-gray-400'>
            <span class='text-purple-400 font-medium'>Admin</span>
            <span class='mx-1'>/</span>
            <span class='text-white'>{{ currentPageTitle }}</span>
          </div>
        </div>

        <div class='relative group'>
          <button class='flex items-center gap-2 hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors'>
            <div class='w-7 h-7 bg-purple-700 rounded-full flex items-center justify-center text-white text-xs font-bold'>
              {{ auth.userName.charAt(0).toUpperCase() }}
            </div>
            <span class='text-sm text-gray-300'>{{ auth.userName.split(' ')[0] }}</span>
            <span class='text-gray-500 text-xs'>▾</span>
          </button>
          <div class='absolute right-0 mt-1 w-44 bg-gray-800 rounded-xl border
                      border-gray-700 py-1 opacity-0 invisible
                      group-hover:opacity-100 group-hover:visible transition-all z-50'>
            <RouterLink to='/'
              class='flex items-center gap-2 px-4 py-2 text-sm text-gray-300
                     hover:text-white hover:bg-gray-700 transition-colors'>
              🌸 Client Site
            </RouterLink>
            <hr class='border-gray-700 my-1'>
            <button @click='handleLogout'
              class='flex items-center gap-2 px-4 py-2 text-sm text-rose-400
                     hover:bg-gray-700 w-full text-left transition-colors'>
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      <main class='flex-1 overflow-y-auto bg-gray-950 p-6'>
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { authAPI } from '../../services/api'

const auth   = useAuthStore()
const route  = useRoute()
const router = useRouter()

const sidebarOpen = ref(true)

const navItems = computed(() => [
  { to:'/admin',               icon:'📊', label:'Dashboard',         show: true },
  { to:'/admin/reservations',  icon:'📅', label:'Reservations',      show: true },
  { to:'/admin/clients',       icon:'👥', label:'Clients',           show: true },
  { to:'/admin/services',      icon:'💇', label:'Services',          show: auth.isSuperAdmin },
  { to:'/admin/settings',      icon:'⚙️', label:'Business Settings', show: auth.isSuperAdmin },
  { to:'/admin/manage-admins', icon:'🔑', label:'Manage Admins',     show: auth.isSuperAdmin },
  { to:'/admin/create-admin',  icon:'👤', label:'Create Admin',      show: auth.isSuperAdmin },
].filter(item => item.show))

const currentPageTitle = computed(() => {
  const map = {
    '/admin':               'Dashboard',
    '/admin/reservations':  'Reservations',
    '/admin/clients':       'Clients',
    '/admin/services':      'Services',
    '/admin/settings':      'Business Settings',
    '/admin/manage-admins': 'Manage Admins',
    '/admin/create-admin':  'Create Admin',
  }
  return map[route.path] || 'Admin'
})

async function handleLogout() {
  try { await authAPI.logout() } catch {}
  auth.logout()
  router.push('/admin/login')
}
</script>

<template>
  <!-- Show NavBar + Footer only on client pages (not admin) -->
  <!-- useRoute().path lets us check the current URL -->
  <template v-if='!isAdminRoute'>
    <NavBar />
    <RouterView />
    <AppFooter />
  </template>
 
  <!-- Admin pages have their own layout (sidebar + topbar) -->
  <template v-else>
    <RouterView />
  </template>
</template>
 
<script setup>
import { computed }  from 'vue'
import { useRoute }  from 'vue-router'
import NavBar        from './components/layout/NavBar.vue'
import AppFooter     from './components/layout/Footer.vue'
 
const route       = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>

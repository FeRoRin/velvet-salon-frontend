<template>
  <footer class="bg-[#2A2625] text-stone-300">
    <div class="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-20">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
        
        <!-- Brand -->
        <div class="md:col-span-5">
          <img src="../../assets/logo.png" alt="Velvet Salon" class="h-10 w-auto object-contain mb-6 brightness-0 invert opacity-90" />
          <p class="text-stone-400 text-sm leading-relaxed max-w-xs">
            Where beauty meets elegance. Professional hair care and styling in a luxurious atmosphere since 2016.
          </p>
          <div class="flex gap-3 mt-6">
            <a v-for="s in socials" :key="s.name" :href="s.href"
               class="w-10 h-10 bg-stone-800 hover:bg-stone-700 flex items-center justify-center transition-colors">
              <span v-html="s.icon"></span>
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div class="md:col-span-3 md:col-start-7">
          <h4 class="text-xs font-medium uppercase tracking-[0.15em] text-stone-500 mb-6">
            Quick Links
          </h4>
          <ul class="space-y-3">
            <li v-for="link in links" :key="link.to">
              <RouterLink :to="link.to"
                class="text-sm text-stone-400 hover:text-white transition-colors"
              >{{ link.label }}</RouterLink>
            </li>
          </ul>
        </div>
        
        <!-- Contact -->
        <div class="md:col-span-3">
          <h4 class="text-xs font-medium uppercase tracking-[0.15em] text-stone-500 mb-6">
            Contact
          </h4>
          <ul class="space-y-4 text-sm text-stone-400">
            <li class="flex items-start gap-3">
              <svg class="w-4 h-4 mt-0.5 text-stone-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
              <span>123 Rose Avenue,<br>Fashion District</span>
            </li>
            <li class="flex items-center gap-3">
              <svg class="w-4 h-4 text-stone-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
              </svg>
              +212 61-234-5678
            </li>
            <li class="flex items-center gap-3">
              <svg class="w-4 h-4 text-stone-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
              </svg>
              hello@velvetsalon.com
            </li>
            <li class="flex items-center gap-3">
              <svg class="w-4 h-4 text-stone-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Mon–Sat: 9:00 AM – 7:00 PM
            </li>
          </ul>
        </div>
        
      </div>
      
      <div class="border-t border-stone-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <span>&copy; 2026 Velvet Salon. All rights reserved.</span>
        <span>Built with Vue 3 + Laravel</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
const socials = [
  { 
    name: 'Instagram', 
    href: '#',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 fill-stone-300" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
  },
  { 
    name: 'Facebook',  
    href: '#',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 fill-stone-300" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`
  },
  { 
    name: 'TikTok',    
    href: '#',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 fill-stone-300" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.37 3.89-1.21 1.56-3.03 2.51-5.01 2.51-3.56 0-6.45-2.89-6.45-6.45 0-3.56 2.89-6.45 6.45-6.45.36 0 .71.03 1.05.09v4.45c-.34-.11-.7-.17-1.05-.17-1.19 0-2.27.48-3.05 1.26-.78.78-1.26 1.86-1.26 3.05 0 2.38 1.93 4.31 4.31 4.31 1.05 0 2.02-.38 2.77-1.01.75-.63 1.24-1.52 1.34-2.51.01-.13.02-.26.02-.39v-8.24z"/></svg>`
  }
]

const links = [
  { to: '/',         label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/booking',  label: 'Book Appointment' },
  { to: '/login',    label: 'Client Login' },
  { to: '/register', label: 'Register' },
]
</script>
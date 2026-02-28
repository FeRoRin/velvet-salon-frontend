<template>
  <footer class='bg-gray-900 text-white'>
    <div class='max-w-7xl mx-auto px-4 py-16'>
      <div class='grid grid-cols-1 md:grid-cols-4 gap-10'>
 
        <!-- Brand -->
        <div class='col-span-1 md:col-span-2'>
          <div class='flex items-center gap-2 mb-4'>
            <span class='text-2xl'>🌸</span>
            <span class='text-xl font-serif font-bold text-pink-400'>Velvet Salon</span>
          </div>
          <p class='text-gray-400 text-sm leading-relaxed max-w-xs'>
            Where beauty meets elegance. Professional hair care
            and styling in a luxurious atmosphere since 2016.
          </p>
          <!-- Social icons (placeholder) -->
          <div class='flex gap-3 mt-5'>
            <a v-for='s in socials' :key='s.name' :href='s.href'
               class='w-9 h-9 bg-gray-800 hover:bg-pink-700 rounded-full flex
                      items-center justify-center transition-colors text-sm'>
              {{ s.icon }}
            </a>
          </div>
        </div>
 
        <!-- Quick Links -->
        <div>
          <h4 class='font-semibold text-pink-400 mb-4 text-sm uppercase tracking-wider'>
            Quick Links
          </h4>
          <ul class='space-y-2'>
            <li v-for='link in links' :key='link.to'>
              <RouterLink :to='link.to'
                class='text-gray-400 hover:text-pink-400 text-sm transition-colors'
              >{{ link.label }}</RouterLink>
            </li>
          </ul>
        </div>
 
        <!-- Contact -->
        <div>
          <h4 class='font-semibold text-pink-400 mb-4 text-sm uppercase tracking-wider'>
            Contact
          </h4>
          <ul class='space-y-3 text-gray-400 text-sm'>
            <li class='flex items-start gap-2'>
              <span>📍</span>
              <span>123 Rose Avenue,<br>Fashion District</span>
            </li>
            <li>📞 +212 61-234-5678</li>
            <li>✉️ hello@velvetsalon.com</li>
            <li>🕐 Mon–Sat: 9:00 AM – 7:00 PM</li>
          </ul>
        </div>
 
      </div>
 
      <!-- Bottom bar -->
      <div class='border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row
                  items-center justify-between gap-3 text-gray-500 text-xs'>
        <span>© 2026 Velvet Salon. All rights reserved.</span>
        <span>Built with 🌸 Vue 3 + Laravel</span>
      </div>
    </div>
  </footer>
</template>
 
<script setup>
const socials = [
  { name:'Instagram', icon:'📸', href:'#' },
  { name:'Facebook',  icon:'👍', href:'#' },
  { name:'TikTok',    icon:'🎵', href:'#' },
]
const links = [
  { to:'/',               label:'Home'           },
  { to:'/services',       label:'Services'       },
  { to:'/booking',        label:'Book Appointment'},
  { to:'/login',          label:'Client Login'   },
  { to:'/register',       label:'Register'       },
]
</script>

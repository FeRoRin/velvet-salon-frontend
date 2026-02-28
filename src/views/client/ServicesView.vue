<template>
  <div class='min-h-screen bg-gray-50'>
 
    <!-- Page header banner -->
    <div class='bg-gradient-to-r from-pink-700 to-rose-600 py-16 text-white text-center'>
      <h1 class='text-4xl font-serif font-bold mb-2'>Our Services</h1>
      <p class='text-pink-100'>Professional hair care tailored just for you</p>
    </div>
 
    <div class='max-w-7xl mx-auto px-4 py-12'>
 
      <!-- ── Search + Filter Bar ───────────────────────── -->
      <div class='bg-white rounded-2xl shadow-sm p-4 mb-10 flex flex-wrap gap-4 items-center'>
 
        <!-- Search input -->
        <!-- v-model='search' binds input value to search reactive variable -->
        <div class='flex-1 min-w-48'>
          <input
            v-model='search'
            placeholder='🔍  Search services...'
            class='w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                   focus:outline-none focus:ring-2 focus:ring-pink-400 transition'
          />
        </div>
 
        <!-- Price filter buttons -->
        <div class='flex gap-2 flex-wrap'>
          <button
            v-for='f in priceFilters'
            :key='f.label'
            @click='activeFilter = f.label'
            :class='[
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeFilter === f.label
                ? "bg-pink-700 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-700"
            ]'
          >{{ f.label }}</button>
        </div>
 
        <!-- Sort -->
        <select v-model='sortBy'
          class='border border-gray-200 rounded-xl px-3 py-2.5 text-sm
                 focus:outline-none focus:ring-2 focus:ring-pink-400'
        >
          <option value=''>Sort by...</option>
          <option value='price-asc'>Price: Low → High</option>
          <option value='price-desc'>Price: High → Low</option>
          <option value='duration'>Duration</option>
        </select>
      </div>
 
      <!-- Results count -->
      <p class='text-gray-500 text-sm mb-6'>
        Showing {{ filteredServices.length }} service{{ filteredServices.length !== 1 ? 's' : '' }}
      </p>
 
      <!-- Loading state -->
      <div v-if='loading' class='flex justify-center py-20'>
        <div class='w-10 h-10 border-4 border-pink-200 border-t-pink-700 rounded-full animate-spin'></div>
      </div>
 
      <!-- Services grid -->
      <div v-else class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <ServiceCard
          v-for='service in filteredServices'
          :key='service.id'
          :service='service'
        />
      </div>
 
      <!-- Empty state -->
      <div v-if='!loading && filteredServices.length === 0' class='text-center py-20'>
        <div class='text-5xl mb-4'>🔍</div>
        <p class='text-gray-500'>No services found. Try a different search.</p>
        <button @click='resetFilters'
          class='mt-4 text-pink-700 font-medium hover:underline'
        >Clear filters</button>
      </div>
 
    </div>
  </div>
</template>
 
<script setup>
import { ref, computed, onMounted } from 'vue'
import ServiceCard from '../../components/ui/ServiceCard.vue'
import { fakeServices, servicesAPI } from '../../services/api'

 
// ── State ─────────────────────────────────────────────
//const services     = ref(fakeServices)
// Start empty — API fills this
const services = ref([])
const loading = ref(false)
const search = ref('')
const activeFilter = ref('All')
const sortBy = ref('')

onMounted(async () => {
  loading.value = true
  try {
    const res = await servicesAPI.getAll()
    services.value = res.data.data || []
  } catch (e) {
    services.value = fakeServices
  } finally {
    loading.value = false
  }
})

// Price filter options
const priceFilters = [
  { label:'All',        min:0,   max:9999 },
  { label:'Under $50',  min:0,   max:49   },
  { label:'$50–$100',   min:50,  max:100  },
  { label:'$100–$200',  min:100, max:200  },
  { label:'$200+',      min:200, max:9999 },
]
 
// ── Computed: filteredServices ─────────────────────────
// This recalculates every time search, activeFilter, or sortBy changes
const filteredServices = computed(() => {
  let result = services.value
 
  // 1. Only show active services
  result = result.filter(s => s.is_active)
 
  // 2. Search filter — case-insensitive title match
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    result = result.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    )
  }
 
  // 3. Price range filter
  const filter = priceFilters.find(f => f.label === activeFilter.value)
  if (filter) {
    result = result.filter(s => s.price >= filter.min && s.price <= filter.max)
  }
 
  // 4. Sort
  if (sortBy.value === 'price-asc')  result = [...result].sort((a,b) => a.price - b.price)
  if (sortBy.value === 'price-desc') result = [...result].sort((a,b) => b.price - a.price)
  if (sortBy.value === 'duration')   result = [...result].sort((a,b) => a.duration - b.duration)
 
  return result
})
 
function resetFilters() {
  search.value = ''
  activeFilter.value = 'All'
  sortBy.value = ''
}
 
// Uncomment when backend is ready:
// onMounted(async () => {
//   loading.value = true
//   const res = await servicesAPI.getAll()
//   services.value = res.data.data
//   loading.value = false
// })
</script>

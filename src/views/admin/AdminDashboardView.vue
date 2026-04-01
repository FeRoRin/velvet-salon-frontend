<template>
  <AdminLayout>
 
    <!-- Page title -->
    <div class='mb-8'>
      <h1 class='text-2xl font-bold text-white'>Dashboard</h1>
      <p class='text-gray-400 text-sm mt-1'>
        {{ new Date().toLocaleDateString('en-US', {weekday:'long',year:'numeric',month:'long',day:'numeric'}) }}
      </p>
    </div>
 
    <!-- Loading state -->
    <div v-if='loading' class='flex justify-center py-20'>
      <div class='w-10 h-10 border-4 border-purple-800 border-t-purple-400
                  rounded-full animate-spin'></div>
    </div>
 
    <template v-else>
 
      <!-- ── STAT CARDS ──────────────────────────────────── -->
      <div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        <StatCard icon='📅' :value='stats.total_reservations'
          label='Total Reservations' icon-bg='bg-purple-900/50' />
        <StatCard icon='🕐' :value='stats.today_reservations'
          label="Today's Bookings" icon-bg='bg-blue-900/50' />
        <StatCard icon='💰' :value='"$" + stats.total_revenue'
          label='Total Revenue' icon-bg='bg-green-900/50' />
        <StatCard icon='⭐' :value='stats.reservations_by_status?.completed || 0'
          label='Completed' icon-bg='bg-yellow-900/50' />
      </div>
 
      <!-- ── CHARTS ROW ──────────────────────────────────── -->
      <div class='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
 
        <!-- ── CHART.JS BAR CHART ─────────────────────── -->
        <!-- Shows most booked services as horizontal bars -->
        <div class='bg-gray-900 rounded-2xl p-6 border border-gray-800'>
          <h3 class='text-white font-semibold mb-4'>Top Services (Chart.js)</h3>
          <!-- The canvas element — Chart.js draws on this -->
          <canvas ref='barCanvas' height='200'></canvas>
        </div>
 
        <!-- ── APEXCHARTS PIE CHART ───────────────────── -->
        <!-- Shows reservation status distribution -->
        <div class='bg-gray-900 rounded-2xl p-6 border border-gray-800'>
          <h3 class='text-white font-semibold mb-4'>By Status (ApexCharts)</h3>
          <VueApexCharts
            type='donut'
            :options='donutOptions'
            :series='donutSeries'
            height='220'
          />
        </div>
      </div>
 
      <!-- ── APEXCHARTS LINE CHART (Revenue) ─────────── -->
      <div class='bg-gray-900 rounded-2xl p-6 border border-gray-800'>
        <h3 class='text-white font-semibold mb-4'>
          Revenue Overview (ApexCharts Line Chart)
        </h3>
        <VueApexCharts
          type='area'
          :options='lineOptions'
          :series='lineSeries'
          height='250'
        />
      </div>
 
    </template>
  </AdminLayout>
</template>
 
<script setup>
import { ref, onMounted, nextTick } from 'vue'
 
// Layout wrapper
import AdminLayout from '../../components/layout/AdminLayout.vue'
import StatCard    from '../../components/admin/StatCard.vue'
 
// ApexCharts Vue component
import VueApexCharts from 'vue3-apexcharts'
 
// Chart.js — we import and register manually for tree shaking
import {
  Chart, BarController, BarElement, CategoryScale,
  LinearScale, Tooltip, Legend
} from 'chart.js'
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)
 
import { adminAPI } from '../../services/api'
 
const loading   = ref(true)
const stats     = ref({})
const barCanvas = ref(null)  // Template ref for canvas element
let barChart    = null       // Chart.js instance
 
// ── APEXCHARTS DONUT CONFIG ───────────────────────────
// Dark theme, purple colors matching admin palette
const donutSeries  = ref([0, 0, 0, 0])
const donutOptions = {
  labels: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
  colors: ['#f59e0b', '#10b981', '#8b5cf6', '#6b7280'],
  chart: { background: 'transparent' },
  legend: { labels: { colors: '#9ca3af' } },
  dataLabels: { style: { colors: ['#fff'] } },
  plotOptions: { pie: { donut: { size: '70%' } } },
  theme: { mode: 'dark' },
}
 
// ── APEXCHARTS LINE CONFIG ────────────────────────────
// Fake monthly revenue data — replace with real API data
const lineSeries  = ref([{ name: 'Revenue', data: [850, 1200, 980, 1450, 1100, 1680, 1920] }])
const lineOptions = {
  chart: { background: 'transparent', toolbar: { show: false } },
  xaxis: { categories: ['Aug','Sep','Oct','Nov','Dec','Jan','Feb'],
           labels: { style: { colors: '#9ca3af' } } },
  yaxis: { labels: { style: { colors: '#9ca3af' },
           formatter: (v) => '$' + v } },
  colors: ['#8b5cf6'],
  fill: { type: 'gradient', gradient: { shadeIntensity:1, opacityFrom:0.4, opacityTo:0 } },
  grid: { borderColor: '#374151' },
  stroke: { curve: 'smooth', width: 2 },
  theme: { mode: 'dark' },
  tooltip: { theme: 'dark' },
}
 
onMounted(async () => {
  try {
    const res  = await adminAPI.dashboard()
    stats.value = res.data.data
    const d    = res.data.data
 
    // ── Update donut chart with real status data ──────
    const byStatus = d.reservations_by_status || {}
    donutSeries.value = [
      byStatus.pending   || 0,
      byStatus.confirmed || 0,
      byStatus.completed || 0,
      byStatus.cancelled || 0,
    ]
 
    // ── Build Chart.js bar chart ──────────────────────
    // nextTick waits for the DOM to update before drawing
    await nextTick()
 
    const topServices = d.most_booked_services || []
    barChart = new Chart(barCanvas.value, {
      type: 'bar',
      data: {
        labels:   topServices.map(s => s.name || s.title),
        datasets: [{
          label:           'Bookings',
          data:            topServices.map(s => s.total),
          backgroundColor: '#7c3aed',
          borderRadius:    6,
        }]
      },
      options: {
        indexAxis: 'y',   // Horizontal bars
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: {
            label: ctx => ` ${ctx.raw} bookings`
          }}
        },
        scales: {
          x: { ticks: { color:'#9ca3af' }, grid: { color:'#374151' } },
          y: { ticks: { color:'#9ca3af' }, grid: { color:'#374151' } },
        }
      }
    })
 
  } catch(e) {
    console.error('Dashboard error:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <AdminLayout>
    <div class='mb-6'>
      <h1 class='text-2xl font-bold text-white'>Business Settings</h1>
      <p class='text-gray-400 text-sm mt-1'>
        Configure your salon's working hours and days
      </p>
    </div>
 
    <div class='max-w-xl'>
      <div class='bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-6'>
 
        <!-- Success message -->
        <div v-if='success'
          class='bg-green-900/30 border border-green-700 text-green-400 rounded-xl
                 px-4 py-3 text-sm'
        >✓ Settings saved successfully!</div>
 
        <!-- Error message -->
        <div v-if='error'
          class='bg-red-900/30 border border-red-700 text-red-400 rounded-xl
                 px-4 py-3 text-sm'
        >{{ error }}</div>
 
        <!-- Open/Close Time -->
        <div class='grid grid-cols-2 gap-4'>
          <div>
            <label class='block text-gray-300 text-sm font-medium mb-2'>
              🕐 Opening Time
            </label>
            <input v-model='form.open_time' type='time'
              class='w-full bg-gray-800 border border-gray-700 text-white rounded-xl
                     px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
          </div>
          <div>
            <label class='block text-gray-300 text-sm font-medium mb-2'>
              🕐 Closing Time
            </label>
            <input v-model='form.close_time' type='time'
              class='w-full bg-gray-800 border border-gray-700 text-white rounded-xl
                     px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
          </div>
        </div>
 
        <!-- Working Days -->
        <div>
          <label class='block text-gray-300 text-sm font-medium mb-3'>
            📅 Working Days
          </label>
          <!-- Each day is a checkbox -->
          <!-- v-model binds to the form.working_days array -->
          <div class='grid grid-cols-4 gap-2'>
            <label v-for='day in days' :key='day.value'
              :class='[
                "flex flex-col items-center gap-1 p-3 rounded-xl border-2 cursor-pointer transition-all",
                form.working_days.includes(day.value)
                  ? "border-purple-600 bg-purple-900/30 text-purple-400"
                  : "border-gray-700 text-gray-500 hover:border-gray-600"
              ]'
            >
              <input
                type='checkbox'
                :value='day.value'
                v-model='form.working_days'
                class='sr-only'
              />
              <span class='text-sm font-medium'>{{ day.short }}</span>
            </label>
          </div>
        </div>
 
        <!-- Preview -->
        <div class='bg-gray-800 rounded-xl p-4 text-sm text-gray-300'>
          <p class='font-medium text-white mb-1'>Current Settings Preview:</p>
          <p>🕐 {{ form.open_time }} – {{ form.close_time }}</p>
          <p class='mt-1'>📅 {{ selectedDayNames }}</p>
        </div>
 
        <!-- Save button -->
        <button @click='saveSettings' :disabled='saving'
          class='w-full bg-purple-700 text-white py-3 rounded-xl font-semibold
                 hover:bg-purple-600 transition-colors disabled:opacity-50'
        >{{ saving ? 'Saving...' : 'Save Settings' }}</button>
 
      </div>
    </div>
  </AdminLayout>
</template>
 
<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import { superAdminAPI } from '../../services/api'
 
const form = ref({
  open_time:    '09:00',
  close_time:   '19:00',
  working_days: [1,2,3,4,5,6],  // Mon–Sat default
})
const saving  = ref(false)
const success = ref(false)
const error   = ref('')
 
const days = [
  { value:0, short:'Sun', full:'Sunday'    },
  { value:1, short:'Mon', full:'Monday'    },
  { value:2, short:'Tue', full:'Tuesday'   },
  { value:3, short:'Wed', full:'Wednesday' },
  { value:4, short:'Thu', full:'Thursday'  },
  { value:5, short:'Fri', full:'Friday'    },
  { value:6, short:'Sat', full:'Saturday'  },
]
 
// Shows names of selected days
const selectedDayNames = computed(() =>
  days
    .filter(d => form.value.working_days.includes(d.value))
    .map(d => d.full)
    .join(', ') || 'No days selected'
)
 
onMounted(async () => {
  try {
    const res = await superAdminAPI.getSettings()
    const d   = res.data.data
    form.value = {
      open_time:    d.open_time?.slice(0,5)  || '09:00',
      close_time:   d.close_time?.slice(0,5) || '19:00',
      working_days: d.working_days || [1,2,3,4,5,6],
    }
  } catch(e) { console.error(e) }
})
 
async function saveSettings() {
  saving.value  = true
  success.value = false
  error.value   = ''
  try {
    await superAdminAPI.updateSettings(form.value)
    success.value = true
    setTimeout(() => success.value = false, 3000)  // Hide after 3s
  } catch(err) {
    error.value = err.response?.data?.message || 'Save failed.'
  } finally {
    saving.value = false
  }
}
</script>

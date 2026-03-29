
// This is the ENTRY POINT — the first file that runs when the app starts
 
import { createApp }   from 'vue'       // The Vue framework itself
import { createPinia } from 'pinia'      // pinia for State management
import App             from './App.vue'  // Root component
import router          from './router/index.js'
import './style.css'                     // Global styles
 
import VueApexCharts from 'vue3-apexcharts'


// 1. Create the Vue application from App.vue
const app = createApp(App)
 
// 2. Register Pinia — must come BEFORE router because router uses stores
app.use(createPinia())


// 3. Register Vue Router
app.use(router)

//new add
app.use(VueApexCharts)

// 4. Mount to the <div id='app'> in index.html
app.mount('#app')

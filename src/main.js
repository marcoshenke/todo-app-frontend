import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

app.use(router).use(VCalendar, {})
app.mount('#app')
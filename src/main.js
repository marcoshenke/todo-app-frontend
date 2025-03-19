import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/assets/css/styles.css'

const app = createApp(App)
app.use(router)
app.mount('#app')

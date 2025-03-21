import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import ToastPlugin from 'vue-toast-notification'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/assets/css/styles.css'
import 'vue-toast-notification/dist/theme-bootstrap.css'

const app = createApp(App)
app.use(ToastPlugin)
app.use(router)
app.mount('#app')

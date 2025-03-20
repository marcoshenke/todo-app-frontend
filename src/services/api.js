import axios from 'axios'

const envApiUrl = () => {
  if (import.meta.env.VITE_MODE === 'development') {
    return 'http://localhost:8000'
  }
  return 'https://todo-app-x4hz.onrender.com'
}

const apiUrl = envApiUrl()
const api = axios.create({
  baseURL: `${apiUrl}/api`,
  withCredentials: true
})

axios.defaults.headers.common['Accept'] = 'application/json'

api.interceptors.request.use(
  async (config) => {
    if (!document.cookie.includes('XSRF-TOKEN')) {
      await axios.get(`${apiUrl}/sanctum/csrf-cookie`)
    }

    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Não autorizado. Redirecionando para login...')
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

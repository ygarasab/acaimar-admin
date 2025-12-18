import axios from 'axios'

fetch(__API_URL__)
console.log(__API_URL__)

const API_BASE_URL = __API_URL__ || 'https://acaimar-c7b2h7dpf6ahckc0.brazilsouth-01.azurewebsites.net/api'
const API_KEY = import.meta.env.VITE_API_KEY

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token and API key
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Add API_KEY as query parameter
    if (API_KEY) {
      config.params = {
        ...config.params,
        key: API_KEY
      }
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '../services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('auth_user') || 'null'))
  const token = ref(localStorage.getItem('auth_token') || null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function login(email, password) {
    loading.value = true
    error.value = null
    
    try {
      const data = await authService.login(email, password)
      token.value = data.token
      user.value = {
        _id: data._id,
        email: data.email,
        name: data.name,
        role: data.role
      }
      
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('auth_user', JSON.stringify(user.value))
      
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.error || 'Login failed'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  async function register(userData) {
    loading.value = true
    error.value = null
    
    try {
      const data = await authService.register(userData)
      token.value = data.token
      user.value = {
        _id: data._id,
        email: data.email,
        name: data.name,
        role: data.role
      }
      
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('auth_user', JSON.stringify(user.value))
      
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.error || 'Registration failed'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  async function verifyToken() {
    if (!token.value) {
      logout()
      return false
    }

    try {
      const data = await authService.verifyToken()
      if (data.valid) {
        return true
      }
    } catch (err) {
      console.error('Token verification failed:', err)
    }
    
    logout()
    return false
  }

  function logout() {
    token.value = null
    user.value = null
    error.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login,
    register,
    verifyToken,
    logout
  }
})

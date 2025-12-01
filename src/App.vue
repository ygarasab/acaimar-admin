<template>
  <div id="app">
    <Navbar v-if="isAuthenticated" />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from './stores/auth'
import Navbar from './components/Navbar.vue'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)

// Verify token on app load
authStore.verifyToken()
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f7fafc;
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.main-content :deep(.login-container) {
  margin: -2rem;
  padding: 0;
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
  
  .main-content :deep(.login-container) {
    margin: -1rem;
  }
}
</style>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-left">
        <router-link to="/" class="logo-container">
          <h1 class="logo-text">AÇAIMAR Admin</h1>
        </router-link>
        <div class="nav-links" v-if="isAdmin">
          <router-link to="/metas">Metas</router-link>
          <router-link to="/users">Usuários</router-link>
        </div>
      </div>
      <div class="nav-right">
        <span class="user-info">{{ user?.name || user?.email }}</span>
        <span class="user-role">{{ user?.role }}</span>
        <button @click="handleLogout" class="logout-btn">Sair</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const user = computed(() => authStore.user)
const isAdmin = computed(() => authStore.isAdmin)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo-container {
  text-decoration: none;
  color: inherit;
}

.logo-text {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Georgia', 'Times New Roman', serif;
  letter-spacing: 0.05em;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: opacity 0.2s;
  border-bottom: 2px solid transparent;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  opacity: 0.9;
  border-bottom-color: white;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  font-weight: 500;
}

.user-role {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  text-transform: uppercase;
  font-weight: 600;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .nav-left {
    gap: 1rem;
  }
  
  .logo-text {
    font-size: 1.25rem;
  }
  
  .nav-links {
    gap: 1rem;
    font-size: 0.875rem;
  }
  
  .user-info {
    display: none;
  }
}
</style>

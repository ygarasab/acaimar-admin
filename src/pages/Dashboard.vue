<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <p>Bem-vindo, {{ user?.name || user?.email }}!</p>
    </div>

    <div class="stats-grid">
      <StatCard
        icon="📊"
        :value="totalMetas"
        label="Total de Metas"
      />
      <StatCard
        icon="✅"
        :value="metasEmAndamento"
        label="Em Andamento"
      />
      <StatCard
        icon="⏳"
        :value="metasPendentes"
        label="Pendentes"
      />
      <StatCard
        icon="🎯"
        :value="metasConcluidas"
        label="Concluídas"
      />
    </div>

    <div class="quick-actions">
      <h2>Ações Rápidas</h2>
      <div class="actions-grid">
        <ActionCard
          v-if="isAdmin"
          icon="📝"
          title="Gerenciar Metas"
          description="Criar, editar e excluir metas do projeto"
          to="/metas"
        />
        <ActionCard
          v-if="isAdmin"
          icon="👥"
          title="Gerenciar Usuários"
          description="Criar e visualizar usuários do sistema"
          to="/users"
        />
        <ActionCard
          icon="📈"
          title="Visualizações"
          description="Ver gráficos e análises de dados"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { metasService } from '../services/metasService'
import StatCard from '../components/dashboard/StatCard.vue'
import ActionCard from '../components/dashboard/ActionCard.vue'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
const isAdmin = computed(() => authStore.isAdmin)

const metas = ref([])
const loading = ref(false)

const totalMetas = computed(() => metas.value.length)
const metasEmAndamento = computed(() => metas.value.filter(m => m.status === 'em-andamento').length)
const metasPendentes = computed(() => metas.value.filter(m => m.status === 'pendente').length)
const metasConcluidas = computed(() => metas.value.filter(m => m.status === 'concluido').length)

onMounted(async () => {
  loading.value = true
  try {
    metas.value = await metasService.getAll()
  } catch (error) {
    console.error('Error loading metas:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.dashboard {
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.dashboard-header p {
  color: #718096;
  font-size: 1.125rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.quick-actions {
  margin-top: 3rem;
}

.quick-actions h2 {
  font-size: 1.75rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .dashboard-header h1 {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>

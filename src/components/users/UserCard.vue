<template>
  <div class="user-card">
    <div class="user-header">
      <div class="user-info">
        <h3>{{ user.name }}</h3>
        <p class="user-email">{{ user.email }}</p>
      </div>
      <RoleBadge :role="user.role" />
    </div>
    <div class="user-details">
      <div class="detail-item">
        <span class="detail-label">Status:</span>
        <StatusBadge :active="user.active" />
      </div>
      <div class="detail-item" v-if="user.created_at">
        <span class="detail-label">Criado em:</span>
        <span>{{ formatDate(user.created_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import RoleBadge from './RoleBadge.vue'
import StatusBadge from './StatusBadge.vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.user-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.user-info h3 {
  font-size: 1.25rem;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.user-email {
  color: #718096;
  font-size: 0.875rem;
  margin: 0;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.detail-label {
  color: #718096;
  font-weight: 500;
}
</style>


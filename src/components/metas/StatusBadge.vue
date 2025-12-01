<template>
  <span :class="['status-badge', `status-${status}`]">
    {{ getStatusLabel(status) }}
  </span>
</template>

<script setup>
defineProps({
  status: {
    type: String,
    required: true
  }
})

const getStatusLabel = (status) => {
  const labels = {
    'pendente': 'Pendente',
    'em-andamento': 'Em Andamento',
    'concluido': 'Concluído'
  }
  return labels[status] || status
}
</script>

<style scoped>
.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-pendente {
  background: #fed7d7;
  color: #c53030;
}

.status-em-andamento {
  background: #feebc8;
  color: #c05621;
}

.status-concluido {
  background: #c6f6d5;
  color: #22543d;
}
</style>


<template>
  <div class="meta-card">
    <div class="meta-header">
      <h3>{{ meta.titulo }}</h3>
      <StatusBadge :status="meta.status" />
    </div>
    <p class="meta-description">{{ meta.descricao }}</p>
    <div class="meta-actions">
      <Button variant="secondary" @click="$emit('edit')">Editar</Button>
      <Button variant="danger" @click="$emit('delete')">Excluir</Button>
    </div>
  </div>
</template>

<script setup>
import Button from '../common/Button.vue'
import StatusBadge from './StatusBadge.vue'

defineProps({
  meta: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])
</script>

<style scoped>
.meta-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.meta-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.meta-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.meta-header h3 {
  font-size: 1.25rem;
  color: #2d3748;
  margin: 0;
}

.meta-description {
  color: #4a5568;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.meta-actions {
  display: flex;
  gap: 0.75rem;
}
</style>


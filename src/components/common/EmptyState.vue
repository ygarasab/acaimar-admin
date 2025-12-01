<template>
  <div class="empty-state">
    <div class="empty-icon">{{ icon }}</div>
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
    <slot name="action"></slot>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: '📭'
  },
  title: {
    type: String,
    default: 'Nada encontrado'
  },
  message: {
    type: String,
    default: 'Não há itens para exibir.'
  }
})
</script>

<style scoped>
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #718096;
  background: white;
  border-radius: 12px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.25rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.empty-state p {
  margin: 0 0 1.5rem;
  color: #718096;
}
</style>


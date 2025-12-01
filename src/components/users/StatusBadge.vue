<template>
  <span :class="['status-badge', active ? 'status-active' : 'status-inactive']">
    {{ active ? 'Ativo' : 'Inativo' }}
  </span>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-active {
  background: #c6f6d5;
  color: #22543d;
}

.status-inactive {
  background: #fed7d7;
  color: #c53030;
}
</style>


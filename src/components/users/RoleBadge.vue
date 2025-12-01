<template>
  <span :class="['role-badge', `role-${role}`]">
    {{ role === 'admin' ? 'Admin' : 'Usuário' }}
  </span>
</template>

<script setup>
defineProps({
  role: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
}

.role-admin {
  background: #fed7d7;
  color: #c53030;
}

.role-user {
  background: #c6f6d5;
  color: #22543d;
}
</style>


<template>
  <div v-if="message" class="error-message">
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: null
  }
})
</script>

<style scoped>
.error-message {
  background: #fed7d7;
  color: #c53030;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  border-left: 4px solid #c53030;
}
</style>


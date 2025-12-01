<template>
  <div class="page-header">
    <h1>{{ title }}</h1>
    <slot name="actions">
      <button v-if="showAction" @click="$emit('action')" class="btn-primary">
        {{ actionLabel }}
      </button>
    </slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  showAction: {
    type: Boolean,
    default: false
  },
  actionLabel: {
    type: String,
    default: '+ Novo'
  }
})

defineEmits(['action'])
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  color: #2d3748;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>


<template>
  <button
    :type="type"
    :class="['btn', `btn-${variant}`, { 'btn-disabled': disabled }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'cancel'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  }
})

defineEmits(['click'])
</script>

<style scoped>
.btn {
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
  font-size: 1rem;
}

.btn:hover:not(.btn-disabled) {
  transform: translateY(-2px);
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-secondary {
  background: #667eea;
  color: white;
}

.btn-danger {
  background: #e53e3e;
  color: white;
}

.btn-cancel {
  background: #e2e8f0;
  color: #2d3748;
}
</style>


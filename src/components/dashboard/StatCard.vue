<template>
  <div class="stat-card">
    <div class="stat-icon">{{ icon }}</div>
    <div class="stat-content">
      <h3>{{ value }}</h3>
      <p>{{ label }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 3rem;
  line-height: 1;
}

.stat-content h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.stat-content p {
  color: #718096;
  font-size: 0.875rem;
  margin: 0;
}
</style>


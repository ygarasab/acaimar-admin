<template>
  <form @submit.prevent="$emit('submit', formData)">
    <div class="form-group">
      <label>Título</label>
      <input v-model="formData.titulo" required />
    </div>
    <div class="form-group">
      <label>Descrição</label>
      <textarea v-model="formData.descricao" required rows="4"></textarea>
    </div>
    <div class="form-group">
      <label>Status</label>
      <select v-model="formData.status" required>
        <option value="pendente">Pendente</option>
        <option value="em-andamento">Em Andamento</option>
        <option value="concluido">Concluído</option>
      </select>
    </div>
    <div class="modal-actions">
      <Button variant="cancel" @click="$emit('cancel')">Cancelar</Button>
      <Button type="submit" :disabled="saving">
        {{ saving ? 'Salvando...' : 'Salvar' }}
      </Button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import Button from '../common/Button.vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      titulo: '',
      descricao: '',
      status: 'pendente'
    })
  },
  saving: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const formData = ref({ ...props.initialData })

watch(() => props.initialData, (newData) => {
  formData.value = { ...newData }
}, { deep: true })
</script>

<style scoped>
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2d3748;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
</style>


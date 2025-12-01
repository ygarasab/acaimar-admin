<template>
  <form @submit.prevent="$emit('submit', formData)">
    <div class="form-group">
      <label>Nome</label>
      <input v-model="formData.name" required />
    </div>
    <div class="form-group">
      <label>Email</label>
      <input v-model="formData.email" type="email" required />
    </div>
    <div class="form-group">
      <label>Senha</label>
      <input v-model="formData.password" type="password" required minlength="8" />
      <small>Mínimo de 8 caracteres</small>
    </div>
    <div class="form-group">
      <label>Função</label>
      <select v-model="formData.role" required>
        <option value="user">Usuário</option>
        <option value="admin">Administrador</option>
      </select>
    </div>
    <ErrorMessage v-if="error" :message="error" />
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
import ErrorMessage from '../common/ErrorMessage.vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      name: '',
      email: '',
      password: '',
      role: 'user'
    })
  },
  saving: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
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
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
}

.form-group small {
  display: block;
  margin-top: 0.25rem;
  color: #718096;
  font-size: 0.875rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
</style>


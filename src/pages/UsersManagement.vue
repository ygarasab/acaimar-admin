<template>
  <div class="users-management">
    <PageHeader
      title="Gerenciar Usuários"
      :show-action="true"
      action-label="+ Novo Usuário"
      @action="showCreateModal = true"
    />

    <LoadingSpinner v-if="loading" />
    
    <ErrorMessage v-else-if="error && !showCreateModal" :message="error" />
    
    <EmptyState
      v-else-if="!loading && users.length === 0 && !error"
      icon="👥"
      title="Nenhum usuário encontrado"
      message="Não há usuários cadastrados no sistema."
    >
      <template #action>
        <Button @click="showCreateModal = true">Criar Primeiro Usuário</Button>
      </template>
    </EmptyState>
    
    <div v-else-if="!loading && users.length > 0" class="users-list">
      <UserCard
        v-for="user in users"
        :key="user._id"
        :user="user"
      />
    </div>

    <Modal
      v-model:show="showCreateModal"
      title="Novo Usuário"
      @close="closeModal"
    >
      <UserForm
        :saving="saving"
        :error="error"
        @submit="createUser"
        @cancel="closeModal"
      />
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usersService } from '../services/usersService'
import PageHeader from '../components/common/PageHeader.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import ErrorMessage from '../components/common/ErrorMessage.vue'
import EmptyState from '../components/common/EmptyState.vue'
import Button from '../components/common/Button.vue'
import Modal from '../components/common/Modal.vue'
import UserCard from '../components/users/UserCard.vue'
import UserForm from '../components/users/UserForm.vue'

const users = ref([])
const loading = ref(false)
const saving = ref(false)
const showCreateModal = ref(false)
const error = ref(null)

const loadUsers = async () => {
  loading.value = true
  error.value = null
  try {
    users.value = await usersService.getAll()
  } catch (err) {
    console.error('Error loading users:', err)
    const errorMsg = err.response?.data?.error || err.message || 'Erro ao carregar usuários'
    if (err.response?.status === 403) {
      error.value = 'Acesso negado: você precisa ser administrador para ver usuários'
    } else if (err.response?.status === 401) {
      error.value = 'Sessão expirada. Por favor, faça login novamente.'
    } else {
      error.value = errorMsg
    }
  } finally {
    loading.value = false
  }
}

const createUser = async (formData) => {
  saving.value = true
  error.value = null
  
  try {
    await usersService.create(formData)
    closeModal()
    await loadUsers()
  } catch (err) {
    console.error('Error creating user:', err)
    const errorMsg = err.response?.data?.error || err.message || 'Erro ao criar usuário'
    if (err.response?.status === 403) {
      error.value = 'Acesso negado: você precisa ser administrador para criar usuários'
    } else if (err.response?.status === 401) {
      error.value = 'Sessão expirada. Por favor, faça login novamente.'
    } else {
      error.value = errorMsg
    }
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
  error.value = null
}

onMounted(() => {
  loadUsers()
})
</script>

<style scoped>
.users-management {
  max-width: 1200px;
  margin: 0 auto;
}

.users-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .users-list {
    grid-template-columns: 1fr;
  }
}
</style>

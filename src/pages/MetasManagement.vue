<template>
  <div class="metas-management">
    <PageHeader
      title="Gerenciar Metas"
      :show-action="true"
      action-label="+ Nova Meta"
      @action="showCreateModal = true"
    />

    <LoadingSpinner v-if="loading" />
    
    <EmptyState
      v-else-if="!loading && metas.length === 0"
      icon="📝"
      title="Nenhuma meta encontrada"
      message="Não há metas cadastradas no sistema."
    >
      <template #action>
        <Button @click="showCreateModal = true">Criar Primeira Meta</Button>
      </template>
    </EmptyState>
    
    <div v-else class="metas-list">
      <MetaCard
        v-for="meta in metas"
        :key="meta._id"
        :meta="meta"
        @edit="editMeta(meta)"
        @delete="deleteMeta(meta._id)"
      />
    </div>

    <Modal
      v-model:show="showModal"
      :title="editingMeta ? 'Editar Meta' : 'Nova Meta'"
      @close="closeModal"
    >
      <MetaForm
        :initial-data="formData"
        :saving="saving"
        @submit="saveMeta"
        @cancel="closeModal"
      />
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { metasService } from '../services/metasService'
import PageHeader from '../components/common/PageHeader.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import EmptyState from '../components/common/EmptyState.vue'
import Button from '../components/common/Button.vue'
import Modal from '../components/common/Modal.vue'
import MetaCard from '../components/metas/MetaCard.vue'
import MetaForm from '../components/metas/MetaForm.vue'

const metas = ref([])
const loading = ref(false)
const saving = ref(false)
const showCreateModal = ref(false)
const editingMeta = ref(null)

const showModal = computed({
  get: () => showCreateModal.value || !!editingMeta.value,
  set: (value) => {
    if (!value) {
      showCreateModal.value = false
      editingMeta.value = null
    }
  }
})

const formData = ref({
  titulo: '',
  descricao: '',
  status: 'pendente'
})

const loadMetas = async () => {
  loading.value = true
  try {
    metas.value = await metasService.getAll()
  } catch (error) {
    console.error('Error loading metas:', error)
    alert('Erro ao carregar metas')
  } finally {
    loading.value = false
  }
}

const editMeta = (meta) => {
  editingMeta.value = meta
  formData.value = {
    titulo: meta.titulo,
    descricao: meta.descricao,
    status: meta.status
  }
  showCreateModal.value = true
}

const deleteMeta = async (id) => {
  if (!confirm('Tem certeza que deseja excluir esta meta?')) {
    return
  }
  
  try {
    await metasService.delete(id)
    await loadMetas()
  } catch (error) {
    console.error('Error deleting meta:', error)
    alert('Erro ao excluir meta')
  }
}

const saveMeta = async (data) => {
  saving.value = true
  try {
    if (editingMeta.value) {
      await metasService.update(editingMeta.value._id, data)
    } else {
      await metasService.create(data)
    }
    closeModal()
    await loadMetas()
  } catch (error) {
    console.error('Error saving meta:', error)
    alert('Erro ao salvar meta')
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
  editingMeta.value = null
  formData.value = {
    titulo: '',
    descricao: '',
    status: 'pendente'
  }
}

onMounted(() => {
  loadMetas()
})
</script>

<style scoped>
.metas-management {
  max-width: 1200px;
  margin: 0 auto;
}

.metas-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>

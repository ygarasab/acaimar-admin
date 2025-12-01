import api from './api'

export const metasService = {
  async getAll() {
    const response = await api.get('/metas')
    return response.data
  },

  async getById(id) {
    const response = await api.get(`/metas/${id}`)
    return response.data
  },

  async create(meta) {
    const response = await api.post('/metas', meta)
    return response.data
  },

  async update(id, meta) {
    const response = await api.put(`/metas/${id}`, meta)
    return response.data
  },

  async delete(id) {
    const response = await api.delete(`/metas/${id}`)
    return response.data
  }
}

import api from './api'

const create = async (data) => {
  const response = await api.post('/tasks', data)
  return response.data
}

const list = async (params) => {
  const response = await api.get('/tasks', { params })

  return response.data.data
}

const update = async (taskId, data) => {
  const response = await api.put(`/tasks/${taskId}`, data)
  return response.data
}

const destroy = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`)
  return response.data
}

export default {
  create,
  list,
  update,
  destroy
}

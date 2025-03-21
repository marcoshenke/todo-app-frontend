import api from './api'

const createUser = async (userData) => {
  const response = await api.post('/register', userData)
  return response.data
}

const login = async (userData) => {
  const response = await api.post('/login', userData)
  return response.data
}

const findAutenticatedUser = async () => {
  const response = await api.get('/authenticated-user')
  return response.data
}

const logout = async () => {
  const response = await api.post('/logout')
  return response.data
}

const validateToken = async () => {
  const response = await api.get('/validate-token')
  return response.status === 200
}

export default {
  createUser,
  findAutenticatedUser,
  login,
  logout,
  validateToken
}

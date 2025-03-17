<script setup>
import { ref, onMounted } from 'vue'

import { TaskBoard } from '@/components'
import service from '@/services'

const name = ref('')

const fetchUser = async () => {
  try {
    const response = await service.users.findAutenticatedUser()
    name.value = response.user.name
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
  }
}

onMounted(() => {
  fetchUser()
})
</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div
      class="d-flex flex-column justify-content-center align-items-center mb-5"
    >
      <h2>Bem vindo, {{ name.toLocaleUpperCase() }}</h2>
      <h3>Não deixe para amanhã o que pode fazer hoje!</h3>
    </div>
  </div>
  <TaskBoard />
</template>

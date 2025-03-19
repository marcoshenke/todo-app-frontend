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
  <div class="d-flex flex-column align-items-center p-3">
    <div
      class="d-flex flex-column justify-content-center align-items-center mt-4 mb-4 sriracha-font text-center"
    >
      <h2>
        Bem vindo,
        <span class="text-color-gold">{{ name.toLocaleUpperCase() }}</span>
      </h2>
      <h3>Não deixe para amanhã o que pode fazer hoje!</h3>
    </div>
    <TaskBoard />
  </div>
</template>

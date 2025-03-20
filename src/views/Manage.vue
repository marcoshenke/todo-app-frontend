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
    console.error('Error when searching for user:', error)
  }
}

onMounted(() => {
  fetchUser()
})
</script>

<template>
  <div class="d-flex flex-column align-items-center p-3 min-vh-100">
    <div
      class="d-flex flex-column justify-content-center align-items-center mt-4 mb-4 sriracha-font text-center"
    >
      <h2>
        Welcome,
        <span class="text-color-gold">{{ name.toLocaleUpperCase() }}!</span>
      </h2>
      <h3>It always seems impossible until it’s done."</h3>
      <h4>– Nelson Mandela</h4>
    </div>
    <TaskBoard />
  </div>
</template>

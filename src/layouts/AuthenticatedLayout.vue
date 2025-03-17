<script setup>
import service from '@/services'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = async () => {
  try {
    await service.users.logout()
    localStorage.removeItem('auth_token')
    router.push('/login')
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
  }
}
</script>
<template>
  <nav class="navbar sticky-top bg-body-tertiary">
    <div class="container-fluid d-flex">
      <a class="navbar-brand" href="#">TodoApp</a>
    </div>
    <button class="btn btn-dark" @click="logout">Sair</button>
  </nav>
  <router-view />
</template>

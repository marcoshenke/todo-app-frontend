<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import service from '@/services'

const email = ref('')
const password = ref('')
const router = useRouter()

const loginUser = async () => {
  const response = await service.users.login({
    email: email.value,
    password: password.value
  })

  localStorage.setItem('auth_token', response.token)

  router.push('/auth/manage')

  try {
  } catch (error) {
    console.error('Erro ao registrar usuário:', error)
  }
}
</script>

<template>
  <h1>TodolistApp - Resolva suas tarefas</h1>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <h2>Faça o Login</h2>
    <form @submit.prevent="loginUser">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email</label>
        <input type="email" class="form-control" v-model="email" />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Senha</label>
        <input type="password" class="form-control" v-model="password" />
      </div>
      <div class="d-flex flex-column gap-2">
        <button type="submit" class="btn btn-primary">Entrar</button>
        <router-link to="/" class="btn btn-secondary">
          Criar conta
        </router-link>
      </div>
    </form>
  </div>
</template>

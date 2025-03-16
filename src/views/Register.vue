<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import service from '@/services' // Confirme que o nome do arquivo é correto

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const registerUser = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie')

    const response = await service.user.createUser({
      name: name.value,
      email: email.value,
      password: password.value
    })
    localStorage.setItem('auth_token', response.token)

    router.push('/task-board')
  } catch (error) {
    console.error('Erro ao registrar usuário:', error)

    if (error.response?.errors) {
      const errors = Object.values(error.response.errors).flat()
      alert(errors.join('\n'))
    } else {
      alert('An error occurred while registering')
    }
  }
}
</script>

<template>
  <h1>TodolistApp - Resolva suas tarefas</h1>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <h2>Registre-se</h2>
    <form @submit.prevent="registerUser">
      <div class="mb-3">
        <label for="name" class="form-label">Nome</label>
        <input type="text" class="form-control" v-model="name" />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" v-model="email" />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Senha</label>
        <input type="password" class="form-control" v-model="password" />
      </div>
      <div class="d-flex flex-column gap-2">
        <button type="submit" class="btn btn-primary mh-50">Cadastrar</button>
        <router-link to="/login" class="btn btn-secondary">
          Já tenho uma conta
        </router-link>
      </div>
    </form>
  </div>
</template>

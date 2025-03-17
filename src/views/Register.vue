<script setup>
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import service from '@/services'

const router = useRouter()

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup
    .string()
    .email('Formato de email inválido')
    .required('Email é obrigatório'),
  password: yup
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .required('Senha é obrigatória')
})

const { handleSubmit, errors } = useForm({
  validationSchema: schema
})

const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: password } = useField('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await service.users.createUser(values)
    localStorage.setItem('auth_token', response.token)
    router.push('/auth/manage')
  } catch (error) {
    console.error('Erro ao registrar usuário:', error)
  }
})
</script>

<template>
  <h1>TodolistApp - Resolva suas tarefas</h1>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <h2>Registre-se</h2>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="name" class="form-label">Nome</label>
        <input type="text" class="form-control" v-model="name" />
        <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" v-model="email" />
        <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Senha</label>
        <input type="password" class="form-control" v-model="password" />
        <span v-if="errors.password" class="text-danger">{{
          errors.password
        }}</span>
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

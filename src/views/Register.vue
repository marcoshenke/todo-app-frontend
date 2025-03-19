<script setup>
import { useRouter } from 'vue-router'
import { useForm, useField, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

import { TodoSlogan } from '@/components'
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

const { handleSubmit } = useForm({
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
  <TodoSlogan>
    <div class="d-flex flex-column justify-content-center align-items-center">
      <form @submit.prevent="onSubmit">
        <h2 class="text-center">Registre-se</h2>
        <div class="mb-3">
          <label for="name" class="form-label">Nome</label>
          <Field name="name" type="text" v-model="name" class="form-control" />
          <ErrorMessage name="name" class="text-danger" />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field
            name="email"
            type="email"
            v-model="email"
            class="form-control"
          />
          <ErrorMessage name="email" class="text-danger" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Senha</label>
          <Field
            name="password"
            type="password"
            v-model="password"
            class="form-control"
          />
          <ErrorMessage name="password" class="text-danger" />
        </div>
        <div class="d-flex flex-column gap-2">
          <button type="submit" class="btn btn-primary mh-50">Cadastrar</button>
          <router-link to="/login" class="btn btn-secondary">
            Já tenho uma conta
          </router-link>
        </div>
      </form>
    </div>
  </TodoSlogan>
</template>

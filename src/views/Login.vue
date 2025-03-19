<script setup>
import { useRouter } from 'vue-router'
import { useForm, useField, ErrorMessage, Field } from 'vee-validate'
import * as yup from 'yup'

import { TodoSlogan } from '@/components'
import service from '@/services'

const router = useRouter()

const schema = yup.object({
  email: yup
    .string()
    .email('Formato de email inválido')
    .required('Email é obrigatório'),
  password: yup
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .required('Senha é obrigatória')
})

const { value: email } = useField('email')
const { value: password } = useField('password')

const { handleSubmit } = useForm({
  validationSchema: schema
})

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await service.users.login({
      email: values.email,
      password: values.password
    })

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
        <h2 class="mb-3 text-center">Login</h2>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email</label>
          <Field
            name="email"
            type="text"
            v-model="email"
            class="form-control"
          />
          <ErrorMessage name="email" class="text-danger" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Senha</label>
          <Field
            name="password"
            type="password"
            v-model="password"
            class="form-control"
          />
          <ErrorMessage name="password" class="text-danger" />
        </div>
        <div class="d-flex flex-column gap-2">
          <button type="submit" class="btn btn-primary">Entrar</button>
          <router-link to="/" class="btn btn-secondary">
            Criar conta
          </router-link>
        </div>
      </form>
    </div>
  </TodoSlogan>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useField, ErrorMessage, Field } from 'vee-validate'
import * as yup from 'yup'

import { LoadingCircle, TodoSlogan } from '@/components'
import service from '@/services'
import { toastBar } from '@/helpers'

const isLoading = ref(false)

const router = useRouter()

const schema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('E-mail is mandatory'),
  password: yup.string().required('Password is mandatory')
})

const { value: email } = useField('email')
const { value: password } = useField('password')

const { handleSubmit } = useForm({
  validationSchema: schema
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    const response = await service.users.login({
      email: values.email,
      password: values.password
    })
    localStorage.setItem('auth_token', response.token)

    router.push('/auth/manage')
  } catch (error) {
    console.error('An unexpected error occurred while logging in:', error)
    toastBar({
      message: 'An unexpected error occurred while logging in',
      type: 'error'
    })
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <TodoSlogan>
    <div
      class="d-flex flex-column justify-content-center align-items-center mx-5"
    >
      <LoadingCircle :isLoading="isLoading" />
      <form @submit.prevent="onSubmit">
        <h2 class="mb-3 text-center">Login</h2>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">E-mail</label>
          <Field
            name="email"
            type="text"
            v-model="email"
            class="form-control"
          />
          <ErrorMessage name="email" class="text-danger" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <Field
            name="password"
            type="password"
            v-model="password"
            class="form-control"
          />
          <ErrorMessage name="password" class="text-danger" />
        </div>
        <div class="d-flex flex-column gap-2">
          <button type="submit" class="btn button_primary">Sign In</button>
          <router-link to="/" class="btn button_secondary">
            Create account
          </router-link>
        </div>
      </form>
    </div>
  </TodoSlogan>
</template>

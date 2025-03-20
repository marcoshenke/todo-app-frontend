<script setup>
import { useRouter } from 'vue-router'
import { useForm, useField, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

import { TodoSlogan } from '@/components'
import service from '@/services'

const router = useRouter()

const schema = yup.object({
  name: yup.string().required('Name is mandatory'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('E-mail is mandatory'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is mandatory')
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
    console.error('Error registering user:', error)
  }
})
</script>

<template>
  <TodoSlogan>
    <div
      class="d-flex flex-column justify-content-center align-items-center m-4"
    >
      <form @submit.prevent="onSubmit">
        <h2 class="text-center">Create Account</h2>
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <Field name="name" type="text" v-model="name" class="form-control" />
          <ErrorMessage name="name" class="text-danger" />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">E-mail</label>
          <Field
            name="email"
            type="email"
            v-model="email"
            class="form-control"
          />
          <ErrorMessage name="email" class="text-danger" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <Field
            name="password"
            type="password"
            v-model="password"
            class="form-control"
          />
          <ErrorMessage name="password" class="text-danger" />
        </div>
        <div class="d-flex flex-column gap-2">
          <button type="submit" class="btn button_primary mh-50">
            Register
          </button>
          <router-link to="/login" class="btn button_secondary">
            I already have an account
          </router-link>
        </div>
      </form>
    </div>
  </TodoSlogan>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import service from '@/services'
import { LoadingCircle } from '@/components'

const isLoading = ref(false)

const router = useRouter()

const logout = async () => {
  try {
    isLoading.value = true
    await service.users.logout()
    localStorage.removeItem('auth_token')
    router.push('/login')
  } catch (error) {
    console.error('Error logging out::', error)
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <LoadingCircle :is-loading="isLoading" />
  <nav class="navbar sticky-top p-2 bg_purple_background">
    <div class="d-flex align-items-center">
      <img
        src="@/assets/logo-app-todo.png"
        alt="Logo TodoApp"
        width="60"
        height="60"
        class="d-inline-block align-text-top"
      />
      <div class="d-flex justify-content-beetween">
        <a class="navbar-brand alfa-font font-style-24 text-color-gold" href="#"
          >TodoApp</a
        >
      </div>
    </div>
    <button class="btn btn-dark fw-bold" @click="logout">Logout</button>
  </nav>
  <router-view />
  <nav
    class="navbar sticky-top p-2 bg_purple_background justify-content-center alfa-font"
  >
    Made by &nbsp;<a
      class="text-decoration-none can-click text-color-gold"
      href="https://www.linkedin.com/in/marcos-e-s-henke/"
      >Marcos</a
    >
  </nav>
</template>

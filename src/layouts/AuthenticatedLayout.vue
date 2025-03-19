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
    <button class="btn btn-dark min-vw-100px fw-bold" @click="logout">
      Sair
    </button>
  </nav>
  <router-view />
  <nav
    class="navbar sticky-top p-2 bg_purple_background justify-content-center alfa-font"
  >
    Feito por &nbsp;<a
      class="text-decoration-none can-click text-color-gold"
      href="https://www.linkedin.com/in/marcos-e-s-henke/"
      >Marcos</a
    >
  </nav>
</template>

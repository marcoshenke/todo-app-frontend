import { createRouter, createWebHistory } from 'vue-router'

import { Login, Manage, Register } from '@/views'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'

import users from '@/services/users'
import { toastBar } from '@/helpers'

const routes = [
  {
    path: '/auth',
    component: AuthenticatedLayout,
    children: [
      {
        path: 'manage',
        name: 'manage',
        component: Manage,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/',
    name: 'home',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const toastErrorAuthentication = () => {
  toastBar({
    message: 'An error occurred with your authentication.',
    type: 'error'
  })
}

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('auth_token')
  const isAuthenticated = !!token

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      console.log('User is not authenticated')
      toastErrorAuthentication()
      return next('/login')
    }

    try {
      const isValidToken = await users.validateToken()
      console.log('isValidToken', isValidToken)
      if (!isValidToken) {
        localStorage.removeItem('auth_token')
        toastErrorAuthentication()
        return next('/login')
      }
    } catch (error) {
      console.error(error)
      localStorage.removeItem('auth_token')
      toastErrorAuthentication()
      return next('/login')
    }
  }

  next()
})

export default router

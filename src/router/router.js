import { createRouter, createWebHistory } from 'vue-router'

import { Login, Manage, Register } from '@/views'

import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import users from '@/services/users'

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

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('auth_token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  next()
})

//   router.beforeEach(async (to, from, next) => {
//     const token = localStorage.getItem('auth_token')
//     const isAuthenticated = !!token

//     if (to.meta.requiresAuth) {
//       if (!isAuthenticated) {
//         return next('/login')
//       }

//       try {
//         const isValidToken = await users.validateToken()
//         if (!isValidToken) {
//           console.error('Invalid token')
//           localStorage.removeItem('auth_token')
//           return next('/login')
//         }
//       } catch (error) {
//         console.error('Error validating token::', error)
//         localStorage.removeItem('auth_token')
//         return next('/login')
//       }
//     }

//     next()
//   })

export default router

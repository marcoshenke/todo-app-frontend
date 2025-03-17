import { createRouter, createWebHistory } from "vue-router";

import {Login, Manage, Register} from "@/views";

import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue";

const routes = [
    {
      path: "/auth",
      component: AuthenticatedLayout, // Layout como componente pai
      children: [
        {
            path: "manage",
            name: 'manage',
            component: Manage,
            meta: { requiresAuth: true}
        },
      ]   
    },
    {
        path: "/",
        name: 'home',
        component: Register,       
    },
    {
        path: "/login",
        name: 'login',
        component: Login,
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('auth_token');

    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  });


  export default router;

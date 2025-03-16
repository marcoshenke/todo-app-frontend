import { createRouter, createWebHistory } from "vue-router";

import Register from "@/views/Register.vue";
import TaskBoard from "@/views/TaskBoard.vue";
import Login from "@/views/Login.vue";

const routes = [
    {
        path: "/",
        component: Register,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/task-board",
        component: TaskBoard,
        meta: { requiresAuth: true }
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

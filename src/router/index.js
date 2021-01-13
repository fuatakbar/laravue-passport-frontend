// importing vue router
import { createRouter, createWebHistory } from 'vue-router'

// define routes
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/Register.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Index.vue')
    }
]

// create router
const router = createRouter({
    history: createWebHistory(),
    routes // routes config
})

export default router
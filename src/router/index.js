import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Layout',
        component: () => import('@/container/pages/Layout.vue'),
        children: [
            {
                path: '/',
                name: 'Dashboard',
                component: () => import('@/container/pages/Dashboard.vue')
            },
            {
                path: '/vendor',
                name: 'Vendor',
                component: () => import('@/container/pages/Vendor.vue')
            },
            {
                path: '/staff',
                name: 'Staff',
                component: () => import('@/container/pages/Staff.vue')
            },
            {
                path: '/transactions',
                name: 'TransactionsHistory',
                component: () => import('@/container/pages/TransactionsHistory.vue')
            },
            {
                path: '/order',
                name: 'PlaceOrder',
                component: () => import('@/container/pages/PlaceOrder.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/container/auth/Login.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/container/pages/404Page.vue')
    },
    {
        path: '/forgotPassword',
        name: 'ForgotPassword',
        component: () => import('@/container/auth/ForgotPassword.vue')
    },
    {
        path: '/changePassword',
        name: 'ChangePassword',
        component: () => import('@/container/auth/ChangePassword.vue')
    },
    {
        path: '/profile',
        name: 'ProfilePage',
        component: () => import('@/container/auth/Profile.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
export default router
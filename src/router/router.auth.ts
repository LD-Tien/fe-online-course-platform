import type { RouteRecordRaw } from 'vue-router'

const authRouter: Array<RouteRecordRaw> = [
    {
        path: '/auth',
        children: [
            {
                path: 'login',
                name: 'login',
                meta: {
                    // middleware: [checkLogin]
                },
                component: () => import('@/views/auth/LoginView.vue')
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/views/auth/RegisterView.vue')
            }
        ]
    }
]

export default authRouter

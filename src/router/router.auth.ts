import type { RouteRecordRaw } from 'vue-router'
import { CheckUserJustRegistered } from '@/middlewares/CheckUserJustRegistered'

const authRouter: Array<RouteRecordRaw> = [
    {
        path: '/auth',
        children: [
            {
                path: 'login',
                name: 'login',
                // meta: {
                //     // middleware: [checkLogin]
                // },
                component: () => import('@/views/auth/LoginView.vue')
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/views/auth/RegisterView.vue')
            },
            {
                path: 'register-instructor',
                name: 'register-instructor',
                component: () => import('@/views/auth/RegisterInstructorView.vue')
            },
            {
                path: 'verify-email-notification',
                name: 'verify-email-notification',
                beforeEnter: CheckUserJustRegistered,
                component: () => import('@/views/auth/VerifyEmailNotificationView.vue')
            },
            {
                path: 'verify-email-result/:result',
                name: 'verify-email-result',

                component: () => import('@/views/auth/VerifyEmailResult.vue')
            },
            {
                path: 'forgot-password',
                name: 'forgot-password',
                component: () => import('@/views/auth/ForgotPasswordView.vue')
            },
            {
                path: 'reset-password',
                name: 'reset-password',
                component: () => import('@/views/auth/ResetPasswordView.vue')
            }
        ]
    }
]

export default authRouter

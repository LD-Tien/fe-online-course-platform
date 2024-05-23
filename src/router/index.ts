import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue'
import ResetPasswordView from '@/views/auth/ResetPasswordView.vue'
import VerifyEmailNotificationView from '@/views/auth/VerifyEmailNotificationView.vue'
import RegisterInstructorView from '@/views/auth/RegisterInstructorView.vue'
import CourseOverviewView from '@/views/CourseOverviewView.vue'
import CourseLesson from '@/views/CourseLesson.vue'
import authRouter from '@/router/router.auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...authRouter,
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/register-instructor',
            name: 'register-instructor',
            component: RegisterInstructorView
        },
        {
            path: '/verify-email-notification',
            name: 'verify-email',
            component: VerifyEmailNotificationView
        },
        {
            path: '/forgot-password',
            name: 'forgot-password',
            component: ForgotPasswordView
        },
        {
            path: '/reset-password',
            name: 'reset-password',
            component: ResetPasswordView
        },
        {
            path: '/courses/:id',
            name: 'courses',
            children: [
                {
                    path: 'overview',
                    component: CourseOverviewView
                },
                {
                    path: 'learn/lesson/:id',
                    component: CourseLesson
                }
            ]
        }
    ]
})

export default router

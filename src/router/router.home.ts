import type { RouteRecordRaw } from 'vue-router'

const authRouter: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/components/templates/AppLayout.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/HomeView.vue')
            },
            {
                path: 'search',
                name: 'search',
                component: () => import('@/views/CourseOverviewView.vue')
            },
            {
                path: 'courses/:courseId/overview',
                name: 'course-detail',
                component: () => import('@/views/CourseOverviewView.vue')
            }
        ]
    }
]

export default authRouter

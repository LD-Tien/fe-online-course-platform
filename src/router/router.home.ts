import type { RouteRecordRaw } from 'vue-router'

const authRouter: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/components/templates/AppLayout.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/common/HomeView.vue')
            },
            {
                path: 'search/:keyword',
                name: 'search-course',
                component: () => import('@/views/common/SearchView.vue')
            },
            {
                path: 'courses/:courseId/overview',
                name: 'course-detail',
                component: () => import('@/views/common/CourseOverviewView.vue')
            }
        ]
    }
]

export default authRouter

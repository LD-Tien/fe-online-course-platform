import type { RouteRecordRaw } from 'vue-router'

const learnRouter: Array<RouteRecordRaw> = [
    {
        path: '/learn/:courseId',
        name: 'learn-course',
        component: () => import('@/views/learn/CourseLesson.vue')
    }
]

export default learnRouter

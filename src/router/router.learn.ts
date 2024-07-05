import type { RouteRecordRaw } from 'vue-router'

const learnRouter: Array<RouteRecordRaw> = [
    {
        path: '/learn/:courseId',
        name: 'learn-course',
        component: () => import('@/views/learn/CourseLesson.vue')
    },
    {
        path: '/learn/my-course',
        name: 'learn-my-course',
        component: () => import('@/views/learn/MyCourse.vue')
    }
]

export default learnRouter

import type { RouteRecordRaw } from 'vue-router'

const instructorRouter: Array<RouteRecordRaw> = [
    {
        path: '/moderator',
        component: () => import('@/components/templates/ModeratorLayout.vue'),
        children: [
            {
                path: '',
                name: 'moderation-dashboard',
                component: () => import('@/views/admin/DashboardView.vue')
            },
            {
                path: 'moderation-course',
                name: 'moderation-course',
                component: () => import('@/views/moderator/ModerationCourse.vue')
            },
            {
                path: 'moderation-course/:courseId',
                name: 'moderation-course-detail',
                component: () => import('@/components/templates/ModeratorSubLayout.vue'),
                children: [
                    {
                        path: ':moduleId/:lessonId/:currentTime?',
                        name: 'moderation-lesson',
                        component: () => import('@/views/moderator/ModerationCourseDetail.vue')
                    }
                ]
            }
        ]
    }
]

export default instructorRouter

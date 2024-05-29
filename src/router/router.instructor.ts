import type { RouteRecordRaw } from 'vue-router'

const instructorRouter: Array<RouteRecordRaw> = [
    {
        path: '/instructor',
        component: () => import('@/components/templates/InstructorLayout.vue'),
        children: [
            {
                path: '',
                name: 'instructor-dashboard',
                component: () => import('@/views/admin/DashboardView.vue')
            },
            {
                path: 'course',
                name: 'instructor-course',
                component: () => import('@/views/instructor/CourseView.vue')
            },
            {
                path: 'course/course-editor/:courseId',
                name: 'instructor-course-editor',
                component: () => import('@/views/instructor/CourseEditorView.vue')
            }
        ]
    }
]

export default instructorRouter

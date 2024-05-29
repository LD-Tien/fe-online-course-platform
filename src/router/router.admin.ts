import type { RouteRecordRaw } from 'vue-router'

const authRouter: Array<RouteRecordRaw> = [
    {
        path: '/admin',
        component: () => import('@/components/templates/AdminLayout.vue'),
        children: [
            {
                path: '',
                name: 'admin-dashboard',
                component: () => import('@/views/admin/DashboardView.vue')
            },
            {
                path: 'category',
                name: 'admin-category',
                component: () => import('@/views/admin/CategoryView.vue')
            }
        ]
    }
]

export default authRouter

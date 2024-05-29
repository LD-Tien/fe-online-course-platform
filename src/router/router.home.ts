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
            }
        ]
    }
]

export default authRouter

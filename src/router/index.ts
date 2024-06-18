import { createRouter, createWebHistory } from 'vue-router'
import authRouter from '@/router/router.auth'
import homeRouter from '@/router/router.home'
import adminRouter from '@/router/router.admin'
import instructorRouter from '@/router/router.instructor'
import moderatorRouter from '@/router/router.moderator'
import learnRouter from './router.learn'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...authRouter,
        ...homeRouter,
        ...learnRouter,
        ...adminRouter,
        ...moderatorRouter,
        ...instructorRouter
    ]
})

export default router

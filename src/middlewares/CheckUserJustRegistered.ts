import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import store from '@/store'

export async function CheckUserJustRegistered(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): Promise<void> {
    if (store.state.auth.user && !store.state.auth.access_token) {
        next()
    }

    next({ name: 'login' })
}

import { Store, createStore } from 'vuex'
import authModule from './modules/auth'
import type { AuthState } from '@/types'

export interface RootState {
    auth: AuthState
}

const store: Store<RootState> = createStore({
    modules: {
        auth: authModule,
    },
})

export default store

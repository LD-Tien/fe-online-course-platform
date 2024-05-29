import { Store, createStore } from 'vuex'

import authModule from '@/store/modules/auth'
import loading from '@/store/modules/loading'
import type { AuthState } from '@/types'

export interface RootState {
    auth: AuthState
}

const store: Store<RootState> = createStore({
    modules: {
        auth: authModule,
        loading
    }
})

export default store

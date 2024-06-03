import { Store, createStore } from 'vuex'

import authModule from '@/store/modules/auth'
import loadingModule from '@/store/modules/loading'
import type { AuthState } from '@/types'

export interface RootState {
    auth: AuthState
    loading: { isLoading: boolean }
}

const store: Store<RootState> = createStore({
    modules: {
        auth: authModule,
        loading: loadingModule
    }
})

export default store

import type { Module } from 'vuex'

import type { RootState } from '@/store'
import type { LoadingState } from '@/types'

const loadingModule: Module<LoadingState, RootState> = {
    namespaced: true,
    state: {
        isLoading: false
    },
    mutations: {
        SET_LOADING(state) {
            state.isLoading = true
        },
        REMOVE_LOADING(state) {
            state.isLoading = false
        }
    },
    actions: {
        setLoading({ commit }) {
            commit('SET_LOADING')
        },
        removeLoading({ commit }) {
            commit('REMOVE_LOADING')
        }
    }
}

export default loadingModule

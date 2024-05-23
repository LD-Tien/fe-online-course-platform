import type { Module } from 'vuex'

import type { RootState } from '..'

const authModule: Module<AuthState, RootState> = {
    namespaced: true,
    state: {
        is_authenticated: false,
        access_token: null,
        user: null
    },
    actions: {
        async login({ commit }, credentials) {},
        logout({ commit }) {}
    },
    mutations: {}
}

export default authModule

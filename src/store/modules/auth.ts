import type { Module } from 'vuex'

import { getUserProfile, login, logout, register } from '@/api/modules/auth'
import type { AuthState } from '@/types/vuex'
import type { RootState } from '@/store'

const authModule: Module<AuthState, RootState> = {
    namespaced: true,
    state: {
        access_token: null,
        user: null
    },
    getters: {
        getUserProfile(state) {
            return state.user
        }
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const response = await login(credentials)
                window.localStorage.setItem('access_token', response.data.accessToken)
                commit('setUserProfile', response.data.user)
                commit('setAccessToken', response.data.accessToken)

                return response
            } catch (error) {
                return Promise.reject(error)
            }
        },
        async register(_, payload) {
            try {
                return await register(payload)
            } catch (error) {
                return Promise.reject(error)
            }
        },
        async logout({ commit }) {
            try {
                const response = await logout()
                commit('removeLoginSession')

                return response
            } catch (error) {
                return Promise.reject(error)
            }
        },
        async fetchUserProfile({ commit }) {
            try {
                const response = await getUserProfile()
                const accessToken = window.localStorage.getItem('access_token')
                commit('setUserProfile', response.data)
                commit('setAccessToken', accessToken)
            } catch (error) {
                return Promise.reject(error)
            }
        }
    },
    mutations: {
        setAccessToken(state, accessToken) {
            state.access_token = accessToken
            window.localStorage.setItem('access_token', accessToken)
        },
        setUserProfile(state, user) {
            state.user = user
        },
        removeLoginSession(state) {
            state.user = null
            state.access_token = null
            window.localStorage.clear()
        }
    }
}

export default authModule

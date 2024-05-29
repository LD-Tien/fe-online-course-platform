import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse
} from '@/api/modules/auth/types'

import axios from '@/api/axios'

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
        return await axios.post('/register', data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        return await axios.post('/login', data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getUserProfile = async (): Promise<any> => {
    try {
        return await axios.get('/user')
    } catch (error) {
        return Promise.reject(error)
    }
}

export const logout = async (): Promise<any> => {
    try {
        return await axios.post('/logout')
    } catch (error) {
        return Promise.reject(error)
    }
}

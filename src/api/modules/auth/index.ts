import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse
} from '@/api/modules/auth/types'

import axios from '@/api/axios'

const headers = {
    'Content-Type': 'multipart/form-data'
}

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
        return await axios.post('/register', data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const registerInstructor = async (formData: any): Promise<RegisterResponse> => {
    try {
        return await axios.post('/register-instructor', formData, { headers })
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

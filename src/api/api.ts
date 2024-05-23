import type { IBackendRes, IUserLogin, IUserRegister, IUserRegisterInstructor } from '@/backend'
import axios from '@/api/axios-custom'

/**
 * Auth module
 */
export const callRegister = (data: IUserRegister) => {
    return axios.post<never, IBackendRes<any>>('/api/register', data)
}
export const callLogin = (data: IUserLogin) => {
    return axios.post<never, IBackendRes<any>>('/api/login', data)
}
export const callLogout = () => {
    return axios.post<never, IBackendRes<any>>('/api/logout')
}
export const callRegisterInstructor = (data: IUserRegisterInstructor) => {
    return axios.post<never, IBackendRes<any>>('/api/register-instructor', data)
}

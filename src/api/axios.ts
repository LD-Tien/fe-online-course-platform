import axios, { AxiosError, type AxiosResponse } from 'axios'

import {
    HTTP_BAD_REQUEST,
    HTTP_DATA_INVALID,
    HTTP_UNAUTHORIZED,
    CODE_UNAUTHENTICATED,
    CODE_ACTION_CANNOT_DONE,
    ERR_NETWORK,
    ECONNABORTED,
    HTTP_NOT_FOUND,
    HTTP_NOT_ALLOWED,
    HTTP_REQUEST_TIMEOUT,
    HTTP_REQUEST_ENTITY_TOO_LARGE,
    HTTP_UNKNOWN_STATUS,
    HTTP_TOO_MANY_REQUESTS,
    HTTP_SERVER_ERROR,
    HTTP_FORBIDDEN,
    HTTP_CONFLICT
} from '@/constants'
import { showToast } from '@/utils/toastHelper'
import i18n from '@/i18n'
import store from '@/store'
import router from '@/router'
import { ToastType, type ResponseError } from '@/types'

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_PREFIX}`,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use(
    (config) => {
        config.headers.apiToken = import.meta.env.VITE_API_TOKEN
        // @ts-ignore
        config.headers['Accept-Language'] = i18n.global.locale?.value
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token')
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        localStorage.removeItem('toastNetwork')
        return response.data
    },
    (error: AxiosError) => {
        console.log(error)
        // network error
        const isFirst = localStorage.getItem('toastNetwork')

        if (error.code === ERR_NETWORK || error.code === ECONNABORTED) {
            if (isFirst == 'false' || isFirst == null) {
                showToast(i18n.global.t('common.no_connect_network'), ToastType.ERROR)
                localStorage.setItem('toastNetwork', 'true')
            }

            setTimeout(() => {
                localStorage.setItem('toastNetwork', 'false')
            }, 2000)

            return Promise.reject({ connect_network: i18n.global.t('common.no_connect_network') })
        }

        const errorResponse = error.response
        const httpCode = errorResponse?.status
        const errorData = errorResponse?.data as ResponseError

        const errorCodesToRedirect = [
            HTTP_NOT_FOUND,
            HTTP_NOT_ALLOWED,
            HTTP_REQUEST_TIMEOUT,
            HTTP_REQUEST_ENTITY_TOO_LARGE,
            HTTP_UNKNOWN_STATUS,
            HTTP_TOO_MANY_REQUESTS,
            HTTP_SERVER_ERROR,
            HTTP_FORBIDDEN
        ]

        if (typeof httpCode === 'number' && errorCodesToRedirect.includes(httpCode)) {
            // router.push({ name: 'page_error' })
            return Promise.reject(errorResponse)
        }

        switch (httpCode) {
            // validation
            case HTTP_DATA_INVALID:
                return Promise.reject(errorData.errors)

            // @TODO: pending waiting BE update format code
            case HTTP_UNAUTHORIZED:
                switch (errorData.code_error) {
                    case CODE_UNAUTHENTICATED:
                        store.dispatch('auth/logout').then(() => router.push({ name: 'login' }))
                        break
                }

                return Promise.reject(errorData)

            case HTTP_BAD_REQUEST:
                switch (errorData.code_error) {
                    case CODE_ACTION_CANNOT_DONE:
                        return Promise.reject(errorData)
                }

                return Promise.reject(errorData)

            case HTTP_CONFLICT:
                return Promise.reject(errorData)

            default:
                showToast(errorData.message, ToastType.ERROR)

                return
        }
    }
)

export default instance

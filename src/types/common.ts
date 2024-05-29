import type { POSITION } from 'vue-toastification'
import type { ToastType } from './toast-message'

// eslint-disable-next-line no-unused-vars
export type ShowToastFunction = (message: string, type: ToastType) => void
export type ShowToastImportFunction = (message: string, type: ToastType, position: POSITION | undefined) => void

export interface ResponseError {
    code: number
    message: string
    errors: {
        [key: string]: string
    }
    code_error?: string
}

export interface ResponseSuccess<Data = any> {
    code: number
    message: string
    data: Data
}

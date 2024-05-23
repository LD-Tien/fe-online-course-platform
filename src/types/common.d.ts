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

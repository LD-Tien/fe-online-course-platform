export interface UserDetail {
    id: number
    role: number
    name: string
    email: string
    avatar: string
    status: number
    pin_code: boolean
}

export interface UserRegisterRequest {
    email: string
    password: string
}

export interface UserRegisterResponse {
    id: number
    name: string
    email: string
    updated_at: Date
    created_at: Date
}

export interface UserDetail {
    id: number
    name: string
    email: string
    email_verified_at: Date
    profile_photo_url: null
    biography: null
    role: string
    provider_id: null
    provider_name: null
    payer_email: null
    locked_at: null
    created_at: Date
    updated_at: Date
    deleted_at: null
}

export interface RegisterRequest {
    email: string
    password: string
}

export interface RegisterResponse {
    code: number
    message: string
    data: {
        id: number
        name: string
        email: string
        updated_at: Date
        created_at: Date
    }
}

export interface LoginRequest {
    email: string
    password: string
    remember: boolean | true
}

export interface LoginResponse {
    code: number
    message: string
    data: {
        user: UserDetail
        accessToken: string
    }
}

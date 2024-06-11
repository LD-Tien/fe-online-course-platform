export interface GetAllCategoriesResponse {
    code: number
    message: string
    data: Category[]
}

export interface Category {
    id: number
    name: string
    created_at: Date
    updated_at: Date
    deleted_at: null | Date
}

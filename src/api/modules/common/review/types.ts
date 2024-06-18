export interface GetListReviewResponse {
    code: number
    message: string
    data: Review[]
}

export interface Review {
    user: any
    course_id: number
    rating_value: number
    comment: string
    created_at: Date
    updated_at: Date
    deleted_at: null
}

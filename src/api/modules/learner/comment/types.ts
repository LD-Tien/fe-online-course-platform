export interface GetListCommentResponse {
    code: number
    message: string
    data: Comment[]
}

export interface CreateCommentRequest {
    parent_comment_id: number | null
    lesson_id: number
    content: string
}

export interface CreateCommentResponse {
    code: number
    message: string
    data: Comment
}

export interface ReactionCommentRequest {
    comment_id: number
    reaction_type: ReactionType
}

export interface ReactionCommentResponse {
    code: number
    message: string
}

export interface Comment {
    id: number
    parent_comment_id: number | null
    user: User
    lesson_id: number
    replies?: Comment[]
    content: string
    created_at: Date
    updated_at: Date
    rating_number: number
    user_reaction_comment: ReactionType
    deleted_at?: null
}

export interface User {
    id: number
    name: string
    profile_photo_url: string
}

export enum ReactionType {
    DISLIKE = 0,
    LIKE = 1
}

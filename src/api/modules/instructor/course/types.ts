import type { Module } from '@/api/modules/module/types'

export interface Course {
    id?: number
    thumbnail?: string | null
    course_name: string
    description?: string | null
    price?: number
    is_progress_limited?: boolean
    category_id: number
    user_id?: number
    status?: number
    modules?: Module[]
    created_at?: Date
    updated_at?: Date
}

export enum CourseStatus {
    DRAFT = 1,
    UNDER_REVIEW = 2,
    PUBLISHED = 3,
    UNPUBLISHED = 4,
    REJECTED = 5
}

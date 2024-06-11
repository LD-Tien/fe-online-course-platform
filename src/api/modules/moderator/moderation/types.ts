import type { Lesson } from '@/api/modules/lesson/types'

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

export interface Module {
    id?: number
    name: string
    ordinal_number: number
    course_id?: number
    lessons?: ModerationLesson[]
    created_at?: Date
    updated_at?: Date
}

export interface ModerationLesson extends Lesson {
    analysis_text_result_json: object | null
    analysis_video_result_json: object | null
}

export interface VideoModeration {
    category: string
    timestamp: number
    confidence: number
}

export enum CourseStatus {
    UNDER_REVIEW = 2,
    PUBLISHED = 3,
    REJECTED = 5
}

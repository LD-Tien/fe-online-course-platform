export interface Lesson {
    id?: number
    name: string
    ordinal_number: number
    description?: string
    module_id: number
    video_path: string
    duration: number
    is_preview: number
    created_at?: Date
    updated_at?: Date
}

import type { Lesson } from '@/api/modules/lesson/types'

export interface Module {
    id?: number
    name: string
    ordinal_number: number
    course_id?: number
    lessons?: Lesson[]
    created_at?: Date
    updated_at?: Date
}

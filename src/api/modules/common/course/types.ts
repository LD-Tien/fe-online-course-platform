export interface GetCoursesByQueryResponse {
    code: number
    message: string
    data: Course[]
}

export interface GetCourseDetailResponse {
    code: number
    message: string
    data: CourseDetail
}

export interface Course {
    id: number
    thumbnail: null | string
    course_name: string
    price: number
    category: Category
    author: Author
    created_at: Date
    updated_at: Date
}

export interface CourseDetail extends Course {
    id: number
    thumbnail: string
    course_name: string
    description: string
    price: number
    category: Category
    author: Author
    modules: Module[]
    user_review: Review
    is_enrolled: boolean
}

export interface Author {
    id: number
    name: string
}

export interface Category {
    id: number
    name: string
}

export interface Module {
    id: number
    name: string
    ordinal_number: number
    course_id: number
    lessons: Lesson[]
    created_at: Date
    updated_at: Date
}

export interface Lesson {
    id: number
    name: string
    ordinal_number: number
    description: string
    module_id: number
    video_path: string
    duration: number
    is_preview: number
    is_finish: boolean
    created_at: Date
    updated_at: Date
}

export interface Review {
    user_id: number
    course_id: number
    rating_value: number
    comment: string
    created_at: Date
    updated_at: Date
    deleted_at: null
}

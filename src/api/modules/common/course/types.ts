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
}

export interface CourseDetail {}

export interface Author {
    id: number
    name: string
}

export interface Category {
    id: number
    name: string
}

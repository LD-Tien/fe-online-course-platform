import axios from '@/api/axios'
import { CourseStatus } from './types'

export const getCourseByQuery = async ({
    filters = { status: CourseStatus.UNDER_REVIEW },
    sorts = { created_at: 'desc' },
    search = { searchText: '' },
    page = 1,
    limit = 10
}: any) => {
    try {
        return await axios.get('/moderator/courses', {
            params: {
                filters,
                sorts,
                search,
                page,
                limit
            }
        })
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getCourse = async (courseId: number) => {
    try {
        return await axios.get('/moderator/courses/' + courseId)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const moderationCourse = async (courseId: number) => {
    try {
        return await axios.get(`/moderator/courses/${courseId}/analysis`)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const moderationLesson = async (courseId: number, moduleId: number, lessonId: number) => {
    try {
        return await axios.get(
            `/moderator/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/analysis`
        )
    } catch (error) {
        return Promise.reject(error)
    }
}

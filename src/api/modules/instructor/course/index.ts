import axios from '@/api/axios'
import type { Course } from './types'

const headers = {
    'Content-Type': 'multipart/form-data'
}

export const getCourseByQuery = async ({
    filters,
    sorts = { created_at: 'desc' },
    search = { searchText: '' },
    page = 1,
    limit = 10
}: any) => {
    try {
        return await axios.get('/instructor/courses', {
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
        return await axios.get('/instructor/courses/' + courseId)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const createCourse = async (data: Course) => {
    try {
        return await axios.post('/instructor/courses', data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const updateCourse = async (formData: FormData, id: number) => {
    try {
        return await axios.post('/instructor/courses/' + id + '?_method=PUT', formData, { headers })
    } catch (error) {
        return Promise.reject(error)
    }
}

export const deleteCategory = async (id: number) => {
    try {
        return await axios.delete('/instructor/categories/' + id)
    } catch (error) {
        return Promise.reject(error)
    }
}

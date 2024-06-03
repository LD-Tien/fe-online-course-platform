import axios from '@/api/axios'
import axios2 from 'axios'
import type { Course } from './types'

export const getCoursesPaginate = async () => {
    try {
        return await axios.get('/instructor/courses', {
            params: {
                filters: {
                    user_id: ['=', 1],
                    price: ['>', 1]
                },
                sorts: {
                    course_name: 'desc',
                    created_at: 'asc'
                },
                page: 1,
                limit: 2
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
        return await axios2.post(
            'http://localhost:8000/api/instructor/courses/' + id + '?_method=PUT',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + localStorage.getItem('access_token')
                }
            }
        )
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

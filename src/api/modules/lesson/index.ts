import axios2 from 'axios'
import axios from '@/api/axios'

export const createLesson = async (courseId: number, moduleId: number, formData: FormData) => {
    try {
        return await axios2.post(
            `http://localhost:8000/api/instructor/courses/${courseId}/modules/${moduleId}/lessons`,
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

export const updateLesson = async (
    courseId: number,
    moduleId: number,
    lessonId: number,
    formData: FormData
) => {
    try {
        return await axios2.post(
            `http://localhost:8000/api/instructor/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}?_method=PUT`,
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

export const deleteLesson = async (courseId: number, moduleId: number, lessonId: number) => {
    try {
        return await axios.delete(
            `http://localhost:8000/api/instructor/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`,
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

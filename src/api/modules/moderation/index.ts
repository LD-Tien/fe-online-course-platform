import axios from '@/api/axios'

export const getCoursesPaginate = async () => {
    try {
        return await axios.get('/moderator/courses')
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

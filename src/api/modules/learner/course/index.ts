import axios from '@/api/axios'
import type { CourseDetail } from '../../common/course/types'
import router from '@/router'

const resource = '/learner/courses'

export const course = {
    enroll: async (id: number) => {
        try {
            return await axios.post(`${resource}/${id}/enrollment`)
        } catch (error: any) {
            ElNotification({
                title: 'Error',
                message: 'Enroll failed. please try again later.',
                type: 'error',
                position: 'bottom-right'
            })
            return Promise.reject(error)
        }
    },
    detail: async (
        id: number
    ): Promise<{
        code: number
        message: string
        data: CourseDetail
    }> => {
        try {
            return await axios.get(`${resource}/${id}`)
        } catch (error: any) {
            if (error.status === 404) {
                router.push({ name: 'home', replace: true })
            } else {
                ElNotification({
                    title: 'Get course failed',
                    message: 'Get course fail. please try again later.',
                    type: 'error',
                    position: 'bottom-right'
                })
            }
            return Promise.reject(error)
        }
    }
}

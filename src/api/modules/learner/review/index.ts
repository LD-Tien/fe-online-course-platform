import axios from '@/api/axios'
import type { ReviewRequest } from './types'

const resource = '/learner/reviews'

export const review = {
    updateOrCreateReview: async (data: ReviewRequest) => {
        try {
            return await axios.post(`${resource}`, data)
        } catch (error) {
            ElNotification({
                message: 'Review failed. Please try again later.',
                type: 'error',
                position: 'bottom-right'
            })
            Promise.reject(error)
        }
    },
    getReviewByQuery: async () => {
        try {
            return await axios.get(`${resource}`)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

import axios from '@/api/axios'
import type { GetListReviewResponse } from './types'

const resource = '/reviews'

export const review = {
    list: async (courseId: number): Promise<GetListReviewResponse> =>
        await axios(`${resource}/${courseId}`)
}

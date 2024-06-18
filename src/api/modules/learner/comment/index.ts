import axios from '@/api/axios'
import type {
    CreateCommentRequest,
    CreateCommentResponse,
    GetListCommentResponse,
    ReactionCommentRequest,
    ReactionCommentResponse
} from './types'

const resource = '/learner/comments'

export const comment = {
    list: async (params: any): Promise<GetListCommentResponse> => {
        try {
            return await axios.get(resource, { params })
        } catch (error) {
            ElNotification({
                type: 'error',
                message: 'Error when get comments. Please try again later',
                position: 'bottom-right'
            })
            return Promise.reject(error)
        }
    },
    create: async (data: CreateCommentRequest): Promise<CreateCommentResponse> => {
        try {
            return await axios.post(resource, data)
        } catch (error) {
            ElNotification({
                type: 'error',
                message: 'Error when add comment. Please try again later',
                position: 'bottom-right'
            })
            return Promise.reject(error)
        }
    },
    delete: async (commentId: number): Promise<any> => {
        try {
            return await axios.delete(`${resource}/${commentId}`)
        } catch (error) {
            ElNotification({
                type: 'error',
                message: 'Error when delete comment. Please try again later',
                position: 'bottom-right'
            })
            return Promise.reject(error)
        }
    },
    reaction: async (data: ReactionCommentRequest): Promise<ReactionCommentResponse> => {
        try {
            return await axios.post(`${resource}/reaction`, data)
        } catch (error) {
            ElNotification({
                type: 'error',
                message: 'Error when get comments. Please try again later',
                position: 'bottom-right'
            })
            return Promise.reject(error)
        }
    }
}

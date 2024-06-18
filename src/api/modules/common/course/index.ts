import axios from '@/api/axios'
import type { GetCourseDetailResponse, GetCoursesByQueryResponse } from './types'

const resource = '/courses'

export const course = {
    getCoursesByQuery: (query: any): Promise<GetCoursesByQueryResponse> =>
        axios.get(resource, { params: query }),
    detail: (id: number): Promise<GetCourseDetailResponse> => axios.get(`${resource}/${id}`)
}

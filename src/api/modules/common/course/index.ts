import axios from '@/api/axios'
import type { GetCourseDetailResponse, GetCoursesByQueryResponse } from './types'

const resource = '/courses'

export const course = {
    getCoursesByQuery: (): Promise<GetCoursesByQueryResponse> => axios.get(resource),
    detail: (id: number): Promise<GetCourseDetailResponse> => axios.get(`${resource}/${id}`)
}

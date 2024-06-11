import axios from '@/api/axios'
import type { GetAllCategoriesResponse } from './types'

const resource = '/categories'

export const category = {
    getAllCategories: (): Promise<GetAllCategoriesResponse> => axios.get(resource)
}

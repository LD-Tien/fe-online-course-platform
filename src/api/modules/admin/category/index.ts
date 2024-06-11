import axios from '@/api/axios'
import type { Category } from './types'

export const getCategoryByQuery = async ({
    filters,
    sorts = { created_at: 'desc' },
    search = { searchText: '' },
    page = 1,
    limit = 10
}: any) => {
    try {
        return await axios.get('/admin/categories', {
            params: {
                filters,
                sorts,
                search,
                page,
                limit
            }
        })
    } catch (error) {
        return Promise.reject(error)
    }
}

export const createCategory = async (data: Category) => {
    try {
        return await axios.post('/admin/categories', data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const updateCategory = async (data: Category) => {
    try {
        return await axios.put('/admin/categories/' + data.id, data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const deleteCategory = async (id: number) => {
    try {
        return await axios.delete('/admin/categories/' + id)
    } catch (error) {
        return Promise.reject(error)
    }
}

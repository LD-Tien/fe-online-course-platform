import axios from '@/api/axios'
import type { Category } from './types'

export const getCategoriesPaginate = async () => {
    try {
        return await axios.get('/admin/categories')
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getAllCategories = async () => {
    try {
        return await axios.get('/categories')
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

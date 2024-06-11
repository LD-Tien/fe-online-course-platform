import axios from '@/api/axios'
import type { Module } from '@/api/modules/module/types'

export const getModules = async (courseId: number) => {
    try {
        return await axios.get(`instructor/courses/${courseId}/modules`)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const createModule = async (courseId: number, module: Module) => {
    try {
        return await axios.post(`instructor/courses/${courseId}/modules`, module)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const updateModule = async (courseId: number, moduleId: number, module: Module) => {
    try {
        return await axios.put(`instructor/courses/${courseId}/modules/${moduleId}`, module)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const deleteModule = async (courseId: number, moduleId: number) => {
    try {
        return await axios.delete(`instructor/courses/${courseId}/modules/${moduleId}`)
    } catch (error) {
        return Promise.reject(error)
    }
}

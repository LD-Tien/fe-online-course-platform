import axios from '@/api/axios'

const resource = '/learner/lessons'

export const lesson = {
    finishLesson: (lessonId: number) => axios.post(`${resource}/${lessonId}/finish`),
    unfinishedLesson: (lessonId: number) => axios.delete(`${resource}/${lessonId}/unfinished`)
}

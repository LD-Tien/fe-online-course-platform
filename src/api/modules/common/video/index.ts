export const lessonVideo = {
    getVideoUrl: async (lessonId: number): Promise<any> => {
        const response = await fetch(`http://127.0.0.1:8000/api/${lessonId}/video`)
        const blob = await response.blob()

        return URL.createObjectURL(blob)
    }
}

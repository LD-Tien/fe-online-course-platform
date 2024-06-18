<template>
    <div class="flex items-center px-3 py-1 overflow-hidden max-w-screen">
        <div class="inline-flex items-center flex-1 gap-3">
            <router-link :to="{ name: 'home' }"><base-icon name="logo-light" /></router-link>
            <router-link
                :to="{ name: 'course-detail', params: { courseId: props.courseId } }"
                class="w-full font-semibold truncate hover:text-blue-500"
            >
                {{ props.courseName }}
            </router-link>
        </div>
        <div class="inline-flex items-center gap-3 w-fit">
            <el-button @click="emits('setModalVisible')">Review this course </el-button>
            <span class="inline-block text-sm font-medium w-fit text-nowrap">
                {{ props.totalCompletedLessons }}/{{ totalLessons }} Lessons
            </span>
            <el-progress :width="50" type="circle" :percentage="props.progress" :color="colors" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    progress: number
    totalCompletedLessons: number
    totalLessons: number
    courseName: string
    courseId: number
}>()

const emits = defineEmits<{
    (e: 'setModalVisible'): void
}>()

const colors = [
    { color: '#f56c6c', percentage: 20 },
    { color: '#e6a23c', percentage: 40 },
    { color: '#5cb87a', percentage: 60 },
    { color: '#1989fa', percentage: 80 },
    { color: '#6f7ad3', percentage: 100 }
]
</script>

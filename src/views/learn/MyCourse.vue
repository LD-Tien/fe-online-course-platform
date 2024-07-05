<template>
    <AppLayout>
        <div v-if="isLoadingPage" class="flex items-center justify-center h-screen">
            <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
                <loading />
            </el-icon>
        </div>
        <div v-else class="flex flex-col gap-10">
            <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between">
                    <h2 class="text-2xl font-bold">Khóa học đã tham gia</h2>
                </div>
                <div class="grid grid-cols-4 gap-3">
                    <el-card
                        v-for="course in courses"
                        @click="
                            $router.push({ name: 'course-detail', params: { courseId: course.id } })
                        "
                        :key="course.id"
                        class="!rounded-xl cursor-pointer hover:opacity-90"
                    >
                        <img
                            :src="
                                course.thumbnail ??
                                'https://i.pinimg.com/564x/d6/19/a6/d619a64645bf2cbf8f32f9063cf29ac5.jpg'
                            "
                            class="w-full rounded-lg h-[175px] object-cover"
                        />
                        <h4 class="text-base font-bold text-black-70">{{ course.course_name }}</h4>
                        <router-link to="" class="text-blue-500 hover:opacity-90">
                            <div class="inline-flex items-center gap-1">
                                <base-icon name="person-outline-24" />
                                {{ course.author.name }}
                            </div>
                        </router-link>
                        <br />
                        <el-progress :text-inside="true" :percentage="75" />
                    </el-card>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { category } from '@/api/modules/common/category'
import type { Category } from '@/api/modules/common/category/types'
import { course } from '@/api/modules/common/course'
import type { Course } from '@/api/modules/common/course/types'

const value = 3.7
const categories = ref<Category[]>([])
const courses = ref<Course[]>([])
const baseUrl = import.meta.env.VITE_API_BASE_URL
const isLoadingPage = ref(true)

onMounted(async () => {
    isLoadingPage.value = true
    try {
        const getAllCategoriesResponse = await category.getAllCategories()
        const getCoursesResponse = await course.getCoursesByQuery({})

        categories.value = getAllCategoriesResponse.data
        courses.value = getCoursesResponse.data
        console.log(courses.value)
    } catch (error) {
        console.log(error)
    }
    isLoadingPage.value = false
})
</script>

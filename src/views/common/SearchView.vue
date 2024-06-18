<template>
    <div v-if="isLoadingPage" class="flex items-center justify-center h-screen">
        <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
            <loading />
        </el-icon>
    </div>
    <div v-else class="flex flex-col gap-10">
        <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold">Result for "{{ $route.params.keyword }}"</h2>
                <div class="flex gap-3">
                    <el-select placeholder="Filter" style="width: 240px">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                    <el-select placeholder="Sort" style="width: 240px">
                        <el-option
                            v-for="item in sortOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                    <el-select placeholder="Category" style="width: 240px">
                        <el-option
                            v-for="item in categories"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </div>
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
                    <el-rate v-model="value" disabled show-score score-template="{value} (100)" />
                    <div v-if="course.price" class="flex items-center gap-2">
                        <span class="text-xl font-bold">${{ course.price }}</span>
                        <span class="font-semibold line-through">$400</span>
                    </div>
                    <div v-else class="block">
                        <span>Free</span>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
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
const route = useRoute()
const isLoadingPage = ref(true)

const options = [
    {
        value: 'Option1',
        label: 'Option1'
    },
    {
        value: 'Option2',
        label: 'Option2',
        disabled: true
    },
    {
        value: 'Option3',
        label: 'Option3'
    },
    {
        value: 'Option4',
        label: 'Option4'
    },
    {
        value: 'Option5',
        label: 'Option5'
    }
]

const sortOptions = [
    {
        value: '',
        label: 'New course'
    },
    {
        value: '',
        label: 'Old course'
    }
]

watch(
    () => route.params,
    async () => {
        let getCoursesResponse
        if (route.params.keyword) {
            getCoursesResponse = await course.getCoursesByQuery({
                search: { searchText: route.params.keyword }
            })
        } else {
            getCoursesResponse = await course.getCoursesByQuery({})
        }

        courses.value = getCoursesResponse.data
    }
)

onMounted(async () => {
    isLoadingPage.value = true
    try {
        const getAllCategoriesResponse = await category.getAllCategories()
        const getCoursesResponse = await course.getCoursesByQuery({
            search: { searchText: route.params.keyword ?? '' }
        })

        categories.value = getAllCategoriesResponse.data
        courses.value = getCoursesResponse.data
        console.log(courses.value)
    } catch (error) {
        console.log(error)
    }
    isLoadingPage.value = false
})
</script>

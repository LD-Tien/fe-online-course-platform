<template>
    <div class="flex">
        <div class="grow">
            <router-view v-slot="{ Component }">
                <component :is="Component" :lesson="currentLesson" :currentTime="currentTime" />
            </router-view>
        </div>
        <div class="w-fit">
            <moderator-sidebar-curriculum
                :modules="course.modules"
                @setCurrentTime="currentTime = 2"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { getCourse } from '@/api/modules/moderation'
import type { ModerationLesson, Course, Module } from '@/api/modules/moderation/types'
import { ToastType } from '@/types'
import { showToast } from '@/utils/toastHelper'

const route = useRoute()
const currentTime = ref(0)

const course = reactive<Course>({
    id: undefined,
    thumbnail: '',
    course_name: '',
    description: '',
    price: 0,
    category_id: 0,
    user_id: undefined,
    status: 1,
    modules: []
})

const currentLesson = reactive<ModerationLesson>({
    id: undefined,
    name: '',
    ordinal_number: 0,
    description: '',
    module_id: 0,
    video_path: '',
    duration: 0,
    is_preview: 0,
    analysis_text_result_json: null,
    analysis_video_result_json: null
})

const currentModule = reactive<Module>({
    id: undefined,
    name: '',
    ordinal_number: 0,
    course_id: route.params.courseId as any,
    lessons: []
})

watch(
    () => route.params.moduleId,
    (moduleId) => {
        Object.assign(
            currentModule,
            course.modules && course.modules.find((module) => module.id + '' === moduleId)
        )
    }
)

watch(
    () => route.params.lessonId,
    (lessonId) => {
        Object.assign(
            currentLesson,
            currentModule.lessons?.find((lesson) => lesson.id + '' === lessonId)
        )
    }
)

onMounted(async () => {
    try {
        //@ts-ignore
        const response = await getCourse(route.params.courseId)
        Object.assign(course, response.data)
        course.modules = course.modules?.sort((a, b) => a.ordinal_number - b.ordinal_number)
        course.modules?.forEach((module) => {
            module.lessons?.sort((a, b) => a.ordinal_number - b.ordinal_number)
        })
        Object.assign(
            currentModule,
            course.modules &&
                course.modules.find((module) => module.id + '' === route.params.moduleId)
        )
        Object.assign(
            currentLesson,
            currentModule.lessons?.find((lesson) => lesson.id + '' === route.params.lessonId)
        )
    } catch (error) {
        showToast('Get course fail', ToastType.ERROR)
    }
})
</script>

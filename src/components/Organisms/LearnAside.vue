<template>
    <div class="w-[400px] overflow-x-hidden overflow-y-auto">
        <div v-if="isLoadingSidebar" class="flex items-center justify-center h-screen">
            <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
                <loading />
            </el-icon>
        </div>
        <el-menu
            v-else
            :default-active="props.currentLesson.id ? props.currentLesson.id.toString() : ''"
            class="el-menu-vertical-demo min-h-full border border-gray-200 min-w-[400px]"
        >
            <el-sub-menu
                v-for="module in props.courseDetail.modules"
                :key="module.id"
                :index="module.id.toString()"
                :class="{
                    'bg-gray-50': true,
                    'bg-blue-100': module.id === currentLesson.module_id
                }"
            >
                <template #title>
                    <div class="flex flex-col w-full">
                        <span class="text-lg font-semibold truncate" :title="module.name">
                            {{ module.ordinal_number }} . {{ module.name }}
                        </span>
                        <div class="flex gap-1">
                            <span class="text-sm font-normal"
                                >{{
                                    module.lessons.reduce(
                                        (pre, crr) => (crr.is_finish ? pre + 1 : pre),
                                        0
                                    )
                                }}/{{ module.lessons.length }}
                                |
                            </span>
                            <span class="text-sm font-normal">
                                {{
                                    secondsToHHMMSS(
                                        module.lessons.reduce((acc, cur) => acc + cur.duration, 0)
                                    )
                                }}
                            </span>
                        </div>
                    </div>
                </template>
                <el-menu-item
                    v-for="lesson in module.lessons"
                    :key="lesson.id"
                    :index="lesson.id + ''"
                    @click="emits('setCurrentLesson', lesson)"
                    :class="{
                        'flex justify-between ': true,
                        'bg-blue-50': lesson.id === currentLesson.id
                    }"
                >
                    <div class="flex flex-col items-start w-full gap-1">
                        <div class="flex gap-1 leading-none">
                            <span>{{ module.ordinal_number }}.{{ lesson.ordinal_number }}.</span>
                            <span>{{ lesson.name }}</span>
                        </div>
                        <div class="flex items-center text-xs leading-none">
                            <el-icon size="small"><VideoPlay /></el-icon>
                            <span>{{ secondsToHHMMSS(lesson.duration) }}</span>
                        </div>
                    </div>
                    <el-checkbox
                        :checked="!!lesson.is_finish"
                        @click.stop="handleToggleFinishLesson(lesson)"
                        size="large"
                    />
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import type { CourseDetail, Lesson } from '@/api/modules/common/course/types'
import { lesson } from '@/api/modules/learner/lesson'
import { secondsToHHMMSS } from '@/utils/convertHelper'

const props = defineProps<{
    courseDetail: CourseDetail
    currentLesson: Lesson
}>()

const emits = defineEmits<{
    (e: 'setCurrentLesson', lesson: Lesson): void
    (e: 'setCourseDetail', course: CourseDetail): void
}>()

const isLoadingSidebar = ref(!props.courseDetail.modules)

const handleToggleFinishLesson = async (lessonData: Lesson) => {
    try {
        lessonData.is_finish = !lessonData.is_finish

        if (lessonData.is_finish) {
            const res = await lesson.finishLesson(lessonData.id)
            console.log(res)
            return
        }

        const res = await lesson.unfinishedLesson(lessonData.id)
        console.log(res)
        console.log(props.courseDetail)
        emits('setCourseDetail', props.courseDetail)
    } catch (error) {
        ElNotification({
            message: 'Error when update progress. Please try again later',
            position: 'bottom-right',
            type: 'error'
        })
    }
}

watch(
    () => props.courseDetail.modules,
    () => {
        isLoadingSidebar.value = false
    }
)
</script>

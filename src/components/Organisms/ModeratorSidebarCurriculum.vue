<template>
    <div class="!h-full flex flex-col">
        <div class="flex flex-col gap-2 p-3">
            <div class="flex">
                <el-button
                    @click="publicCourse(courseId, CourseStatus.PUBLISHED)"
                    type="success"
                    :loading="loadingPublicCourse"
                    class="w-full"
                >
                    Xuất bản khóa học
                </el-button>
                <el-button
                    @click="rejectCourse(courseId, CourseStatus.REJECTED)"
                    type="danger"
                    :loading="loadingPublicCourse"
                    class="w-full"
                >
                    Từ chối duyệt
                </el-button>
            </div>
            <el-button
                type="primary"
                :loading="loadingModeration"
                class="w-full"
                @click="handleModerationCourse"
            >
                Kiểm duyệt khóa học bằng AI
            </el-button>
        </div>
        <div class="overflow-y-auto grow !h-full">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo min-h-full p-2 border border-gray-200 min-w-[400px]"
            >
                <el-sub-menu v-for="item in props.modules" :key="item.id" :index="item.id + ''">
                    <template #title>
                        <div class="flex flex-col w-full">
                            <span class="text-lg font-semibold">
                                {{ item.ordinal_number }} - {{ item.name }}
                            </span>
                            <div class="flex gap-1">
                                <span class="text-sm font-normal">
                                    Số bài giảng {{ item.lessons.length }} -
                                </span>
                                <span class="text-sm font-normal">
                                    Thời lượng
                                    {{
                                        secondsToHHMMSS(
                                            item.lessons.reduce(
                                                (acc: number, cur: ModerationLesson) =>
                                                    acc + cur.duration,
                                                0
                                            )
                                        )
                                    }}
                                </span>
                            </div>
                        </div>
                    </template>
                    <el-menu-item
                        @click="
                            $router.push({
                                name: 'moderation-lesson',
                                params: { moduleId: item.id, lessonId: lesson.id }
                            })
                        "
                        v-for="lesson in item.lessons"
                        :key="lesson.id"
                        :index="lesson.id + ''"
                        class="flex justify-between"
                    >
                        <div class="flex items-center">
                            {{ item.ordinal_number }}.{{ lesson.ordinal_number }}.
                            <el-icon><VideoPlay /></el-icon>
                            {{ lesson.name }} - {{ secondsToHHMMSS(lesson.duration) }}
                        </div>
                        <el-button
                            v-if="lesson.analysis_video_result_json"
                            link
                            :type="
                                Math.max(
                                    ...lesson.analysis_video_result_json.results.google.moderation.map(
                                        (item: any) => item.confidence
                                    )
                                ) >= 0.6
                                    ? 'danger'
                                    : 'primary'
                            "
                            :icon="
                                Math.max(
                                    ...lesson.analysis_video_result_json.results.google.moderation.map(
                                        (item: any) => item.confidence
                                    )
                                ) >= 0.6
                                    ? 'WarnTriangleFilled'
                                    : 'InfoFilled'
                            "
                            @click.stop="showModerationResult(lesson)"
                        />
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
    </div>
    <el-dialog v-model="dialogTableVisible" width="800">
        <template #header>
            <div class="flex justify-between">
                <span>Kết quả kiểm duyệt bằng AI</span>
            </div>
        </template>
        <div class="flex flex-col gap-2">
            <div class="flex justify-between">
                <h1 class="text-xl font-bold">Kết quả kiểm duyệt video</h1>
                <el-select
                    v-model="selectedSort"
                    clearable
                    placeholder="Sort by"
                    style="width: 240px"
                >
                    <el-option
                        v-for="item in sortOptionsConfident"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <el-select
                    v-model="selectedConfidentPercent"
                    clearable
                    placeholder="Độ chính xác"
                    style="width: 240px"
                >
                    <el-option
                        v-for="item in filterOptionsConfident"
                        :key="item.value"
                        :label="
                            item.value < 1.0 ? 'Độ chính xác lớn hơn ' + item.label : item.label
                        "
                        :value="item.value"
                    />
                </el-select>
            </div>
            <div class="grid grid-cols-4 gap-6">
                <div
                    v-show="item.confidence >= selectedConfidentPercent"
                    v-for="(item, index) in moderationVideoResult.sort((a: any, b: any) => {
                        if (selectedSort === 'ascending') {
                            return a.confidence - b.confidence
                        } else if (selectedSort === 'decrease') {
                            return b.confidence - a.confidence
                        } else {
                            return a.timestamp - b.timestamp
                        }
                    })"
                    @click.stop="
                        () => {
                            $router.push({
                                name: 'moderation-lesson',
                                params: {
                                    lessonId: lessonModalData.id,
                                    currentTime: item.timestamp
                                },
                                replace: true
                            })
                            dialogTableVisible = false
                        }
                    "
                    :key="index"
                    :style="{ borderColor: item.confidence >= 0.6 ? 'red' : 'inherit' }"
                    class="flex flex-col items-center justify-center p-3 border cursor-pointer hover:shadow-md rounded-xl"
                >
                    <!-- <span class="text-base font-bold text-blue-400">{{ item.category }}</span> -->
                    <span class="text-base font-semibold">{{ item.confidence * 100 + '%' }}</span>
                    <span class="text-sm font-bold">{{ secondsToHHMMSS(item.timestamp) }}</span>
                </div>
            </div>
            <h1 class="text-xl font-bold">Kết quả kiểm duyệt văn bản</h1>
            <el-progress
                :percentage="textModerationScore"
                :stroke-width="25"
                :text-inside="true"
                :color="customColors"
            >
                <span class="text-slate-700"
                    >Nội dung không phù hợp {{ textModerationScore }}%</span
                >
            </el-progress>
            <el-collapse>
                <el-collapse-item title="Chi tiết">
                    <div v-for="(item, index) in moderationTextResult.openai.items" :key="index">
                        <span>{{ item.label }}</span>
                        <el-progress :percentage="Math.round(item.likelihood_score * 100)">
                        </el-progress>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { CourseStatus } from '@/api/modules/instructor/course/types'
import { moderationCourse, updateCourse } from '@/api/modules/moderator/moderation'
import type { ModerationLesson } from '@/api/modules/moderator/moderation/types'
import { secondsToHHMMSS } from '@/utils/convertHelper'

const props = defineProps(['modules'])
const route = useRoute()
const dialogTableVisible = ref(false)
const courseId: number = parseInt(route.params.courseId as string)
const selectedConfidentPercent = ref(0.6)
const selectedSort = ref('timeline')
const loadingModeration = ref(false)
const loadingPublicCourse = ref(false)
const moderationVideoResult = ref<any>([])
const moderationTextResult = ref<any>([])
const sortOptionsConfident = [
    { label: 'Dòng thời gian', value: 'timeline' },
    { label: 'Độ chính xác tăng dần', value: 'ascending' },
    { label: 'Độ chính xác giảm dần', value: 'decrease' }
]

const filterOptionsConfident = [
    {
        value: 1.0,
        label: '100%'
    },
    {
        value: 0.9,
        label: '90%'
    },
    {
        value: 0.8,
        label: '80%'
    },
    {
        value: 0.7,
        label: '70%'
    },
    {
        value: 0.6,
        label: '60%'
    },
    {
        value: 0.5,
        label: '50%'
    },
    {
        value: 0.4,
        label: '40%'
    },
    {
        value: 0.3,
        label: '30%'
    },
    {
        value: 0.2,
        label: '20%'
    },
    {
        value: 0.1,
        label: '10%'
    }
]
const lessonModalData = reactive<Partial<ModerationLesson>>({})

const textModerationScore = computed(() => {
    if (lessonModalData.analysis_text_result_json) {
        return Math.round(
            //@ts-ignore
            (lessonModalData?.analysis_text_result_json.openai.nsfw_likelihood_score as number) *
                100
        )
    }
})

const customColors = [
    { color: '#c45656', percentage: 100 },
    { color: '#f89898', percentage: 80 },
    { color: '#eebe77', percentage: 60 },
    { color: '#b3e19d', percentage: 40 },
    { color: '#95d475', percentage: 20 }
]

function showModerationResult(lesson: ModerationLesson) {
    //@ts-ignore
    moderationVideoResult.value = lesson.analysis_video_result_json.results.google.moderation
    //@ts-ignore
    moderationTextResult.value = lesson.analysis_text_result_json
    Object.assign(lessonModalData, lesson)
    dialogTableVisible.value = true
}

const handleModerationCourse = async () => {
    loadingModeration.value = true
    try {
        const response = await moderationCourse(courseId)
        ElNotification({
            message: 'Đã gửi yêu cầu kiểm duyệt khóa học bằng AI. Vui lòng chờ đợi.',
            type: 'success',
            position: 'bottom-right'
        })
        console.log(response)
    } catch (error) {
        ElNotification({
            message: 'Kiểm duyệt bằng AI thất bại. Vui lòng thử lại sau.',
            type: 'error',
            position: 'bottom-right'
        })
    }
    loadingModeration.value = false
}

const publicCourse = async (courseId: number, status: number) => {
    try {
        loadingPublicCourse.value = true
        const response = await updateCourse(courseId, { status })
        ElNotification({
            message: 'Xuất bản khóa học thành công.',
            type: 'success',
            position: 'bottom-right'
        })
        console.log(response)
        loadingPublicCourse.value = false
    } catch (error) {
        ElNotification({
            message: 'Xuất bản khóa học thất bại. Vui lòng thử lại sau.',
            type: 'error',
            position: 'bottom-right'
        })
    }
}

const rejectCourse = async (courseId: number, status: number) => {
    try {
        loadingPublicCourse.value = true
        const response = await updateCourse(courseId, { status })
        ElNotification({
            message: 'Đã từ chối xuất bản khóa học.',
            type: 'success',
            position: 'bottom-right'
        })
        console.log(response)
        loadingPublicCourse.value = false
    } catch (error) {
        ElNotification({
            message: 'Xuất bản khóa học thất bại. Vui lòng thử lại sau.',
            type: 'error',
            position: 'bottom-right'
        })
    }
}
</script>

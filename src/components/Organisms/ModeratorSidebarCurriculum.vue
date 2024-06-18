<template>
    <div class="!h-full flex flex-col">
        <div class="flex flex-col gap-2 p-3">
            <div class="flex">
                <el-button
                    type="success"
                    :disabled="loadingModeration"
                    class="w-full"
                    @click="handleModerationCourse"
                >
                    Publish
                </el-button>
                <el-button
                    type="danger"
                    :disabled="loadingModeration"
                    class="w-full"
                    @click="handleModerationCourse"
                >
                    Reject
                </el-button>
            </div>
            <el-button
                type="primary"
                :loading="loadingModeration"
                class="w-full"
                @click="handleModerationCourse"
            >
                Moderation Course By AI
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
                                    Total video {{ item.lessons.length }} -
                                </span>
                                <span class="text-sm font-normal">
                                    Duration
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
                                ) >= 0.8
                                    ? 'danger'
                                    : 'primary'
                            "
                            :icon="
                                Math.max(
                                    ...lesson.analysis_video_result_json.results.google.moderation.map(
                                        (item: any) => item.confidence
                                    )
                                ) >= 0.8
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
                <span>AI moderation result</span>
            </div>
        </template>
        <div class="flex flex-col gap-2">
            <div class="flex justify-between">
                <h1 class="text-xl font-bold">Video moderation result</h1>
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
                    placeholder="Filter by confident percent"
                    style="width: 240px"
                >
                    <el-option
                        v-for="item in filterOptionsConfident"
                        :key="item.value"
                        :label="item.value < 1.0 ? 'Greater than ' + item.label : item.label"
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
                    :style="{ borderColor: item.confidence >= 0.8 ? 'red' : 'inherit' }"
                    class="flex flex-col items-center justify-center p-3 border cursor-pointer hover:shadow-md rounded-xl"
                >
                    <span class="text-base font-bold text-blue-400">{{ item.category }}</span>
                    <span class="text-base font-semibold">{{ item.confidence * 100 + '%' }}</span>
                    <span class="text-sm font-bold">{{ secondsToHHMMSS(item.timestamp) }}</span>
                </div>
            </div>
            <h1 class="text-xl font-bold">Text moderation result</h1>
            <el-progress
                :percentage="textModerationScore"
                :stroke-width="25"
                :text-inside="true"
                :color="customColors"
            >
                <span class="text-slate-700">Inappropriate Content {{ textModerationScore }}%</span>
            </el-progress>
            <el-collapse>
                <el-collapse-item title="Detail">
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
import { moderationCourse } from '@/api/modules/moderator/moderation'
import type { ModerationLesson } from '@/api/modules/moderator/moderation/types'
import { ToastType } from '@/types'
import { secondsToHHMMSS } from '@/utils/convertHelper'
import { showToast } from '@/utils/toastHelper'

const props = defineProps(['modules'])
const route = useRoute()
const dialogTableVisible = ref(false)
const courseId: number = parseInt(route.params.courseId as string)
const selectedConfidentPercent = ref(0.8)
const selectedSort = ref('timeline')
const loadingModeration = ref(false)
const moderationVideoResult = ref<any>([])
const moderationTextResult = ref<any>([])
const sortOptionsConfident = [
    { label: 'Timeline', value: 'timeline' },
    { label: 'Ascending', value: 'ascending' },
    { label: 'Decrease', value: 'decrease' }
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
        console.log(response)
    } catch (error) {
        showToast('Moderation by AI fail. Please try again', ToastType.ERROR)
    }
    loadingModeration.value = false
}
</script>

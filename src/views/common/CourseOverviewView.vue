<template>
    <div v-if="isLoadingPage" class="flex items-center justify-center h-screen">
        <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
            <loading />
        </el-icon>
    </div>
    <el-row v-else justify="center" :gutter="20">
        <el-col :span="20">
            <el-row :gutter="24">
                <el-col :span="24" style="margin-bottom: 20px">
                    <el-breadcrumb :separator-icon="ArrowRight">
                        <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
                        <el-breadcrumb-item>{{ courseDetail.category?.name }}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{ courseDetail.course_name }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
                <el-col :span="16">
                    <el-space direction="vertical" fill wrap :size="0" style="width: 100%">
                        <el-image
                            fit="contain"
                            :src="
                                courseDetail.thumbnail ??
                                'https://i.pinimg.com/564x/d6/19/a6/d619a64645bf2cbf8f32f9063cf29ac5.jpg'
                            "
                            class="rounded-lg"
                        >
                            <template #error>
                                <div class="image-slot">
                                    <el-icon><icon-picture /></el-icon>
                                </div>
                            </template>
                        </el-image>
                        <h2 class="text-3xl font-semibold">{{ courseDetail.course_name }}</h2>
                        <el-rate
                            size="large"
                            disabled
                            show-score
                            score-template="{value} (100 ratings) 1000 students"
                        />
                        <el-space>
                            <el-text size="default">
                                Create by: {{ courseDetail.author?.name }}
                            </el-text>
                            <el-text size="default">
                                Last updated
                                {{ dayjs(courseDetail.updated_at).format('DD/MM/YYYY') }}</el-text
                            >
                        </el-space>
                    </el-space>
                    <el-divider />
                    <el-row>
                        <el-col :span="24">
                            <el-space fill direction="vertical" style="width: 100%">
                                <h3 class="text-2xl font-bold">Description</h3>
                                <span v-html="courseDetail.description"></span>
                                <!-- <el-text size="default">{{ courseDetail.description }}</el-text> -->
                            </el-space>
                        </el-col>
                    </el-row>
                    <el-divider />
                    <el-row>
                        <el-col :span="24">
                            <el-space fill direction="vertical" style="width: 100%">
                                <h3 class="text-2xl font-bold">Course content</h3>
                                <el-text>
                                    {{ totalModule }} sections • {{ totalLesson }} lectures •
                                    {{ totalDuration }}
                                    total length
                                </el-text>
                                <div class="demo-collapse">
                                    <el-collapse>
                                        <el-collapse-item
                                            v-for="module in courseDetail.modules?.sort(
                                                (a, b) => a.ordinal_number - b.ordinal_number
                                            )"
                                            :name="module.id"
                                            :key="module.id"
                                        >
                                            <template #title>
                                                <div
                                                    class="flex items-center justify-between w-full pr-2"
                                                >
                                                    <span class="text-lg font-semibold">
                                                        {{ module.ordinal_number }} .
                                                        {{ module.name }}
                                                    </span>
                                                    <span class="text-sm font-medium">
                                                        {{ module.lessons.length }} lectures -
                                                        {{ getTotalDurationFromModule(module) }}
                                                    </span>
                                                </div>
                                            </template>
                                            <el-space direction="vertical" fill style="width: 100%">
                                                <div
                                                    v-for="lesson in module.lessons.sort(
                                                        (a, b) =>
                                                            a.ordinal_number - b.ordinal_number
                                                    )"
                                                    :key="lesson.id"
                                                    class="flex items-center gap-1 pl-3 pr-7"
                                                >
                                                    <el-icon>
                                                        <VideoPlay />
                                                    </el-icon>
                                                    <el-text>
                                                        {{ module.ordinal_number }}.{{
                                                            lesson.ordinal_number
                                                        }}.
                                                        {{ lesson.name }}
                                                    </el-text>
                                                    <div class="flex-grow"></div>
                                                    <el-button
                                                        v-if="lesson.is_preview"
                                                        type="primary"
                                                        link
                                                    >
                                                        Preview
                                                    </el-button>
                                                    <el-text>
                                                        {{ secondsToHHMMSS(lesson.duration) }}
                                                    </el-text>
                                                </div>
                                            </el-space>
                                        </el-collapse-item>
                                    </el-collapse>
                                </div>
                            </el-space>
                        </el-col>
                    </el-row>
                    <el-divider />
                    <el-row>
                        <el-col :span="24">
                            <div class="flex flex-col gap-3">
                                <div class="flex justify-between">
                                    <h3 class="text-2xl font-bold">Reviews</h3>
                                    <el-select placeholder="Select" style="width: 240px">
                                        <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        />
                                    </el-select>
                                </div>
                                <div class="flex">
                                    <div class="flex flex-col items-center gap-1">
                                        <span class="text-3xl font-bold text-[#ff9900]">4.5</span>
                                        <el-rate :model-value="3" disabled text-color="#ff9900" />
                                        <span>Course rating</span>
                                    </div>
                                    <div class="flex flex-col flex-1">
                                        <el-progress :percentage="50" color="#ff9900">
                                            <el-rate
                                                disabled
                                                :model-value="5"
                                                text-color="#ff9900"
                                            />
                                        </el-progress>
                                        <el-progress :percentage="25" color="#ff9900">
                                            <el-rate
                                                disabled
                                                :model-value="4"
                                                text-color="#ff9900"
                                            />
                                        </el-progress>
                                        <el-progress :percentage="20" color="#ff9900">
                                            <el-rate
                                                disabled
                                                :model-value="3"
                                                text-color="#ff9900"
                                            />
                                        </el-progress>
                                        <el-progress :percentage="10" color="#ff9900">
                                            <el-rate
                                                disabled
                                                :model-value="2"
                                                text-color="#ff9900"
                                            />
                                        </el-progress>
                                        <el-progress :percentage="5" color="#ff9900">
                                            <el-rate
                                                disabled
                                                :model-value="1"
                                                text-color="#ff9900"
                                            />
                                        </el-progress>
                                    </div>
                                </div>

                                <div class="flex flex-col gap-3">
                                    <div
                                        v-for="(review, index) in reviews"
                                        :key="index"
                                        class="flex items-start justify-start gap-3"
                                    >
                                        <el-avatar
                                            class="self-start flex-none border border-black-70"
                                            :icon="UserFilled"
                                            :src="
                                                'http://localhost:8000' +
                                                review.user.profile_photo_url
                                            "
                                        />
                                        <div class="flex flex-col items-start justify-center">
                                            <div class="flex items-center gap-3">
                                                <span class="text-sm font-bold">{{
                                                    review.user.name
                                                }}</span>
                                                <span class="text-xs font-normal">Today</span>
                                            </div>
                                            <el-rate
                                                v-model="review.rating_value"
                                                disabled
                                                show-score
                                                text-color="#ff9900"
                                            />
                                            <p class="text-sm font-normal text-gray-700">
                                                {{ review.comment }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-space direction="vertical" fill style="width: 100%">
                        <el-space>
                            <el-text size="large" tag="b" type="danger">
                                <h4 class="text-2xl font-bold">
                                    {{
                                        courseDetail.price
                                            ? new Intl.NumberFormat('en-US', {
                                                  style: 'currency',
                                                  currency: 'USD'
                                              }).format(courseDetail.price)
                                            : 'Free'
                                    }}
                                </h4>
                            </el-text>
                            <!-- <el-text size="large" tag="del">300$</el-text> -->
                        </el-space>
                        <el-button
                            v-if="courseDetail.is_enrolled"
                            @click="
                                $router.push({
                                    name: 'learn-course',
                                    params: { courseId: courseDetail.id }
                                })
                            "
                            size="large"
                            type="primary"
                        >
                            Go to course
                        </el-button>
                        <template v-else>
                            <el-button @click="handleEnroll(courseId)" size="large" type="primary">
                                Enrollment now
                            </el-button>
                            <el-button size="large" type="primary">Add to cart</el-button>
                            <el-button size="large">Buy now</el-button>
                        </template>
                    </el-space>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script lang="ts" setup>
import { course as courseForGuest } from '@/api/modules/common/course'
import { secondsToHHMMSS } from '@/utils/convertHelper'
import { ArrowRight, Picture as IconPicture, VideoPlay } from '@element-plus/icons-vue'
import type { CourseDetail, Module } from '@/api/modules/common/course/types'
import dayjs from 'dayjs'
import { UserFilled } from '@element-plus/icons-vue'
import { course as courseForLearner } from '@/api/modules/learner/course'
import router from '@/router'
import { review } from '@/api/modules/common/review'
import type { Review } from '@/api/modules/common/review/types'

const isLoadingPage = ref(true)
const route = useRoute()
const courseId = parseInt(route.params.courseId as string)
const courseDetail = reactive<Partial<CourseDetail>>({})
const reviews = ref<Review[]>([])
const totalModule = computed(() => courseDetail.modules?.length)
const totalLesson = computed(() => {
    return courseDetail.modules?.reduce((totalLesson, currenModule) => {
        return (totalLesson += currenModule.lessons.length)
    }, 0)
})
const totalDuration = computed(() => {
    return secondsToHHMMSS(
        courseDetail.modules?.reduce((totalDuration, currentModule) => {
            return (totalDuration += currentModule.lessons.reduce(
                (totalDuration, currentLesson) => {
                    return (totalDuration += currentLesson.duration)
                },
                0
            ))
        }, 0) ?? 0
    )
})

const options = [
    {
        value: '5',
        label: '5 stars'
    },
    {
        value: '4',
        label: '4 stars'
    },
    {
        value: '3',
        label: '3 stars'
    },
    {
        value: '2',
        label: '2 stars'
    },
    {
        value: '1',
        label: '1 stars'
    }
]

const getTotalDurationFromModule = (module: Module) => {
    return secondsToHHMMSS(
        module.lessons.reduce((totalDuration, currentLesson) => {
            return (totalDuration += currentLesson.duration)
        }, 0)
    )
}

const handleEnroll = async (courseId: number) => {
    const res = await courseForLearner.enroll(courseId)
    router.push({
        name: 'learn-course',
        params: { courseId: courseDetail.id }
    })
    console.log(res)
}

onMounted(async () => {
    isLoadingPage.value = true
    try {
        let responseCourseDetail
        if (window.localStorage.getItem('access_token')) {
            responseCourseDetail = await courseForLearner.detail(courseId)
        } else {
            responseCourseDetail = await courseForGuest.detail(courseId)
        }
        const listReviewResponse = await review.list(courseId)

        // const responseListReview  = await review.getReviewByQuery(courseId)
        console.log(responseCourseDetail)
        Object.assign(courseDetail, responseCourseDetail.data)
        reviews.value = listReviewResponse.data
    } catch (error) {
        console.log(error)
    }
    isLoadingPage.value = false
})
</script>

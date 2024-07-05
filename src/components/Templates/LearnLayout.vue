<template>
    <div v-if="isLoadingPage" class="flex items-center justify-center h-screen">
        <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
            <loading />
        </el-icon>
    </div>
    <el-container v-else class="h-screen">
        <el-header style="padding: 0">
            <LearnHeader
                :progress="progress.progressPercent"
                :total-completed-lessons="progress.completedLessons"
                :total-lessons="progress.totalLessons"
                :course-id="courseId"
                :course-name="courseDetail.course_name"
                @setModalVisible="dialogFormVisible = true"
            />
        </el-header>
        <div class="flex h-full overflow-auto">
            <slot :lesson="currentLesson" :video-url="videoUrl"></slot>
            <learn-aside
                @set-current-lesson="setCurrentLesson"
                @set-course-detail="setCourseDetail"
                :current-lesson="currentLesson"
                :course-detail="courseDetail"
            />
        </div>
        <el-dialog v-model="dialogFormVisible" title="Đánh giá khóa học" width="500">
            <el-form>
                <el-form-item>
                    <el-rate v-model="reviewData.rating_value" size="large" />
                </el-form-item>
                <el-form-item>
                    <el-input
                        v-model="reviewData.comment"
                        :rows="3"
                        type="textarea"
                        placeholder="Tell us about your own personal experience taking this course"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Hủy</el-button>
                    <el-button type="danger" :loading="isLoadingHandleReview" @click="handleReview">
                        Xóa đánh giá hiện tại
                    </el-button>
                    <el-button
                        type="primary"
                        :loading="isLoadingHandleReview"
                        @click="handleReview"
                    >
                        Lưu đánh giá
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </el-container>
</template>

<script setup lang="ts">
import LearnAside from '@/components/organisms/LearnAside.vue'
import LearnHeader from '@/components/organisms/LearnHeader.vue'
import type { CourseDetail, Lesson, Module } from '@/api/modules/common/course/types'
import { course } from '@/api/modules/learner/course'
import { lessonVideo } from '@/api/modules/common/video'
import { review } from '@/api/modules/learner/review'

const route = useRoute()
const router = useRouter()
const courseId = parseInt(route.params.courseId as string)
const courseDetail = reactive({}) as CourseDetail
const currentLesson = reactive({}) as Lesson
const reviewData = reactive({}) as {
    rating_value: number
    comment: string
}
const videoUrl = ref('')
const currentLessonId = ref(parseInt(route.query.lessonId as string))
const dialogFormVisible = ref(false)
const isLoadingHandleReview = ref(false)
const isLoadingPage = ref(false)

const progress = computed(() => {
    let totalLessons = 0
    let completedLessons = 0
    let progressPercent = 0

    courseDetail.modules &&
        courseDetail.modules.forEach((module) => {
            module.lessons.forEach((lesson) => {
                totalLessons++
                if (lesson.is_finish) {
                    completedLessons++
                }
            })
        })

    progressPercent = totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100

    return { completedLessons, totalLessons, progressPercent }
})

watch(currentLesson, async () => (videoUrl.value = await lessonVideo.getVideoUrl(currentLesson.id)))

const setCourseDetail = (course: CourseDetail) => {
    Object.assign(courseDetail, course)
}

const setCurrentLesson = (lesson: Lesson) => {
    Object.assign(currentLesson, lesson)
    router.push({ name: 'learn-course', query: { lessonId: lesson.id } })
}

const findLessonByIdInModules = (modules: Module[], lessonId: number) => {
    for (let module of modules) {
        for (let lesson of module.lessons) {
            if (lesson.id === lessonId) {
                return lesson
            }
        }
    }
    return null
}

const handleReview = async () => {
    isLoadingHandleReview.value = true
    const res = await review.updateOrCreateReview({
        course_id: courseId,
        comment: reviewData.comment,
        rating_value: reviewData.rating_value
    })

    ElNotification({
        type: 'success',
        message: 'Gửi đánh giá thành công',
        position: 'bottom-right'
    })
    dialogFormVisible.value = false
    isLoadingHandleReview.value = false
}

onMounted(async () => {
    isLoadingPage.value = true
    const res = await course.detail(courseId)
    Object.assign(courseDetail, res.data)
    Object.assign(reviewData, courseDetail.user_review)
    router.push({
        name: 'learn-course',
        query: {
            lessonId: isNaN(currentLessonId.value)
                ? courseDetail.modules[0].lessons[0].id
                : currentLessonId.value
        },
        replace: true
    })
    isLoadingPage.value = false

    const lesson = findLessonByIdInModules(courseDetail.modules, currentLessonId.value)

    if (lesson) {
        Object.assign(currentLesson, lesson)
        return
    }

    Object.assign(currentLesson, courseDetail.modules[0].lessons[0])
})
</script>

<template>
    <div class="flex items-center justify-between p-3">
        <el-tag type="primary" class="mr-auto" size="large">{{
            CourseStatus[courseForm.status as number]
        }}</el-tag>
        <el-button
            v-if="
                courseForm.status === CourseStatus.DRAFT ||
                courseForm.status === CourseStatus.REJECTED
            "
            size="large"
            type="primary"
            @click="handleChangeStatusCourse(CourseStatus.UNDER_REVIEW)"
        >
            Xuất bản khóa học
        </el-button>
        <el-button v-if="courseForm.status === CourseStatus.DRAFT" size="large" type="danger">
            Xóa khóa học
        </el-button>
        <el-button
            v-if="courseForm.status === CourseStatus.UNDER_REVIEW"
            size="large"
            type="warning"
            @click="handleChangeStatusCourse(CourseStatus.DRAFT)"
        >
            Hủy yêu cầu duyệt
        </el-button>
        <el-button
            v-if="courseForm.status === CourseStatus.PUBLISHED"
            size="large"
            type="danger"
            @click="handleChangeStatusCourse(CourseStatus.UNPUBLISHED)"
        >
            Gỡ khóa học
        </el-button>
    </div>
    <div class="flex flex-col gap-2 overflow-auto">
        <div
            v-if="store.state.loading.isLoading"
            class="z-10 el-loading-mask"
            style="display: flex; align-items: center; justify-content: center"
        >
            <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
                <loading />
            </el-icon>
        </div>
        <el-tabs v-else type="border-card" class="demo-tabs">
            <el-tab-pane label="Tổng quan">
                <el-form ref="formRef" :model="courseForm" class="flex gap-2 demo-ruleForm">
                    <div>
                        <label for="input-thumbnail-file">
                            <div
                                v-show="!courseForm.thumbnail && !isSelectedNewImage"
                                class="flex w-[500px] items-center justify-center h-[300px] border border-black cursor-pointer rounded-3xl"
                            >
                                Upload thumbnail
                            </div>
                            <img
                                v-show="courseForm.thumbnail || isSelectedNewImage"
                                ref="avatar"
                                class="w-[500px] object-cover h-[300px] rounded-3xl"
                                :src="
                                    courseForm.thumbnail
                                        ? 'http://localhost:8000' + courseForm.thumbnail
                                        : ''
                                "
                            />
                        </label>
                        <input
                            ref="thumbnail_file"
                            id="input-thumbnail-file"
                            @input="previewAvatar"
                            type="file"
                            accept="image/*"
                            hidden
                        />
                    </div>
                    <div class="flex flex-col flex-1">
                        <el-form-item
                            prop="course_name"
                            :rules="[{ required: true, message: 'Course name is required' }]"
                        >
                            <el-input
                                v-model.number="courseForm.course_name"
                                type="text"
                                placeholder="course name"
                                autocomplete="off"
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-select
                                v-model="courseForm.category_id"
                                placeholder="Please select category"
                            >
                                <el-option
                                    v-for="item in categories"
                                    :label="item.name"
                                    :value="item.id ?? ''"
                                    :key="item.id"
                                />
                            </el-select>
                        </el-form-item>
                        <ckeditor
                            :editor="ClassicEditor"
                            v-model="courseForm.description"
                            :config="{}"
                        />
                        <el-form-item class="mt-4">
                            <el-button type="primary" @click="handleSubmit">Lưu</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="Chương trình giảng dạy">
                <div class="flex flex-col gap-2">
                    <el-collapse>
                        <draggableComponent
                            v-model="courseForm.modules"
                            group="module"
                            item-key="ordinal_number"
                            @change="handleChangeModuleOrdinalNumber"
                        >
                            <template #item="{ element: module, index: moduleIndex }">
                                <el-collapse-item>
                                    <template #title>
                                        <div class="flex items-center justify-between w-full p-2">
                                            <div class="">
                                                <span class="text-lg font-bold">
                                                    {{ module.ordinal_number }} -
                                                </span>
                                                <span class="w-full text-lg font-bold">
                                                    {{ module.name }}
                                                </span>
                                            </div>
                                            <div class="flex">
                                                <el-button
                                                    @click.stop="
                                                        handleShowModalLessonForm({
                                                            id: undefined,
                                                            name: '',
                                                            //@ts-ignore
                                                            ordinal_number:
                                                                module.lessons.length + 1,
                                                            description: '',
                                                            module_id: module.id as number,
                                                            video_path: '',
                                                            duration: 0,
                                                            is_preview: 0
                                                        })
                                                    "
                                                >
                                                    Thêm bài giảng
                                                </el-button>
                                                <el-popconfirm
                                                    @confirm="
                                                        handleDeleteModule(module.id as number)
                                                    "
                                                    title="Are you sure to delete this?"
                                                >
                                                    <template #reference>
                                                        <el-button @click.stop type="danger">
                                                            <el-icon> <Delete /> </el-icon>
                                                        </el-button>
                                                    </template>
                                                </el-popconfirm>

                                                <el-button
                                                    @click.stop="
                                                        () => {
                                                            Object.assign(moduleForm, module)
                                                            modalModuleFormVisible = true
                                                        }
                                                    "
                                                    type="primary"
                                                >
                                                    <el-icon>
                                                        <Edit />
                                                    </el-icon>
                                                </el-button>
                                            </div>
                                        </div>
                                    </template>
                                    <draggableComponent
                                        v-model="module.lessons"
                                        item-key="ordinal_number"
                                        @change="handleChangeLessonOrdinalNumber(moduleIndex)"
                                    >
                                        <template #item="{ element: lesson, index: lessonIndex }">
                                            <div class="flex items-center pl-10">
                                                <el-button
                                                    type="danger"
                                                    small
                                                    link
                                                    @click.stop="
                                                        handleDeleteLesson(
                                                            moduleIndex,
                                                            lessonIndex,
                                                            lesson
                                                        )
                                                    "
                                                >
                                                    <el-icon> <Delete /> </el-icon>
                                                </el-button>
                                                <el-button
                                                    link
                                                    type="primary"
                                                    small
                                                    @click.stop="handleShowModalLessonForm(lesson)"
                                                >
                                                    <el-icon>
                                                        <Edit />
                                                    </el-icon>
                                                </el-button>
                                                <span class="text-lg font-semibold">
                                                    {{ lesson.ordinal_number }} - {{ lesson.name }}
                                                </span>
                                            </div>
                                        </template>
                                    </draggableComponent>
                                </el-collapse-item>
                            </template>
                        </draggableComponent>
                    </el-collapse>
                    <el-button type="primary" @click="handleAddModule">Thêm chương</el-button>
                </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="Thảo luận">Thảo luận</el-tab-pane>
            <el-tab-pane label="Đánh giá">Đánh giá</el-tab-pane> -->
        </el-tabs>
    </div>
    <el-dialog v-model="modalLessonFormVisible" title="Bài giảng">
        <el-form :model="lessonForm" label-position="top">
            <el-form-item>
                <el-input
                    v-model="lessonForm.name"
                    autocomplete="off"
                    placeholder="Tên bài giảng"
                />
            </el-form-item>
            <el-upload
                ref="uploadVideo"
                class="upload-demo"
                :limit="1"
                accept="video/mp4"
                :on-remove="
                    () => {
                        videoPreview.src = videoUrl ?? ''
                    }
                "
                :auto-upload="false"
                @change="handleVideoPreview"
            >
                <template #trigger>
                    <el-button type="primary" v-if="!videoUrl || lessonForm.video_path">
                        Chọn file MP4
                    </el-button>
                </template>
                <template #tip>
                    <div class="el-upload__tip">Tập tin mp4 phải có kích thước thấp hơn 500mb</div>
                </template>
            </el-upload>
            <video class="w-full" :src="videoUrl" ref="videoPreview" controls></video>
            <ckeditor :editor="ClassicEditor" v-model="lessonForm.description" :config="{}" />
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="modalLessonFormVisible = false">Hủy</el-button>
                <el-button
                    @loading="isLoadingCreateLesson"
                    type="primary"
                    @click="handleCreateOrUpdateLesson(lessonForm)"
                >
                    Lưu
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="modalModuleFormVisible" title="Chương">
        <el-form :model="moduleForm" label-position="top">
            <el-form-item label="Tên chương">
                <el-input v-model="moduleForm.name" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="modalModuleFormVisible = false">Hủy</el-button>
                <el-button type="primary" @click="handleUpdateModule(moduleForm)"> Lưu </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { category } from '@/api/modules/common/category'
import type { Category } from '@/api/modules/common/category/types'
import { getCourse, updateCourse } from '@/api/modules/instructor/course'
import { CourseStatus, type Course } from '@/api/modules/instructor/course/types'
import { createLesson, deleteLesson, updateLesson } from '@/api/modules/instructor/lesson'
import type { Lesson } from '@/api/modules/instructor/lesson/types'
import {
    createModule,
    deleteModule,
    getModules,
    updateModule
} from '@/api/modules/instructor/module'
import type { Module } from '@/api/modules/instructor/module/types'
import { ToastType } from '@/types'
import { showToast } from '@/utils/toastHelper'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import type { UploadProps } from 'element-plus'
import draggableComponent from 'vuedraggable'

const route = useRoute()
const courseForm = reactive<Course>({
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
const moduleForm = reactive<Module>({
    id: undefined,
    name: '',
    ordinal_number: 0
})

const lessonForm = reactive<Lesson>({
    id: undefined,
    name: '',
    ordinal_number: 0,
    description: '',
    module_id: 0,
    video_path: '',
    duration: 0,
    is_preview: 0
})

const categories = ref<Category[]>([])

const avatar = ref()
const thumbnail_file = ref()
const isSelectedNewImage = ref(false)
const modalModuleFormVisible = ref<boolean>(false)
const modalLessonFormVisible = ref<boolean>(false)
const videoFile = ref<any>()
const videoPreview = ref()
const uploadVideo = ref()
const store = useStore()
const isLoadingCreateLesson = ref(false)

const nextOrdinalNumber = computed(() => {
    const currentOrdinalNumber = courseForm.modules?.reduce((acc, crr) => {
        return crr.ordinal_number > acc ? crr.ordinal_number : acc
    }, 0)

    return currentOrdinalNumber + 1
})

const videoUrl = computed(() => {
    if (lessonForm.video_path) return 'http://localhost:8000' + lessonForm.video_path
    return ''
})

//@ts-ignore
const courseId: number = route.params.courseId

const previewAvatar = (event: any) => {
    const input = event.target as HTMLInputElement

    if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = function (e) {
            avatar.value.src = e?.target?.result
        }
        reader.readAsDataURL(input.files[0])
    }

    isSelectedNewImage.value = true
}

const handleSubmit = async () => {
    try {
        const formData = new FormData()

        for (const key in courseForm) {
            //@ts-ignore
            formData.append(key, courseForm[key])
        }

        //@ts-ignore
        formData.append('is_progress_limited', 0)

        if (thumbnail_file.value.files[0]) {
            formData.append('thumbnail_file', thumbnail_file.value.files[0])
        }
        //@ts-ignore
        const response: any = await updateCourse(formData, formData.get('id'))
        console.log('🚀 ~ handleSubmit ~ response:', response)

        ElNotification({
            title: 'SUCCESS!',
            message: 'Update course successfully!.',
            type: 'success',
            position: 'bottom-right'
        })
    } catch (error) {
        ElNotification({
            title: 'ERROR!',
            message: 'Update course failed. Please try again later.',
            type: 'error',
            position: 'bottom-right'
        })
    }
}

const handleAddModule = async () => {
    try {
        const response: any = await createModule(courseId, {
            name: 'Chương mới',
            ordinal_number: nextOrdinalNumber.value as number
        })
        courseForm.modules?.push(response.data)
        ElNotification({
            title: 'SUCCESS!',
            message: 'Add module successfully!.',
            type: 'success',
            position: 'bottom-right'
        })
    } catch (error) {
        showToast('Create module fail.', ToastType.ERROR)
    }
}

const handleShowModalLessonForm = (lesson: Lesson) => {
    modalLessonFormVisible.value = true
    if (uploadVideo.value) uploadVideo.value.clearFiles()
    Object.assign(lessonForm, { ...lesson })
}

const checkVideoSize = (rawFile: any) => {
    if (rawFile.type !== 'video/mp4') {
        ElMessage.error('Video must be mp4 format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 200) {
        ElMessage.error('Video size can not exceed 200MB!')
        return false
    }
    return true
}

const handleDeleteModule = async (moduleId: number) => {
    try {
        const response: any = await deleteModule(courseId, moduleId)
        courseForm.modules = courseForm.modules?.filter((item) => {
            return item.id !== moduleId
        })
        ElNotification({
            title: 'SUCCESS!',
            message: 'Xóa chương thành công!.',
            type: 'success',
            position: 'bottom-right'
        })
    } catch (error) {
        showToast('Delete module fail.', ToastType.ERROR)
    }
}

const handleUpdateModule = async (module: Module) => {
    try {
        const response: any = await updateModule(courseId, module.id as number, module)
        Object.assign(
            courseForm.modules?.find((item) => {
                return item.id === module.id
            }) as Module,
            response.data
        )
        ElNotification({
            title: 'SUCCESS!',
            message: 'Cập nhật chương thành công!.',
            type: 'success',
            position: 'bottom-right'
        })
        modalModuleFormVisible.value = false
    } catch (error) {
        showToast('Delete module fail.', ToastType.ERROR)
    }
}

const handleVideoPreview: UploadProps['onPreview'] = (uploadFile) => {
    if (checkVideoSize(uploadFile.raw)) {
        videoFile.value = uploadFile.raw
        //@ts-ignore
        videoPreview.value.src = URL.createObjectURL(uploadFile.raw)
    }
    uploadVideo.value.clearFiles()
}

const handleCreateOrUpdateLesson = async (lesson: Lesson) => {
    // modalLessonFormVisible.value = false
    const formData = new FormData()

    formData.append('name', lesson.name)
    formData.append('description', lesson.description ?? '')
    //@ts-ignore
    formData.append('ordinal_number', lesson.ordinal_number)
    //@ts-ignore
    formData.append('duration', Math.round(videoPreview.value.duration))

    if (videoFile.value) {
        formData.append('video_file', videoFile.value)
    }

    if (lesson.id) {
        try {
            isLoadingCreateLesson.value = true
            const response = await updateLesson(courseId, lesson.module_id, lesson.id, formData)
            Object.assign(
                //@ts-ignore
                courseForm.modules
                    ?.find((module) => module.id === lesson.module_id)
                    ?.lessons?.find((item) => item.id === lesson.id),
                response.data.data
            )
            isLoadingCreateLesson.value = false
            showToast(response.data.message, ToastType.SUCCESS)
        } catch (error) {
            showToast('Update lesson fail', ToastType.ERROR)
        }
    } else {
        try {
            const response = await createLesson(courseId, lesson.module_id, formData)
            const module = courseForm.modules?.find((module) => module.id === lesson.module_id)
            module?.lessons?.push(response.data.data)
            showToast('Create lesson success', ToastType.SUCCESS)
        } catch (error) {
            showToast('Create lesson fail', ToastType.ERROR)
        }
    }
    modalLessonFormVisible.value = false
}

const handleDeleteLesson = async (moduleIndex: number, lessonIndex: number, lesson: Lesson) => {
    try {
        const response: any = await deleteLesson(courseId, lesson.module_id, lesson.id as number)
        //@ts-ignore
        courseForm.modules[moduleIndex].lessons?.splice(lessonIndex, 1)
        showToast(response.message, ToastType.SUCCESS)
    } catch (error) {
        showToast('Delete lesson fail', ToastType.ERROR)
    }
}

const handleChangeModuleOrdinalNumber = async () => {
    courseForm.modules?.forEach((module, index) => {
        module.ordinal_number = index + 1
    })

    try {
        await Promise.all(
            courseForm.modules?.map((module) =>
                updateModule(courseId, module.id as number, module)
            ) || []
        )
    } catch (error) {
        showToast('Sort module fail. Please refresh page and try again.', ToastType.ERROR)
    }
}

const handleChangeLessonOrdinalNumber = async (moduleIndex: number) => {
    courseForm.modules &&
        courseForm.modules[moduleIndex].lessons?.forEach(
            (lesson, index) => (lesson.ordinal_number = index + 1)
        )

    try {
        await Promise.all(
            (courseForm.modules &&
                courseForm.modules[moduleIndex].lessons?.forEach((lesson) => {
                    const formData = new FormData()
                    //@ts-ignore
                    formData.append('ordinal_number', lesson.ordinal_number)
                    //@ts-ignore
                    updateLesson(courseId, courseForm.modules[moduleIndex].id, lesson.id, formData)
                })) ||
                []
        )
    } catch (error) {
        showToast('Sort lesson fail. Please refresh page and try again.', ToastType.ERROR)
    }
}

const handleChangeStatusCourse = async (courseStatus: number) => {
    try {
        const formData = new FormData()
        formData.append('status', courseStatus + '')
        const response = await updateCourse(formData, courseId)
        Object.assign(courseForm, response.data)
        ElNotification({
            title: 'SUCCESS!',
            message: 'Update course successfully!',
            type: 'success',
            position: 'bottom-right'
        })
    } catch (error) {
        ElNotification({
            title: 'ERROR!',
            message: 'Update course failed. Please try again later.',
            type: 'error',
            position: 'bottom-right'
        })
    }
}

onMounted(async () => {
    store.state.loading.isLoading = true

    if (courseId) {
        const [courseData, categoriesData] = await Promise.all([
            getCourse(courseId),
            category.getAllCategories(),
            getModules(courseId)
        ])

        Object.assign(courseForm, courseData.data)
        categories.value = categoriesData.data
        courseForm.modules && courseForm.modules.sort((a, b) => a.ordinal_number - b.ordinal_number)
        courseForm.modules?.forEach((module) =>
            module.lessons?.sort((a, b) => a.ordinal_number - b.ordinal_number)
        )
    }

    store.state.loading.isLoading = false
})
</script>

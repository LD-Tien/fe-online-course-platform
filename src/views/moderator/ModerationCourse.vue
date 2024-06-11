<template>
    <div class="flex flex-col max-w-full !h-full gap-3 p-3 overflow-auto">
        <div class="flex justify-between gap-3">
            <el-input
                style="width: 240px"
                @input="handleSearchChange(searchText)"
                v-model="searchText"
                placeholder="Search by name, id"
            >
                <template #prefix>
                    <el-icon class="el-input__icon"><search /></el-icon>
                </template>
            </el-input>
            <el-select
                v-model="optionSelected"
                @change="handleFilterStatusChange"
                class="mr-auto"
                placeholder="Select"
                style="width: 240px"
            >
                <el-option
                    v-for="(item, index) in optionsFilterByStatus"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
            <el-pagination
                class="ml-auto"
                background
                :current-page="metaData.current_page"
                :page-count="metaData.last_page"
                :page-size="metaData.per_page"
                :total="metaData.total"
                @current-change="handleCurrentPageChange"
            />
        </div>
        <div
            v-if="store.state.loading.isLoading"
            class="z-10 el-loading-mask"
            style="display: flex; align-items: center; justify-content: center"
        >
            <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
                <loading />
            </el-icon>
        </div>
        <el-table v-else :data="courses" style="width: 100%">
            <el-table-column fixed prop="id" label="ID" width="150" />
            <el-table-column prop="course_name" label="Course name" width="300" />
            <el-table-column prop="thumbnail" label="Thumbnail" width="120">
                <template #default="scope">
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="'http://localhost:8000' + scope.row.thumbnail"
                        fit="cover"
                    />
                </template>
            </el-table-column>
            <el-table-column prop="price" label="Price" width="120">
                <template #default="scope">
                    {{ scope.row.price === 0 ? 'Free' : scope.row.price }}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="Status" width="200">
                <template #default="scope">
                    <el-tag>{{ CourseStatus[scope.row.status] }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Created at" width="200">
                <template #default="scope">
                    {{ dayjs(scope.row.created_at).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column label="Updated at" width="200">
                <template #default="scope">
                    {{ dayjs(scope.row.updated_at).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="Operations" width="200">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleClick">
                        Publish
                    </el-button>
                    <el-button link type="danger" size="small">Reject</el-button>
                    <el-button
                        link
                        @click="
                            $router.push({
                                name: 'moderation-course-detail',
                                params: { courseId: scope.row.id }
                            })
                        "
                        type="warning"
                        size="small"
                    >
                        Detail
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { type Course } from '@/api/modules/instructor/course/types'
import { getCourseByQuery } from '@/api/modules/moderator/moderation'
import { ToastType } from '@/types'
import { showToast } from '@/utils/toastHelper'
import store from '@/store'
import dayjs from 'dayjs'
import type { Meta } from '@/api/modules/admin/category/types'
import { CourseStatus } from '@/api/modules/moderator/moderation/types'

const courses = ref<Course[]>([])
const metaData = reactive<Partial<Meta>>({})
const optionsFilterByStatus = ref(
    Object.values(CourseStatus)
        .filter((item) => typeof item === 'number')
        .map((item: any) => ({ value: item, label: CourseStatus[item] }))
)
const optionSelected = ref(2)

const handleClick = () => {
    console.log('click')
}

onMounted(async () => {
    try {
        const response = await getCourseByQuery({})
        console.log(response)
        courses.value = response.data
    } catch (error) {
        showToast('Something went wrong. Please try again later', ToastType.ERROR)
    }
})
</script>

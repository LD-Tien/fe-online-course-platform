<template>
    <div>
        <el-select placeholder="Course status" style="width: 240px">
            <el-option
                v-for="item in [{ value: 1, label: 'label' }]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </el-select>
        <el-input style="width: 240px" placeholder="Type something">
            <template #prefix>
                <el-icon class="el-input__icon"><search /></el-icon>
            </template>
        </el-input>
    </div>
    <el-table :data="courses" style="width: 100%">
        <el-table-column fixed prop="id" label="ID" width="150" />
        <el-table-column fixed prop="course_name" label="Course name" width="300" />
        <el-table-column prop="thumbnail" label="Thumbnail" width="120">
            <template #default="scope">
                <el-image
                    style="width: 100px; height: 100px"
                    :src="'http://localhost:8000' + scope.row.thumbnail"
                    fit="cover"
                />
            </template>
        </el-table-column>
        <el-table-column prop="price" label="Price" width="120" />
        <el-table-column prop="status" label="Status" width="200" />
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
    <el-pagination background layout="prev, pager, next" :total="1000" />
</template>

<script lang="ts" setup>
import type { Course } from '@/api/modules/course/types'
import { getCoursesPaginate } from '@/api/modules/moderation'
import { ToastType } from '@/types'
import { showToast } from '@/utils/toastHelper'
import dayjs from 'dayjs'

const handleClick = () => {
    console.log('click')
}

const courses = ref<Course[]>([])

onMounted(async () => {
    try {
        const response = await getCoursesPaginate()
        courses.value = response.data.courses
    } catch (error) {
        showToast('Something went wrong. Please try again later', ToastType.ERROR)
    }
})
</script>

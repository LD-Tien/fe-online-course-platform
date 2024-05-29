<template>
    <div v-if="store.state.loading.isLoading">
        <el-skeleton :rows="5" animated />
    </div>
    <div v-else class="flex flex-col gap-2 p-2">
        <div class="flex justify-end gap-2">
            <el-button @click="dialogFormVisible = true" type="primary">Add New Course</el-button>
            <el-dialog v-model="dialogFormVisible" title="Create course" width="500">
                <el-form :model="createCourseForm">
                    <el-form-item label="Course name" label-with="140px">
                        <el-input v-model="createCourseForm.course_name" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="Category" label-with="140px">
                        <el-select
                            v-model="createCourseForm.category_id"
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
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="handleCreateCourse"> Create </el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
        <div class="flex flex-col gap-2">
            <el-table :data="tableData">
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
                <el-table-column fixed="right" label="Operations" width="120">
                    <template #default="scope">
                        <el-button
                            type="primary"
                            size="small"
                            @click="
                                $router.push({
                                    name: 'instructor-course-editor',
                                    params: { courseId: scope.row.id }
                                })
                            "
                            >Edit
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next" :total="1000" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getAllCategories } from '@/api/modules/category'
import type { Category } from '@/api/modules/category/types'
import { createCourse, getCoursesPaginate } from '@/api/modules/course'
import type { Course } from '@/api/modules/course/types'
import dayjs from 'dayjs'

const tableData = ref<Course[]>([])
const categories = ref<Category[]>([])
const dialogFormVisible = ref<boolean>(false)
const createCourseForm = reactive<Course>({
    course_name: '',
    category_id: 0
})
const router = useRouter()
const store = useStore()

const handleClick = () => {
    console.log('click')
}

const handleCreateCourse = async () => {
    dialogFormVisible.value = false
    const response: any = await createCourse(createCourseForm)
    tableData.value.push(response.data)
    router.push({ name: 'instructor-course-editor', params: { courseId: response.data.id } })
}

onMounted(async () => {
    store.state.loading.isLoading = true
    const [coursesData, categoriesData] = await Promise.all([
        getCoursesPaginate(),
        getAllCategories()
    ])

    tableData.value = coursesData.data.courses
    categories.value = categoriesData.data
    createCourseForm.category_id = categories.value[0].id ?? 0
    store.state.loading.isLoading = false
})
</script>

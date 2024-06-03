<template>
    <div class="flex flex-col gap-2 p-2">
        <div class="flex justify-end gap-2">
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
                <el-pagination
                    class="ml-auto"
                    background
                    :current-page="metaData.current_page"
                    :page-count="metaData.last_page"
                    :page-size="metaData.per_page"
                    :total="metaData.total"
                    @current-change="handleCurrentChange"
                />
                <el-button type="primary" @click="dialogFormVisible = true" small>
                    Add New Course
                </el-button>
            </div>
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
import type { Category, Meta } from '@/api/modules/category/types'
import { createCourse, getCoursesPaginate } from '@/api/modules/course'
import type { Course } from '@/api/modules/course/types'
import dayjs from 'dayjs'

const tableData = ref<Course[]>([])
const categories = ref<Category[]>([])
const dialogFormVisible = ref<boolean>(false)
const metaData = reactive<Partial<Meta>>({})
const createCourseForm = reactive<Course>({
    course_name: '',
    category_id: 0
})
const router = useRouter()
const store = useStore()

const handleCreateCourse = async () => {
    dialogFormVisible.value = false
    const response: any = await createCourse(createCourseForm)
    tableData.value.push(response.data)
    router.push({ name: 'instructor-course-editor', params: { courseId: response.data.id } })
}

const handleCurrentChange = async (val: number) => {
    store.dispatch('loading/setLoading')
    try {
        const response: any = await getCategoryByQuery({
            page: val,
            search: { searchText: searchText.value }
        })
        tableData.value = response.data
        Object.assign(metaData, response.meta)
    } catch (error) {
        ElNotification({
            title: 'Get category failed',
            message: 'Get category failed. Please try again later.',
            type: 'error',
            position: 'bottom-right'
        })
    }
    store.dispatch('loading/removeLoading')
}

const handleSearchChange = (searchText: string) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(async () => {
        store.dispatch('loading/setLoading')
        try {
            const response: any = await getCategoryByQuery({
                search: { searchText }
            })
            tableData.value = response.data
            Object.assign(metaData, response.meta)
        } catch (error) {
            ElNotification({
                title: 'Get category failed',
                message: 'Get category failed. Please try again later.',
                type: 'error',
                position: 'bottom-right'
            })
        }
        store.dispatch('loading/removeLoading')
    }, 500)
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

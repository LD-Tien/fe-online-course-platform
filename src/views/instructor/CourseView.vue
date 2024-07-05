<template>
    <div class="flex flex-col max-w-full !h-full gap-3 p-3 overflow-auto">
        <div class="flex justify-between gap-3">
            <el-input
                style="width: 240px"
                @input="handleSearchChange(searchText)"
                v-model="searchText"
                placeholder="Tìm kiếm bằng tên, id"
            >
                <template #prefix>
                    <el-icon class="el-input__icon"><search /></el-icon>
                </template>
            </el-input>
            <el-select
                v-model="optionSelected"
                @change="handleFilterStatusChange"
                class="mr-auto"
                placeholder="Trạng thái"
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
            <el-button type="primary" @click="dialogFormVisible = true" small>
                Thêm khóa học
            </el-button>
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
        <el-table v-else :data="tableData">
            <el-table-column fixed="left" prop="id" label="Mã khóa học" width="150" />
            <el-table-column prop="course_name" label="Tên khóa học" width="300" />
            <el-table-column prop="thumbnail" label="Ảnh bìa" width="120">
                <template #default="scope">
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="'http://localhost:8000' + scope.row.thumbnail"
                        fit="cover"
                    />
                </template>
            </el-table-column>
            <!-- <el-table-column prop="price" label="Price" width="120">
                <template #default="scope">
                    {{ scope.row.price === 0 ? 'Free' : scope.row.price }}
                </template>
            </el-table-column> -->
            <el-table-column prop="status" label="Trạng thái" width="200">
                <template #default="scope">
                    <el-tag>{{ CourseStatus[scope.row.status] }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Ngày tạo" width="200">
                <template #default="scope">
                    {{ dayjs(scope.row.created_at).format('YYYY-MM-DD HH:mm') }}
                </template>
            </el-table-column>
            <el-table-column label="Ngày cập nhật" width="200">
                <template #default="scope">
                    {{ dayjs(scope.row.updated_at).format('YYYY-MM-DD HH:mm') }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="" width="300">
                <template #default="scope">
                    <div class="flex">
                        <el-button
                            type="primary"
                            size="small"
                            @click="
                                $router.push({
                                    name: 'instructor-course-editor',
                                    params: { courseId: scope.row.id }
                                })
                            "
                        >
                            Chi tiết
                        </el-button>
                        <el-popconfirm
                            title="Are you sure to delete this?"
                            @confirm="handleDelete(scope.$index, scope.row)"
                        >
                            <template #reference>
                                <el-button
                                    v-if="scope.row.status === CourseStatus.DRAFT"
                                    size="small"
                                    type="danger"
                                >
                                    Xóa khóa học
                                </el-button>
                                <el-button
                                    v-if="scope.row.status === CourseStatus.UNDER_REVIEW"
                                    size="small"
                                    type="warning"
                                >
                                    Hủy yêu cầu duyệt
                                </el-button>
                                <el-button
                                    v-if="scope.row.status === CourseStatus.PUBLISHED"
                                    size="small"
                                    type="danger"
                                >
                                    Gỡ khóa học
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogFormVisible" title="Tạo khóa học" width="500">
            <el-form :model="createCourseForm">
                <el-form-item label="Tên khóa học" label-with="140px">
                    <el-input v-model="createCourseForm.course_name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Thể loại" label-with="140px">
                    <el-select
                        v-model="createCourseForm.category_id"
                        placeholder="Vui lòng chọn thể loại"
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
                    <el-button @click="dialogFormVisible = false">Hủy</el-button>
                    <el-button type="primary" @click="handleCreateCourse"> Tạo </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { category } from '@/api/modules/common/category'
import type { Category, Meta } from '@/api/modules/admin/category/types'
import { createCourse, getCourseByQuery } from '@/api/modules/instructor/course'
import { CourseStatus, type Course } from '@/api/modules/instructor/course/types'
import dayjs from 'dayjs'

const tableData = ref<Course[]>([])
const categories = ref<Category[]>([])
const dialogFormVisible = ref<boolean>(false)
const searchText = ref('')
const metaData = reactive<Partial<Meta>>({})
const optionsFilterByStatus = ref(
    Object.values(CourseStatus)
        .filter((item) => typeof item === 'number')
        .map((item: any) => ({ value: item, label: CourseStatus[item] }))
)
const optionSelected = ref()
const createCourseForm = reactive<Course>({
    course_name: '',
    category_id: 0
})
const router = useRouter()
const store = useStore()
const pageLimit = ref(8)
let timeoutId: any = null

const handleCreateCourse = async () => {
    dialogFormVisible.value = false
    const response: any = await createCourse(createCourseForm)
    router.push({ name: 'instructor-course-editor', params: { courseId: response.data.id } })
}

const handleDelete = async (index: number, row: Course) => {
    console.log(row.id)
}

const handleCurrentPageChange = async (val: number) => {
    store.dispatch('loading/setLoading')
    try {
        const response: any = await getCourseByQuery({
            page: val,
            limit: 5,
            search: { searchText: searchText.value }
        })
        tableData.value = response.data
        Object.assign(metaData, response.meta)
    } catch (error) {
        ElNotification({
            title: 'Get course failed',
            message: 'Get course failed. Please try again later.',
            type: 'error',
            position: 'bottom-right'
        })
    }
    store.dispatch('loading/removeLoading')
}

const handleFilterStatusChange = async () => {
    store.dispatch('loading/setLoading')
    try {
        const response: any = await getCourseByQuery({
            limit: pageLimit.value,
            search: { searchText: searchText.value },
            filters: {
                status: optionSelected.value
            }
        })
        tableData.value = response.data
        Object.assign(metaData, response.meta)
    } catch (error) {
        ElNotification({
            title: 'Get course failed',
            message: 'Get course failed. Please try again later.',
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
            const response: any = await getCourseByQuery({
                limit: pageLimit.value,
                search: { searchText }
            })
            tableData.value = response.data
            Object.assign(metaData, response.meta)
        } catch (error) {
            ElNotification({
                title: 'Get course failed',
                message: 'Get course failed. Please try again later.',
                type: 'error',
                position: 'bottom-right'
            })
        }
        store.dispatch('loading/removeLoading')
    }, 500)
}

onMounted(async () => {
    store.state.loading.isLoading = true
    const [coursesData, categoriesData]: any = await Promise.all([
        getCourseByQuery({ limit: pageLimit.value }),
        category.getAllCategories()
    ])

    tableData.value = coursesData.data
    Object.assign(metaData, coursesData.meta)
    categories.value = categoriesData.data
    createCourseForm.category_id = categories.value[0].id ?? 0
    store.state.loading.isLoading = false
})
</script>

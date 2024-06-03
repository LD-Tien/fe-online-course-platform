<template>
    <div class="flex flex-col !h-full gap-3 p-3 overflow-auto">
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
            <el-button type="primary" @click="dialogCreateCategoryFormVisible = true" small>
                New Category
            </el-button>
        </div>
        <div
            v-if="store.state.loading.isLoading"
            class="z-10 el-loading-mask"
            style="display: flex; align-items: center; justify-content: center"
        >
            <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
                <loading-icon />
            </el-icon>
        </div>
        <el-table v-else :data="tableData">
            <template #empty>
                <div class="flex items-center justify-center">
                    <el-empty />
                </div>
            </template>
            <el-table-column label="Id" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Category name">
                <template #default="scope">
                    <el-tag>{{ scope.row.name }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Updated at">
                <template #default="scope">
                    {{ dayjs(scope.row.updated_at).format('DD/MM/YYYY HH:mm ') }}
                </template>
            </el-table-column>
            <el-table-column label="Created at">
                <template #default="scope">
                    {{ dayjs(scope.row.created_at).format('DD/MM/YYYY HH:mm ') }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="Operations">
                <template #default="scope">
                    <el-button
                        plain
                        @click="handleShowModalUpdate(scope.$index, scope.row)"
                        size="small"
                    >
                        Edit
                    </el-button>
                    <el-popconfirm
                        title="Are you sure to delete this?"
                        @confirm="handleDelete(scope.$index, scope.row)"
                    >
                        <template #reference>
                            <el-button size="small" type="danger">Delete</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogUpdateCategoryFormVisible" title="Update category" width="500">
            <el-form ref="formUpdateCategoryRef" :model="updateCategoryForm">
                <el-form-item
                    label="Category name"
                    prop="name"
                    :rules="[{ required: true, message: 'Category name is required' }]"
                    :label-width="formLabelWidth"
                >
                    <el-input v-model="updateCategoryForm.name" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button
                        :loading="isLoading"
                        @click="dialogUpdateCategoryFormVisible = false"
                    >
                        Cancel
                    </el-button>
                    <el-button
                        :loading="isLoading"
                        type="primary"
                        @click="handleEdit(formUpdateCategoryRef)"
                    >
                        Save
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog
            v-model="dialogCreateCategoryFormVisible"
            title="Create new category"
            width="500"
        >
            <el-form ref="formRef" :model="createCategoryForm">
                <el-form-item
                    label="Category name"
                    prop="name"
                    :rules="[{ required: true, message: 'Category name is required' }]"
                    :label-width="formLabelWidth"
                >
                    <el-input v-model="createCategoryForm.name" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button
                        :loading="isLoading"
                        @click="dialogCreateCategoryFormVisible = false"
                    >
                        Cancel
                    </el-button>
                    <el-button :loading="isLoading" type="primary" @click="handleCreate(formRef)">
                        Create
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import {
    createCategory,
    deleteCategory,
    getCategoryByQuery,
    updateCategory
} from '@/api/modules/category'
import type { Meta, Category } from '@/api/modules/category/types'

import { reactive, ref } from 'vue'
import { dayjs, type FormInstance } from 'element-plus'
import { Loading as LoadingIcon } from '@element-plus/icons-vue'
import store from '@/store'
const dialogUpdateCategoryFormVisible = ref(false)
const dialogCreateCategoryFormVisible = ref(false)
const formRef = ref()
const formUpdateCategoryRef = ref()
const searchText = ref('')
const tableData = ref<Category[]>([])
const metaData = reactive<Partial<Meta>>({})
const isLoading = ref(false)
const formLabelWidth = '140px'
let timeoutId: any = null

const createCategoryForm = reactive({
    name: ''
})

const updateCategoryForm = reactive({
    id: undefined,
    name: ''
})

const indexUpdate = ref<number>(0)

const handleCreate = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    if (!createCategoryForm.name.trim()) {
        createCategoryForm.name = ''
        return
    }

    try {
        isLoading.value = true

        formEl.validate(async (valid) => {
            if (valid) {
                const response: any = await createCategory(createCategoryForm)
                const newData: any = await getCategoryByQuery({})
                tableData.value = newData.data
                ElNotification({
                    title: 'Create success',
                    message: response.message,
                    type: 'success',
                    position: 'bottom-right'
                })
                createCategoryForm.name = ''
                dialogCreateCategoryFormVisible.value = false
            } else {
                console.log('error submit!')
            }
            isLoading.value = false
        })
    } catch (error) {
        ElNotification({
            title: 'Create failed',
            message: 'Create failed. Please try again later.',
            type: 'error',
            position: 'bottom-right'
        })
        isLoading.value = false
    }
}

const handleShowModalUpdate = (index: number, category: Category) => {
    Object.assign(updateCategoryForm, category)
    dialogUpdateCategoryFormVisible.value = true
    indexUpdate.value = index
}

const handleEdit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    if (!updateCategoryForm.name.trim()) {
        updateCategoryForm.name = ''
        return
    }

    try {
        isLoading.value = true
        formEl.validate(async (valid) => {
            if (valid) {
                console.log('hello')
                const response: any = await updateCategory(updateCategoryForm)
                tableData.value[indexUpdate.value] = response.data
                ElNotification({
                    title: 'Update success',
                    message: response.message,
                    type: 'success',
                    position: 'bottom-right'
                })
                updateCategoryForm.name = ''
                dialogUpdateCategoryFormVisible.value = false
            } else {
                console.log('error submit!')
            }
            isLoading.value = false
        })
    } catch (error) {
        ElNotification({
            title: 'Update failed',
            message: 'Update failed. Please try again later.',
            type: 'error',
            position: 'bottom-right'
        })
        isLoading.value = false
    }
}

const handleDelete = async (index: number, row: Category) => {
    if (row.id) {
        try {
            const response: any = await deleteCategory(row.id)
            const newData: any = await getCategoryByQuery({})
            tableData.value = newData.data
            Object.assign(metaData, newData.meta)
            ElNotification({
                title: 'Delete success',
                message: response.message,
                type: 'success',
                position: 'bottom-right'
            })
        } catch (error) {
            ElNotification({
                title: 'Delete failed',
                message: 'Delete failed. Please try again later.',
                type: 'error',
                position: 'bottom-right'
            })
        }
    }
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
    store.dispatch('loading/setLoading')
    try {
        const response: any = await getCategoryByQuery({})
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
})
</script>

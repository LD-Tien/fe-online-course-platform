<template>
    <div>
        <el-form
            ref="formRef"
            style="max-width: 600px"
            :model="createCategoryForm"
            label-width="auto"
            class="demo-ruleForm"
        >
            <div class="flex gap-2">
                <el-form-item
                    prop="name"
                    :rules="[{ required: true, message: 'category name is required' }]"
                >
                    <el-input
                        v-model.number="createCategoryForm.name"
                        type="text"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(formRef)">Add</el-button>
                    <el-button @click="resetForm(formRef)">Reset</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
    <div class="flex flex-col gap-2">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="id" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="name" width="180">
                <template #default="scope">
                    <el-tag>{{ scope.row.name }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Operations">
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
        <el-pagination background layout="prev, pager, next" :total="1000" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="Update category" width="500">
        <el-form :model="updateCategoryForm">
            <el-form-item label="Category name" :label-width="formLabelWidth">
                <el-input v-model="updateCategoryForm.name" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handleEdit(updateCategoryForm)"> Save </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import {
    createCategory,
    deleteCategory,
    getCategoriesPaginate,
    updateCategory
} from '@/api/modules/category'
import type { Category } from '@/api/modules/category/types'
import { ToastType } from '@/types'
import { showToast } from '@/utils/toastHelper'

import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const formRef = ref<FormInstance>()

const createCategoryForm = reactive({
    name: ''
})

const updateCategoryForm = reactive({
    id: undefined,
    name: ''
})

const indexUpdate = ref<number>(0)

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            const response: any = await createCategory(createCategoryForm)
            tableData.value.push(response.data)
            showToast(response.message, ToastType.SUCCESS)
        } else {
            console.log('error submit!')
        }
    })
}

const handleShowModalUpdate = (index: number, category: Category) => {
    Object.assign(updateCategoryForm, category)
    dialogFormVisible.value = true
    console.log(index)
    indexUpdate.value = index
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const handleEdit = async (categoryUpdate: Category) => {
    const response: any = await updateCategory(categoryUpdate)
    tableData.value[indexUpdate.value] = response.data
    showToast(response.message, ToastType.SUCCESS)
    dialogFormVisible.value = false
}

const handleDelete = async (index: number, row: Category) => {
    if (row.id) {
        const response: any = await deleteCategory(row.id)
        tableData.value = tableData.value.filter((item) => item.id !== row.id)
        showToast(response.message, ToastType.SUCCESS)
    }
}

const tableData = ref<Category[]>([])

onMounted(async () => {
    const response = await getCategoriesPaginate()
    tableData.value = response.data
    console.log(await getCategoriesPaginate())
})
</script>

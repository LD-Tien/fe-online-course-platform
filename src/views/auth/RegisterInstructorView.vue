<template>
    <el-row justify="center">
        <el-col :span="12" class="register-container">
            <div style="display: block; width: 175px; margin: auto">
                <base-icon name="logo-icon" />
            </div>
            <h2>Become an instructor</h2>
            <el-avatar shape="circle" :size="150" src="" />
            <el-form
                size="large"
                label-position="top"
                ref="ruleFormRef"
                :model="ruleForm"
                status-icon
                :rules="rules"
                label-width="auto"
                class="demo-ruleForm"
            >
                <el-form-item label="Email" prop="email">
                    <el-input prefix-icon="Message" v-model="ruleForm.email" type="email" autocomplete="off" placeholder="enter your email" />
                </el-form-item>
                <el-form-item label="Password" prop="pass">
                    <el-input
                        prefix-icon="Lock"
                        v-model="ruleForm.pass"
                        type="password"
                        autocomplete="off"
                        placeholder="enter your password"
                        show-password
                    />
                </el-form-item>
                <el-form-item label="Confirm password" prop="checkPass">
                    <el-input
                        prefix-icon="Lock"
                        v-model="ruleForm.checkPass"
                        type="password"
                        autocomplete="off"
                        placeholder="enter your confirm password"
                        show-password
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)"> Sign Up </el-button>
                    <div class="flex-grow"></div>
                    <el-button type="primary" link><router-link to="/login">Log In</router-link> </el-button>
                    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { callRegisterInstructor } from '@/api/api'

const ruleFormRef = ref<FormInstance>()
let editor = ClassicEditor
let editorData = ''
let editorConfig = {}

const validateEmail = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the email'))
    } else if (!value.toLocaleLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        callback(new Error('Please entered valid format email'))
    }
    callback()
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else {
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass')
        }
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password again'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    email: '',
    pass: '',
    checkPass: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    email: [{ validator: validateEmail, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            await callRegisterInstructor({ role: 3 })
                .then((res) => {
                    ElMessage({
                        message: res.message,
                        type: 'success'
                    })
                })
                .catch((err) => console.log('==> error when call register instructor', err))
            console.log('submit!')
        } else {
            console.log('error submit!')
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style>
.register-container {
    margin-top: calc(50vh * 0.5 - 50vh * 0.25);
}

.flex-grow {
    flex-grow: 1;
}
</style>

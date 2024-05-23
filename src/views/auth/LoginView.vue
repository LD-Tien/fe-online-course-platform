<template>
    <div class="login-form">
        <div style="display: block; width: 175px; margin: auto">
            <base-icon name="logo-light" />
        </div>
        <h2 class="text-2xl">Log In</h2>
        <el-form
            size="large"
            label-position="top"
            ref="ruleFormRef"
            style="max-width: 600px"
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
                    v-model="ruleForm.password"
                    type="password"
                    autocomplete="off"
                    placeholder="enter your password"
                    show-password
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)" :loading="isLoading"> Log In </el-button>
                <el-button type="primary" link><router-link to="/register">Sign Up</router-link> </el-button>
                <div class="flex-grow"></div>
                <el-button link type="primary">
                    <RouterLink to="/forgot-password"> Forgot your password? </RouterLink>
                </el-button>
            </el-form-item>
        </el-form>
        <el-divider content-position="center">Or</el-divider>
        <el-button style="width: 100%" size="large">
            <el-space>
                <base-icon name="google" />
                <span>Log in with Google</span>
            </el-space>
        </el-button>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { RouterLink, useRouter } from 'vue-router'
import { callLogin } from '@/api/api'

const router = useRouter()
const ruleFormRef = ref<FormInstance>()
let isLoading = ref<boolean>(false)

const validateEmail = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the email'))
    } else if (!value.toLocaleLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        callback(new Error('Please entered valid format email'))
    }
    callback()
}

const validatePass = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    }
    if (value.length < 8) {
        callback(new Error('Password must have at least 8 characters'))
    }
    callback()
}

const ruleForm = reactive({
    email: '',
    password: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
    password: [{ validator: validatePass, trigger: 'blur' }],
    email: [{ validator: validateEmail, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        isLoading.value = true
        if (valid) {
            await callLogin(ruleForm)
                .then((res) => {
                    ElMessage({
                        message: res.message,
                        type: 'success'
                    })
                    localStorage.setItem('access_token', res.data.accessToken)
                    router.push('/')
                })
                .catch((err) => console.log('==> Error callLogin: ', err))
            console.log('submit!')
        } else {
            console.log('error submit!')
        }
        isLoading.value = false
    })
}
</script>

<style>
.login-form {
    margin: calc(50vh * 0.5 - 50vh * 0.25) auto;
    padding: 12px;
    max-width: 400px;
}

.flex-grow {
    flex-grow: 1;
}
</style>

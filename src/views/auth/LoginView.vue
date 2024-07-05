<template>
    <div class="login-form">
        <router-link :to="{ name: 'home' }" style="display: block; width: 175px; margin: auto">
            <base-icon name="logo-light" />
        </router-link>
        <h2 class="text-2xl">Đăng nhập</h2>
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
                <el-input
                    prefix-icon="Message"
                    v-model="ruleForm.email"
                    type="email"
                    autocomplete="off"
                    placeholder="Nhập email"
                />
            </el-form-item>
            <el-form-item label="Password" prop="pass">
                <el-input
                    prefix-icon="Lock"
                    v-model="ruleForm.password"
                    type="password"
                    autocomplete="off"
                    placeholder="Nhật mật khẩu"
                    show-password
                />
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="submitForm(ruleFormRef)"
                    :loading="store.state.loading.isLoading"
                >
                    Đăng nhập
                </el-button>
                <el-button type="primary" link
                    ><router-link :to="{ name: 'register' }">Đăng ký</router-link>
                </el-button>
                <div class="flex-grow"></div>
                <el-button link type="primary">
                    <RouterLink :to="{ name: 'forgot-password' }"> Quên mật khẩu? </RouterLink>
                </el-button>
            </el-form-item>
        </el-form>
        <!-- <el-divider content-position="center">Or</el-divider>
        <el-button style="width: 100%" size="large">
            <el-space>
                <base-icon name="google" />
                <span>Log in with Google</span>
            </el-space>
        </el-button> -->
    </div>
</template>

<script setup lang="ts">
import { ToastType } from '@/types'
import { showToast } from '@/utils/toastHelper'
import type { FormInstance, FormRules } from 'element-plus'
import store from '@/store'
import { UserRole } from '@/api/modules/auth/types'

const router = useRouter()
const ruleFormRef = ref<FormInstance>()

const validateEmail = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the email'))
    } else if (
        !value
            .toLocaleLowerCase()
            .match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    ) {
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
        store.state.loading.isLoading = true
        if (valid) {
            try {
                await store.dispatch('auth/login', ruleForm)
                store.state.loading.isLoading = false
                switch (store.state.auth.user?.role) {
                    case UserRole.ADMIN:
                        router.push({ name: 'admin-dashboard', replace: true })
                        break
                    case UserRole.MODERATOR:
                        router.push({ name: 'moderator-dashboard', replace: true })
                        break
                    case UserRole.INSTRUCTOR:
                        router.push({ name: 'instructor-course', replace: true })
                        break
                    default:
                        router.push({ name: 'home', replace: true })
                }
            } catch (error: any) {
                //@ts-ignore
                showToast(Object.values(Object.values(error))[0][0] as string, ToastType.ERROR)
            }
        } else {
            console.log('error submit!')
        }
        store.state.loading.isLoading = false
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

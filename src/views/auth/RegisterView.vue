<template>
    <div class="flex flex-col gap-2 register-form">
        <div style="display: block; width: 175px; margin: auto">
            <base-icon name="logo-light" />
        </div>
        <h2 class="text-2xl">Sign Up</h2>
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
                    placeholder="enter your email"
                />
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input
                    prefix-icon="Lock"
                    v-model="ruleForm.password"
                    type="password"
                    autocomplete="off"
                    placeholder="enter your password"
                    show-password
                />
            </el-form-item>
            <el-form-item label="Confirm password" prop="password_confirmation">
                <el-input
                    prefix-icon="Lock"
                    v-model="ruleForm.password_confirmation"
                    type="password"
                    autocomplete="off"
                    placeholder="enter your confirm password"
                    show-password
                />
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="submitForm(ruleFormRef)"
                    :loading="store.state.loading.isLoading"
                >
                    Sign Up
                </el-button>
                <div class="flex-grow"></div>
                <el-button type="primary" link>
                    <router-link :to="{ name: 'login' }">Log In</router-link>
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { type FormInstance, type FormRules } from 'element-plus'

import { ToastType } from '@/types'
import { showToast } from '@/utils/toastHelper'
import store from '@/store'

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

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else {
        if (ruleForm.password_confirmation !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('password_confirmation')
        }
        callback()
    }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password again'))
    } else if (value !== ruleForm.password) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    email: '',
    password: '',
    password_confirmation: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
    password: [{ validator: validatePass, trigger: 'blur' }],
    password_confirmation: [{ validator: validatePass2, trigger: 'blur' }],
    email: [{ validator: validateEmail, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.validate(async (valid) => {
        store.state.loading.isLoading = true

        if (valid) {
            const name = ruleForm.email.split('@')[0]

            try {
                const response = await store.dispatch('auth/register', { ...ruleForm, name })
                store.commit('auth/setUserProfile', response.data)
                router.push({ name: 'verify-email-notification' })
            } catch (error: any) {
                showToast(Object.values(error)[0][0] as string, ToastType.ERROR)
            }
        } else {
            console.log('error submit!')
        }

        store.state.loading.isLoading = false
    })
}
</script>

<style>
.register-form {
    margin: calc(50vh * 0.5 - 50vh * 0.25) auto;
    padding: 12px;
    max-width: 400px;
}

.flex-grow {
    flex-grow: 1;
}
</style>

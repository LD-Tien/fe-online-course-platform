<template>
    <div class="login-form">
        <div style="display: block; width: 175px; margin: auto">
            <base-icon name="logo-light" />
        </div>
        <h2>Forgot your password</h2>
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
            <el-form-item label="Please enter the email you use to sign in to SkillHub" prop="email">
                <el-input prefix-icon="Message" v-model="ruleForm.email" type="email" autocomplete="off" placeholder="enter your email" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)"> Request password reset </el-button>
                <el-button type="primary" link><router-link to="/login" replace>Back to sign in</router-link> </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { RouterLink } from 'vue-router'

const ruleFormRef = ref<FormInstance>()

const validateEmail = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the email'))
    } else if (!value.toLocaleLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        callback(new Error('Please entered valid format email'))
    }
    callback()
}

const ruleForm = reactive({
    email: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
    email: [{ validator: validateEmail, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
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
.login-form {
    margin: calc(50vh * 0.5 - 50vh * 0.25) auto;
    padding: 12px;
    max-width: 400px;
}

.flex-grow {
    flex-grow: 1;
}
</style>

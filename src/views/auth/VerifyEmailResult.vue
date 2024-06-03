<template>
    <el-result
        v-if="verifyResult === VerifyEmailResult.SUCCESS"
        icon="success"
        title="Verify email successfully"
    >
        <template #extra>
            <el-button type="primary" @click="$router.push({ name: 'home' })">HOME</el-button>
        </template>
    </el-result>
    <el-result
        v-else-if="verifyResult === VerifyEmailResult.EMAIL_HAS_VERIFIED"
        icon="success"
        title="Email has been verified"
    >
        <template #extra>
            <el-button type="primary" @click="$router.push({ name: 'home' })">HOME</el-button>
        </template>
    </el-result>
    <el-result
        v-else
        icon="error"
        title="Error when verify email"
        sub-title="Please resend verify email in your profile"
    >
    </el-result>
</template>
<script setup lang="ts">
import { VerifyEmailResult } from '@/constants'
const route = useRoute()
const verifyResult = parseInt(route.params.result as string)
</script>

<template>
    <el-container>
        <el-header style="padding: 0">
            <LearnHeader />
        </el-header>
        <el-row :gutter="0">
            <el-col :span="18">
                <el-main style="padding: 0">
                    <slot />
                    <router-view />
                </el-main>
            </el-col>
            <el-col :span="6">
                <learn-aside />
            </el-col>
        </el-row>
        <el-footer style="padding: 0">
            <AppFooter />
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
import LearnAside from '@/components/organisms/LearnAside.vue'
import LearnHeader from '@/components/organisms/LearnHeader.vue'
</script>

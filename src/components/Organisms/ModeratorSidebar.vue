<template>
    <el-menu
        default-active="2"
        class="flex flex-col h-screen min-w-full p-3 el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
    >
        <base-icon class="self-center" name="logo-light" />
        <el-menu-item index="1">
            <el-icon><icon-menu /></el-icon>
            <router-link :to="{ name: 'moderation-dashboard' }"><span>Dashboard</span></router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <router-link :to="{ name: 'moderation-course' }">
                <span>Moderation course</span>
            </router-link>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import { Menu as IconMenu } from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {}
const handleClose = (key: string, keyPath: string[]) => {}
</script>

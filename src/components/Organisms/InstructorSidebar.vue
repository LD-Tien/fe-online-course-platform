<template>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo p-2 h-screen w-[200px]"
        @open="handleOpen"
        @close="handleClose"
    >
        <base-icon name="logo-light" />
        <el-menu-item index="1">
            <el-icon><icon-menu /></el-icon>
            <router-link :to="{ name: 'instructor-dashboard' }"><span>Dashboard</span></router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <router-link :to="{ name: 'instructor-course' }"><span>Course</span></router-link>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import { Menu as IconMenu } from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {}
const handleClose = (key: string, keyPath: string[]) => {}
</script>

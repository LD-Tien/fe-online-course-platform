<template>
    <el-menu class="el-menu-vertical-demo w-[300px] min-w-[300px]" :default-active="activeIndex">
        <img
            class="p-3"
            src="@/assets/img/logo-light.png"
            @click="$router.push({ name: 'instructor-dashboard' })"
        />
        <el-menu-item
            index="instructor-course"
            @click="$router.push({ name: 'instructor-course' })"
        >
            <el-icon><icon-menu /></el-icon>
            <span>Quản lý khóa học</span>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import { Menu as IconMenu } from '@element-plus/icons-vue'
const route = useRoute()
const activeIndex = ref<string>(route.name as string)
</script>

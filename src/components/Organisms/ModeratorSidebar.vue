<template>
    <el-menu class="el-menu-vertical-demo w-[300px] min-w-[300px]" :default-active="activeIndex">
        <img
            class="p-3"
            src="@/assets/img/logo-light.png"
            @click="$router.push({ name: 'moderator-dashboard' })"
        />
        <el-menu-item
            index="moderation-course"
            @click="$router.push({ name: 'moderation-course' })"
        >
            <el-icon><icon-menu /></el-icon>
            <span>Kiểm duyệt khóa học</span>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import { Menu as IconMenu } from '@element-plus/icons-vue'
const route = useRoute()
const activeIndex = ref<string>(route.name as string)
</script>

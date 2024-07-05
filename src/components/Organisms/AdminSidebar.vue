<template>
    <el-menu class="el-menu-vertical-demo w-[300px]" :default-active="activeIndex">
        <img
            class="p-3"
            src="@/assets/img/logo-light.png"
            @click="$router.push({ name: 'admin-dashboard' })"
        />
        <el-menu-item index="admin-category" @click="$router.push({ name: 'admin-category' })">
            <el-icon><icon-menu /></el-icon>
            <span>Quản lý thể loại</span> </el-menu-item
        ><el-menu-item index="admin-user-manager" @click="$router.push({ name: 'admin-category' })">
            <el-icon><icon-menu /></el-icon>
            <span>Quản lý tài khoản</span>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import { Menu as IconMenu } from '@element-plus/icons-vue'
const route = useRoute()
const activeIndex = ref<string>(route.name as string)
</script>

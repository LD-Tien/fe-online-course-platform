<template>
    <div style="display: flex; height: inherit; align-items: center; padding: 0 24px">
        <el-space size="large">
            <base-icon name="logo-light" />
            <el-button link> Web Design for Web Developers: Build Beautiful Websites! </el-button>
        </el-space>
        <div class="flex-grow"></div>
        <el-space size="large">
            <el-text>Your progress</el-text>
            <el-progress :width="50" type="circle" :percentage="25" />
        </el-space>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<style>
.flex-grow {
    flex-grow: 1;
}
</style>

<template>
    <el-menu default-active="1-1" class="el-menu-vertical-demo">
        <el-sub-menu index="1">
            <template #title>
                <el-space direction="vertical" fill wrap style="width: 100%;">
                    <el-text size="large" tag="b">Session 1: Course Introduce</el-text>
                    <el-text size="small">0/3 | 9 minutes</el-text>
                </el-space>
            </template>
            <el-menu-item index="1-1">
                <el-space size="small" direction="vertical" fill style="width: 100%;">
                    <p>1. Welcome To This Course</p>
                    <el-space :size="0">
                        <el-icon>
                            <video-play />
                        </el-icon>
                        <p>3m</p>
                    </el-space>
                </el-space>
            </el-menu-item>
            <el-menu-item index="1-2">
                <el-space size="small" direction="vertical" fill style="width: 100%;">
                    <p>2. Welcome To This Course</p>
                    <el-space :size="0">
                        <el-icon>
                            <video-play />
                        </el-icon>
                        <p>3m</p>
                    </el-space>
                </el-space>
            </el-menu-item>
            <el-menu-item index="1-3">
                <el-space size="small" direction="vertical" fill style="width: 100%;">
                    <p>3. Welcome To This Course</p>
                    <el-space :size="0">
                        <el-icon>
                            <video-play />
                        </el-icon>
                        <p>3m</p>
                    </el-space>
                </el-space>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup lang="ts">
import { VideoPlay } from '@element-plus/icons-vue';
</script>
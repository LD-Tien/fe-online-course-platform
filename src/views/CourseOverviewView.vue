<template>
    <el-row justify="center" :gutter="20">
        <el-col :span="20">
            <el-row :gutter="24">
                <el-col :span="24" style="margin-bottom: 20px">
                    <el-breadcrumb :separator-icon="ArrowRight">
                        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
                        <el-breadcrumb-item>Web development</el-breadcrumb-item>
                        <el-breadcrumb-item>[Basic HTML, CSS & JS]</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
                <el-col :span="16">
                    <el-space direction="vertical" fill wrap :size="0" style="width: 100%">
                        <el-image
                            fit="contain"
                            src="https://i.pinimg.com/564x/d6/19/a6/d619a64645bf2cbf8f32f9063cf29ac5.jpg"
                            class="rounded-lg"
                        >
                            <template #error>
                                <div class="image-slot">
                                    <el-icon><icon-picture /></el-icon>
                                </div>
                            </template>
                        </el-image>
                        <h2 class="text-2xl font-bold">[Basic HTML, CSS & JS]</h2>
                        <el-rate
                            v-model="value"
                            size="large"
                            disabled
                            show-score
                            score-template="{value} (100 ratings) 1000 students"
                        />
                        <el-space
                            ><el-text size="default">Create by: LD-Tien</el-text>
                            <el-text size="default">Last updated 3/2024</el-text></el-space
                        >
                    </el-space>
                    <el-divider />
                    <el-row>
                        <el-col :span="24">
                            <el-space fill direction="vertical" style="width: 100%">
                                <h3>Description</h3>
                                <el-text size="default"
                                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui officia deserunt mollit anim id est
                                    laborum.</el-text
                                >
                            </el-space>
                        </el-col>
                    </el-row>
                    <el-divider />
                    <el-row>
                        <el-col :span="24">
                            <el-space fill direction="vertical" style="width: 100%">
                                <h3>Course content</h3>
                                <el-text>7 sections • 53 lectures • 12h 14m total length</el-text>
                                <div class="demo-collapse">
                                    <el-collapse>
                                        <el-collapse-item name="1">
                                            <template #title>
                                                <el-text size="large" tag="b">Introduction</el-text>
                                                <div class="flex-grow"></div>
                                                <el-space style="margin-right: 8px">
                                                    <el-text>2 lectures - 60m</el-text>
                                                </el-space>
                                            </template>
                                            <el-space direction="vertical" fill style="width: 100%">
                                                <div
                                                    style="
                                                        display: flex;
                                                        align-items: center;
                                                        gap: 8px;
                                                    "
                                                >
                                                    <el-icon>
                                                        <VideoPlay />
                                                    </el-icon>
                                                    <el-text
                                                        >Pre-checks. Environment Setup
                                                    </el-text>
                                                    <div class="flex-grow"></div>
                                                    <el-button type="primary" link
                                                        >Preview</el-button
                                                    >
                                                    <el-text>00:30</el-text>
                                                </div>
                                                <div
                                                    style="
                                                        display: flex;
                                                        align-items: center;
                                                        gap: 8px;
                                                    "
                                                >
                                                    <el-icon>
                                                        <VideoPlay />
                                                    </el-icon>
                                                    <el-text
                                                        >Pre-checks. Environment Setup
                                                    </el-text>
                                                    <div class="flex-grow"></div>
                                                    <el-button type="primary" link
                                                        >Preview</el-button
                                                    >
                                                    <el-text>00:30</el-text>
                                                </div>
                                            </el-space>
                                        </el-collapse-item>
                                        <el-collapse-item name="2">
                                            <template #title>
                                                <el-text size="large" tag="b"
                                                    >NodeJS backend</el-text
                                                >
                                                <div class="flex-grow"></div>
                                                <el-space style="margin-right: 8px">
                                                    <el-text>2 lectures - 60m</el-text>
                                                </el-space>
                                            </template>
                                            <el-space direction="vertical" fill style="width: 100%">
                                                <div
                                                    style="
                                                        display: flex;
                                                        align-items: center;
                                                        gap: 8px;
                                                    "
                                                >
                                                    <el-icon>
                                                        <VideoPlay />
                                                    </el-icon>
                                                    <el-text
                                                        >Pre-checks. Environment Setup
                                                    </el-text>
                                                    <div class="flex-grow"></div>
                                                    <el-button type="primary" link
                                                        >Preview</el-button
                                                    >
                                                    <el-text>00:30</el-text>
                                                </div>
                                                <div
                                                    style="
                                                        display: flex;
                                                        align-items: center;
                                                        gap: 8px;
                                                    "
                                                >
                                                    <el-icon>
                                                        <VideoPlay />
                                                    </el-icon>
                                                    <el-text
                                                        >Pre-checks. Environment Setup
                                                    </el-text>
                                                    <div class="flex-grow"></div>
                                                    <el-button type="primary" link
                                                        >Preview</el-button
                                                    >
                                                    <el-text>00:30</el-text>
                                                </div>
                                            </el-space>
                                        </el-collapse-item>
                                    </el-collapse>
                                </div>
                            </el-space>
                        </el-col>
                    </el-row>
                    <el-divider />
                    <el-row>
                        <el-col :span="24">
                            <el-space fill direction="vertical" style="width: 100%">
                                <h3>Reviews</h3>
                            </el-space>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-space direction="vertical" fill style="width: 100%">
                        <el-space>
                            <el-text size="large" tag="b" type="danger">
                                <h1>100$</h1>
                            </el-text>
                            <el-text size="large" tag="del">300$</el-text>
                        </el-space>
                        <el-button size="large" type="primary">Add to cart</el-button>
                        <el-button size="large">Buy now</el-button>
                        <el-button size="large" type="primary">Enrolment now</el-button>
                        <router-link to="/courses/1/learn/lesson/1">
                            <el-button size="large" type="primary"
                                >Go to course</el-button
                            ></router-link
                        >
                    </el-space>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script lang="ts" setup>
import AppLayout from '@/components/templates/AppLayout.vue'
import { ArrowRight, Picture as IconPicture, VideoPlay } from '@element-plus/icons-vue'
const goBack = () => {
    console.log('go back')
}
const value = 4.5
const tableData = [
    {
        date: '2016-05-03',
        title: 'How to Download the Course Resources',
        takeTime: '00:30'
    },
    {
        date: '2016-05-02',
        title: 'How to Download the Course Resources',
        takeTime: '00:30'
    },
    {
        date: '2016-05-04',
        title: 'How to Download the Course Resources',
        takeTime: '00:30'
    },
    {
        date: '2016-05-01',
        title: 'How to Download the Course Resources',
        takeTime: '00:30'
    }
]
</script>

<style>
.flex-grow {
    flex-grow: 1;
}
</style>

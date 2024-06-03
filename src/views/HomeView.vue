<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <router-link to="/courses/1/overview">
                <el-card>
                    <img
                        src="https://i.pinimg.com/564x/d6/19/a6/d619a64645bf2cbf8f32f9063cf29ac5.jpg"
                        style="width: 100%"
                    />
                    <el-text size="large">[Basic HTML, CSS & JS]</el-text>
                    <br />
                    <el-text size="small" type="info">LD-Tien</el-text>
                    <br />
                    <el-rate v-model="value" disabled show-score score-template="{value} (100)" />
                    <br />
                    <el-text size="large">300$</el-text>
                </el-card>
            </router-link>
        </el-col>
        <el-col :span="6">
            <el-card>
                <img
                    src="https://i.pinimg.com/564x/d6/19/a6/d619a64645bf2cbf8f32f9063cf29ac5.jpg"
                    style="width: 100%"
                />
                <el-text size="large">[Basic HTML, CSS & JS]</el-text>
                <br />
                <el-text size="small" type="info">LD-Tien</el-text>
                <br />
                <el-rate v-model="value" disabled show-score score-template="{value} (100)" />
                <br />
                <el-text size="large">300$</el-text>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <img
                    src="https://i.pinimg.com/564x/d6/19/a6/d619a64645bf2cbf8f32f9063cf29ac5.jpg"
                    style="width: 100%"
                />
                <el-text size="large">[Basic HTML, CSS & JS]</el-text>
                <br />
                <el-text size="small" type="info">LD-Tien</el-text>
                <br />
                <el-rate v-model="value" disabled show-score score-template="{value} (100)" />
                <br />
                <el-text size="large">300$</el-text>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <img
                    src="https://i.pinimg.com/564x/d6/19/a6/d619a64645bf2cbf8f32f9063cf29ac5.jpg"
                    style="width: 100%"
                />
                <el-text size="large">[Basic HTML, CSS & JS]</el-text>
                <br />
                <el-text size="small" type="info">LD-Tien</el-text>
                <br />
                <el-rate v-model="value" disabled show-score score-template="{value} (100)" />
                <br />
                <el-text size="large">300$</el-text>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
const value = 3.7
</script>

<template>
    <el-row>
        <el-col :span="24">
            <el-result size="large" title="Verify your email">
                <template #icon>
                    <base-icon name="logo-light" />
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="75"
                            height="75"
                            viewBox="0 0 48 48"
                        >
                            <g
                                fill="none"
                                stroke="#209d6d"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="3.5"
                            >
                                <path d="M44 24V9H4v30h20m7-3l5 4l8-10" />
                                <path d="m4 9l20 15L44 9" />
                            </g>
                        </svg>
                    </div>
                </template>

                <template #sub-title>
                    <el-text size="large">
                        We have sent a verification link to
                        <!-- {{ user ? user.email : router.push({ name: 'login', replace: true }) }} -->
                    </el-text>
                    <br />
                    <br />
                    <el-text size="default">
                        Please check your email and click the link to active your account
                    </el-text>
                </template>
                <template #extra>
                    <el-button type="primary" size="large" icon="Message">Resend</el-button>
                    <el-button type="primary" link size="large">
                        <RouterLink :to="{ name: 'home' }">Return to Site</RouterLink>
                        <el-icon class="el-icon--right">
                            <Right />
                        </el-icon>
                    </el-button>
                </template>
            </el-result>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
const store = useStore()
const router = useRouter()
const user = store.state.auth.user
console.log('123123123')
</script>

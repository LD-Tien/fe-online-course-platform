<template>
    <div class="flex items-center justify-end w-full gap-3 px-3 py-1 border-b">
        <el-button link>
            <el-badge :value="3" class="item">
                <el-icon :size="20">
                    <Bell />
                </el-icon>
            </el-badge>
        </el-button>
        <el-divider direction="vertical" />
        <el-dropdown v-if="true" size="large" trigger="click">
            <el-button link>
                <div class="flex flex-col justify-end mr-2">
                    <el-tag size="small" type="danger"
                        ><span class="text-xs">{{
                            UserRole[store.state.auth.user?.role ?? 4]
                        }}</span></el-tag
                    >
                    <span class="text-xs">{{ store.state.auth.user?.name }}</span>
                </div>
                <el-avatar :size="35" :src="avatarPreviewSrc" />
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>Profile account</el-dropdown-item>
                    <el-dropdown-item divided
                        ><el-button type="danger" link @click="handleLogout">Log Out</el-button>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import store from '@/store'
import { UserRole } from '@/api/modules/auth/types'

const router = useRouter()

const avatarPreviewSrc = computed(() =>
    store.state.auth.user?.profile_photo_url
        ? import.meta.env.VITE_API_BASE_URL + store.state.auth.user?.profile_photo_url
        : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)

const handleLogout = async () => {
    try {
        await store.dispatch('auth/logout')
        router.push({ name: 'login' })
    } catch (error) {
        ElNotification({
            title: 'Error',
            message: 'Log out failed. Please try again later.',
            type: 'error',
            position: 'bottom-right'
        })
    }
}
</script>

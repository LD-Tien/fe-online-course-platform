<template>
    <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        :popper-offset="16"
        @select="handleSelect"
        style="padding: 0 20px"
    >
        <el-space wrap size="large" class="ml-auto">
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
                    <el-avatar
                        :size="35"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                    />
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
        </el-space>
    </el-menu>
</template>

<script lang="ts" setup>
import { ShoppingCart, Bell } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from '@/utils/toastHelper'
import { ToastType } from '@/types'

const router = useRouter()
const store = useStore()
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleLogout = async () => {
    try {
        await store.dispatch('auth/logout')
        router.push({ name: 'login' })
    } catch (error) {
        showToast('Log out fail please try again!', ToastType.ERROR)
    }
}
</script>

<style>
.flex-grow {
    flex-grow: 1;
}

a {
    text-decoration: none;
}
</style>

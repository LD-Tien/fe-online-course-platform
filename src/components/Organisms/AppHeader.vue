<template>
    <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        :popper-offset="16"
        @select="handleSelect"
        style="padding: 0 20px"
    >
        <el-space>
            <router-link :to="{ name: 'home' }"><BaseIcon name="logo-light" /></router-link>
            <el-input
                style="width: 300px"
                v-model="searchText"
                @input="handleSearchChange"
                size="default"
                placeholder="Search"
                :prefix-icon="Search"
            />
        </el-space>

        <el-space wrap class="ml-auto" trigger="click">
            <el-space :size="20">
                <el-button
                    v-if="!(store.state.auth.user?.role === UserRole.INSTRUCTOR)"
                    link
                    type="text"
                    @click="
                        $router.push({
                            name: store.state.auth.access_token ? 'register-instructor' : 'login'
                        })
                    "
                    index="3"
                    class="!ml-auto hidden-sm-and-down"
                >
                    Become an instructor
                </el-button>
                <el-button link v-if="store.state.auth.access_token">
                    <el-badge :value="3" class="item">
                        <el-icon :size="20">
                            <Bell />
                        </el-icon>
                    </el-badge>
                </el-button>
                <el-button link v-if="store.state.auth.access_token">
                    <el-badge :value="3" class="item">
                        <el-icon :size="20">
                            <ShoppingCart />
                        </el-icon>
                    </el-badge>
                </el-button>
            </el-space>
            <el-divider direction="vertical" />
            <el-dropdown size="large" v-if="store.state.auth.access_token">
                <el-button link>
                    <el-avatar :size="35" :src="avatarPreviewSrc" />
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Profile account</el-dropdown-item>
                        <el-dropdown-item>My learning</el-dropdown-item>
                        <el-dropdown-item
                            v-if="!(store.state.auth.user?.role === UserRole.INSTRUCTOR)"
                        >
                            <router-link :to="{ name: 'register-instructor' }">
                                Become an instructor
                            </router-link>
                        </el-dropdown-item>
                        <el-dropdown-item
                            v-if="store.state.auth.user?.role === UserRole.INSTRUCTOR"
                        >
                            <router-link :to="{ name: 'instructor-dashboard' }">
                                Instructor dashboard
                            </router-link>
                        </el-dropdown-item>
                        <el-dropdown-item divided>
                            <el-button type="danger" link @click="handleLogout">
                                Log Out
                            </el-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-space v-if="!store.state.auth.access_token">
                <el-button type="primary" size="default">
                    <RouterLink :to="{ name: 'login' }">Log In</RouterLink>
                </el-button>
                <el-button size="default">
                    <RouterLink :to="{ name: 'register' }">Sign Up</RouterLink>
                </el-button>
            </el-space>
        </el-space>
    </el-menu>
</template>

<script lang="ts" setup>
import { Search, ShoppingCart, Bell } from '@element-plus/icons-vue'
import { ref } from 'vue'
import store from '@/store'
import { useRouter } from 'vue-router'
import { showToast } from '@/utils/toastHelper'
import { ToastType } from '@/types'
import { UserRole } from '@/api/modules/auth/types'

const router = useRouter()
const activeIndex = ref('1')
const searchText = ref('')
let timeoutId: any = null

const avatarPreviewSrc = computed(() =>
    store.state.auth.user?.profile_photo_url
        ? import.meta.env.VITE_API_BASE_URL + store.state.auth.user?.profile_photo_url
        : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)

const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

watch(searchText, () => {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
        router.push({ name: 'search-course', replace: true, params: { keyword: searchText.value } })
    }, 500)
})

const handleSearchChange = () => {}

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

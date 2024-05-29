<template>
    <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" :popper-offset="16" @select="handleSelect" style="padding: 0 20px">
        <el-space>
            <router-link :to="{ name: 'home' }"><BaseIcon name="logo-light" /></router-link>
            <el-menu-item index="1" class="hidden-sm-and-down">Home</el-menu-item>
            <el-sub-menu index="2">
                <template #title>Category</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-input style="width: 300px" v-model="search" size="default" placeholder="Search" :prefix-icon="Search" />
        </el-space>
        <el-space wrap size="large" class="ml-auto">
            <el-space :size="20">
                <el-button link>
                    <el-badge :value="3" class="item">
                        <el-icon :size="20">
                            <Bell />
                        </el-icon>
                    </el-badge>
                </el-button>
                <el-button link>
                    <el-badge :value="3" class="item">
                        <el-icon :size="20">
                            <ShoppingCart />
                        </el-icon>
                    </el-badge>
                </el-button>
            </el-space>
            <el-divider direction="vertical" />
            <el-dropdown v-if="store.state.auth.access_token" size="large" trigger="click">
                <el-button link>
                    <el-avatar :size="35" src="https://i.docln.net/lightnovel/users/ua22791-40000776-a21c-4ddd-9f3f-81225dca585a.jpg" />
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Profile account</el-dropdown-item>
                        <el-dropdown-item>My learning</el-dropdown-item>
                        <el-dropdown-item><router-link :to="{ name: 'register-instructor' }">Become an instructor</router-link></el-dropdown-item>
                        <el-dropdown-item divided><el-button type="danger" link @click="handleLogout">Log Out</el-button></el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-space v-else>
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
import { useRouter } from 'vue-router'
import { showToast } from '@/utils/toastHelper'
import { ToastType } from '@/types'

const router = useRouter()
const store = useStore()
const search = ''
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

<template>
    <router-view />
</template>

<script setup lang="ts">
import store from '@/store'
if (localStorage.getItem('access_token')) {
    store.dispatch('auth/fetchUserProfile')
}
</script>

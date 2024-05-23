<template>
  <el-container>
    <el-header style="padding: 0">
      <AppHeader />
    </el-header>
    <el-main>
      <slot />
      <router-view />
    </el-main>
    <el-footer style="padding: 0">
      <AppFooter />
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import AppHeader from '@/components/Organisms/AppHeader.vue'
import AppFooter from '@/components/Organisms/AppFooter.vue'
</script>

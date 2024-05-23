<template>
  <LearnLayout>
    <video-player
      src="https://litter.catbox.moe/owic9s.mp4"
      type="video/mp4"
      controls
      style="width: 100%; height: 500px"
    />
    <div style="padding: 24px">
      <el-tabs class="demo-tabs">
        <el-tab-pane label="Description" name="first"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.</el-tab-pane
        >
        <el-tab-pane label="Q&A" name="second">Config</el-tab-pane>
      </el-tabs>
    </div>
  </LearnLayout>
</template>

<script setup lang="ts">
import { VideoPlayer } from '@videojs-player/vue'
import LearnLayout from '@/components/Templates/LearnLayout.vue'
</script>

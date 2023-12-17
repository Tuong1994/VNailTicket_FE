<script setup lang="ts">
import { UI } from '@/components'

const { ToastMessage } = UI
</script>

<template>
  <div class="app">
    <div class="app-content">
      <router-view />
    </div>
  </div>

  <ToastMessage />
</template>

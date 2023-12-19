<script setup lang="ts">
import { UI } from '@/components'
import PageData from '@/views/components/PageData.vue'
import PageToken from '@/views/components/PageToken.vue'

const { ToastMessage } = UI
</script>

<template>
  <PageData>
    <PageToken>
      <div class="app">
        <div class="app-content">
          <router-view />
        </div>
      </div>
    </PageToken>
  </PageData>

  <ToastMessage />
</template>

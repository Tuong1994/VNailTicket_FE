<script setup lang="ts">
import { iconName } from '@/components/UI/Icon/constant.ts'
import Icon from '@/components/UI/Icon/Icon.vue'
</script>

<template>
  <div class="table-empty">
    <Icon :iconName="iconName.BOX_ARCHIVE" :size="35" />
    <span>No Data</span>
  </div>
</template>

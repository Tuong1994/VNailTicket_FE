<script setup lang="ts">
import { UI } from '@/components'

const { Typography } = UI

const { Title } = Typography
</script>

<template>
  <div class="admin-header">
    <Title rootClassName="header-name">Admin</Title>
    <button class="header-icon">
      <span>Exit</span>
      <img src="/images/icons/Exit.png" />
    </button>
  </div>
</template>

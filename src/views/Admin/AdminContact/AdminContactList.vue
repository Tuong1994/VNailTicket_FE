<script lang="ts" setup>
import { Control } from '@/components'

const { Input } = Control
</script>

<template>
  <div class="admin-contact-list">
    <Input rootClassName="list-control" placeholder="Phone number">
      <template #label>VN Contact</template>
    </Input>
    <Input placeholder="Phone number">
      <template #label>US Contact</template>
    </Input>
  </div>
</template>

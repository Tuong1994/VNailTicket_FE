<script setup lang="ts">
import { withDefaults } from 'vue'
import type { UploadItems, UploadItem } from '@/components/Control/type'
import { iconName } from '@/components/UI/Icon/constant'
import Icon from '@/components/UI/Icon/Icon.vue'

interface UploadFilesProps {
  files: UploadItems
}

withDefaults(defineProps<UploadFilesProps>(), {
  files: () => []
})

const emits = defineEmits(['onRemove'])

const handleRemove = (file: UploadItem) => emits('onRemove', file)
</script>

<template>
  <div className="upload-items">
    <div v-for="item in files" :key="item.id" class="items-inner">
      <span>{{ item.file?.name }}</span>
      <Icon :iconName="iconName.TRASH" class="inner-icon" @click="() => handleRemove(item)" />
    </div>
  </div>
</template>

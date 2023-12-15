<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import type { SelectOptions } from '@/components/Control/type.ts'

interface TagsProps {
  selectedOptions: SelectOptions
}

const props = withDefaults(defineProps<TagsProps>(), {
  selectedOptions: () => []
})

const renderTags = computed<string>(() => {
  if (props.selectedOptions.length === 1) return props.selectedOptions[0].label
  return `${props.selectedOptions.length} +`
})
</script>

<template>
  <div class="control-tags">
    {{ renderTags }}
  </div>
</template>

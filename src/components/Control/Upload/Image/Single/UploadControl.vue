<script setup lang="ts">
import type { StyleValue } from 'vue'
import { iconName } from '@/components/UI/Icon/constant'
import Icon from '@/components/UI/Icon/Icon.vue'

interface UploadControlProps {
  controlClassName?: string
  controlStyle?: StyleValue
  disabled?: boolean
  accept?: string
}

defineProps<UploadControlProps>()

const emits = defineEmits(['onChange'])

const handleChange = (e: Event) => emits('onChange', e)
</script>

<template>
  <label :style="controlStyle" :class="['group-control', controlClassName]">
    <input type="file" class="control-input" :disabled="disabled" :accept="accept" @input="handleChange" />
    <Icon :iconName="iconName.PLUS" :size="25" rootClassName="control-icon" />
  </label>
</template>

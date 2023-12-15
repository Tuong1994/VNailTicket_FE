<script setup lang="ts">
import { computed, type StyleValue } from 'vue'
import { iconName } from '@/components/UI/Icon/constant.ts'
import Icon from '@/components/UI/Icon/Icon.vue'

interface UploadControlProps {
  controlClassName?: string
  controlStyle?: React.CSSProperties
  accept?: string
  disabled?: boolean
  hasLabel: boolean
}

defineProps<UploadControlProps>()

const emits = defineEmits(['onChange'])

const handleChange = (e: Event) => emits('onChange', e)
</script>

<template>
  <label :style="controlStyle" :class="['group-control', controlClassName]">
    <input
      type="file"
      multiple
      :accept="accept"
      :disabled="disabled"
      class="control-input"
      @input="handleChange"
    />

    <div v-if="!hasLabel" className="control-label">
      <Icon :iconName="iconName.CLOUD_UPLOAD" :size="30" class="label-icon" />
      <p>Select or drag image here</p>
    </div>

    <slot v-if="hasLabel" name="label"></slot>
  </label>
</template>

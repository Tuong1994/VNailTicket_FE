<script setup lang="ts">
import { computed, type StyleValue } from 'vue'
import type { UploadError } from '@/components/Control/type.ts'
import { iconName } from '@/components/UI/Icon/constant.ts'
import Icon from '@/components/UI/Icon/Icon.vue'

interface UploadControlProps {
  controlClassName?: string
  controlStyle?: StyleValue
  disabled?: boolean
  multiple?: boolean
  hasLabel: boolean
  dragged: boolean
  hasLabel: boolean
  error: UploadError | null
  accept: string
}

const props = defineProps<UploadControlProps>()

const emits = defineEmits(['onChange', 'onDrag', 'onDrop'])

const dragClassName = computed<string>(() => (props.dragged ? 'upload-group-dragged' : ''))

const errorClassName = computed<string>(() => (props.error?.active ? 'upload-group-error' : ''))

const disabledClassName = computed<string>(() => (props.disabled ? 'upload-group-disabled' : ''))

const handleChange = (e: Event) => emits('onChange', e)

const handleDrag = (e: DragEvent) => emits('onDrag', e)

const handleDrop = (e: DragEvent) => emits('onDrop', e)
</script>

<template>
  <label
    :style="controlStyle"
    :class="['upload-group', dragClassName, errorClassName, disabledClassName, controlClassName]"
    @dragenter="handleDrag"
    @dragover="handleDrag"
    @dragleave="handleDrag"
    @drop="handleDrop"
  >
    <input
      type="file"
      className="group-control"
      :disabled="disabled"
      :accept="accept"
      :multiple="multiple"
      @input="handleChange"
    />

    <div v-if="!hasLabel" class="group-label">
      <Icon :iconName="iconName.UPLOAD" :size="18" />
      <span>Choose file</span>
    </div>

    <slot v-if="hasLabel" name="label"></slot>
  </label>
</template>

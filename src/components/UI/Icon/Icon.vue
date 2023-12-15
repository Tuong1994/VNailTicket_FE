<script setup lang="ts">
import { computed, withDefaults, type StyleValue } from 'vue'
import { iconType } from './constant.ts'

export interface IconProps {
  rootClassName?: string | string[]
  rootStyle?: StyleValue
  type?: string
  size?: number
  iconName: string
}

const props = withDefaults(defineProps<IconProps>(), {
  rootClassName: '',
  type: iconType.FAS
})

const iconStyle = computed<StyleValue>(() => ({ ...props.rootStyle, fontSize: `${props.size}px` }))
</script>

<template>
  <fa :icon="[type, iconName]" :class="rootClassName" :style="iconStyle" />
</template>

<script setup lang="ts">
import { computed, withDefaults, toRefs, type StyleValue } from 'vue'
import { iconType } from './constant'

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

const { rootStyle } = toRefs(props)

const iconStyle = computed<StyleValue>(() => ({ ...rootStyle, fontSize: `${props.size}px` }))
</script>

<template>
  <fa :icon="[type, iconName]" :class="rootClassName" :style="iconStyle" />
</template>

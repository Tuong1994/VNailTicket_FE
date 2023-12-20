<script setup lang="ts">
import { computed, withDefaults, toRef, type StyleValue } from 'vue'
import type { ComponentJustify, ComponentAligns, ComponentSize } from '@/common/type'

type SpaceSize = ComponentSize | number

export interface SpaceProps {
  rootClassName?: string
  rootStyle?: StyleValue
  justify?: Exclude<ComponentJustify, 'between' | 'around' | 'evenly'>
  aligns?: Exclude<ComponentAligns, 'baseline'>
  size?: SpaceSize
}

const props = withDefaults(defineProps<SpaceProps>(), {
  rootClassName: '',
  justify: 'start',
  aligns: 'top',
  size: 'sm'
})

const rootStyle = toRef(props, 'rootStyle')

const justifyClassName = computed<string>(() => `space-${props.justify}`)

const alignClassName = computed<string>(() => `space-${props.aligns}`)

const inlineStyle = computed<StyleValue>(() => {
  if (typeof props.size === 'number') return { ...rootStyle, gap: `10px ${props.size}px` }
  if (props.size === 'sm') return { ...rootStyle, gap: '10px' }
  if (props.size === 'md') return { ...rootStyle, gap: '10px 30px' }
  if (props.size === 'lg') return { ...rootStyle, gap: '10px 60px' }
  return { ...rootStyle }
})
</script>

<template>
  <div :style="inlineStyle" :class="['space', justifyClassName, alignClassName, rootClassName]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults, type StyleValue } from 'vue'
import type { ComponentJustify, ComponentAligns, ComponentSize } from '@/common/type.ts'

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
  justify: 'left',
  aligns: 'top',
  size: 'sm'
})

const justifyClassName = computed<string>(() => `space-${props.justify}`)

const alignClassName = computed<string>(() => `space-${props.aligns}`)

const inlineStyle = computed<StyleValue>(() => {
  if (typeof props.size === 'number') return { ...props.rootStyle, gap: `10px ${props.size}px` }
  if (props.size === 'sm') return { ...props.rootStyle, gap: '10px' }
  if (props.size === 'md') return { ...props.rootStyle, gap: '10px 30px' }
  if (props.size === 'lg') return { ...props.rootStyle, gap: '10px 60px' }
})
</script>

<template>
  <div :style="inlineStyle" :class="['space', justifyClassName, alignClassName, rootClassName]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults, type StyleValue, watchEffect } from 'vue'
import type { ComponentJustify, ComponentAligns } from '@/common/type.ts'
import useGridStore from './GridStore.ts'

export interface GridRowProps {
  rootClassName?: string
  rootStyle?: StyleValue
  justify?: ComponentJustify
  aligns?: ComponentAligns
  gutters?: [number?, number?]
}

const props = withDefaults(defineProps<GridRowProps>(), {
  rootClassName: '',
  justify: 'start',
  aligns: 'top',
  gutters: () => []
})

const grid = useGridStore()

const justifyClassName = computed<string>(() => `grid-row-${props.justify}`)

const alignClassName = computed<string>(() => `grid-row-${props.aligns}`)

const inlineStyle = computed<StyleValue>(() => {
  if (!props.gutters.length) return { ...props.rootStyle, gap: '10px' }
  if (props.gutters.length === 1) return { ...props.rootStyle, gap: `${props.gutters[0]}px` }
  if (props.gutters.length === 2)
    return { ...props.rootStyle, rowGap: `${props.gutters[0]}px`, columnGap: `${props.gutters[1]}px` }
})

watchEffect(() => {
  if (!props.gutters.length) return
  if (props.gutters.length === 1) return grid.addGutters(props.gutters[0])
  if (props.gutters.length === 2) return grid.addGutters(props.gutters[0], props.gutters[1])
})
</script>

<template>
  <div :style="inlineStyle" :class="['grid-row', justifyClassName, alignClassName, rootClassName]">
    <slot></slot>
  </div>
</template>

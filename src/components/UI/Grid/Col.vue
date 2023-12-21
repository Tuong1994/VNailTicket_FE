<script setup lang="ts">
import { ref, computed, withDefaults, toRefs, type StyleValue, watchEffect } from 'vue'
import type { ColSpan } from './type'
import useGridStore from './GridStore'
import useViewPoint from '@/hooks/useViewPoint'

export interface GridRowProps {
  rootClassName?: string
  rootStyle?: StyleValue
  isFill?: boolean
  span?: ColSpan
  xs?: ColSpan
  md?: ColSpan
  lg?: ColSpan
}

const props = withDefaults(defineProps<GridRowProps>(), {
  rootClassName: ''
})

const { rootStyle } = toRefs(props)

const grid = useGridStore()

const { isPhone, isTablet, isLaptop, isDesktop } = useViewPoint()

const width = ref<string>('auto')

const hidden = ref<boolean>(false)

const inlineStyle = computed<StyleValue>(() => ({ ...rootStyle, width: width.value }))

const gapSize = computed<number>(() => (!grid.gutters.length ? 10 : (grid.gutters[0] as number)))

const fillClassName = computed<string>(() => (props.isFill ? 'grid-col-fill' : ''))

const calculateWidth = (span: ColSpan) => `calc((100% / 24) * ${span} - ${gapSize.value}px)`

watchEffect(() => {
  if (hidden.value) hidden.value = false

  if (isDesktop.value) {
    if (props.span === undefined) return (width.value = 'auto')
    if (props.span === 0) return (hidden.value = true)
    if (props.span === 24) return (width.value = '100%')
    return (width.value = calculateWidth(props.span))
  }

  if (isPhone.value) {
    if (props.xs === undefined) return (width.value = 'auto')
    if (props.xs === 0) return (hidden.value = true)
    if (props.xs !== 24) return (width.value = calculateWidth(props.xs))
  }

  if (isTablet.value) {
    if (props.md === undefined) return (width.value = 'auto')
    if (props.md === 0) return (hidden.value = true)
    if (props.md !== 24) return (width.value = calculateWidth(props.md))
  }

  if (isLaptop.value) {
    if (props.lg === undefined) return (width.value = 'auto')
    if (props.lg === 0) return (hidden.value = true)
    if (props.lg !== 24) return (width.value = calculateWidth(props.lg))
  }

  if (props.xs === 24 || props.md === 24 || props.lg === 24) width.value = '100%'
})
</script>

<template>
  <div v-if="!hidden" :style="inlineStyle" :class="['grid-col', fillClassName, rootClassName]">
    <slot></slot>
  </div>
</template>

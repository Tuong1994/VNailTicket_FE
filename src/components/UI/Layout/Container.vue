<script setup lang="ts">
import { withDefaults, watchEffect, type StyleValue } from 'vue'
import useLayoutStore, { type LayoutTheme, type LayoutColor } from './LayoutStore.ts'

export interface LayoutContainerProps {
  rootClassName?: string
  rootStyle?: StyleValue
  theme?: LayoutTheme
  color?: LayoutColor
}

const props = withDefaults(defineProps<LayoutContainerProps>(), {
  rootClassName: '',
  theme: 'dark',
  color: 'blue'
})

const layout = useLayoutStore()

watchEffect(() => {
  layout.onLayout()
  layout.switchTheme(props.theme)
  layout.switchColor(props.color)
})
</script>

<template>
  <main :style="rootStyle" :class="['container', rootClassName]">
    <slot></slot>
  </main>
</template>

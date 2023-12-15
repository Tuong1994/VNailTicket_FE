<script setup lang="ts">
import { computed, withDefaults, type StyleValue } from 'vue'
import useLayoutStore from './LayoutStore.ts'

export interface LayoutHeadProps {
  rootClassName?: string
  rootStyle?: StyleValue
  fixed?: boolean
}

const props = withDefaults(defineProps<LayoutHeadProps>(), {
  rootClassName: ''
})

const layout = useLayoutStore()

const themeClassName = computed<string>(() => `head-${layout.theme}`)

const fixedClassName = computed<string>(() => (props.fixed || layout.isLayout ? `head-fixed` : ''))
</script>

<template>
  <header :style="rootStyle" :class="['head', fixedClassName, themeClassName, rootClassName]">
    <slot></slot>
  </header>
</template>

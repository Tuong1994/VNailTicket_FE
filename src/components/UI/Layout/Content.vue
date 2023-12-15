<script setup lang="ts">
import { computed, withDefaults, type StyleValue } from 'vue'
import useLayoutStore from './LayoutStore.ts'

export interface LayoutContentProps {
  rootClassName?: string
  rootStyle?: StyleValue
}

withDefaults(defineProps<LayoutContentProps>(), {
  rootClassName: ''
})

const { isLayout, shrinked } = useLayoutStore()

const layoutClassName = computed<string>(() => (isLayout ? 'content-layout' : ''))

const shrinkClassName = computed<string>(() => (shrinked ? 'content-shrinked' : ''))
</script>

<template>
  <div :class="['content', layoutClassName, shrinkClassName, rootClassName]">
    <slot></slot>
  </div>
</template>

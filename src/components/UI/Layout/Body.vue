<script setup lang="ts">
import { withDefaults, type StyleValue } from 'vue'

export interface LayoutBodyProps {
  rootClassName?: string
  rootStyle?: StyleValue
}

withDefaults(defineProps<LayoutBodyProps>(), {
  rootClassName: ''
})
</script>

<template>
  <div :style="rootStyle" :class="['body', rootClassName]">
    <slot></slot>
  </div>
</template>

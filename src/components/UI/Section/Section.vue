<script setup lang="ts">
import { withDefaults, type StyleValue } from 'vue'

export interface SectionProps {
  rootClassName?: string
  rootStyle?: StyleValue
}

withDefaults(defineProps<SectionProps>(), {
  rootClassName: ''
})
</script>

<template>
  <section :style="rootStyle" :class="['section', rootClassName]">
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, withDefaults, type StyleValue } from 'vue'

export interface CardProps {
  rootClassName?: string
  rootStyle?: StyleValue
  headClassName?: string
  headStyle?: StyleValue
  bodyClassName?: string
  bodyStyle?: StyleValue
  hoverable?: boolean
}

const props = withDefaults(defineProps<CardProps>(), {
  rootClassName: '',
  headClassName: '',
  bodyClassName: ''
})

const hoverClassName = computed<string>(() => (props.hoverable ? 'card-hoverable' : ''))
</script>

<template>
  <div :style="rootStyle" :class="['card', hoverClassName, rootClassName]">
    <div :style="headStyle" :class="['card-head', headStyle]">
      <slot name="head"></slot>
    </div>

    <div :style="bodyStyle" :class="['card-body', bodyClassName]">
      <slot name="body"></slot>
    </div>
  </div>
</template>

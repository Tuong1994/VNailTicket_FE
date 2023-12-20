<script setup lang="ts">
import { computed, withDefaults, toRefs, type StyleValue } from 'vue'
import type { TypoAligns, TypoVariant } from './type'

export interface ParagraphProps {
  rootClassName?: string
  rootStyle?: StyleValue
  size?: number
  mark?: boolean
  italic?: boolean
  strong?: boolean
  underline?: boolean
  remove?: boolean
  variant?: TypoVariant
  aligns?: TypoAligns
}

const props = withDefaults(defineProps<ParagraphProps>(), {
  rootClassName: '',
  size: 14,
  variant: 'default',
  aligns: 'left'
})

const { rootStyle } = toRefs(props)

const alignsClassName = computed<string>(() => `paragraph-${props.aligns}`)

const variantClassName = computed<string>(() => `paragraph-${props.variant}`)

const underlineClassName = computed<string>(() => (props.underline ? 'paragraph-underline' : ''))

const removeClassName = computed<string>(() => (props.remove ? 'paragraph-remove' : ''))

const italicClassName = computed<string>(() => (props.italic ? 'paragraph-italic' : ''))

const strongClassName = computed<string>(() => (props.strong ? 'paragraph-strong' : ''))

const inlineStyle = computed<StyleValue>(() => ({ ...rootStyle, fontSize: `${props.size}px` }))
</script>

<template>
  <p
    :style="inlineStyle"
    :class="[
      'paragraph',
      alignsClassName,
      variantClassName,
      underlineClassName,
      removeClassName,
      italicClassName,
      strongClassName,
      rootClassName
    ]"
  >
    <slot v-if="!mark"></slot>
    <mark v-if="mark"><slot></slot></mark>
  </p>
</template>

<script setup lang="ts">
import { computed, withDefaults, type StypeValue } from 'vue'
import type { TypoAlign, TypoVariant } from './type.ts'

type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface TitleProps {
  rootClassName?: string
  rootStyle?: StypeValue
  italic?: boolean
  remove?: boolean
  underline?: boolean
  level?: TitleLevel
  aligns?: TypoAlign
  variant?: TypoVariant
}

const props = withDefaults(defineProps<TitleProps>(), {
  rootClassName: '',
  aligns: 'left',
  variant: 'default',
  level: 1
})

const alignsClassName = computed<string>(() => `title-${props.aligns}`)

const variantClassName = computed<string>(() => `title-${props.variant}`)

const underlineClassName = computed<string>(() => (props.underline ? 'title-underline' : ''))

const removeClassName = computed<string>(() => (props.remove ? 'title-remove' : ''))

const italicClassName = computed<string>(() => (props.italic ? 'title-italic' : ''))

const commonProps = computed<TitleProps>(() => ({
  class: [
    'title',
    `title-level-${props.level}`,
    alignsClassName.value,
    variantClassName.value,
    underlineClassName.value,
    removeClassName.value,
    italicClassName.value,
    props.rootClassName
  ],
  style: props.rootStyle
}))
</script>

<template>
  <h1 v-if="level === 1" v-bind="commonProps"><slot></slot></h1>
  <h2 v-if="level === 2" v-bind="commonProps"><slot></slot></h2>
  <h3 v-if="level === 3" v-bind="commonProps"><slot></slot></h3>
  <h4 v-if="level === 4" v-bind="commonProps"><slot></slot></h4>
  <h5 v-if="level === 5" v-bind="commonProps"><slot></slot></h5>
  <h6 v-if="level === 6" v-bind="commonProps"><slot></slot></h6>
</template>

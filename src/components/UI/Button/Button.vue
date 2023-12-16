<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import type { ComponentColor, ComponentSize } from '@/common/type'
import Spinner from '@/components/UI/Loading/Spinner.vue'
import useFormStore from '@/components/Control/Form/FormStore.ts'

type ButtonType = 'submit' | 'button' | 'reset'

export interface ButtonProps {
  rootClassName?: string
  sizes?: ComponentSize
  color?: Exclude<ComponentColor, 'white' | 'gray'>
  ghost?: boolean
  loading?: boolean
  disabled?: boolean
  type?: ButtonType
}

const props = withDefaults(defineProps<ButtonProps>(), {
  rootClassName: '',
  sizes: 'md',
  type: 'button'
})

const form = useFormStore()

const buttonSize = computed<ComponentSize>(() => (form.isVee ? form.formSize : props.sizes))

const buttonColor = computed<ComponentColor>(() => props.color)

const buttonDisabled = computed<boolean>(() => props.disabled || props.loading)

const sizeClassName = computed<string>(() => `button-${buttonSize.value}`)

const loadingClassName = computed<string>(() => (props.loading ? 'button-loading' : ''))

const disabledClassName = computed<string>(() => (props.disabled ? 'button-disabled' : ''))

const colorClassName = computed<string>(() => {
  if (!props.ghost && !buttonColor.value) return ''
  if (props.ghost && !buttonColor.value) return 'button-ghost'
  if (!props.ghost && buttonColor.value) return `button-color button-${buttonColor.value}`
  if (props.ghost && buttonColor.value) return `button-ghost button-ghost-${buttonColor.value}`
})
</script>

<template>
  <button
    :type="type"
    :disabled="buttonDisabled"
    :class="['button', sizeClassName, colorClassName, loadingClassName, disabledClassName, rootClassName]"
  >
    <span v-if="loading" class="button-loading-icon"><Spinner /></span>
    <span><slot></slot></span>
  </button>
</template>

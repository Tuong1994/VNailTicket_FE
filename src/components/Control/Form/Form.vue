<script setup lang="ts" generic="M extends object">
import { withDefaults, watchEffect, toRef, provide } from 'vue'
import { Form, useForm } from 'vee-validate'
import type { ComponentSize } from '@/common/type.ts'
import type { ControlColor, ControlShape } from '@/components/Control/type.ts'
import useFormStore from './FormStore.ts'

export interface FormProps {
  initialValues: M
  color?: ControlColor
  sizes?: ComponentSize
  shape?: ControlShape
}

const props = withDefaults(defineProps<FormProps>(), {
  color: 'blue',
  sizes: 'md',
  shape: 'square'
})

const emits = defineEmits(['onFinish'])

const form = useFormStore()

provide('form', form)

const initialValues = toRef(props, 'initialValues')

const { handleSubmit } = useForm<M>({ initialValues })

const onSubmit = handleSubmit((data) => emits('onFinish', data))

watchEffect(() => {
  form.formActive()
  form.bindData(props.initialValues)
  form.changeColor(props.color)
  form.changeSize(props.sizes)
  form.changeShape(props.shape)
})
</script>

<template>
  <form @submit="onSubmit">
    <slot></slot>
  </form>
</template>

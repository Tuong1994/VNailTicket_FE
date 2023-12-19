<script setup lang="ts">
import { ref, computed, withDefaults, watchEffect, useSlots, toRefs, inject, type StyleValue } from 'vue'
import { useField } from 'vee-validate'
import type { FormRule } from '@/components/Control/type.ts'
import type { ComponentColor, ComponentSize } from '@/common/type.ts'
import NoteMessage from '@/components/UI/NoteMessage/NoteMessage.vue'
import useFormStore from '@/components/Control/Form/FormStore.ts'

export interface RadioProps {
  rootClassName?: string
  labelClassName?: string
  controlClassName?: string
  rootStyle?: StyleValue
  labelStyle?: StyleValue
  controlStyle?: StyleValue
  sizes?: ComponentSize
  color?: Exclude<ComponentColor, 'red' | 'gray'>
  disabled?: boolean
  checked?: boolean
  name?: string
  value?: string | number
  rule?: FormRule
}

const props = withDefaults(defineProps<RadioProps>(), {
  rootClassName: '',
  labelClassName: '',
  controlClassName: '',
  color: 'blue',
  sizes: 'md',
  name: '',
  checked: false
})

const form = inject('form', null)

const { name } = toRefs(props)

const {
  value: veeValue,
  errorMessage,
  setValue,
  handleChange: veeOnChange
} = useField(name, !props.disabled ? props.rule : undefined, {
  initialValue: form?.formData[name.value]
})

const slots = useSlots()

const emits = defineEmits(['onCheck', 'onBlur'])

const isCheck = ref<boolean>(false)

const hasLabel = computed<boolean>(() => slots.default !== undefined)

const controlValue = computed<string>(() => (form?.isVee ? veeValue?.value : props.value))

const controlColor = computed<ComponentColor>(() => (form?.isVee ? form?.formColor : props.color))

const controlSize = computed<ComponentSize>(() => (form?.isVee ? form?.formSize : props.sizes))

const sizeClassName = computed<string>(() => `radio-${controlSize.value}`)

const colorClassName = computed<string>(() => `radio-${controlColor.value}`)

const gapClassName = computed<string>(() => (form?.isVee ? `radio-gap-${controlSize.value}` : ''))

const errorClassName = computed<string>(() => (errorMessage?.value ? 'radio-group-error' : ''))

const disabledClassName = computed<string>(() => (props.disabled ? 'radio-group-disabled' : ''))

const handleChange = (e: Event) => {
  if (form?.isVee) return veeOnChange(props.value)

  const checked = (e.target as HTMLInputElement).checked
  const value = (e.target as HTMLInputElement).value
  isCheck.value = checked

  emits('onCheck', value)
}

const handleBlur = (e: Event) => emits('onBlur', e)

watchEffect(() => {
  if (!form?.isVee) return (isCheck.value = props.checked)
  if (form?.isVee && veeValue.value === props.value) return (isCheck.value = true)
})
</script>

<template>
  <div :style="rootStyle" :class="['radio', gapClassName, sizeClassName, colorClassName, rootClassName]">
    <label :class="['radio-group', errorClassName, disabledClassName]">
      <input
        type="radio"
        class="group-control"
        :name="name"
        :value="value"
        :checked="isCheck"
        :disabled="disabled"
        @input="handleChange"
        @blur="handleBlur"
      />

      <div :style="controlStyle" :class="['group-checked', controlClassName]" />

      <div v-if="hasLabel" :style="labelStyle" :class="['group-label', labelClassName]">
        <slot></slot>
      </div>
    </label>

    <NoteMessage v-if="errorMessage" type="error" :message="errorMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, withDefaults, useSlots, toRef, watchEffect, inject, type StyleValue } from 'vue'
import { useField } from 'vee-validate'
import type { ComponentSize } from '@/common/type.ts'
import type { FormRule, ControlColor, ControlShape } from '@/components/Control/type.ts'
import { iconName } from '@/components/UI/Icon/constant.ts'
import Icon from '@/components/UI/Icon/Icon.vue'
import NoteMessage from '@/components/UI/NoteMessage/NoteMessage.vue'
import useFormStore from '@/components/Control/Form/FormStore.ts'

export interface TextAreaProps {
  rootClassName?: string
  labelClassName?: string
  inputClassName?: string
  rootStyle?: StyleValue
  labelStyle?: StyleValue
  inputStyle?: StyleValue
  sizes?: ComponentSize
  color?: ControlColor
  shape?: ControlShape
  modelValue?: string
  placeholder?: string
  name?: string
  disabled?: boolean
  rows?: number
  cols?: number
  rule?: FormRule
}

const props = withDefaults(defineProps<TextAreaProps>(), {
  rootClassName: '',
  labelClassName: '',
  inputClassName: '',
  sizes: 'md',
  color: 'blue',
  shape: 'square',
  placeholder: 'Type...',
  name: '',
  rows: 5
})

const form = inject('form', null)

const name = toRef(props, 'name')

const {
  value: veeValue,
  errorMessage,
  handleChange: veeOnChange,
  handleBlur: veeOnBlur,
  setValue
} = useField(name, !props.disabled ? props.rule : undefined, {
  initialValue: form?.formData[name.value]
})

const slots = useSlots()

const emits = defineEmits(['update:modelValue'])

const inputRef = ref<HTMLInputElement | null>(null)

const controlValue = computed<string>(() => (form?.isVee ? veeValue?.value : props.modelValue))

const controlColor = computed<ControlColor>(() => (form?.isVee ? form?.formColor : props.color))

const controlShape = computed<ControlShape>(() => (form?.isVee ? form?.formShape : props.shape))

const controlSize = computed<ComponentSize>(() => (form?.isVee ? form?.formSize : props.sizes))

const hasLabel = computed<boolean>(() => slots.label !== undefined)

const showClearIcon = computed<boolean>(() => (form?.isVee ? Boolean(veeValue?.value) : props.modelValue))

const colorClassName = computed<string>(() => `textarea-${controlColor.value}`)

const sizeClassName = computed<string>(() => `textarea-${controlSize.value}`)

const shapeClassName = computed<string>(() => `textarea-${controlShape.value}`)

const gapClassName = computed<string>(() => (form?.isVee ? `textarea-gap-${controlSize.value}` : ''))

const errorClassName = computed<string>(() => (errorMessage?.value ? 'textarea-error' : ''))

const disabledClassName = computed<string>(() => (props.disabled ? 'textarea-disabled' : ''))

const iconSize = computed<number>(() => {
  if (controlSize.value === 'sm') return 12
  if (controlSize.value === 'lg') return 16
  return 14
})

const handleChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emits('update:modelValue', value)
}

const handleClearInput = () => (form?.isVee ? setValue('') : emits('update:modelValue', ''))

const onChangeFn = form?.isVee ? veeOnChange : handleChange

watchEffect(() => {
  if (errorMessage?.value) inputRef.value.click()
})
</script>

<template>
  <div
    :style="rootStyle"
    :class="[
      'textarea',
      gapClassName,
      colorClassName,
      sizeClassName,
      shapeClassName,
      errorClassName,
      rootClassName,
      disabledClassName
    ]"
  >
    <label>
      <div v-if="hasLabel" :style="labelStyle" :class="['textarea-label', labelClassName]">
        <slot name="label"></slot>
      </div>

      <div ref="inputRef" class="textarea-group">
        <div class="group-control">
          <textarea
            :name="name"
            :rows="rows"
            :cols="cols"
            :value="controlValue"
            :placeholder="placeholder"
            :class="['control-box', inputClassName]"
            @input="onChangeFn"
            @blur="veeOnBlur"
          />

          <div v-if="showClearIcon" class="control-action" @click="handleClearInput">
            <Icon :size="iconSize" :iconName="iconName.X_MARK_CIRCLE" />
          </div>
        </div>
      </div>
    </label>

    <NoteMessage v-if="errorMessage" type="error" :message="errorMessage" />
  </div>
</template>

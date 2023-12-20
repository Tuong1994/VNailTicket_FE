<script setup lang="ts">
import { ref, computed, withDefaults, useSlots, toRef, watchEffect, inject, type StyleValue } from 'vue'
import { useField } from 'vee-validate'
import type { ComponentSize } from '@/common/type'
import type { FormRule, ControlColor, ControlShape } from '@/components/Control/type'
import { iconName } from '@/components/UI/Icon/constant'
import Icon from '@/components/UI/Icon/Icon.vue'
import NoteMessage from '@/components/UI/NoteMessage/NoteMessage.vue'
import useFormStore from '@/components/Control/Form/FormStore'

type InputType = 'password' | 'text'

export interface InputPasswordProps {
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
  rule?: any
}

const props = withDefaults(defineProps<InputPasswordProps>(), {
  rootClassName: '',
  labelClassName: '',
  inputClassName: '',
  sizes: 'md',
  color: 'blue',
  shape: 'square',
  placeholder: 'Type...',
  modelValue: '',
  name: ''
})

const form = inject('form', null) as any

const name = toRef(props, 'name')

const {
  value: veeValue,
  errorMessage,
  handleChange: onChange,
  handleBlur: onBlur,
  setValue
} = useField(name, !props.disabled ? props.rule : undefined, {
  initialValue: form?.formData[name.value]
})

const slots = useSlots()

const emits = defineEmits(['update:modelValue'])

const inputRef = ref<HTMLInputElement | null>(null)

const inputType = ref<InputType>('password')

const controlValue = computed(() => (form?.isVee ? veeValue?.value : props.modelValue))

const controlColor = computed<ControlColor>(() => (form?.isVee ? form?.formColor : props.color))

const controlSize = computed<ComponentSize>(() => (form?.isVee ? form?.formSize : props.sizes))

const controlShape = computed<ControlShape>(() => (form?.isVee ? form?.formShape : props.shape))

const hasLabel = computed<boolean>(() => slots.label !== undefined)

const hasAddonBefore = computed<boolean>(() => slots.addonBefore !== undefined)

const hasAddonAfter = computed<boolean>(() => slots.addonAfter !== undefined)

const showClearIcon = computed<boolean>(() =>
  Boolean(form?.isVee) ? Boolean(veeValue?.value) : Boolean(props.modelValue)
)

const colorClassName = computed<string>(() => `input-${controlColor.value}`)

const sizeClassName = computed<string>(() => `input-${controlSize.value}`)

const shapeClassName = computed<string>(() => `input-${controlShape.value}`)

const gapClassName = computed<string>(() => (form?.isVee ? `input-gap-${controlSize.value}` : ''))

const errorClassName = computed<string>(() => (errorMessage?.value ? 'input-error' : ''))

const disabledClassName = computed<string>(() => (props.disabled ? 'input-disabled' : ''))

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

const handleSwitchInputType = (type: InputType) => (inputType.value = type)

const onChangeFn = form?.isVee ? onChange : handleChange

watchEffect(() => {
  if (errorMessage?.value) inputRef?.value?.click()
})
</script>

<template>
  <div
    :style="rootStyle"
    :class="[
      'input',
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
      <div v-if="hasLabel" :style="labelStyle" :class="['input-label', labelClassName]">
        <slot name="label"></slot>
      </div>

      <div ref="inputRef" class="input-group">
        <div v-if="hasAddonBefore" class="group-addon group-addon-before">
          <slot name="addonBefore"></slot>
        </div>

        <div class="group-control">
          <input
            :type="inputType"
            :name="name"
            :value="controlValue"
            :placeholder="placeholder"
            :class="['control-box', inputClassName]"
            @input="onChangeFn"
            @blur="onBlur"
          />

          <div v-if="showClearIcon" class="control-action" @click="handleClearInput">
            <Icon :size="iconSize" :iconName="iconName.X_MARK_CIRCLE" />
          </div>

          <div class="control-action">
            <Icon
              v-if="inputType === 'password'"
              :size="iconSize"
              :iconName="iconName.EYE"
              @click="() => handleSwitchInputType('text')"
            />
            <Icon
              v-if="inputType === 'text'"
              :size="iconSize"
              :iconName="iconName.EYE_SLASH"
              @click="() => handleSwitchInputType('password')"
            />
          </div>
        </div>

        <div v-if="hasAddonAfter" className="group-addon group-addon-after">
          <slot name="addonAfter"></slot>
        </div>
      </div>
    </label>

    <NoteMessage v-if="errorMessage" type="error" :message="errorMessage" />
  </div>
</template>

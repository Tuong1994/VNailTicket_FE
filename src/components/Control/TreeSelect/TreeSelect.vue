<script setup lang="ts">
import { ref, computed, withDefaults, useSlots, toRef, watchEffect, inject, type StyleValue } from 'vue'
import { useField } from 'vee-validate'
import { useRender, useDetectBottom, useClickOutside } from '@/hooks'
import type { ComponentSize } from '@/common/type.ts'
import type { SelectOptions, FormRule, ControlColor, ControlShape } from '@/components/Control/type.ts'
import TreeSelectControl from './TreeSelectControl.vue'
import TreeSelectOption from './TreeSelectOption.vue'
import NoteMessage from '@/components/UI/NoteMessage/NoteMessage.vue'
import useFormStore from '@/components/Control/Form/FormStore.ts'

export interface TreeSelectProps {
  rootClassName?: string
  labelClassName?: string
  inputClassName?: string
  rootStyle?: StyleValue
  labelStyle?: StyleValue
  inputStyle?: StyleValue
  options?: SelectOptions
  defaultValue?: number | string
  name?: string
  placeholder?: string
  sizes?: ComponentSize
  color?: ControlColor
  shape?: ControlShape
  async?: boolean
  loading?: boolean
  disabled?: boolean
  total?: number
  limit?: number
  rule?: FormRule
}

const props = withDefaults(defineProps<TreeSelectProps>(), {
  rootClassName: '',
  labelClassName: '',
  inputClassName: '',
  sizes: 'md',
  color: 'blue',
  shape: 'square',
  placeholder: 'Select...',
  name: '',
  async: false,
  loading: false,
  disabled: false,
  total: 100,
  limit: 10,
  options: () => []
})

const emits = defineEmits(['onChangeSearch', 'onChangeSelect', 'onChangePage'])

const form = inject('form')

const name = toRef(props, 'name')

const {
  value: veeValue,
  errorMessage,
  setValue
} = useField(name, !props.disabled ? props.rule : undefined, {
  initialValue: form?.formData[name.value]
})

const slots = useSlots()

const dropdown = ref<boolean>(false)

const currentPage = ref<number>(1)

const selectedOption = ref<Option | null>(null)

const search = ref<string>('')

const selectRef = ref<HTMLDivElement | null>(null)

const render = useRender(dropdown)

const bottom = useDetectBottom(selectRef)

useClickOutside(selectRef, dropdown)

const controlColor = computed<ControlColor>(() => (form?.isVee ? form?.formColor : props.color))

const controlSize = computed<ComponentSize>(() => (form?.isVee ? form?.formSize : props.sizes))

const controlShape = computed<ControlShape>(() => (form?.isVee ? form?.formShape : props.shape))

const hasLabel = computed<boolean>(() => slots.label !== undefined)

const hasAddonBefore = computed<boolean>(() => slots.addonBefore !== undefined)

const hasAddonAfter = computed<boolean>(() => slots.addonAfter !== undefined)

const showClearIcon = computed<boolean>(() =>
  Boolean((search.value || selectedOption.value) && !props.disabled)
)

const totalPages = computed<number>(() => Math.ceil(props.total / props.limit))

const sizeClassName = computed<string>(() => `tree-select-${controlSize.value}`)

const colorClassName = computed<string>(() => `tree-select-${controlColor.value}`)

const shapeClassName = computed<string>(() => `tree-select-${controlShape.value}`)

const gapClassName = computed<string>(() => (form?.isVee ? `tree-select-gap-${controlSize.value}` : ''))

const bottomClassName = computed<string>(() => (bottom.value ? 'tree-select-bottom' : ''))

const errorClassName = computed<string>(() => (errorMessage?.value ? 'tree-select-error' : ''))

const disabledClassName = computed<string>(() => (props.disabled ? 'tree-select-disabled' : ''))

const iconSize = computed<number>(() => {
  if (controlSize.value === 'sm') return 12
  if (controlSize.value === 'lg') return 16
  return 14
})

const renderValue = computed<string>(() => {
  if (search.value) return search.value
  if (selectedOption.value) return selectedOption.value.label
  return ''
})

const renderOptions = computed<SelectOptions>(() => {
  if (props.async) return props.options
  if (!search.value) return props.options
  return props.options.filter((option) => option.label.toLowerCase().includes(search.value.toLowerCase()))
})

const handleDropdown = () => (dropdown.value = !dropdown.value)

const handleSearch = (e: Event) => {
  if (!dropdown.value) dropdown.value = true
  const value = (e.target as HTMLInputElement).value
  search.value = value
  selectedOption.value = null
  emits('onChangeSearch', value)
}

const handleSelect = (option: Option) => {
  selectedOption.value = option
  search.value = ''
  emits('onChangeSelect', option.value)
  if (form?.isVee) setValue(option.value)
}

const handleClearInput = () => {
  if (search.value) search.value = ''
  if (selectedOption.value) selectedOption.value = null
  if (form?.isVee) setValue(null)
}

const handleChangePage = (type: 'prev' | 'next') => {
  let page = currentPage.value
  if (type === 'prev') page -= 1
  else page += 1
  currentPage.value = page
  emits('onChangePage', page)
}

// // Set default option
watchEffect(() => {
  let defaultOption: Option | null = null
  if (!form?.isVee && props.defaultValue) {
    defaultOption = [...props.options].find((option) => option.value === props.defaultValue) as Option
  } else if (veeValue.value) {
    defaultOption = [...props.options].find((option) => option.value === veeValue.value) as Option
  }
  selectedOption.value = defaultOption
})
</script>

<template>
  <div
    ref="selectRef"
    :style="rootStyle"
    :class="[
      'tree-select',
      gapClassName,
      sizeClassName,
      colorClassName,
      shapeClassName,
      bottomClassName,
      errorClassName,
      rootClassName,
      disabledClassName
    ]"
  >
    <label v-if="hasLabel" :style="labelStyle" :class="['tree-select-label', labelClassName]">
      <slot name="label"></slot>
    </label>

    <div class="tree-select-wrap">
      <TreeSelectControl
        :inputClassName="inputClassName"
        :inputStyle="inputStyle"
        :placeholder="placeholder"
        :iconSize="iconSize"
        :dropdown="dropdown"
        :disabled="disabled"
        :loading="loading"
        :showClearIcon="showClearIcon"
        :hasAddonBefore="hasAddonBefore"
        :hasAddonAfter="hasAddonAfter"
        :renderValue="renderValue"
        :errorMessage="errorMessage"
        @onDropdown="handleDropdown"
        @onSearch="handleSearch"
        @onClearInput="handleClearInput"
      >
        <template #addonBefore>
          <slot name="addonBefore"></slot>
        </template>
        <template #addonAfter>
          <slot name="addonAfter"></slot>
        </template>
      </TreeSelectControl>

      <TreeSelectOption
        v-if="render"
        :async="async"
        :dropdown="dropdown"
        :loading="loading"
        :options="renderOptions"
        :selectedOption="selectedOption"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :iconSize="iconSize"
        @onDropdown="handleDropdown"
        @onSelect="handleSelect"
        @onChangePage="handleChangePage"
      />
    </div>

    <NoteMessage v-if="errorMessage" type="error" :message="errorMessage" />
  </div>
</template>

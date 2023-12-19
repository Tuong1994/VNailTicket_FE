<script setup lang="ts">
import {
  ref,
  computed,
  withDefaults,
  useSlots,
  toRef,
  watchEffect,
  onMounted,
  inject,
  type StyleValue
} from 'vue'
import { useField } from 'vee-validate'
import type { ComponentSize } from '@/common/type.ts'
import type { FormRule, ControlColor, ControlShape } from '@/components/Control/type.ts'
import { iconName } from '@/components/UI/Icon/constant.ts'
import { QuillEditor } from '@vueup/vue-quill'
import Icon from '@/components/UI/Icon/Icon.vue'
import NoteMessage from '@/components/UI/NoteMessage/NoteMessage.vue'
import useFormStore from '@/components/Control/Form/FormStore.ts'
import Quill from 'quill'
import utils from '@/utils'
import 'quill/dist/quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export interface TextEditorProps {
  rootClassName?: string
  labelClassName?: string
  inputClassName?: string
  rootStyle?: StyleValue
  labelStyle?: StyleValue
  inputStyle?: StyleValue
  sizes?: ComponentSize
  color?: ControlColor
  shape?: ControlShape
  defaultValue?: string
  name?: string
  disabled?: boolean
  rule?: FormRule
}

const props = withDefaults(defineProps<TextEditorProps>(), {
  rootClassName: '',
  labelClassName: '',
  inputClassName: '',
  sizes: 'md',
  color: 'blue',
  shape: 'square',
  defaultValue: '',
  name: ''
})

const form = inject('form', null)

const name = toRef(props, 'name')

const {
  value: veeValue,
  errorMessage,
  setValue
} = useField(name, !props.disabled ? props.rule : undefined, {
  initialValue: form?.formData[name.value]
})

const slots = useSlots()

const emits = defineEmits(['onChange'])

const editorContent = ref<string>('')

const controlValue = computed<string>(() => (form?.isVee ? veeValue?.value : props.modelValue))

const controlColor = computed<ControlColor>(() => (form?.isVee ? form?.formColor : props.color))

const controlSize = computed<ComponentSize>(() => (form?.isVee ? form?.formSize : props.sizes))

const controlShape = computed<ControlShape>(() => (form?.isVee ? form?.formShape : props.shape))

const hasLabel = computed<boolean>(() => slots.label !== undefined)

const colorClassName = computed<string>(() => `text-editor-${controlColor.value}`)

const shapeClassName = computed<string>(() => `text-editor-${controlShape.value}`)

const gapClassName = computed<string>(() => (form?.isVee ? `text-editor-gap-${controlSize.value}` : ''))

const errorClassName = computed<string>(() => (errorMessage?.value ? 'text-editor-error' : ''))

const disabledClassName = computed<string>(() => (props.disabled ? 'text-editor-disabled' : ''))

const quillModelValue = computed({
  get: () => editorContent.value,
  set: (value) => {
    const convertContent = JSON.stringify(value)
    editorContent.value = convertContent
    if (form?.isVee) return setValue(convertContent)
    emits('onChange', convertContent)
  }
})

const toolbarOptions = computed(() => [
  [{ size: ['small', false, 'large', 'huge'] }],
  ['bold', 'italic', 'underline'],
  [{ align: [] }],
  ['clean']
])

watchEffect(() => {
  const defaultContent = form?.isVee ? veeValue.value : props.defaultValue
  if (defaultContent) editorContent.value = utils.formatQuill(defaultContent)
})
</script>

<template>
  <div
    :style="rootStyle"
    :class="[
      'text-editor',
      gapClassName,
      colorClassName,
      shapeClassName,
      errorClassName,
      rootClassName,
      disabledClassName
    ]"
  >
    <label>
      <div v-if="hasLabel" :style="labelStyle" :class="['text-editor-label', labelClassName]">
        <slot name="label"></slot>
      </div>

      <div :style="inputStyle" :class="['text-editor-control', inputClassName]">
        <QuillEditor :toolbar="toolbarOptions" v-model:content="quillModelValue" contentType="html" />
      </div>
    </label>

    <NoteMessage v-if="errorMessage" type="error" :message="errorMessage" />
  </div>
</template>

import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ComponentSize } from '@/common/type'
import type { ControlColor, ControlShape } from '../type'

const useFormStore = defineStore('form', () => {
  const isVee = ref<boolean>(false)
  const formData = ref<any>({})
  const formColor = ref<ControlColor>('blue')
  const formSize = ref<ComponentSize>('md')
  const formShape = ref<ControlShape>('square')

  const formActive = () => (isVee.value = true)
  const bindData = (data: any) => (formData.value = data)
  const changeColor = (color: ControlColor) => (formColor.value = color)
  const changeSize = (size: ComponentSize) => (formSize.value = size)
  const changeShape = (shape: ControlShape) => (formShape.value = shape)

  return {
    isVee,
    formData,
    formColor,
    formSize,
    formShape,
    formActive,
    bindData,
    changeColor,
    changeSize,
    changeShape
  }
})

export default useFormStore

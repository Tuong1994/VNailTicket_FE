import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ComponentColor } from '@/common/type'

export type LayoutTheme = 'dark' | 'light'

export type LayoutColor = Exclude<ComponentColor, 'white' | 'gray'>

const useLayoutStore = defineStore('layout', () => {
  const shrinked = ref<boolean>(false)
  const isLayout = ref<boolean>(false)
  const theme = ref<LayoutTheme>('light')
  const color = ref<LayoutColor>('blue')

  const switchTheme = (type: LayoutTheme) => (theme.value = type)
  const switchColor = (type: LayoutColor) => (color.value = type)
  const onLayout = () => (isLayout.value = true)
  const onShrinked = () => (shrinked.value = !shrinked.value)

  return { shrinked, isLayout, theme, color, switchTheme, switchColor, onLayout, onShrinked }
})

export default useLayoutStore

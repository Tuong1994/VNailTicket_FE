<script setup lang="ts">
import { computed, type StyleValue } from 'vue'
import type { MenuItems } from './type.ts'
import type { LayoutColor } from '../LayoutStore.ts'
import MenuHorizontal from './Horizontal/MenuHorizontal.vue'
import MenuVertical from './Vertical/MenuVertical.vue'

type MenuType = 'horizontal' | 'vertical'

export interface LayoutMenuProps {
  rootClassName?: string
  itemClassName?: string
  style?: StyleValue
  itemStyle?: StyleValue
  items?: MenuItems
  type?: MenuType
  color?: LayoutColor
}

const props = withDefaults(defineProps<LayoutMenuProps>(), {
  rootClassName: '',
  itemClassName: '',
  type: 'horizontal',
  color: 'blue'
})
</script>

<template>
  <MenuHorizontal v-if="type === 'horizontal'" v-bind="props" />
  <MenuVertical v-if="type === 'vertical'" v-bind="props" />
</template>

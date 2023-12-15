<script setup lang="ts">
import { ref, computed, withDefaults, watchEffect, type StyleValue } from 'vue'
import type { MenuItems } from '../type.ts'
import MenuVerticalItem from './MenuVerticalItem.vue'
import useLayoutStore, { type LayoutColor } from '@/components/UI/Layout/LayoutStore.ts'

export interface MenuVerticalProps {
  rootClassName?: string
  itemClassName?: string
  rootStyle?: StyleValue
  itemStyle?: StyleValue
  items?: MenuItems
  color?: LayoutColor
}

const props = withDefaults(defineProps<MenuVerticalProps>(), {
  rootClassName: '',
  itemClassName: '',
  color: 'blue',
  items: () => []
})

const layout = useLayoutStore()

const activeId = ref<string>('')

const menuColor = computed<LayoutColor>(() => (layout.isLayout ? layout.color : props.color))

const colorClassName = computed<string>(() => `menu-vertical-${menuColor.value}`)

const themeClassName = computed<string>(() => (layout.theme === 'dark' ? 'menu-vertical-dark' : ''))

const handleSelectMenu = (params: { e: Event; id: string }) => {
  console.log(params)
  const { id } = params
  if (activeId.value) activeId.value = ''
  activeId.value = id
}
</script>

<template>
  <div :style="rootStyle" :class="['menu-vertical', colorClassName, themeClassName, rootClassName]">
    <MenuVerticalItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      :activeId="activeId"
      :itemClassName="itemClassName"
      @onSelectMenu="handleSelectMenu"
    />
  </div>
</template>

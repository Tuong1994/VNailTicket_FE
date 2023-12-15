<script setup lang="ts">
import { ref, computed, withDefaults, watchEffect, type StyleValue } from 'vue'
import type { MenuItems } from '../type.ts'
import MenuHorizontalItem from './MenuHorizontalItem.vue'
import useLayoutStore, { type LayoutColor } from '@/components/UI/Layout/LayoutStore.ts'

export interface MenuHorizontalProps {
  rootClassName?: string
  itemClassName?: string
  rootStyle?: StyleValue
  itemStyle?: StyleValue
  items?: MenuItems
  color?: LayoutColor
}

const props = withDefaults(defineProps<MenuHorizontalProps>(), {
  rootClassName: '',
  itemClassName: '',
  color: 'blue',
  items: () => []
})

const layout = useLayoutStore()

const activeId = ref<string[]>([])

const menuColor = computed<LayoutColor>(() => (layout.isLayout ? layout.color : props.color))

const layoutClassName = computed<string>(() => (layout.isLayout ? 'menu-horizontal-layout' : ''))

const colorClassName = computed<string>(() => `menu-horizontal-${menuColor.value}`)

const handleOpenMenu = (id: string) => {
  // const idx = activeId.value.indexOf(id)
  // if (idx === -1) activeId.value = [...activeId.value, id]
  // else activeId.value = [...activeId.value].filter((active) => active !== id)
  activeId.value = [...activeId.value, id]
}
</script>

<template>
  <div :style="rootStyle" :class="['menu-horizontal', colorClassName, layoutClassName, rootClassName]">
    <MenuHorizontalItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      :activeId="activeId"
      :itemClassName="itemClassName"
      @onOpenMenu="handleOpenMenu"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, withDefaults, toRef, type StyleValue } from 'vue'
import type { MenuItems } from '../type.ts'
import { iconName } from '@/components/UI/Icon/constant.ts'
import Icon from '@/components/UI/Icon/Icon.vue'
import useRender from '@/hooks/useRender.ts'

interface MenuHorizontalItemProps {
  itemClassName?: string
  itemStyle?: StyleValue
  item: MenuItem
  activeId: string[]
}

const props = withDefaults(defineProps<MenuHorizontalItemProps>(), {
  itemClassName: '',
  childClassName: ''
})

const emits = defineEmits(['onOpenMenu'])

const activeId = toRef(props, 'activeId')

const hasChild = computed<boolean>(() => props.item.children && props.item.children.length > 0)

const actived = computed<boolean>(() => props.activeId.includes(props.item.id))

const labelActiveClassName = computed<string>(() => (actived.value ? 'item-label-active' : ''))

const dropDownActiveClassName = computed<string>(() => (actived.value ? 'item-dropdown-active' : ''))

const render = useRender(actived)

const handleOpenMenu = (id: string) => {
  console.log(props.activeId)
  emits('onOpenMenu', id)
}
// @mouseenter="() => handleOpenMenu(item.id)"
// @mouseleave="() => handleOpenMenu(item.id)"
</script>

<template>
  <div
    :style="itemStyle"
    :class="['horizontal-item', itemClassName]"
    @click="() => handleOpenMenu(item.id)"
  >
    <div :class="['item-label', labelActiveClassName]">
      <div class="label-content">
        <div v-if="item.labelIcon" class="content-icon">
          <Icon :iconName="item.labelIcon" />
        </div>

        <div v-if="item.type === 'text'" class="content-text">{{ item.label }}</div>
        <router-link v-if="item.type === 'link'" :to="item.path" class="content-text">
          {{ item.label }}
        </router-link>
      </div>

      <div v-if="hasChild && !item.isRoot" class="label-arrow">
        <Icon :iconName="iconName.ANGLE_RIGHT" />
      </div>
    </div>

    <div v-if="hasChild && render" :class="['item-dropdown', dropDownActiveClassName]">
      <MenuHorizontalItem
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        :activeId="activeId"
        :itemClassName="itemClassName"
        @onOpenMenu="() => handleOpenMenu(child.id)"
      />
    </div>
  </div>
</template>

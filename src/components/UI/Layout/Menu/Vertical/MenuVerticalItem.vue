<script setup lang="ts">
import { ref, computed, withDefaults, toRef, type StyleValue } from 'vue'
import type { MenuItems } from '../type.ts'
import { iconName } from '@/components/UI/Icon/constant.ts'
import Icon from '@/components/UI/Icon/Icon.vue'
import Tooltip from '@/components/UI/Tooltip/Tooltip.vue'
import useLayoutStore from '@/components/UI/Layout/LayoutStore.ts'

interface MenuHorizontalItemProps {
  itemClassName?: string
  itemStyle?: StyleValue
  item: MenuItem
  activeId: string
}

const props = withDefaults(defineProps<MenuHorizontalItemProps>(), {
  itemClassName: '',
  childClassName: ''
})

const emits = defineEmits(['onSelectMenu'])

const open = ref<boolean>(false)

const layout = useLayoutStore()

const hasChild = computed<boolean>(() => props.item.children && props.item.children.length > 0)

const actived = computed<boolean>(() => (hasChild.value ? open.value : props.activeId === props.item.id))

const showTooltipContent = computed<boolean>(() => layout.shrinked && props.item.isRoot && !hasChild.value)

const rootLabelClassName = computed<string>(() => (props.item.isRoot ? 'item-label-root' : ''))

const rootChildClassName = computed<string>(() =>
  props.item.isRoot && !open.value ? 'item-child-root' : 'item-child-root item-child-root-active'
)

const labelActiveClassName = computed<string>(() =>
  actived.value && !hasChild.value ? 'item-label-active' : ''
)

const childActiveClassName = computed<string>(() =>
  actived.value && hasChild.value ? 'item-child-active' : ''
)

const iconActiveClassName = computed<string>(() =>
  actived.value && hasChild.value ? 'label-arrow-active' : ''
)

const shrinkClassName = computed<string>(() => (layout.shrinked ? 'vertical-item-shrinked' : ''))

const handleOpen = (e: Event, id: string) => {
  if (e.type === 'click') {
    open.value = true
    console.count('trigger')
    if (!hasChild.value) {
      emits('onSelectMenu', { e, id })
    }
  }

  if (layout.shrinked && props.item.isRoot) open.value = !open.value
}
</script>

<template>
  <div
    :style="itemStyle"
    :class="['vertical-item', shrinkClassName, itemClassName]"
    @mouseenter="(e) => handleOpen(e, item.id)"
    @mouseleave="(e) => handleOpen(e, item.id)"
  >
    <Tooltip
      placement="right"
      rootClassName="item-tooltip-wrap"
      :titleClassName="`item-label ${rootLabelClassName} ${labelActiveClassName}`"
      @onClick="(e) => handleOpen(e, item.id)"
    >
      <template #title>
        <div class="label-content">
          <div v-if="item.labelIcon" class="content-icon">
            <Icon :iconName="item.labelIcon" />
          </div>

          <div v-if="item.type === 'text'" class="content-text">{{ item.label }}</div>
          <router-link v-if="item.type === 'link'" :to="item.path" class="content-text">
            {{ item.label }}
          </router-link>
        </div>

        <div v-if="hasChild" :class="['label-arrow', iconActiveClassName]">
          <Icon :iconName="iconName.ANGLE_DOWN" rootClassName="arrow-icon" />
        </div>
      </template>
      <template #content> {{ showTooltipContent ? item.label : undefined }} </template>
    </Tooltip>

    <div v-if="hasChild" :class="['item-child', rootChildClassName, childActiveClassName]">
      <MenuVerticalItem
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        :activeId="activeId"
        :itemClassName="itemClassName"
        @onSelectMenu="({ e }) => handleOpen(e, child.id)"
      />
    </div>
  </div>
</template>

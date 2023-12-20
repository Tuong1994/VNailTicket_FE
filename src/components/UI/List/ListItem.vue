<script setup lang="ts">
import { withDefaults, type StyleValue } from 'vue'
import Icon from '@/components/UI/Icon/Icon.vue'
import useListStore from './ListStore'

export interface ListItemProps {
  rootClassName?: string
  contentClassName?: string
  rootStyle?: StyleValue
  contentStyle?: StyleValue
}

const props = withDefaults(defineProps<ListItemProps>(), {
  rootClassName: '',
  contentClassName: '',
})

const list = useListStore()
</script>

<template>
  <li :style="rootStyle" :class="['list-item', rootClassName]">
    <div class="item-icon">
      <Icon :iconName="list.icon" />
    </div>
    <div :style="contentStyle" :class="['item-content', contentClassName]">
      <slot></slot>
    </div>
  </li>
</template>

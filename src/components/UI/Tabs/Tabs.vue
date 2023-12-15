<script setup lang="ts">
import { ref, computed, withDefaults, type StyleValue } from 'vue'
import type { ComponentColor } from '@/common/type.ts'
import { TabsItem, TabsItems } from './type.ts'
import { iconName } from '@/components/UI/Icon/constant.ts'
import Icon from '@/components/UI/Icon/Icon.vue'

export interface TabsProps {
  rootClassName?: string
  headClassName?: string
  contentClassName?: string
  rootStyle?: StyleValue
  headStyle?: StyleValue
  contentStyle?: StyleValue
  items: TabsItems
  color?: Exclude<ComponentColor, 'black' | 'white' | 'gray'>
}

const props = withDefaults(defineProps<TabsProps>(), {
  rootClassName: '',
  headClassName: '',
  contentClassName: '',
  color: 'blue',
  items: () => []
})

const activeTab = ref({ tabId: props.items[0].id, comName: props.items[0].comName })

const colorClassName = computed<string>(() => `tabs-${props.color}`)

const headItemStyle = computed<StyleValue>(() => ({ width: `calc(100% / ${props.items.length})` }))

const activeClassName = (tabId: string) => (activeTab.tabId === tabId ? 'head-item-active' : '')

const handleChangeTab = (tab: TabsItem) => (activeTab.value = { tabId: tab.id, comName: tab.comName })
</script>

<template>
  <div :style="rootStyle" :class="['tabs', colorClassName, rootClassName]">
    <div :style="headStyle" :class="['tabs-head', headClassName]">
      <div
        v-for="tab in items"
        :key="tab.id"
        :style="headItemStyle"
        :class="['head-item', activeTab.tabId === tab.id ? 'head-item-active' : '']"
        @click="() => handleChangeTab(tab)"
      >
        <Icon v-if="tab.labelIcon" rootClassName="item-icon" :iconName="tab.labelIcon" />
        <span>{{ tab.label }}</span>
      </div>
    </div>

    <div :style="contentStyle" :class="['tabs-content', contentClassName]">
      <slot name="content" :tab="activeTab.comName"></slot>
    </div>
  </div>
</template>

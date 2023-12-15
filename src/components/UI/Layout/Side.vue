<script setup lang="ts">
import { computed, withDefaults, type StyleValue } from 'vue'
import { iconName } from '@/components/UI/Icon/constant.ts'
import Icon from '@/components/UI/Icon/Icon.vue'
import Button from '@/components/UI/Button/Button.vue'
import useLayoutStore from './LayoutStore.ts'

export interface LayoutSideProps {
  rootClassName?: string
  rootStyle?: StyleValue
}

const props = withDefaults(defineProps<LayoutSideProps>(), {
  rootClassName: ''
})

const layout = useLayoutStore()

const themeClassName = computed<string>(() => `side-${layout.theme}`)

const shrinkClassName = computed<string>(() => (layout.shrinked ? `side-shrinked` : ''))

const layoutClassName = computed<string>(() => (layout.isLayout ? 'side-layout' : ''))
</script>

<template>
  <aside
    :style="rootStyle"
    :class="['side', shrinkClassName, layoutClassName, themeClassName, rootClassName]"
  >
    <div class="side-content">
      <slot></slot>
    </div>
    <div class="side-action">
      <Button :color="layout.color" class="action-btn" @click="layout.onShrinked">
        <Icon :iconName="iconName.ARROWS_LEFT_RIGHT_TO_LINE" :size="16" />
      </Button>
    </div>
  </aside>
</template>

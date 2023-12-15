<script setup lang="ts">
import { computed, withDefaults, toRefs, useSlots, type StyleValue } from 'vue'
import { iconName } from '@/components/UI/Icon/constant.ts'
import Icon from '@/components/UI/Icon/Icon.vue'
import useRender from '@/hooks/useRender.ts'

export interface DrawerProps {
  rootClassName?: string
  headClassName?: string
  bodyClassName?: string
  rootStyle?: StyleValue
  headStyle?: StyleValue
  bodyStyle?: StyleValue
  open?: boolean
}

const props = withDefaults(defineProps<DrawerProps>(), {
  rootClassName: '',
  headClassName: '',
  bodyClassName: ''
})

const emits = defineEmits(['onClose'])

const { open } = toRefs(props)

const render = useRender(open)

const slots = useSlots()

const backDropActiveClassName = computed<string>(() => (props.open ? 'drawer-backdrop-active' : ''))

const drawerActiveClassName = computed<string>(() => (props.open ? 'drawer-active' : ''))

const headFlexClassName = computed<string>(() => (slots.head !== undefined ? 'drawer-head-flex' : ''))

const handleClose = () => emits('onClose')
</script>

<template>
  <Teleport to="#portal">
    <div v-if="render" :class="['drawer-backdrop', backDropActiveClassName]" @click="handleClose" />

    <div v-if="render" :style="rootStyle" :class="['drawer', drawerActiveClassName, rootClassName]">
      <div :style="headStyle" :class="['drawer-head', headFlexClassName, headClassName]">
        <slot name="head"></slot>
        <Icon :iconName="iconName.X_MARK" rootClassName="head-icon" @click="handleClose" />
      </div>
      <div :style="bodyStyle" :class="['drawer-body', bodyClassName]">
        <slot name="body"></slot>
      </div>
    </div>
  </Teleport>
</template>

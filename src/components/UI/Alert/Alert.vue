<script setup lang="ts">
import { computed, withDefaults, toRefs, watchEffect, type StyleValue } from 'vue'
import type { AlertType } from './type.ts'
import type { ComponentPlacement } from '@/common/type.ts'
import { iconName } from '@/components/UI/Icon/constant.ts'
import Icon from '@/components/UI/Icon/Icon.vue'
import useRender from '@/hooks/useRender.ts'

export interface AlertProps {
  rootClassName?: string
  rootStyle?: StyleValue
  type?: AlertType
  message?: React.ReactNode | React.ReactNode[]
  placement?: Exclude<ComponentPlacement, 'left' | 'right'>
  open?: boolean
}

let timeout: any

const props = withDefaults(defineProps<AlertProps>(), {
  rootClassName: '',
  type: 'info',
  placement: 'top'
})

const emits = defineEmits(['onClose'])

const { open } = toRefs(props)

const render = useRender(open)

const typeClassName = computed<string>(() => `alert-${props.type}`)

const placementClassName = computed<string>(() => `alert-${props.placement}`)

const activeClassName = computed<string>(() => (props.open ? 'alert-active' : ''))

const handleClose = () => emits('onClose')

watchEffect((onStop) => {
  if (props.open) timeout = setTimeout(() => handleClose(), 3000)
  onStop(() => clearTimeout(timeout))
})
</script>

<template>
  <Teleport to="#portal">
    <div
      v-if="render"
      :style="rootStyle"
      :class="['alert', typeClassName, placementClassName, activeClassName, rootClassName]"
      @click="handleClose"
    >
      <div className="alert-icon">
        <Icon v-if="type === 'success'" :iconName="iconName.CIRCLE_CHECK" />
        <Icon v-if="type === 'error'" :iconName="iconName.X_MARK_CIRCLE" />
        <Icon v-if="type === 'warning'" :iconName="iconName.CIRCLE_EXCLAMATION" />
        <Icon v-if="type === 'info'" :iconName="iconName.CIRCLE_INFO" />
      </div>
      <p className="alert-message">{{ message }}</p>
    </div>
  </Teleport>
</template>

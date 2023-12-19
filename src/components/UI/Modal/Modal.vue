<script setup lang="ts">
import { ref, computed, withDefaults, watchEffect, useSlots, toRefs, type StyleValue } from 'vue'
import { iconName } from '@/components/UI/Icon/constant.ts'
import type { ComponentSize } from '@/common/type'
import Button, { type ButtonProps } from '@/components/UI/Button/Button.vue'
import Icon from '@/components/UI/Icon/Icon.vue'
import useRender from '@/hooks/useRender.ts'
import useOverflow from '@/hooks/useOverflow.ts'

export interface ModalProps {
  rootClassName?: string
  headClassName?: string
  bodyClassName?: string
  footClassName?: string
  rootStyle?: StyleValue
  headStyle?: StyleValue
  bodyStyle?: StyleValue
  footStyle?: StyleValue
  hasHead?: boolean
  hasFoot?: boolean
  hasCloseIcon?: boolean
  backDropClose?: boolean
  open?: boolean
  sizes?: ComponentSize
  okButtonTitle?: string
  cancelButtonTitle?: string
  okButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
}

const props = withDefaults(defineProps<ModalProps>(), {
  rootClassName: '',
  headClassName: '',
  bodyClassName: '',
  footClassName: '',
  hasHead: true,
  hasFoot: true,
  hasCloseIcon: true,
  backDropClose: true,
  sizes: 'md',
  okButtonTitle: 'Ok',
  cancelButtonTitle: 'Cancel',
  okButtonProps: () => ({}),
  cancelButtonProps: () => ({})
})

const emits = defineEmits(['onOk', 'onClose'])

const { open } = toRefs(props)

const render = useRender(open)

const slots = useSlots()

useOverflow(open)

const hasHeadTitle = computed<boolean>(() => slots.head !== undefined)

const sizesClassName = computed<string>(() => `modal-${props.sizes}`)

const hasHeadClassName = computed<boolean>(() => (hasHeadTitle.value ? 'modal-head-flex' : ''))

const backdropActiveClassName = computed<boolean>(() => (props.open ? 'modal-backdrop-active' : ''))

const modalActiveClassName = computed<boolean>(() => (props.open ? 'modal-active' : ''))

const okActionProps = computed<ButtonProps>(() => ({ ...props.okButtonProps, color: 'blue' }))

const handleOk = () => emits('onOk')

const handleClose = () => emits('onClose')
</script>

<template>
  <Teleport to="#portal">
    <div
      v-if="render"
      :class="['modal-backdrop', backdropActiveClassName]"
      @click="() => backDropClose && handleClose()"
    />

    <div v-if="render" :class="['modal', sizesClassName, modalActiveClassName, rootClassName]">
      <div v-if="hasHead" :class="['modal-head', hasHeadClassName, headClassName]">
        <slot v-if="hasHeadTitle" name="head"></slot>

        <button v-if="hasCloseIcon" type="button" class="head-close-action" @click="handleClose">
          <Icon :iconName="iconName.X_MARK" />
        </button>
      </div>

      <div :class="['modal-body', bodyClassName]">
        <slot name="body"></slot>
      </div>

      <div v-if="hasFoot" :class="['modal-foot', footClassName]">
        <Button v-bind="cancelButtonProps" @click="handleClose">
          {{ cancelButtonTitle }}
        </Button>
        <Button v-bind="okActionProps" @click="handleOk">
          {{ okButtonTitle }}
        </Button>
      </div>
    </div>
  </Teleport>
</template>

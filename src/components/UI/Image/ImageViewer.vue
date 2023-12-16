<script setup lang="ts">
import { ref, computed, toRefs, type StyleValue } from 'vue'
import { iconName } from '@/components/UI/Icon/constant.ts'
import Icon from '@/components/UI/Icon/Icon.vue'
import Draggable from '@/components/UI/Draggable/Draggable.vue'
import { useRender, useOverflow } from '@/hooks'

interface ImageViewerProps {
  open: boolean
  imgUrl?: string
}

const props = defineProps<ImageViewerProps>()

const emits = defineEmits(['onClose'])

const { open } = toRefs(props)

useOverflow(open)

const render = useRender(open)

const rotate = ref<number>(0)

const scale = ref<number>(1)

const plusScaleDisabled = computed<boolean>(() => scale.value >= 1.4)

const minusScaleDisabled = computed<boolean>(() => scale.value <= 0.6)

const plusScaleDisabledClassName = computed<string>(() =>
  plusScaleDisabled.value ? 'head-action-disabled' : ''
)

const minusScaleDisabledClassName = computed<string>(() =>
  minusScaleDisabled.value ? 'head-action-disabled' : ''
)

const openClassName = computed<string>(() => (props.open ? 'image-viewer-active' : ''))

const imageStyle = computed<StyleValue>(() => ({
  transform: `rotate(${rotate.value}deg) scale(${scale.value})`
}))

const handleRotate = () => (rotate.value += 90)

const handleScale = (type: 'minus' | 'plus') => {
  if (type === 'minus') scale.value -= 0.1
  else scale.value += 0.1
}

const handleClose = () => emits('onClose')
</script>

<template>
  <Teleport to="#portal">
    <div v-if="render" :class="['image-viewer', openClassName]">
      <div class="viewer-head">
        <button class="head-action" @click="handleRotate">
          <Icon :iconName="iconName.ROTATE" :size="16" />
        </button>
        <button
          :disabled="minusScaleDisabled"
          :class="['head-action', minusScaleDisabledClassName]"
          @click="() => handleScale('minus')"
        >
          <Icon :size="16" :iconName="iconName.SEARCH_MINUS" />
        </button>
        <button
          :disabled="plusScaleDisabled"
          :class="['head-action', plusScaleDisabledClassName]"
          @click="() => handleScale('plus')"
        >
          <Icon :iconName="iconName.SEARCH_PLUS" :size="16" />
        </button>
        <button class="head-action" @click="handleClose">
          <Icon :iconName="iconName.X_MARK" :size="16" />
        </button>
      </div>
      <div class="viewer-body">
        <Draggable>
          <img :style="imageStyle" :src="imgUrl" class="body-image" />
        </Draggable>
      </div>
    </div>
  </Teleport>
</template>

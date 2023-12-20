<script setup lang="ts">
import { ref, computed, type StyleValue } from 'vue'
import type { ImageLazyType } from './Image.vue'
import { iconName } from '@/components/UI/Icon/constant'
import Icon from '@/components/UI/Icon/Icon.vue'
import CheckBox from '@/components/Control/CheckBox/CheckBox.vue'
import ImageViewer from './ImageViewer.vue'
import vLazyload from './directive'

type OpenViewer = {
  active: boolean
  imgUrl: string
}

interface ImageViewProps {
  imageSize: StyleValue
  loading: boolean
  src: string
  lazyType: ImageLazyType
  hasView: boolean
  hasRemove: boolean
  hasCheck: boolean
}

const props = defineProps<ImageViewProps>()

const emits = defineEmits(['onLoad', 'onRemove', 'onCheck'])

const isChecked = ref<boolean>(false)

const openViewer = ref<OpenViewer>({ active: false, imgUrl: '' })

const checkedClassName = computed<string>(() => (isChecked.value ? 'view-check-checked' : ''))

const loadedClassName = computed<string>(() => (!props.loading ? 'image-view-loaded' : ''))

const handleLoad = () => emits('onLoad')

const handleOpenViewer = () => (openViewer.value = { active: true, imgUrl: props.src })

const handleCloseViewer = () => (openViewer.value = { ...openViewer.value, active: false })

const handleRemove = () => emits('onRemove')

const handleCheck = (checked: boolean) => {
  isChecked.value = checked
  emits('onCheck', checked)
}
</script>

<template>
  <div :style="imageSize" :class="['image-view', loadedClassName]">
    <img v-lazyload="lazyType" class="view-area" :data-src="src" @load="handleLoad" />
    <div v-if="hasView" class="view-actions">
      <Icon :iconName="iconName.EYE" class="actions-icon" @click="handleOpenViewer" />
      <Icon v-if="hasRemove" :iconName="iconName.TRASH" class="actions-icon" @click="handleRemove" />
    </div>
    <CheckBox
      v-if="hasCheck"
      color="white"
      :rootClassName="`view-check ${checkedClassName}`"
      @onCheck="handleCheck"
    />
  </div>

  <ImageViewer :open="openViewer.active" :imgUrl="openViewer.imgUrl" @onClose="handleCloseViewer" />
</template>

<script setup lang="ts">
import { ref, computed, type StyleValue } from 'vue'
import { iconName } from '@/components/UI/Icon/constant.ts'
import Icon from '@/components/UI/Icon/Icon.vue'
import ImageViewer from './ImageViewer.vue'
import vLazyload from './directive.ts'

type OpenViewer = {
  active: boolean
  imgUrl: string
}

interface ImageViewProps {
  imageSize: StyleValue
  loading: boolean
  src: string
  hasView: boolean
  hasRemove: boolean
}

const props = defineProps<ImageViewProps>()

const emits = defineEmits(['onLoad', 'onRemove'])

const openViewer = ref<OpenViewer>({ active: false, imgUrl: '' })

const loadedClassName = computed<string>(() => (!props.loading ? 'image-view-loaded' : ''))

const handleLoad = () => emits('onLoad')

const handleOpenViewer = () => (openViewer.value = { active: true, imgUrl: props.src })

const handleCloseViewer = () => (openViewer.value = { ...openViewer.value, active: false })

const handleRemove = () => emits('onRemove')
</script>

<template>
  <div :style="imageSize" :class="['image-view', loadedClassName]">
    <img v-lazyload class="view-area" :data-src="src" @load="handleLoad" />
    <div v-if="hasView" class="view-actions">
      <Icon :iconName="iconName.EYE" class="actions-icon" @click="handleOpenViewer" />
      <Icon v-if="hasRemove" :iconName="iconName.TRASH" class="actions-icon" @click="handleRemove" />
    </div>
  </div>

  <ImageViewer :open="openViewer.active" :imgUrl="openViewer.imgUrl" @onClose="handleCloseViewer" />
</template>

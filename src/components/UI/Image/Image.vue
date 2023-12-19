<script setup lang="ts">
import { ref, computed, withDefaults, watch, toRefs, watchEffect, onMounted, type StyleValue } from 'vue'
import type { ComponentSize } from '@/common/type.ts'
import ImageLoading from './ImageLoading.vue'
import ImageView from './ImageView.vue'
import vLazyload from './directive.ts'

type ImageSize = (ComponentSize & number) | any

type ImageObjectFit = 'fill' | 'cover' | 'contain' | 'none'

export type ImageLazyType = 'lazy' | 'immediate'

export interface ImageProps {
  rootClassName?: string
  rootStyle?: StyleValue
  sizes?: ImageSize
  objectFit?: ImageObjectFit
  lazyType?: ImageLazyType
  src?: string
  hasView?: boolean
  hasRemove?: boolean
  hasCheck?: boolean
}

const props = withDefaults(defineProps<ImageProps>(), {
  rootClassName: '',
  sizes: 'auto',
  objectFit: 'fill',
  lazyType: 'lazy',
  src: 'https://cdn.hswstatic.com/gif/space-smell-2.jpg',
  hasView: false,
  hasRemove: false,
  hasCheck: false
})

const emits = defineEmits(['onClick', 'onRemove', 'onCheck'])

const { src } = toRefs(props)

const view = ref<string>('')

const loading = ref<boolean>(true)

const fitClassName = computed<string>(() => `image-${props.objectFit}`)

const imageSize = computed<StyleValue>(() => {
  if (typeof props.sizes === 'number') return { width: `${props.sizes}px`, height: `${props.sizes}px` }
  if (props.sizes === 'sm') return { width: '100px', height: '100px' }
  if (props.sizes === 'md') return { width: '200px', height: '200px' }
  if (props.sizes === 'lg') return { width: '300px', height: '300px' }
  return { width: props.sizes, height: props.sizes }
})

const inlineStyle = computed<StyleValue>(() => ({ ...props.rootStyle, imageSize }))

const handleLoad = () => (loading.value = false)

const handleRemove = () => emits('onRemove')

const handleClick = () => emits('onClick')

const handleCheck = (checked: boolean) => emits('onCheck', checked)
</script>

<template>
  <div id="image" :style="inlineStyle" :class="['image', fitClassName, rootClassName]" @click="handleClick">
    <ImageLoading v-if="loading" :imageSize="imageSize" />
    <ImageView
      :loading="loading"
      :imageSize="imageSize"
      :hasView="hasView"
      :hasRemove="hasRemove"
      :hasCheck="hasCheck"
      :src="src"
      :lazyType="lazyType"
      @onLoad="handleLoad"
      @onRemove="handleRemove"
      @onCheck="handleCheck"
    />
  </div>
</template>

import type { ImageResponse } from '@/services/image/type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useImageStore = defineStore('image', () => {
  const images = ref<ImageResponse>({ totalItems: 0, data: [] })
  const addImages = (imagesData: ImageResponse) => (images.value = imagesData)
  return { images, addImages }
})

export default useImageStore

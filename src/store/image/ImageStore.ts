import type { Image } from '@/services/image/type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useImageStore = defineStore('image', () => {
  const images = ref<Image[]>([])
  const addImages = (imagesData: Image[]) => (images.value = imagesData)
  return { images, addImages }
})

export default useImageStore

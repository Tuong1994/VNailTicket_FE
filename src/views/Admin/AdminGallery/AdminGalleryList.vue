<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { UI, Control } from '@/components'
import type { Image } from '@/services/image/type'
import { imageApis } from '@/services/image/api'
import { getImages } from '@/store/image/actions'
import PageLoading from '@/views/components/PageLoading.vue'
import useImageStore from '@/store/image/ImageStore'
import useMessage from '@/components/UI/ToastMessage/useMessage'

const { Button, Modal, Image, Loading } = UI

const { Spinner } = Loading

const { Upload } = Control

const { Image: ImageUpload } = Upload

const { MultipleImageUpload } = ImageUpload

const messageApi = useMessage()

const imageStore = useImageStore()

const open = ref<boolean>(false)

const loading = ref<boolean>(false)

const limit = ref<number>(5)

const imagesUpload = ref<File[]>([])

const imageIds = ref<string[]>([])

const showAddMore = computed<boolean>(
  () => imageStore.images.data.length > 0 && imageStore.images.totalItems !== imageStore.images.data.length
)

const handleOpen = () => (open.value = true)

const handleClose = () => (open.value = false)

const handleChange = (files: File[]) => (imagesUpload.value = files)

const handleUpload = async () => {
  loading.value = true
  const formData = new FormData()
  if (imagesUpload.value.length > 0) {
    const uploadImages = Array.from(imagesUpload.value)
    uploadImages.forEach((image) => {
      formData.append('images', image)
    })
  }
  const res = await imageApis.uploadImages(formData)
  if (res.error) {
    messageApi.error('Upload error')
  } else {
    messageApi.success('Uploaded success')
    getImages(5, messageApi, imageStore.addImages)
  }
  open.value = false
  loading.value = false
}

const handleSelectImage = (id: string) => {
  const listIds = [...imageIds.value]
  const idx = listIds.indexOf(id)
  if (idx === -1) return (imageIds.value = [...listIds, id])
  imageIds.value = listIds.filter((imageId) => imageId !== id)
}

const handleRemoveImage = async () => {
  loading.value = true
  const ids = imageIds.value.join(',')
  const res = await imageApis.removeImages({ ids })
  if (res.error) {
    messageApi.error('Remove error')
  } else {
    messageApi.success('Removed success')
    getImages(5, messageApi, imageStore.addImages)
  }
  imageIds.value = []
  loading.value = false
}

const handleAddMore = async () => {
  loading.value = true
  const amounts = limit.value + 5
  getImages(amounts, messageApi, imageStore.addImages)
  limit.value = amounts
  loading.value = false
}

onMounted(() => getImages(5, messageApi, imageStore.addImages, loading))
</script>

<template>
  <div class="admin-gallery-list">
    <PageLoading v-if="loading" />
    <div v-if="!loading" class="list-inner">
      <div v-for="image in imageStore.images.data" :key="image.id" class="inner-image">
        <Image
          hasView
          hasCheck
          :src="image.path"
          lazyType="immediate"
          rootClassName="image-root"
          @onCheck="() => handleSelectImage(image.id as string)"
        />
      </div>
    </div>

    <button v-if="showAddMore" :disabled="loading" type="button" class="list-action" @click="handleAddMore">
      <Spinner v-if="loading" />
      <span v-if="!loading">See more</span>
    </button>

    <div class="content-footer">
      <Button
        color="red"
        :loading="loading"
        rootClassName="content-action"
        @click="() => (imageIds.length === 0 ? handleOpen() : handleRemoveImage())"
      >
        {{ imageIds.length === 0 ? 'Upload Image' : 'Remove Selected Image' }}
      </Button>
    </div>

    <Modal
      rootClassName="upload-images-modal"
      :okButtonProps="{ loading, disabled: imagesUpload.length === 0 }"
      :open="open"
      okButtonTitle="Upload"
      @onOk="handleUpload"
      @onClose="handleClose"
    >
      <template #head> Upload Images </template>
      <template #body>
        <MultipleImageUpload @onUpload="handleChange" />
      </template>
    </Modal>
  </div>
</template>

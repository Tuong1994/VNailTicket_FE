<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { UI, Control } from '@/components'
import { Image } from '@/services/image/type.ts'
import { imageApis } from '@/services/image/api.ts'
import { getImages } from '@/store/image/actions.ts'
import useImageStore from '@/store/image/ImageStore.ts'
import useMessage from '@/components/UI/ToastMessage/useMessage.ts'

const { Button, Modal, Image } = UI

const { Upload } = Control

const { Image: ImageUpload } = Upload

const { MultipleImageUpload } = ImageUpload

const messageApi = useMessage()

const imageStore = useImageStore()

const open = ref<boolean>(false)

const loading = ref<boolean>(false)

const imagesUpload = ref<File[]>([])

const imageIds = ref<string[]>([])

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
    getImages(messageApi, imageStore.addImages)
  }
  open.value = false
  loading.value = false
}

const handleSelectImage = (id: string) => {
  const listIds = [...imageIds.value]
  const idx = listIds.indexOf(id)
  if (idx === -1) return (imageIds.value = [listIds, id])
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
    getImages(messageApi, imageStore.addImages)
  }
  imageIds.value = []
  loading.value = false
}
</script>

<template>
  <div class="admin-gallery-list">
    <div class="list-inner">
      <div v-for="image in imageStore.images" :key="image.id" class="inner-image">
        <Image
          :src="image.path"
          hasView
          hasCheck
          rootClassName="image-root"
          @onCheck="() => handleSelectImage(image.id)"
        />
      </div>
    </div>

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
@/store/image/ImageStore
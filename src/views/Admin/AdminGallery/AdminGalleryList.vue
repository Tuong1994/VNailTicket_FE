<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { UI, Control } from '@/components'
import { Image } from '@/services/image/type.ts'
import { imageApis } from '@/services/image/api.ts'
import useMessage from '@/components/UI/ToastMessage/useMessage.ts'

const { Button, Modal, Image } = UI

const { Upload } = Control

const { Image: ImageUpload } = Upload

const { MultipleImageUpload } = ImageUpload

const messageApi = useMessage()

const open = ref<boolean>(false)

const loading = ref<boolean>(false)

const imagesUpload = ref<File[]>([])

const images = ref<Image[]>([])

const getImages = async () => {
  const res = await imageApis.getList()
  if (res.error) return messageApi.error('Api network error')
  images.value = res.success
}

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
    getImages()
  }
  open.value = false
  loading.value = false
}

const handleRemoveImage = (id: string) => {
  console.log(id)
}

onMounted(() => getImages())
</script>

<template>
  <div class="admin-gallery-list">
    <div class="list-inner">
      <div v-for="image in images" :key="image.id" class="inner-image">
        <Image
          :src="image.path"
          hasView
          hasRemove
          rootClassName="image-root"
          @onRemove="() => handleRemoveImage(image.id)"
        />
      </div>
    </div>

    <div class="content-footer">
      <Button color="red" rootClassName="content-action" @click="handleOpen"> Upload Image </Button>
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

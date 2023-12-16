<script setup lang="ts">
import { ref, computed } from 'vue'
import { UI, Control } from '@/components'

const { Button, Modal, Image } = UI

const { Upload } = Control

const { Image: ImageUpload } = Upload

const { MultipleImageUpload } = ImageUpload

const open = ref<boolean>(false)

const images = computed(() => [
  { id: '1', path: '/images/page/Gallery_1.PNG' },
  { id: '2', path: '/images/page/Gallery_2.PNG' },
  { id: '3', path: '/images/page/Gallery_3.PNG' },
  { id: '4', path: '/images/page/Gallery_4.PNG' }
])

const handleOpen = () => (open.value = true)

const handleClose = () => (open.value = false)
</script>

<template>
  <div class="admin-gallery-list">
    <div class="list-inner">
      <Image v-for="image in images" :key="image.id" :src="image.path" hasView rootClassName="inner-view" />
    </div>

    <div class="content-footer">
      <Button color="red" rootClassName="content-action" @click="handleOpen"> Upload Image </Button>
    </div>

    <Modal rootClassName="upload-images-modal" :open="open" @onClose="handleClose">
      <template #head> Upload Images </template>
      <template #body>
        <MultipleImageUpload />
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { UI } from '@/components'
import type { Image } from '@/services/image/type'
import { getImages } from '@/store/image/actions'
import useImageStore from '@/store/image/ImageStore'
import useMessage from '@/components/UI/ToastMessage/useMessage'

const { Section, Image, Typography, Loading } = UI

const { Spinner } = Loading

const { Title, Paragraph } = Typography

const imageStore = useImageStore()

const messageApi = useMessage()

const limit = ref<number>(5)

const loading = ref<boolean>(false)

const showAddMore = computed<boolean>(
  () => imageStore.images?.data?.length > 0 && imageStore.images.totalItems !== imageStore.images?.data?.length
)

const handleAddMore = async () => {
  loading.value = true
  const amounts = limit.value + 5
  getImages(amounts, messageApi, imageStore.addImages)
  limit.value = amounts
  loading.value = false
}
</script>

<template>
  <Section rootClassName="home-images">
    <Title rootClassName="section-title" aligns="center">Images</Title>
    <Paragraph rootClassName="section-text" aligns="center">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis laudantium quod, alias nemo minus fugit?
    </Paragraph>

    <div class="images-list">
      <div v-for="image in imageStore.images.data" :key="image.id" class="list-inner">
        <Image :src="image.path" lazyType="immediate" sizes="100%" rootClassName="inner-image" />
      </div>
    </div>

    <button v-if="showAddMore" :disabled="loading" type="button" class="images-action" @click="handleAddMore">
      <Spinner v-if="loading" />
      <span v-if="!loading">See more</span>
    </button>
  </Section>
</template>

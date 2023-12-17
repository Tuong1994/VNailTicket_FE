<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { UI } from '@/components'
import { Image } from '@/services/image/type.ts'
import { imageApis } from '@/services/image/api.ts'
import useMessage from '@/components/UI/ToastMessage/useMessage.ts'

const { Section, Image, Typography } = UI

const { Title, Paragraph } = Typography

const images = ref<Image[]>([])

const getImages = async () => {
  const res = await imageApis.getList()
  if (res.error) return messageApi.error('Api network error')
  images.value = res.success
}

onMounted(() => getImages())
</script>

<template>
  <Section rootClassName="home-images">
    <Title rootClassName="section-title" aligns="center">Images</Title>
    <Paragraph aligns="center" :size="16">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis laudantium quod, alias nemo minus fugit?
    </Paragraph>

    <div class="images-list">
      <div v-for="image in images" :key="image.id" class="list-inner">
        <Image :src="image.path" sizes="100%" rootClassName="inner-image" />
      </div>
    </div>

    <button type="button" class="images-action">See more</button>
  </Section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { UI } from '@/components'

const { Section, Image, Typography } = UI

const { Title, Paragraph } = Typography

const images = computed(() => [
  { id: '1', path: '/images/page/Gallery_1.PNG' },
  { id: '2', path: '/images/page/Gallery_2.PNG' },
  { id: '3', path: '/images/page/Gallery_3.PNG' },
  { id: '4', path: '/images/page/Gallery_4.PNG' }
])
</script>

<template>
  <Section rootClassName="home-images">
    <Title rootClassName="section-title" aligns="center">Images</Title>
    <Paragraph aligns="center" :size="16">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis laudantium quod, alias nemo minus fugit?
    </Paragraph>

    <div class="images-list">
      <Image v-for="image in images" :key="image.id" :src="image.path" rootClassName="list-view" />
    </div>

    <button type="button" class="images-action">See more</button>
  </Section>
</template>

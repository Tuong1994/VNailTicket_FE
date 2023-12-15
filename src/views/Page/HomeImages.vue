<script setup lang="ts">
import { UI } from '@/components'

const { Section, Typography } = UI

const { Title, Paragraph } = Typography
</script>

<template>
  <Section rootClassName="home-images">
    <Title rootClassName="section-title" aligns="center">Images</Title>
    <Paragraph aligns="center" :size="16">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis laudantium quod, alias nemo minus fugit?
    </Paragraph>

    <button type="button" class="images-action">See more</button>
  </Section>
</template>

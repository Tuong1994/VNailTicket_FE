<script setup lang="ts">
import { computed } from 'vue'
import { UI } from '@/components'
import { useViewPoint } from '@/hooks'

const { Section, Typography, Grid, Image } = UI

const { Row, Col } = Grid

const { Title, Paragraph } = Typography

const { isPhone } = useViewPoint()

const items = computed(() => [
  { id: '1', title: 'USA Medical Coding & Billing School', path: '/images/page/Partner 1.png' },
  { id: '2', title: 'Aiken School of Cosmetology & Barbering', path: '/images/page/Partner 2.png' },
  { id: '3', title: 'Dalton Institute of Esthetics & Cosmetology', path: '/images/page/Partner 3.png' },
  { id: '4', title: 'USA Daycare Academy', path: '/images/page/Partner 4.png' }
])

const imageSize = computed(() => {
  if (isPhone.value) return 110
  return 160
})

const textSize = computed(() => {
  if (isPhone.value) return 14
  return 20
})
</script>

<template>
  <Section rootClassName="home-partners">
    <Title rootClassName="section-title" aligns="center">Partners</Title>
    <Paragraph rootClassName="section-text" aligns="center">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis laudantium quod, alias nemo minus fugit?
    </Paragraph>

    <Row v-for="item in items" :key="item.id" justify="between" aligns="middle">
      <Col isFill :xs="8" :md="8" :lg="6" :span="6">
        <Image :sizes="imageSize" :src="item.path" />
      </Col>
      <Col isFill :xs="14" :md="14" :lg="14" :span="14">
        <Paragraph :size="textSize"> {{ item.title }} </Paragraph>
      </Col>
    </Row>
  </Section>
</template>

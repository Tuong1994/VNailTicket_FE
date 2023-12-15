<script setup lang="ts">
import { computed } from 'vue'
import { UI } from '@/components'

const { Section, Typography, Grid, Image } = UI

const { Row, Col } = Grid

const { Title, Paragraph } = Typography

const items = computed(() => [
  { id: '1', title: 'USA Medical Coding & Billing School', path: '/images/page/Partner 1.png' },
  { id: '2', title: 'Aiken School of Cosmetology & Barbering', path: '/images/page/Partner 2.png' },
  { id: '3', title: 'Dalton Institute of Esthetics & Cosmetology', path: '/images/page/Partner 3.png' },
  { id: '4', title: 'USA Daycare Academy', path: '/images/page/Partner 4.png' }
])
</script>

<template>
  <Section rootClassName="home-partners">
    <Title rootClassName="section-title" aligns="center">Partners</Title>
    <Paragraph aligns="center" :size="16">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis laudantium quod, alias nemo minus fugit?
    </Paragraph>

    <Row v-for="item in items" :key="item.id" justify="between" aligns="middle">
      <Col :lg="6">
        <Image :sizes="180" :src="item.path" />
      </Col>
      <Col :lg="16">
        <Paragraph :size="20"> {{ item.title }} </Paragraph>
      </Col>
    </Row>
  </Section>
</template>

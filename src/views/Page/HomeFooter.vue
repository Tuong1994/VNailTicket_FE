<script setup lang="ts">
import { computed } from 'vue'
import { UI } from '@/components'

const { Section, Image, Typography, Grid } = UI

const { Row, Col } = Grid

const { Title, Paragraph } = Typography

const items = computed(() => [
  { id: '1', title: 'Fanpage', path: '/images/icons/Fanpage.png' },
  { id: '2', title: 'Message', path: '/images/icons/Message.png' },
  { id: '3', title: 'Email', path: '/images/icons/Email.png' }
])
</script>

<template>
  <div class="home-footer">
    <Section>
      <Title rootClassName="section-title footer-title" aligns="center"> Contact </Title>

      <Row justify="evenly" rootClassName="footer-items">
        <Col v-for="item in items" :key="item.id">
          <button type="button" class="items-action">
            <Image :sizes="80" :src="item.path" class="action-icon" />
            <Paragraph aligns="center">{{ item.title }}</Paragraph>
          </button>
        </Col>
      </Row>
    </Section>
  </div>
</template>

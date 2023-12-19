<script setup lang="ts">
import { ref, computed } from 'vue'
import { UI } from '@/components'
import { useRouter } from 'vue-router'
import LoginModal from './components/LoginModal.vue'
import useAuthStore from '@/store/auth/AuthStore.ts'

const { Section, Image, Typography, Grid } = UI

const { Row, Col } = Grid

const { Title, Paragraph } = Typography

const router = useRouter()

const authStore = useAuthStore()

const open = ref<boolean>(false)

const items = computed(() => [
  { id: '1', title: 'Fanpage', path: '/images/icons/Fanpage.png' },
  { id: '2', title: 'Message', path: '/images/icons/Message.png' },
  { id: '3', title: 'Email', path: '/images/icons/Email.png' }
])

const handleOpenModal = () => (open.value = true)

const handleCloseModal = () => (open.value = false)
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

    <button class="footer-admin" @click="!authStore.auth ? handleOpenModal() : router.push('/admin')">
      <Image :sizes="80" src="/images/icons/Admin Button.png" class="admin-icon" />
    </button>

    <LoginModal :open="open" @onClose="handleCloseModal" />
  </div>
</template>
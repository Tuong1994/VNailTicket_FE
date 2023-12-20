<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { UI } from '@/components'
import { authApis } from '@/services/auth/api'
import useAuthStore from '@/store/auth/AuthStore'
import useMessage from '@/components/UI/ToastMessage/useMessage'

const { Modal, Typography, Button, Space } = UI

const { Paragraph } = Typography

let intervalRefresh: any

const router = useRouter()

const authStore = useAuthStore()

const messageApi = useMessage()

const open = ref<boolean>(false)

const loading = ref<boolean>(false)

const handleLogout = async () => {
  if (!authStore.auth) return
  loading.value = true
  const { info } = authStore.auth
  const res = await authApis.logout({ accountId: info.id })
  if (res.error) {
    messageApi.error('Logout error')
    return (loading.value = false)
  }
  authStore.resetAuth()
  messageApi.success('Logout success')
  open.value = false
  loading.value = false
  router.push('/')
}

const refresh = async () => {
  if (!authStore.auth) return
  const { info } = authStore.auth
  const res = await authApis.refresh({ accountId: info.id })
  if (res.error) open.value = true
}

onMounted(() => refresh())

watchEffect((onStop) => {
  if (!authStore.auth) return clearInterval(intervalRefresh)
  const { expired } = authStore.auth
  intervalRefresh = setInterval(refresh, expired - 500)
  onStop(() => clearInterval(intervalRefresh))
})
</script>

<template>
  <slot></slot>

  <Modal
    :hasFoot="false"
    :hasCloseIcon="false"
    :backDropClose="false"
    :open="open"
    sizes="sm"
    rootClassName="modal-refresh"
    headClassName="refresh-head"
  >
    <template #head> Authenticate </template>
    <template #body>
      <Paragraph aligns="center" :size="16">Your login session has been expired, please re-login</Paragraph>
      <Space justify="end">
        <Button color="blue" :loading="loading" rootClassName="refresh-action" @click="handleLogout">
          Logout
        </Button>
      </Space>
    </template>
  </Modal>
</template>

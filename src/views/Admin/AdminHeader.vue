<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { UI } from '@/components'
import { authApis } from '@/services/auth/api.ts'
import useAuthStore from '@/store/auth/AuthStore.ts'
import useMessage from '@/components/UI/ToastMessage/useMessage.ts'

const { Typography, Loading } = UI

const { Spinner } = Loading

const { Title } = Typography

interface AdminHeaderProps {
  isAdminForm: boolean
}

const props = defineProps<AdminHeaderProps>()

const router = useRouter()

const messageApi = useMessage()

const { auth, resetAuth } = useAuthStore()

const loading = ref<boolean>(false)

const params = computed(() => router.currentRoute.value.params)

const handleLogout = async () => {
  if (!auth) return
  loading.value = true
  const { info } = auth
  const res = await authApis.logout({ accountId: info.id })
  if (res.error) {
    messageApi.error('Logout error')
    return (loading.value = false)
  }
  resetAuth()
  messageApi.success('Logout success')
  loading.value = false
  router.push('/')
}
</script>

<template>
  <div class="admin-header">
    <div v-if="!props.isAdminForm" class="header-default">
      <Title rootClassName="default-name">Admin</Title>

      <button class="default-icon" @click="handleLogout">
        <span>{{ !loading ? 'Exit' : 'Existing' }}</span>
        <img v-if="!loading" src="/images/icons/Exit.png" />
        <Spinner v-if="loading" />
      </button>
    </div>

    <div v-if="props.isAdminForm" class="header-form">
      <Title rootClassName="form-title">
        {{ params.id === '0' ? 'New' : 'Edit' }}
      </Title>
    </div>
  </div>
</template>
@/store/auth/AuthStore
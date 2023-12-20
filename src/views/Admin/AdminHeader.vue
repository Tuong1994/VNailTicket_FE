<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { UI } from '@/components'
import type { DropdownItems } from '@/components/UI/Dropdown/type'
import { iconName } from '@/components/UI/Icon/constant'
import { authApis } from '@/services/auth/api'
import useAuthStore from '@/store/auth/AuthStore'
import useMessage from '@/components/UI/ToastMessage/useMessage'

const { Typography, Loading, Dropdown, Icon } = UI

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

const items = computed<DropdownItems>(() => [{ id: '1', comName: 'logout' }])

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

const handleExist = () => router.push('/')
</script>

<template>
  <div class="admin-header">
    <div v-if="!props.isAdminForm" class="header-default">
      <Dropdown :items="items" rootClassName="default-dropdown">
        <template #label>
          <Title rootClassName="dropdown-name">
            {{ auth?.info?.account ?? 'Admin' }}
          </Title>
        </template>
        <template #item="com">
          <button
            v-if="com.item === 'logout'"
            :disabled="loading"
            class="dropdown-item"
            @click="handleLogout"
          >
            <Spinner v-if="loading" />
            <Icon v-if="!loading" :iconName="iconName.SIGN_OUT" />
            <span>{{ !loading ? 'Logout' : 'Logouting' }}</span>
          </button>
        </template>
      </Dropdown>

      <button class="default-icon" @click="handleExist">
        <span>Exit</span>
        <img src="/images/icons/Exit.png" />
      </button>
    </div>

    <div v-if="props.isAdminForm" class="header-form">
      <Title rootClassName="form-title">
        {{ params.id === '0' ? 'New' : 'Edit' }}
      </Title>
    </div>
  </div>
</template>

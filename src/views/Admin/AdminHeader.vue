<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { UI } from '@/components'

const { Typography } = UI

const { Title } = Typography

interface AdminHeaderProps {
  isAdminForm: boolean
}

const props = defineProps<AdminHeaderProps>()

const router = useRouter()

const params = computed(() => router.currentRoute.value.params)
</script>

<template>
  <div class="admin-header">
    <div v-if="!props.isAdminForm" class="header-default">
      <Title rootClassName="default-name">Admin</Title>
      <button class="default-icon">
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

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Control } from '@/components'
import AdminHeader from './AdminHeader.vue'

const { Select, TextArea } = Control

const router = useRouter()

const currentPath = router.currentRoute.value.path

const isAdmin = computed<boolean>(() => currentPath.includes('form'))

console.log(isAdmin.value)
</script>

<template>
  <div class="admin">
    <AdminHeader />
    <div class="admin-content">
      <Select sizes="lg" rootClassName="content-control" />
      <TextArea sizes="lg" placeholder="Description" :rows="3" rootClassName="content-control" />
      <router-view />
    </div>
  </div>
</template>

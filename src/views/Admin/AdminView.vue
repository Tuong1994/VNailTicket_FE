<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Control } from '@/components'
import { SelectOptions } from '@/components/Control/type.ts'
import AdminHeader from './AdminHeader.vue'

const { Select, TextArea } = Control

const router = useRouter()

const currentPath = ref(router.currentRoute.value.path)

const isAdminForm = computed<boolean>(() => currentPath.value.split('/').includes('form'))

const routeOptions = computed<SelectOptions>(() => [
  { label: 'Q & A', value: '/admin' },
  { label: 'Contact', value: '/admin/contact/list' },
  { label: 'Gallery', value: '/admin/gallery/list' }
])

const handleSelect = (value: string) => {
  currentPath.value = value
  router.push(value)
}

onMounted(() => router.afterEach((to) => (currentPath.value = to.path)))
</script>

<template>
  <div class="admin">
    <AdminHeader :isAdminForm="isAdminForm" />
    <div class="admin-content">
      <Select
        v-if="!isAdminForm"
        sizes="lg"
        rootClassName="content-control"
        :defaultValue="currentPath"
        :options="routeOptions"
        :hasClear="false"
        @onChangeSelect="handleSelect"
      />
      <TextArea
        v-if="!isAdminForm"
        sizes="lg"
        placeholder="Description"
        :rows="2"
        rootClassName="content-control"
      />
      <router-view />
    </div>
  </div>
</template>

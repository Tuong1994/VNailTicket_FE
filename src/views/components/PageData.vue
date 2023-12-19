<script setup lang="ts">
import { onMounted } from 'vue'
import { AuthConst } from '@/services/auth/constant'
import { getQnAItems } from '@/store/qna/actions.ts'
import { getImages } from '@/store/image/actions.ts'
import useAuthStore from '@/store/auth/AuthStore.ts'
import useQnAStore from '@/store/qna/QnAStore.ts'
import useImageStore from '@/store/image/ImageStore.ts'
import useMessage from '@/components/UI/ToastMessage/useMessage.ts'

const { addAuth } = useAuthStore()

const { addQnaItems } = useQnAStore()

const { addImages } = useImageStore()

const messageApi = useMessage()

const getAuth = () => {
  const storage = localStorage.getItem(AuthConst.LOCAL_STORAGE_KEY)
  const authData = storage ? JSON.parse(storage ?? '') : undefined
  addAuth(authData)
}

onMounted(() => {
  getAuth()
  getQnAItems(messageApi, addQnaItems)
  getImages(5, messageApi, addImages)
})
</script>

<template>
  <slot></slot>
</template>

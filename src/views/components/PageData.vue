<script setup lang="ts">
import { onMounted } from 'vue'
import { AuthConst } from '@/services/auth/constant'
import { getQnAItems } from '@/store/qna/actions'
import { getImages } from '@/store/image/actions'
import useAuthStore from '@/store/auth/AuthStore'
import useQnAStore from '@/store/qna/QnAStore'
import useImageStore from '@/store/image/ImageStore'
import useMessage from '@/components/UI/ToastMessage/useMessage'

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

<script setup lang="ts">
import { computed, withDefaults, type StyleValue } from 'vue'
import ToastItem from './ToastItem.vue'
import useToastStore from './ToastStore.ts'
import useRender from '@/hooks/useRender.ts'

export interface ToastMessageProps {
  rootClassName?: string
  itemClassName?: string
  rootStyle?: StyleValue
  itemStyle?: StyleValue
  showProgress?: boolean
}

withDefaults(defineProps<ToastMessageProps>(), {
  rootClassName: '',
  itemClassName: '',
  showProgress: true
})

const toastStore = useToastStore()

const hasToast = computed<boolean>(() => toastStore.toastMessages.length > 0)

const render = useRender(hasToast)
</script>

<template>
  <Teleport to="#portal">
    <div v-if="render" :style="rootStyle" :class="['toast-message', rootClassName]">
      <ToastItem
        v-for="toast in toastStore.toastMessages"
        :key="toast.id"
        :toast="toast"
        :itemStyle="itemStyle"
        :itemClassName="itemClassName"
        :showProgress="showProgress"
      />
    </div>
  </Teleport>
</template>

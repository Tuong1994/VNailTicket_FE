import { ref } from 'vue'
import { defineStore } from 'pinia'
import { iconName } from '@/components/UI/Icon/constant'
import type { ToastMessages, ToastMessage, ToastType } from './type'
import utils from '@/utils'

export type ToastOptions = {
  successIconName?: string
  errorIconName?: string
  warningIconName?: string
  infoIconName?: string
}

const useToastStore = defineStore('toast', () => {
  const toastMessages = ref<ToastMessages>([])
  const options = ref<ToastOptions>({
    successIconName: iconName.CIRCLE_CHECK,
    errorIconName: iconName.X_MARK_CIRCLE,
    warningIconName: iconName.CIRCLE_EXCLAMATION,
    infoIconName: iconName.CIRCLE_INFO
  })
  const addToast = (type: ToastType, message: string) => {
    const newToast: ToastMessage = { id: utils.uuid(), type, message }
    toastMessages.value = [newToast, ...toastMessages.value]
  }
  const removeToast = (id: string) =>
    (toastMessages.value = [...toastMessages.value].filter((toast) => toast.id !== id))
  const configOptions = (op: ToastOptions) => (options.value = { ...options.value, ...op })

  return { toastMessages, options, addToast, removeToast, configOptions }
})

export default useToastStore

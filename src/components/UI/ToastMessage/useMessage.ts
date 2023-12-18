import { watchEffect } from 'vue'
import useToastStore, { type ToastOptions } from './ToastStore'
import type { ToastMessageApi } from './type'

const useMessage = (options?: ToastOptions): ToastMessageApi => {
  const toastStore = useToastStore()

  watchEffect(() => {
    if (options) toastStore.configOptions(options)
  })

  const success = (message: string) => toastStore.addToast('success', message)

  const error = (message: string) => toastStore.addToast('error', message)

  const warning = (message: string) => toastStore.addToast('warning', message)

  const info = (message: string) => toastStore.addToast('info', message)

  const messageApi = { success, error, warning, info }

  return messageApi
}

export default useMessage

import type { Ref } from 'vue'
import { imageApis } from '@/services/image/api'
import type { ToastMessageApi } from '@/components/UI/ToastMessage/type'
import type { ImageResponse } from '@/services/image/type'

export const getImages = async (
  limit: number,
  messageApi: ToastMessageApi,
  addImages: (images: ImageResponse) => void,
  loading?: Ref<boolean>
) => {
  if(loading) loading.value = true
  const res = await imageApis.getList({ limit })
  if (res.error) messageApi.error('Api network error')
  else addImages(res.success)
  if(loading) loading.value = false
}

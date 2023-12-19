import type { ToastMessageApi } from '@/components/UI/ToastMessage/type'
import { imageApis } from '@/services/image/api'
import type { ImageResponse } from '@/services/image/type'
import type { ResponseSuccess } from '@/services/type'

export const getImages = async (
  limit: number,
  messageApi: ToastMessageApi,
  addImages: (images: ResponseSuccess<ImageResponse>) => void
) => {
  const res = await imageApis.getList({ limit })
  if (res.error) return messageApi.error('Api network error')
  addImages(res.success)
}

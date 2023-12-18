import type { ToastMessageApi } from '@/components/UI/ToastMessage/type'
import { imageApis } from '@/services/image/api'
import type { Image } from '@/services/image/type'
import type { ResponseSuccess } from '@/services/type'

export const getImages = async (
  messageApi: ToastMessageApi,
  addImages: (images: ResponseSuccess<Image[]>) => void
) => {
  const res = await imageApis.getList()
  if (res.error) return messageApi.error('Api network error')
  addImages(res.success)
}

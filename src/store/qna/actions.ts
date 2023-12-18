import type { ToastMessageApi } from '@/components/UI/ToastMessage/type'
import { qnaApis } from '@/services/qna/api'
import type { QnA } from '@/services/qna/type'
import type { ResponseSuccess } from '@/services/type'

export const getQnAItems = async (
  messageApi: ToastMessageApi,
  addQnaItems: (items: ResponseSuccess<QnA[]>) => void
) => {
  const res = await qnaApis.getList()
  if (res.error) return messageApi.error('Api network error')
  addQnaItems(res.success)
}

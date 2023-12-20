import type { Ref } from 'vue'
import { qnaApis } from '@/services/qna/api'
import type { ToastMessageApi } from '@/components/UI/ToastMessage/type'
import type { QnA } from '@/services/qna/type'

export const getQnAItems = async (
  messageApi: ToastMessageApi,
  addQnaItems: (items: QnA[]) => void,
  loading?: Ref<boolean>
) => {
  if (loading) loading.value = true
  const res = await qnaApis.getList()
  if (res.error) messageApi.error('Api network error')
  else addQnaItems(res.success)
  if (loading) loading.value = false
}

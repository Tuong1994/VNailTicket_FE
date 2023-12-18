import type { QnA } from '@/services/qna/type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useQnAStore = defineStore('qna', () => {
  const qnaItems = ref<QnA[]>([])
  const addQnaItems = (qnaItemsData: QnA[]) => (qnaItems.value = qnaItemsData)
  return { qnaItems, addQnaItems }
})

export default useQnAStore

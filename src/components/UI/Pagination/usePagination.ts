import { computed, type Ref } from 'vue'

type Params = {
  total: number
  limit: number
  currentPage: Ref<number>
  siblingCount: number
}

const DOTS = '...'

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

const usePagination = (args: Params) => {
  const { total, limit, currentPage, siblingCount = 1 } = args

  const totalPages = Math.ceil(total / limit)

  const totalShowPages = siblingCount + 5

  const pageRange = computed<(number | string)[]>(() => {
    if (totalShowPages >= totalPages) return range(1, totalPages)

    const leftSiblingIdx = Math.max(currentPage.value - siblingCount, 1)
    const rightSiblingIdx = Math.min(currentPage.value + siblingCount, totalPages)
    const showLeftDot = leftSiblingIdx > 2
    const showRightDot = rightSiblingIdx < totalPages - 2
    const firstPageIdx = 1
    const lastPageIdx = totalPages

    if (!showLeftDot && showRightDot) {
      const leftItems = 3 + 2 * siblingCount
      const leftRange = range(1, leftItems)
      return [...leftRange, DOTS, lastPageIdx]
    }

    if (showLeftDot && !showRightDot) {
      const rightItems = 3 + 2 * siblingCount
      const rightRange = range(totalPages - rightItems + 1, totalPages)
      return [firstPageIdx, DOTS, ...rightRange]
    }

    if (showLeftDot && showRightDot) {
      const middleRange = range(leftSiblingIdx, rightSiblingIdx)
      return [firstPageIdx, DOTS, ...middleRange, DOTS, lastPageIdx]
    }

    return []
  })

  return { totalPages, pageRange }
}

export default usePagination

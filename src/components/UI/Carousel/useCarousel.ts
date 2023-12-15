import { computed, type Ref } from 'vue'
import type { CarouselItems } from './type'

type TranslateType = 'horizontal' | 'vertical'

type Params = {
  items: CarouselItems
  slideId: string
  slidePos: Ref<number>
}

const useCarousel = (args: Params) => {
  const { items, slideId, slidePos } = args

  const span = computed<number>(() => 100)

  const translateFull = (pos: number, type: TranslateType) => {
    const translate = -pos * span.value
    for (let i = 0; i < items.length; i++) {
      const el = document.getElementById(`${slideId}-${i}`)
      if (el) {
        if (type === 'horizontal') el.style.transform = `translateX(${translate}%)`
        else el.style.transform = `translateY(${translate}%)`
      }
    }
  }

  const translatePartial = (pos: number, type: TranslateType) => {
    const currentPos = -slidePos.value * span.value
    const translate = currentPos + pos
    for (let i = 0; i < items.length; i++) {
      const el = document.getElementById(`${slideId}-${i}`)
      if (el) {
        if (type === 'horizontal') el.style.transform = `translateX(${translate}%)`
        else el.style.transform = `translateY(${translate}%)`
      }
    }
  }

  const translateAnimation = (type: 'fast' | 'slow') => {
    for (let i = Math.max(0, slidePos.value - 2); i < Math.min(items.length, slidePos.value + 3); i++) {
      const el = document.getElementById(`${slideId}-${i}`)
      if (el) {
        if (type === 'fast') el.style.transitionDuration = `0.1s`
        else el.style.transitionDuration = `0.4s`
      }
    }
  }

  return { translateFull, translatePartial, translateAnimation }
}

export default useCarousel

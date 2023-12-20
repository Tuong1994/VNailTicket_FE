import { type Ref, watchEffect } from 'vue'

const useClickOutSide = (ref: Ref<HTMLElement | undefined>, trigger: Ref<boolean>) => {
  const handleClickOutside = (e: any) => {
    if (ref.value && !ref.value.contains(e.target)) {
      trigger.value = false
    }
  }

  watchEffect((onStop) => {
    window.addEventListener('mousedown', handleClickOutside)
    onStop(() => window.removeEventListener('mousedown', handleClickOutside))
  })
}

export default useClickOutSide

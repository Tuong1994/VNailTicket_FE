import { type Ref, watch } from 'vue'

const useOverflow = (trigger: Ref<boolean>) => {
  watch(trigger, (newVal) => {
    if (newVal) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  })
}

export default useOverflow

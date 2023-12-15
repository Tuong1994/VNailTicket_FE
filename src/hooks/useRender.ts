import { ref, watchEffect, type Ref } from 'vue'

const useRender = (trigger: Ref<boolean>, time = 300) => {
  const render = ref<boolean>(false)

  let timeOut: any

  watchEffect((onStop) => {
    if (trigger.value && !render.value) render.value = true
    else if (!trigger.value && render.value) timeOut = setTimeout(() => (render.value = false), time)
    onStop(() => clearTimeout(timeOut))
  })

  return render
}

export default useRender

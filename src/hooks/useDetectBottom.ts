import { ref, onMounted, type Ref } from 'vue'

const useDetectBottom = (nodeRef: Ref<HTMLElement>, distance = 250) => {
  const bottom = ref<boolean>(false)

  const nodeBottomDistance = ref<number>(0)

  onMounted(() => {
    if (!nodeRef.value) return (bottom.value = false)
    nodeBottomDistance.value = nodeRef.value.getBoundingClientRect().bottom
    if (window.innerHeight - nodeBottomDistance.value < distance) return (bottom.value = true)
    bottom.value = false
  })

  return bottom
}

export default useDetectBottom

import { computed, ref, watchEffect } from 'vue'

const useViewPoint = () => {
  const screenWidth = ref<number>(window.innerWidth)

  watchEffect((onStop) => {
    const handleResize = () => (screenWidth.value = window.innerWidth)
    window.addEventListener('resize', handleResize)
    onStop(() => window.removeEventListener('resize', handleResize))
  })

  const isPhone = computed<boolean>(() => screenWidth.value >= 320 && screenWidth.value <= 480)

  const isTablet = computed<boolean>(() => screenWidth.value > 480 && screenWidth.value <= 768)

  const isLaptop = computed<boolean>(() => screenWidth.value > 768 && screenWidth.value <= 1100)

  const isDesktop = computed<boolean>(() => screenWidth.value > 1100)

  return { screenWidth, isPhone, isTablet, isLaptop, isDesktop }
}

export default useViewPoint

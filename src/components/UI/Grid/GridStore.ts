import { ref } from 'vue'
import { defineStore } from 'pinia'

const useGridStore = defineStore('grid', () => {
  const gutters = ref<[number?, number?]>([])
  const addGutters = (rowGap: number, colGap?: number) => {
    if (rowGap && !colGap) return (gutters.value[0] = rowGap)
    gutters.value[0] = rowGap
    gutters.value[1] = colGap
  }
  return { gutters, addGutters }
})

export default useGridStore

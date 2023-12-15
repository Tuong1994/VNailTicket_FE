import { ref } from 'vue'
import { defineStore } from 'pinia'
import { iconName } from '../Icon/constant'

const useListStore = defineStore('list', () => {
  const icon = ref<string>(iconName.CHECK)
  const changeIcon = (iconName: string) => (icon.value = iconName)
  return { icon, changeIcon }
})

export default useListStore

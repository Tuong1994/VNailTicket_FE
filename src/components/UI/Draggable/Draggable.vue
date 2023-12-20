<script setup lang="ts">
import { ref } from 'vue'

const touchX = ref<number>(0)

const touchY = ref<number>(0)

const mouseX = ref<number>(0)

const mouseY = ref<number>(0)

const dragged = ref<boolean>(false)

const dragEl = ref<HTMLDivElement | null>(null)

const handleTouchStart = (e: any) => {
  e.preventDefault()
  e.stopPropagation()
  dragged.value = true
  touchX.value = e.touches[0].screenX - e.currentTarget?.getBoundingClientRect()?.left
  touchY.value = e.touches[0].screenY - e.currentTarget?.getBoundingClientRect()?.top
}

const handleTouchMove = (e: any) => {
  e.preventDefault()
  e.stopPropagation()
  if (!dragged.value) return
  if (dragEl.value && dragEl.value !== null) {
    const left = e.touches[0].screenX - touchX.value
    const top = e.touches[0].screenY - touchY.value
    dragEl.value.style.left = `${left}px`
    dragEl.value.style.top = `${top}px`
  }
}

const handleTouchEnd = () => (dragged.value = false)

const handleMouseStart = (e: any) => {
  e.preventDefault()
  e.stopPropagation()
  dragged.value = true
  mouseX.value = e.screenX - e.currentTarget?.getBoundingClientRect()?.left
  mouseY.value = e.screenY - e.currentTarget?.getBoundingClientRect()?.top
}

const handleMouseMove = (e: any) => {
  e.preventDefault()
  e.stopPropagation()
  if (!dragged.value) return
  if (dragEl.value && dragEl.value !== null) {
    const left = e.screenX - mouseX.value
    const top = e.screenY - mouseY.value
    dragEl.value.style.left = `${left}px`
    dragEl.value.style.top = `${top}px`
  }
}

const handleMouseEnd = () => (dragged.value = false)
</script>

<template>
  <div
    ref="dragEl"
    class="draggable"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @mousedown="handleMouseStart"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseEnd"
  >
    <slot></slot>
  </div>
</template>

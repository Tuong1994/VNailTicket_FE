<script setup lang="ts">
import { ref, computed, withDefaults, watchEffect, toRefs, type StyleValue } from 'vue'
import type { ToastMessage } from './type'
import { iconName } from '@/components/UI/Icon/constant'
import Icon from '@/components/UI/Icon/Icon.vue'
import useToastStore from './ToastStore'

interface ToastItemProps {
  toast: ToastMessage
  itemClassName?: string
  itemStyle?: StyleValue
  showProgress?: boolean
}

let timeOut: any

const ANIMATION_TIME = 4000

const props = withDefaults(defineProps<ToastItemProps>(), {
  itemClassName: '',
  showProgress: true
})

const { options, removeToast } = useToastStore()

const { toast } = toRefs(props)

const { id, type, message } = toast.value

const removed = ref<boolean>(false)

const barRef = ref<HTMLDivElement | null>(null)

const typeClassName = computed<string>(() => `message-item-${type}`)

const removeClassName = computed<string>(() => (removed.value ? 'message-item-hide' : ''))

const handleRemove = () => {
  removed.value = true
  setTimeout(() => removeToast(id), 400)
}

const handleMouseEnter = () => {
  if (!barRef.value) return
  clearTimeout(timeOut)
  barRef.value.style.animationPlayState = 'paused'
}

const handleMouseLeave = () => {
  const barEl = barRef.value
  if (!barEl) return
  if (!barEl.parentElement) return
  const remainTime = (barEl.offsetWidth / barEl.parentElement.offsetWidth) * ANIMATION_TIME
  barEl.style.animationPlayState = 'running'
  timeOut = setTimeout(() => handleRemove(), remainTime)
}

watchEffect((onStop) => {
  timeOut = setTimeout(() => handleRemove(), ANIMATION_TIME)
  onStop(() => clearTimeout(timeOut))
})
</script>

<template>
  <div
    :style="itemStyle"
    :class="['message-item', typeClassName, removeClassName, itemClassName]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div className="item-content">
      <div className="content-icon">
        <Icon v-if="type === 'success'" :iconName="String(options.successIconName)" />
        <Icon v-if="type === 'error'" :iconName="String(options.errorIconName)" />
        <Icon v-if="type === 'warning'" :iconName="String(options.warningIconName)" />
        <Icon v-if="type === 'info'" :iconName="String(options.infoIconName)" />
      </div>

      <div className="content-message">
        <p className="message-text">{{ message }}</p>

        <div v-if="showProgress" className="message-progress">
          <div ref="barRef" className="progress-bar" />
        </div>
      </div>
    </div>

    <button type="button" className="item-action" @click="handleRemove">
      <Icon :iconName="iconName.X_MARK" />
    </button>
  </div>
</template>

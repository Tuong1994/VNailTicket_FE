<script setup lang="ts">
import { ref, computed, withDefaults, useSlots, watch, type StyleValue } from 'vue'
import { iconName } from '@/components/UI/Icon/constant'
import Icon from '@/components/UI/Icon/Icon.vue'

export interface AccordionProps {
  contentId?: string
  rootClassName?: string
  labelClassName?: string
  contentClassName?: string
  rootStyle?: StyleValue
  labelStyle?: StyleValue
  contentStyle?: StyleValue
  label?: string
  labelIcon?: string
  extraIcon?: string
  bordered?: boolean
  showLabelIcon?: boolean
}

const props = withDefaults(defineProps<AccordionProps>(), {
  contentId: 'accordionContent',
  rootClassName: '',
  labelClassName: '',
  contentClassName: '',
  label: 'Accordion',
  labelIcon: iconName.ANGLE_DOWN,
  bordered: true,
  showLabelIcon: true
})

const emits = defineEmits(['onCollapse'])

const slots = useSlots()

const collapsed = ref<boolean>(false)

const hasExtraLabel = computed<boolean>(() => slots.extraLabel !== undefined)

const hasContent = computed<boolean>(() => slots.default !== undefined)

const borderedClassName = computed<string>(() => (props.bordered ? 'accordion-bordered' : ''))

const collapsedClassName = computed<string>(() => (collapsed.value ? 'accordion-collapsed' : ''))

const handleCollapse = () => {
  const el = document.getElementById(props.contentId)
  if (!el) return
  if (el.style.maxHeight) el.style.maxHeight = ''
  else el.style.maxHeight = `${el.scrollHeight}px`
  collapsed.value = !collapsed.value
}

watch(collapsed, (newValue) => emits('onCollapse', newValue))
</script>

<template>
  <div :style="rootStyle" :class="['accordion', borderedClassName, collapsedClassName, rootClassName]">
    <div :style="labelStyle" :class="['accordion-label', labelClassName]" @click="handleCollapse">
      <div class="label-title">
        <Icon v-if="!hasExtraLabel && showLabelIcon" :iconName="labelIcon" rootClassName="title-icon" />
        <div v-if="hasExtraLabel">
          <slot name="extraLabel"></slot>
        </div>
        <span>{{ label }}</span>
      </div>
      <Icon v-if="extraIcon" :iconName="extraIcon" />
    </div>

    <div :id="contentId" :style="contentStyle" :class="['accordion-content', contentClassName]">
      <div v-if="hasContent" class="content-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

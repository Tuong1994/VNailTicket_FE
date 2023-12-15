<script setup lang="ts">
import { computed, withDefaults, useSlots, type StyleValue } from 'vue'
import { iconName } from '@/components/UI/Icon/constant.ts'
import Icon from '@/components/UI/Icon/Icon.vue'
import moment from 'moment'

interface DatePickerControlProps {
  inputClassName?: string
  inputStyle?: StyleValue
  hasAddonBefore: boolean
  hasAddonAfter: boolean
  format: string
  showResetIcon: boolean
  selectedDate: Date | null
  iconSize: number
}

const props = withDefaults(defineProps<DatePickerControlProps>(), {
  inputClassName: ''
})

const emits = defineEmits(['onDropdown', 'onResetInput'])

const slots = useSlots()

const handleDropdown = () => emits('onDropdown')

const handleResetInput = () => emits('onResetInput')
</script>

<template>
  <div ref="controlRef" class="wrap-group" @click="handleDropdown">
    <div v-if="hasAddonBefore" class="group-addon group-addon-before">
      <slot name="addonBefore"></slot>
    </div>

    <div :style="inputStyle" :class="['group-control', inputClassName]">
      <div class="control-box">
        {{ moment(selectedDate).format(format) }}
      </div>

      <div v-if="showResetIcon" class="control-action" @click="handleResetInput">
        <Icon :size="iconSize" :iconName="iconName.ROTATE" />
      </div>

      <div className="control-action">
        <Icon :size="iconSize" :iconName="iconName.CALENDAR" rootClassName="action-icon" />
      </div>
    </div>

    <div v-if="hasAddonAfter" className="group-addon group-addon-after">
      <slot name="addonAfter"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults, toRefs } from 'vue'
import useSelectRange from './useSelectRange.ts'

interface DateItemProps {
  min?: 'today' | string
  max?: 'today' | string
  currentDate: Date
  selectDate: SelectDate
}

const props = withDefaults(defineProps<DateItemProps>(), {
  min: '',
  max: ''
})

const emits = defineEmits(['onSelectDate'])

const { selectDate, max, min, currentDate } = toRefs(props)

const selectRange = useSelectRange({ date: selectDate, min, max })

const isSelected = computed<boolean>(
  () =>
    selectDate.value.date === currentDate.value.getDate() &&
    selectDate.value.month === currentDate.value.getMonth() &&
    selectDate.value.year === currentDate.value.getFullYear()
)

const selectedClassName = computed<string>(() => (isSelected.value ? 'date-item-selected' : ''))

const subDateClassName = computed<string>(() => (props.selectDate.type === 'sub' ? 'date-item-sub' : ''))

const handleSelectDate = () => emits('onSelectDate', props.selectDate)
</script>

<template>
  <div :class="['date-item', , selectedClassName, subDateClassName, selectRange.className]">
    <button :disabled="selectRange.disabled" type="button" class="item-btn" @click="handleSelectDate">
      {{ selectDate.date }}
    </button>
  </div>
</template>

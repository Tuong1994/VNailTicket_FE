<script setup lang="ts">
import { computed, toRefs } from 'vue'
import useDateRange from './useDateRange.ts'
import DateItem from "./DateItem.vue"

interface CalendarDateProps {
  min?: 'today' | string
  max?: 'today' | string
  currentDate: Date
  currentMonth: number
  currentYear: number
}

const props = defineProps<CalendarDateProps>()

const emits = defineEmits(['onSelectDate'])

const { currentYear, currentMonth } = toRefs(props)

const dateRange = useDateRange(currentYear, currentMonth)

const handleSelectDate = (date: SelectDate) => emits('onSelectDate', date)
</script>

<template>
  <div class="calendar-date">
    <DateItem
      v-for="(selectDate, idx) in dateRange"
      :key="idx"
      :min="min"
      :max="max"
      :currentDate="currentDate"
      :selectDate="selectDate"
      @onSelectDate="handleSelectDate"
    />
  </div>
</template>

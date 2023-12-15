import { computed, type Ref } from 'vue'
import type { SelectDate } from '../type'

const useDateRange = (year: Ref<number>, month: Ref<number>) => {
  const lastDateOfMonth = computed<number>(() => new Date(year.value, month.value + 1, 0).getDate())
  const lastDateOfPrevMonth = computed<number>(() => new Date(year.value, month.value, 0).getDate())
  const firstDayOfMonth = computed<number>(() => new Date(year.value, month.value, 1).getDay())
  const lastDayOfMonth = computed<number>(() =>
    new Date(year.value, month.value, lastDateOfMonth.value).getDay()
  )

  const getDate = (fullDate: Date, date: number, type: 'main' | 'sub') => {
    return {
      fullDate,
      date,
      type,
      day: fullDate.getDay(),
      month: fullDate.getMonth(),
      year: fullDate.getFullYear()
    }
  }

  const dateRange = computed<SelectDate[]>(() => {
    const dates: SelectDate[] = []

    for (let i = firstDayOfMonth.value; i > 0; i--) {
      const date = lastDateOfPrevMonth.value - i + 1
      const newDate = new Date(year.value, month.value - 1, date)
      dates.push(getDate(newDate, date, 'sub'))
    }

    for (let i = 1; i < lastDateOfMonth.value; i++) {
      const newDate = new Date(year.value, month.value, i)
      dates.push(getDate(newDate, i, 'main'))
    }

    for (let i = lastDayOfMonth.value; i < 7; i++) {
      const date = i - lastDayOfMonth.value + 1
      const newDate = new Date(year.value, month.value + 1, date)
      dates.push(getDate(newDate, date, 'sub'))
    }

    return dates
  })

  return dateRange
}

export default useDateRange

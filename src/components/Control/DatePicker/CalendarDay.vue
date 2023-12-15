<script setup lang="ts">
import { computed } from 'vue'

const days = computed<string[]>(() => ['Sun', 'Mon', 'Tue', 'Web', 'Thur', 'Fri', 'Sat'])
</script>

<template>
  <div className="calendar-day">
    <div v-for="(day, idx) in days" :key="idx" class="day-item">
      {{ day }}
    </div>
  </div>
</template>

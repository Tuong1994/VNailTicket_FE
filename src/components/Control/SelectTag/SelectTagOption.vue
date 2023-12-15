<script setup lang="ts">
import { ref, computed, withDefaults } from 'vue'
import type { SelectOptions } from '@/components/Control/type.ts'
import OptionItem from './OptionItem.vue'
import OptionEmpty from './OptionEmpty.vue'
import OptionLoading from './OptionLoading.vue'
import OptionPagination from './OptionPagination.vue'

interface SelectTagOptionProps {
  async: boolean
  dropdown: boolean
  loading: boolean
  bottom: boolean
  options: SelectOptions
  selectedOptions: SelectOptions
  currentPage: number
  totalPages: number
  iconSize: number
}

const props = withDefaults(defineProps<SelectTagOptionProps>(), {
  options: () => [],
  selectedOptions: () => []
})

const emits = defineEmits(['onSelect', 'onChangePage'])

const optionScrollClassName = computed<string>(() => (props.options.length > 10 ? 'option-list-scroll' : ''))

const dropdownClassName = computed<string>(() => (props.dropdown ? 'wrap-option-active' : ''))

const bottomClassName = computed<string>(() => (props.bottom ? 'wrap-option-bottom' : ''))

const handleSelect = (option: Option) => emits('onSelect', option)

const handleChangePage = (type: 'prev' | 'next') => emits('onChangePage', type)
</script>

<template>
  <div :class="['wrap-option', bottomClassName, dropdownClassName]">
    <div :class="['option-list', optionScrollClassName]">
      <OptionLoading v-if="loading" />

      <OptionEmpty v-if="!options.length" />

      <template v-if="!loading && options.length > 0">
        <OptionItem
          v-for="(option, idx) in options"
          :key="idx"
          :option="option"
          :iconSize="iconSize"
          :selectedOptions="selectedOptions"
          @onSelect="handleSelect"
        />
      </template>
    </div>

    <OptionPagination
      v-if="async && totalPages > 1"
      :loading="loading"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @onChangePage="handleChangePage"
    />
  </div>
</template>

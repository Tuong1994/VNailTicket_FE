<script setup lang="ts">
import { ref, computed, withDefaults } from 'vue'
import type { Option } from '@/components/Control/type.ts'
import { iconName } from '@/components/UI/Icon/constant.ts'
import Icon from '@/components/UI/Icon/Icon.vue'

interface OptionItemProps {
  option: Option
  iconSize: number
  selectedOption: Option | null
}

const props = withDefaults(defineProps<OptionItemProps>(), {
  selectedOption: null
})

const emits = defineEmits(['onSelect'])

const collapsed = ref<boolean>(false)

const hasChild = computed<boolean>(() => props.option.children && props.option.children.length > 0)

const isSelected = computed<boolean>(() => props.selectedOption?.value === props.option.value)

const selectedClassName = computed<string>(() => (isSelected.value ? 'item-inner-selected' : ''))

const childActiveClassName = computed<string>(() => (collapsed.value ? 'item-child-active' : ''))

const iconActiveClassName = computed<string>(() => (collapsed.value ? 'arrow-icon-active' : ''))

const handleSelect = (option: Option) => emits('onSelect', option)

const handleCollapse = () => (collapsed.value = !collapsed.value)
</script>

<template>
  <div class="list-item">
    <div :class="['item-inner', selectedClassName]">
      <div class="inner-title">
        <div v-if="hasChild" class="title-arrow" @click="handleCollapse">
          <Icon
            :size="iconSize"
            :iconName="iconName.CARET_RIGHT"
            :class="['arrow-icon', iconActiveClassName]"
          />
        </div>

        <div class="title-label" @click="() => handleSelect(option)">
          <div v-if="option.icon" class="label-icon">
            <Icon :iconName="option.icon" :size="iconSize" />
          </div>
          <div>{{ option.label }}</div>
        </div>
      </div>

      <div v-if="isSelected" class="inner-check-icon">
        <Icon :iconName="iconName.CHECK" :size="iconSize" />
      </div>
    </div>

    <div v-if="hasChild" :class="['item-child', childActiveClassName]">
      <OptionItem
        v-for="(child, idx) in option.children"
        :key="idx"
        :option="child"
        :iconSize="iconSize"
        :selectedOption="selectedOption"
        @onSelect="() => handleSelect(child)"
      />
    </div>
  </div>
</template>

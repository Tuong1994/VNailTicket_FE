<script setup lang="ts" generic="M">
import { ref, computed, withDefaults, watchEffect, type StyleValue } from 'vue'
import type { TableColumns, TableRowKey, TableColor } from './type.ts'
import TableHead from './TableHead.vue'
import TableBody from './TableBody.vue'
import TableEmpty from './TableEmpty.vue'
import TableLoading from "./TableLoading.vue"

export interface TableProps {
  rootClassName?: string
  rootStyle?: StyleValue
  tableClassName?: string
  tableStyle?: StyleValue
  color?: TableColor
  dataSource: M[]
  columns: TableColumns<M>
  rowKey?: TableRowKey
  loading?: boolean
  hasSelectRow?: boolean
  hasExpand?: boolean
  expand?: TableExpand
}

const props = withDefaults(defineProps<TableProps>(), {
  rootClassName: '',
  tableClassName: '',
  color: 'blue',
  rowKey: '',
  hasSelectRow: false,
  hasExpand: false,
  dataSource: () => [],
  columns: () => [],
})

const emits = defineEmits(['onRowSelect'])

const rowSelectedKeys = ref<TableRowKey[]>([])

const colorClassName = computed<string>(() => `table-${props.color}`)

const handleSelectAll = () => {
  if (rowSelectedKeys.value.length === props.dataSource.length) return (rowSelectedKeys.value = [])
  rowSelectedKeys.value = props.dataSource.map((data, idx) =>
    props.rowKey ? data[props.rowKey as keyof M] : `row-${idx}`
  )
}

const handleSelectRow = (key: TableRowKey) => {
  if (rowSelectedKeys.value.indexOf(key) === -1) return rowSelectedKeys.value.push(key)
  rowSelectedKeys.value = rowSelectedKeys.value.filter((k) => k !== key)
}

watchEffect(() => emits('onRowSelect', rowSelectedKeys.value))
</script>

<template>
  <div :style="rootStyle" :class="['table', colorClassName, rootClassName]">
    <div class="table-content">
      <table :style="tableStyle" :class="tableClassName">
        <TableHead
          :dataSource="dataSource"
          :columns="columns"
          :hasExpand="hasExpand"
          :hasSelectRow="hasSelectRow"
          :rowSelectedKeys="rowSelectedKeys"
          @onSelectAll="handleSelectAll"
        />
        <TableBody
          v-if="dataSource.length > 0"
          :color="color"
          :dataSource="dataSource"
          :columns="columns"
          :rowKey="rowKey"
          :expand="expand"
          :hasExpand="hasExpand"
          :hasSelectRow="hasSelectRow"
          :rowSelectedKeys="rowSelectedKeys"
          @onSelectRow="(key) => handleSelectRow(key)"
        />
      </table>
      <TableEmpty v-if="dataSource.length === 0" />
    </div>
    
    <TableLoading v-if="loading" />
  </div>
</template>

<script setup lang="ts" generic="M">
import { ref, withDefaults, watchEffect } from 'vue'
import type { TableColumns, TableRowKey, TableExpand, TableColor } from './type.ts'
import Table from './Table.vue'
import TableCell from './TableCell.vue'
import CheckBox from '@/components/Control/CheckBox/CheckBox.vue'

interface TableHeadProps {
  dataSource: M[]
  columns: TableColumns<M>
  color: TableColor
  rowKey: TableRowKey
  rowSelectedKeys: TableRowKey[]
  hasSelectRow: boolean
  hasExpand: boolean
  expand?: TableExpand
}

const props = withDefaults(defineProps<TableHeadProps>(), {
  color: 'blue',
  rowKey: '',
  rowSelectedKeys: () => [],
  dataSource: () => [],
  columns: () => [],
})

const emits = defineEmits(['onSelectRow'])

const expandedRowKey = ref<TableRowKey>('')

const key = (data: M, idx: number) => (props.rowKey ? data[props.rowKey as keyof M] : `row-${idx}`)

const selected = (key: TableRowKey) => props.rowSelectedKeys.includes(key)

const handleSelectRow = (key: TableRowKey) => emits('onSelectRow', key)

const handleExpand = (key: TableRowKey) => {
  if (expandedRowKey.value === key) return (expandedRowKey.value = '')
  expandedRowKey.value = key
}
</script>

<template>
  <tbody>
    <template v-for="(data, idx) in dataSource" :key="key(data, idx)">
      <tr :class="selected(key(data, idx)) ? 'table-row-selected' : ''">
        <td v-if="hasSelectRow">
          <TableCell>
            <CheckBox
              :color="color"
              :checked="selected(key(data, idx))"
              @onCheck="() => handleSelectRow(key(data, idx))"
            />
          </TableCell>
        </td>

        <td v-if="hasExpand">
          <TableCell>
            <div
              :class="[
                'cell-expand-action',
                expandedRowKey === key(data, idx) ? 'cell-expand-action-expanded' : ''
              ]"
              @click="() => handleExpand(key(data, idx))"
            >
              <div class="action-icon" />
            </div>
          </TableCell>
        </td>

        <td v-for="column in columns">
          <TableCell v-if="column.component">
            <component :is="column.component(data, idx).node" v-bind="column.component(data, idx).props" />
          </TableCell>

          <TableCell v-else-if="column.render" v-html="column.render(data, idx)"></TableCell>

          <TableCell v-else>{{ data[column.dataIndex] }}</TableCell>
        </td>
      </tr>

      <tr v-if="hasExpand && expandedRowKey === key(data, idx)" class="table-row-expand">
        <td />
        <td :colspan="columns.length + 1">
          <TableCell>
            <component :is="expand?.node" v-bind="expand?.props" />
          </TableCell>
        </td>
      </tr>
    </template>
  </tbody>
</template>

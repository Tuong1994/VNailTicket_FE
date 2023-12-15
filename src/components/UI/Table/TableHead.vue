<script setup lang="ts" generic="M">
import { withDefaults } from 'vue'
import type { TableColumns, TableRowKey } from './type.ts'
import { iconName } from '@/components/UI/Icon/constant.ts'
import Icon from '@/components/UI/Icon/Icon.vue'
import TableCell from './TableCell.vue'
import CheckBox from '@/components/Control/CheckBox/CheckBox.vue'

interface TableHeadProps {
  dataSource: M[]
  columns: TableColumns<M>
  rowSelectedKeys: TableRowKey[]
  hasSelectRow: boolean
  hasExpand: boolean
}

withDefaults(defineProps<TableHeadProps>(), {
  dataSource: () => [],
  columns: () => [],
  rowSelectedKeys: () => []
})

const emits = defineEmits(['onSelectAll'])

const handleSelectAll = () => emits('onSelectAll')
</script>

<template>
  <thead>
    <tr>
      <th v-if="hasSelectRow">
        <TableCell>
          <div
            v-if="rowSelectedKeys.length > 0 && rowSelectedKeys.length !== dataSource.length"
            class="cell-checked-mixed"
            @click="handleSelectAll"
          >
            <Icon :iconName="iconName.MINUS" />
          </div>
          <CheckBox v-if="rowSelectedKeys.length === 0" color="white" @onCheck="handleSelectAll" />
          <CheckBox
            v-if="rowSelectedKeys.length === dataSource.length"
            color="white"
            :checked="rowSelectedKeys.length === dataSource.length"
            @onCheck="handleSelectAll"
          />
        </TableCell>
      </th>

      <th v-if="hasExpand" />

      <th v-for="column in columns" :key="column.id">
        <TableCell>
          {{ column.title }}
        </TableCell>
      </th>
    </tr>
  </thead>
</template>

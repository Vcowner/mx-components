<template>
  <mx-table-action 
    :actions="actions" 
    :max-count="2"
    @click="handleAction"
  />
</template>

<script setup>
import { message } from 'ant-design-vue'

const actions = [
  { label: '编辑', key: 'edit' },
  { label: '删除', key: 'delete' },
  { label: '查看', key: 'view' }
]

const handleAction = (action) => {
  message.success(`执行操作: ${action.label}`)
}
</script>


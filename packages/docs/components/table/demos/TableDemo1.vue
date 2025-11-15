<template>
  <mx-table
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
  />
</template>

<script setup>
import { ref } from 'vue'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    type: 'text'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    type: 'text'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    type: 'status',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  }
]

const dataSource = ref([
  { id: 1, name: '张三', age: 25, status: 1 },
  { id: 2, name: '李四', age: 30, status: 0 },
  { id: 3, name: '王五', age: 28, status: 1 }
])

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 3
})
</script>


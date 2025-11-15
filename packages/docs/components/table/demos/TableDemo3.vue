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
    title: '标签',
    dataIndex: 'tag',
    key: 'tag',
    type: 'tag',
    color: 'blue'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    type: 'date'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    type: 'dateTime'
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
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
    type: 'select',
    options: [
      { label: '技术', value: 'tech' },
      { label: '产品', value: 'product' },
      { label: '设计', value: 'design' }
    ]
  }
]

const dataSource = ref([
  {
    id: 1,
    name: '张三',
    tag: 'VIP',
    createTime: '2024-01-01',
    updateTime: '2024-01-01 10:30:00',
    status: 1,
    category: 'tech'
  },
  {
    id: 2,
    name: '李四',
    tag: '普通',
    createTime: '2024-01-02',
    updateTime: '2024-01-02 14:20:00',
    status: 0,
    category: 'product'
  }
])

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 2
})
</script>


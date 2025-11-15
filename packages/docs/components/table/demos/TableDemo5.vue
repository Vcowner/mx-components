<template>
  <mx-table
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
    @pagination-change="handlePaginationChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    type: 'text'
  },
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
  }
]

const dataSource = ref([
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
  { id: 3, name: '王五', age: 28 },
  { id: 4, name: '赵六', age: 32 },
  { id: 5, name: '钱七', age: 26 }
])

const pagination = ref({
  current: 1,
  pageSize: 5,
  total: 20
})

function handlePaginationChange({ current, pageSize }) {
  message.info(`当前页: ${current}, 每页条数: ${pageSize}`)
  console.log('分页变化:', current, pageSize)
  // 这里可以调用 API 获取新数据
  pagination.value.current = current
  pagination.value.pageSize = pageSize
}
</script>


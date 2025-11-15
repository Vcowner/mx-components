<template>
  <mx-table
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
    :row-selection="rowSelection"
    @selection-change="handleSelectionChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

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
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    type: 'text'
  }
]

const dataSource = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' }
])

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 3
})

const selectedRowKeys = ref([])

const rowSelection = ref({
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys, rows) => {
    selectedRowKeys.value = keys
    console.log('选中的行键:', keys)
    console.log('选中的行数据:', rows)
  }
})

function handleSelectionChange(keys, rows) {
  message.success(`已选择 ${keys.length} 项`)
  console.log('选择变化:', keys, rows)
}
</script>


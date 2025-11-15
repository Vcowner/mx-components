<template>
  <mx-table
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
    :search-list="searchList"
    :operate-list="operateList"
    @search="handleSearch"
    @reset="handleReset"
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
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    type: 'select',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  }
]

const searchList = [
  {
    key: 'name',
    name: '姓名',
    type: 'input',
    placeholder: '请输入姓名',
    width: 200
  },
  {
    key: 'status',
    name: '状态',
    type: 'select',
    placeholder: '请选择状态',
    options: [
      { key: '1', value: '启用' },
      { key: '0', value: '禁用' }
    ]
  }
]

const operateList = [
  {
    label: '新增',
    type: 'primary',
    position: 'left',
    onClick: () => {
      message.success('点击了新增按钮')
    }
  },
  {
    label: '导出',
    type: 'default',
    position: 'right',
    onClick: () => {
      message.success('点击了导出按钮')
    }
  }
]

const dataSource = ref([
  { id: 1, name: '张三', age: 25, status: 1 },
  { id: 2, name: '李四', age: 30, status: 0 }
])

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 2
})

function handleSearch(params) {
  message.info('搜索参数: ' + JSON.stringify(params))
  console.log('搜索参数:', params)
}

function handleReset() {
  message.info('已重置')
  console.log('重置')
}
</script>


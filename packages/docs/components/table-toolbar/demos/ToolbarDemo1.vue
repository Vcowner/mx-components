<template>
  <mx-table-toolbar
    :search-list="searchList"
    :operate-list="operateList"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script setup>
import { message } from 'ant-design-vue'

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

function handleSearch(params) {
  message.info('搜索参数: ' + JSON.stringify(params))
  console.log('搜索参数:', params)
}

function handleReset() {
  message.info('已重置')
  console.log('重置')
}
</script>


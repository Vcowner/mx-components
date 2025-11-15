<template>
  <mx-table-toolbar
    :search-list="searchList"
    @search="handleSearch"
  />
</template>

<script setup>
import { message } from 'ant-design-vue'

const searchList = [
  // 基础搜索项
  {
    key: 'name',
    name: '姓名',
    type: 'input',
    placeholder: '请输入姓名'
  },
  {
    key: 'keyword',
    name: '关键词',
    type: 'search',
    placeholder: '请输入关键词',
    width: 300
  },
  // 高级搜索项
  {
    key: 'createTime',
    name: '创建时间',
    type: 'date',
    placeholder: '请选择创建时间',
    isHidden: true
  },
  {
    key: 'status',
    name: '状态',
    type: 'select',
    placeholder: '请选择状态',
    isHidden: true,
    options: [
      { key: '1', value: '启用' },
      { key: '0', value: '禁用' }
    ]
  }
]

function handleSearch(params) {
  message.info('搜索参数: ' + JSON.stringify(params))
  console.log('搜索参数:', params)
}
</script>


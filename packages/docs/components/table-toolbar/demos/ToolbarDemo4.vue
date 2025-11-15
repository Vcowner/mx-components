<template>
  <mx-table-toolbar
    :search-list="searchList"
    :operate-list="operateList"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script setup>
import { h } from 'vue'
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
  },
  {
    key: 'createTime',
    name: '创建时间',
    type: 'date',
    placeholder: '请选择创建时间',
    isHidden: true,
    props: {
      format: 'YYYY-MM-DD'
    }
  },
  {
    key: 'age',
    name: '年龄',
    type: 'custom',
    isHidden: true,
    render: ({ value, onChange }) => {
      return h('a-input-number', {
        value,
        onChange,
        placeholder: '请输入年龄',
        min: 0,
        max: 100,
        style: { width: '100%' }
      })
    }
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
    label: '批量删除',
    buttonType: 'batch',
    type: 'default',
    danger: true,
    position: 'left',
    selectedItems: [],
    onClick: () => {
      message.success('批量删除')
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


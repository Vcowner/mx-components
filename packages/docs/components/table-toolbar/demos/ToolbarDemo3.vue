<template>
  <mx-table-toolbar
    :search-list="searchList"
    :operate-list="operateList"
    @search="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const selectedRows = ref([])

const searchList = [
  {
    key: 'name',
    name: '姓名',
    type: 'input',
    placeholder: '请输入姓名'
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
    label: '导入',
    buttonType: 'import',
    position: 'left',
    onImport: (fileList) => {
      message.success(`导入了 ${fileList.length} 个文件`)
      console.log('导入文件:', fileList)
    }
  },
  {
    label: '批量删除',
    buttonType: 'batch',
    position: 'left',
    selectedItems: selectedRows.value,
    onClick: () => {
      message.success(`批量删除 ${selectedRows.value.length} 项`)
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
}
</script>


<template>
  <a-space>
    <mx-search-button @search="handleSearch">搜索</mx-search-button>
    <mx-reset-button @reset="handleReset">重置</mx-reset-button>
  </a-space>
</template>

<script setup>
import { message } from 'ant-design-vue'

const handleSearch = () => {
  message.success('搜索成功')
}

const handleReset = () => {
  message.success('重置成功')
}
</script>


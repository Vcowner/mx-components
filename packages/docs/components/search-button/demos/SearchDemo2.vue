<template>
  <a-space>
    <mx-search-button @search="handleSearch">快速搜索</mx-search-button>
    <mx-search-button @search="handleSearch">高级搜索</mx-search-button>
  </a-space>
</template>

<script setup>
import { message } from 'ant-design-vue'

const handleSearch = () => {
  message.success('搜索成功')
}
</script>


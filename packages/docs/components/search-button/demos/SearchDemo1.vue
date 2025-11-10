<template>
  <mx-search-button @search="handleSearch" />
</template>

<script setup>
import { message } from 'ant-design-vue'

const handleSearch = () => {
  message.success('搜索成功')
}
</script>


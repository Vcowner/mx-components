<template>
  <a-space direction="vertical" style="width: 100%;">
    <a-space>
      <mx-search-button type="primary" @search="handleSearch">主要按钮</mx-search-button>
      <mx-search-button type="default" @search="handleSearch">默认按钮</mx-search-button>
    </a-space>
    <a-space>
      <mx-search-button size="large" @search="handleSearch">大按钮</mx-search-button>
      <mx-search-button size="middle" @search="handleSearch">中按钮</mx-search-button>
      <mx-search-button size="small" @search="handleSearch">小按钮</mx-search-button>
    </a-space>
  </a-space>
</template>

<script setup>
import { message } from 'ant-design-vue'

const handleSearch = () => {
  message.success('搜索成功')
}
</script>


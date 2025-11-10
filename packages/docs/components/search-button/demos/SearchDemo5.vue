<template>
  <a-space>
    <mx-search-button 
      :debounce="500" 
      @search="handleSearch"
    >
      防抖搜索（500ms）
    </mx-search-button>
    
    <mx-search-button 
      :debounce="0" 
      @search="handleSearch"
    >
      不防抖
    </mx-search-button>
  </a-space>
</template>

<script setup>
import { message } from 'ant-design-vue'

const handleSearch = () => {
  message.success('搜索触发')
}
</script>


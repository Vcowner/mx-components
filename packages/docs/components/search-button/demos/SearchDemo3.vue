<template>
  <mx-search-button 
    :loading="searching" 
    @search="handleSearch"
  >
    搜索
  </mx-search-button>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const searching = ref(false)

const handleSearch = async () => {
  searching.value = true
  try {
    // 模拟异步搜索
    await new Promise(resolve => setTimeout(resolve, 1500))
    message.success('搜索完成')
  } finally {
    searching.value = false
  }
}
</script>


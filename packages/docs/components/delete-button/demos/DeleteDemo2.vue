<template>
  <div class="demo">
    <mx-delete-button @delete="handleDelete">删除此记录</mx-delete-button>
    <mx-delete-button @delete="handleDelete">移除</mx-delete-button>
    <mx-delete-button @delete="handleDelete">清理</mx-delete-button>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue'

function handleDelete() {
  message.success('删除成功')
}
</script>

<style scoped>
.demo {
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
  display: flex;
  gap: 8px;
}
</style>



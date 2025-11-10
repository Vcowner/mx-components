<template>
  <div class="demo">
    <mx-delete-button type="primary" @delete="handleDelete">主要按钮</mx-delete-button>
    <mx-delete-button type="default" @delete="handleDelete">默认按钮</mx-delete-button>
    <mx-delete-button type="dashed" @delete="handleDelete">虚线按钮</mx-delete-button>
    <mx-delete-button type="text" @delete="handleDelete">文本按钮</mx-delete-button>
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
  align-items: center;
  flex-wrap: wrap;
}
</style>


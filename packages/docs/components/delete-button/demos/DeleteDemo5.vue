<template>
  <div class="demo">
    <mx-delete-button size="large" @delete="handleDelete">大按钮</mx-delete-button>
    <mx-delete-button size="middle" @delete="handleDelete">中按钮</mx-delete-button>
    <mx-delete-button size="small" @delete="handleDelete">小按钮</mx-delete-button>
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
}
</style>



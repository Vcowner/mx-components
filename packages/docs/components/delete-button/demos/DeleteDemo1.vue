<template>
  <div class="demo">
    <mx-delete-button @delete="handleDelete" />
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue'

function handleDelete() {
  message.success('删除成功')
  console.log('删除')
}
</script>

<style scoped>
.demo {
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
}
</style>


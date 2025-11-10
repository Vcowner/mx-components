<template>
  <div class="demo">
    <mx-delete-button 
      :confirm="''"
      @delete="handleDelete"
    >
      直接删除
    </mx-delete-button>
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
}
</style>



<template>
  <div class="demo">
    <mx-delete-button 
      confirm="确定要删除这条记录吗？删除后无法恢复！"
      @delete="handleDelete"
    >
      删除
    </mx-delete-button>
    
    <mx-delete-button 
      confirm="此操作将永久删除，是否继续？"
      @delete="handleDelete"
    >
      永久删除
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
  display: flex;
  gap: 8px;
}
</style>



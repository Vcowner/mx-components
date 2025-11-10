<template>
  <div class="demo">
    <mx-delete-button 
      permission="delete"
      @delete="handleDelete"
    >
      删除
    </mx-delete-button>
    
    <mx-delete-button 
      :permission="['edit', 'delete']"
      @delete="handleDelete"
    >
      删除（多权限）
    </mx-delete-button>
    
    <div style="margin-top: 12px; color: #666; font-size: 12px;">
      💡 提示：如果没有配置权限检查函数，按钮会默认显示
    </div>
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



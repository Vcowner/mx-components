<template>
  <div class="demo">
    <mx-delete-button 
      confirm-type="popconfirm"
      confirm="确定要删除这条记录吗？"
      @delete="handleDelete"
    >
      气泡确认
    </mx-delete-button>
    
    <mx-delete-button 
      confirm-type="modal"
      confirm="确定要删除这条记录吗？"
      @delete="handleDelete"
    >
      模态框确认
    </mx-delete-button>
    
    <div style="margin-top: 12px; color: #666; font-size: 12px;">
      💡 提示：点击查看两种确认方式的区别
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
  display: flex;
  gap: 8px;
  flex-direction: column;
}
</style>



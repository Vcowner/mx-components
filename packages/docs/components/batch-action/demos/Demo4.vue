<template>
  <div class="demo">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <!-- 批量删除，使用 MxDeleteButton -->
      <mx-batch-action
        action-type="delete"
        :selected-items="selectedItems"
        :label="(items) => `批量删除(${items.length})`"
        :loading="loading"
        @click="handleBatchDelete"
      />
      
      <!-- 自定义确认文案 -->
      <mx-batch-action
        action-type="delete"
        :selected-items="selectedItems"
        label="批量删除"
        :confirm="`确定要删除选中的 ${selectedItems.length} 条记录吗？删除后无法恢复！`"
        :loading="loading"
        @click="handleBatchDelete"
      />
      
      <!-- 使用气泡确认框 -->
      <mx-batch-action
        action-type="delete"
        :selected-items="selectedItems"
        label="批量删除"
        confirm-type="popconfirm"
        :confirm="`确定要删除 ${selectedItems.length} 项吗？`"
        :loading="loading"
        @click="handleBatchDelete"
      />
    </div>
    
    <div style="margin-top: 12px;">
      <a-button size="small" @click="addItem">选择+1</a-button>
      <a-button size="small" style="margin-left: 8px;" @click="clearItems">清空</a-button>
      <span style="margin-left: 12px;">当前选择：{{ selectedItems.length }} 项</span>
    </div>
    
    <div style="margin-top: 8px; color: #666; font-size: 12px;">
      💡 提示：批量删除按钮会自动使用 MxDeleteButton，具有删除图标和危险样式，并支持确认对话框
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const selectedItems = ref([])
const loading = ref(false)

function addItem() {
  selectedItems.value.push({
    id: Date.now(),
    name: `项目 ${selectedItems.value.length + 1}`
  })
}

function clearItems() {
  selectedItems.value = []
}

async function handleBatchDelete(items) {
  loading.value = true
  try {
    // 模拟删除操作
    await new Promise(resolve => setTimeout(resolve, 1500))
    message.success(`成功删除 ${items.length} 项`)
    selectedItems.value = []
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.demo {
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
}
</style>


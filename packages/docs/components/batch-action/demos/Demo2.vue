<template>
  <div class="demo">
    <mx-batch-action
      :selected-items="selectedItems"
      :label="(items) => `批量删除(${items.length})`"
      icon-type="cancel"
      type="default"
      @click="handleBatchDelete"
    />
    
    <div style="margin-top: 12px;">
      <a-button size="small" @click="addItem">选择+1</a-button>
      <a-button size="small" style="margin-left: 8px;" @click="removeItem">选择-1</a-button>
      <span style="margin-left: 12px;">当前选择：{{ selectedItems.length }} 项</span>
    </div>
    
    <div style="margin-top: 8px; color: #666; font-size: 12px;">
      💡 提示：按钮文案会根据选中项数量动态变化
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const selectedItems = ref([])

function addItem() {
  selectedItems.value.push({
    id: Date.now(),
    name: `项目 ${selectedItems.value.length + 1}`
  })
}

function removeItem() {
  if (selectedItems.value.length > 0) {
    selectedItems.value.pop()
  }
}

function handleBatchDelete(items) {
  message.success(`批量删除 ${items.length} 项`)
  selectedItems.value = []
}
</script>

<style scoped>
.demo {
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
}
</style>


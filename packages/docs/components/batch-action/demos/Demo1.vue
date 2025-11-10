<template>
  <div class="demo">
    <mx-batch-action
      :selected-items="selectedItems"
      label="批量删除"
      icon-type="cancel"
      type="default"
      @click="handleBatchDelete"
    />
    
    <div style="margin-top: 12px;">
      <a-button size="small" @click="addItem">添加项目</a-button>
      <a-button size="small" style="margin-left: 8px;" @click="clearItems">清空</a-button>
      <span style="margin-left: 12px;">当前选择：{{ selectedItems.length }} 项</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const selectedItems = ref([
  { id: 1, name: '项目1' },
  { id: 2, name: '项目2' }
])

function addItem() {
  selectedItems.value.push({
    id: Date.now(),
    name: `项目 ${selectedItems.value.length + 1}`
  })
}

function clearItems() {
  selectedItems.value = []
}

function handleBatchDelete(items) {
  message.success(`批量删除 ${items.length} 项`)
  console.log('选中的项：', items)
}
</script>

<style scoped>
.demo {
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
}
</style>


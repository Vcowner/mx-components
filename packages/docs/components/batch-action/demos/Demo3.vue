<template>
  <div class="demo">
    <div style="display: flex; gap: 8px;">
      <mx-batch-action
        :selected-items="selectedItems"
        :label="(items) => `批量删除(${items.length})`"
        icon-type="cancel"
        type="default"
        :debounce="300"
        :loading="loading"
        @click="handleBatchDelete"
      />
      
      <mx-batch-action
        :selected-items="selectedItems"
        :label="(items) => `批量导出(${items.length})`"
        icon-type="export"
        type="primary"
        :loading="exporting"
        @click="handleBatchExport"
      />
    </div>
    
    <div style="margin-top: 12px;">
      <a-button size="small" @click="addItem">选择+1</a-button>
      <a-button size="small" style="margin-left: 8px;" @click="clearItems">清空</a-button>
      <span style="margin-left: 12px;">当前选择：{{ selectedItems.length }} 项</span>
    </div>
    
    <div style="margin-top: 8px; color: #666; font-size: 12px;">
      💡 提示：尝试快速点击删除按钮查看防抖效果
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const selectedItems = ref([])
const loading = ref(false)
const exporting = ref(false)

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

async function handleBatchExport(items) {
  exporting.value = true
  try {
    // 模拟导出操作
    await new Promise(resolve => setTimeout(resolve, 1500))
    message.success(`成功导出 ${items.length} 项`)
  } finally {
    exporting.value = false
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


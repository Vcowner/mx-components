<template>
  <div class="demo">
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <!-- 模态框确认方式 -->
      <mx-delete-button 
        :loading="loading1"
        confirm="确定要删除这条记录吗？"
        @delete="handleDelete1"
      >
        模态框确认
      </mx-delete-button>
      
      <!-- 气泡确认方式 -->
      <mx-delete-button 
        :loading="loading2"
        confirm-type="popconfirm"
        confirm="确定要删除这条记录吗？"
        @delete="handleDelete2"
      >
        气泡确认
      </mx-delete-button>
      
      <!-- 无确认方式 -->
      <mx-delete-button 
        :loading="loading3"
        :confirm="''"
        @delete="handleDelete3"
      >
        直接删除
      </mx-delete-button>
    </div>
    
    <div style="margin-top: 12px; color: #666; font-size: 12px;">
      💡 提示：点击查看加载状态在按钮、确认按钮上的显示效果
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const loading1 = ref(false)
const loading2 = ref(false)
const loading3 = ref(false)

async function handleDelete1() {
  loading1.value = true
  try {
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    message.success('删除成功（模态框）')
  } finally {
    loading1.value = false
  }
}

async function handleDelete2() {
  loading2.value = true
  try {
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    message.success('删除成功（气泡确认）')
  } finally {
    loading2.value = false
  }
}

async function handleDelete3() {
  loading3.value = true
  try {
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    message.success('删除成功（直接删除）')
  } finally {
    loading3.value = false
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


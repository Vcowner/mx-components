<template>
  <div>
    <p>当前用户权限：{{ userPermissions.join(', ') }}</p>
    <p v-if="visibleCount > 0" style="color: #52c41a; margin-bottom: 8px;">
      可见操作数：{{ visibleCount }} 个
    </p>
    <p v-else style="color: #ff4d4f; margin-bottom: 8px;">
      所有操作都被权限控制隐藏了
    </p>
    <mx-table-action :actions="actions" @click="handleAction" />
    <div style="margin-top: 12px;">
      <mx-batch-action
        :selected-items="selectedItems"
        :label="(items) => `批量删除(${items.length})`"
        icon-type="cancel"
        type="default"
        :debounce="300"
        @click="handleBatchDelete"
      />
      <div style="margin-top: 8px;">
        <a-button size="small" @click="addItem">选择+1</a-button>
        <a-button size="small" style="margin-left: 8px;" @click="removeItem">选择-1</a-button>
        <span style="margin-left: 8px;">当前选择：{{ selectedItems.length }} 项</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { message } from 'ant-design-vue'
import { EditOutlined, DeleteOutlined, EyeOutlined, CopyOutlined } from '@ant-design/icons-vue'

// 模拟用户当前权限（这里应该从后端获取）
const userPermissions = ref(['edit', 'view', 'copy'])

// 计算可见操作数量
const visibleCount = computed(() => {
  return actions.value.filter(action => {
    if (!action.permission) return true
    return userPermissions.value.includes(action.permission)
  }).length
})

// 操作配置
const actions = ref([
  { 
    label: '编辑', 
    key: 'edit',
    icon: EditOutlined,
    permission: 'edit',
    onClick: (action) => {
      message.success(`执行编辑操作：${action.key}`)
    }
  },
  { 
    label: '删除', 
    key: 'delete',
    icon: DeleteOutlined,
    permission: 'delete', // 用户无此权限，会被隐藏
    danger: true,
    onClick: (action) => {
      message.success(`执行删除操作：${action.key}`)
    }
  },
  { 
    label: '查看', 
    key: 'view',
    icon: EyeOutlined,
    permission: 'view',
    onClick: (action) => {
      message.success(`执行查看操作：${action.key}`)
    }
  },
  { 
    label: '复制', 
    key: 'copy',
    icon: CopyOutlined,
    permission: 'copy',
    onClick: (action) => {
      message.success(`执行复制操作：${action.key}`)
    }
  }
])

const handleAction = (action) => {
  console.log('触发操作:', action)
}

// 批量操作演示
const selectedItems = ref([])

function addItem() {
  selectedItems.value.push({ id: Date.now(), name: `项目 ${selectedItems.value.length + 1}` })
}

function removeItem() {
  if (selectedItems.value.length > 0) {
    selectedItems.value.pop()
  }
}

function handleBatchDelete(items) {
  message.success(`批量删除 ${items.length} 项`)
  console.log('选中的项：', items)
  // 清空选择
  selectedItems.value = []
}
</script>


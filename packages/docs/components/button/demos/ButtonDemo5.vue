<template>
  <div class="demo">
    <mx-button :icon-type="'edit'" @click="handleEdit">编辑</mx-button>
    <mx-button :icon-type="'view'" @click="handleView">查看</mx-button>
    <mx-button :icon-type="'copy'" @click="handleCopy">复制</mx-button>
    <mx-button :icon-type="'add'" type="primary" @click="handleAdd">新增</mx-button>
    <mx-button :icon-type="'refresh'" @click="handleRefresh">刷新</mx-button>
    <mx-button :icon-type="'save'" type="primary" @click="handleSave">保存</mx-button>
    <mx-button :icon-type="'cancel'" @click="handleCancel">取消</mx-button>
    <mx-button :icon-type="'print'" @click="handlePrint">打印</mx-button>
    <mx-button :icon-type="'export'" @click="handleExport">导出</mx-button>
    
    <div style="margin-top: 16px; padding: 12px; background: #f0f0f0; border-radius: 4px;">
      <p>测试：使用 :icon-type 绑定</p>
      <mx-button :icon-type="testIcon" @click="handleEdit">动态图标: {{ testIcon }}</mx-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const testIcon = ref('edit')

const handleEdit = () => {
  message.info('点击了编辑按钮')
}

const handleView = () => {
  message.info('点击了查看按钮')
}

const handleCopy = () => {
  message.success('复制成功')
}

const handleAdd = () => {
  message.success('新增成功')
}

const handleRefresh = () => {
  message.info('正在刷新...')
}

const handleSave = () => {
  message.success('保存成功')
}

const handleCancel = () => {
  message.info('已取消')
}

const handlePrint = () => {
  message.info('正在打印...')
}

const handleExport = () => {
  message.success('导出成功')
}
</script>

<style scoped>
.demo {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>


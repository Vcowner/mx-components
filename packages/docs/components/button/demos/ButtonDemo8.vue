<template>
  <div class="demo">
    <mx-button icon-type="edit" hide-icon>编辑（无图标）</mx-button>
    <mx-button icon-type="add" hide-icon type="primary">新增（无图标）</mx-button>
    <mx-button icon-type="save" default-text="保存数据" @click="handleSave" />
    <mx-button icon-type="add">创建新记录</mx-button>
  </div>
  <div class="tip">
    <p>💡 提示：使用 <code>hide-icon</code> 隐藏图标，使用 <code>default-text</code> 自定义文案或直接在插槽中写入内容</p>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue'

const handleSave = () => {
  message.success('保存成功')
}
</script>

<style scoped>
.demo {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tip {
  margin-top: 16px;
  padding: 12px;
  background-color: #f6f8fa;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
}

.tip p {
  margin: 0;
}

.tip code {
  padding: 2px 6px;
  background-color: #e1e4e8;
  border-radius: 3px;
  font-size: 13px;
}
</style>


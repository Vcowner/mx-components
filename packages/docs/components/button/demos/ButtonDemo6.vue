<template>
  <div class="demo">
    <mx-button icon-type="copy" :debounce="300" @click="handleCopy">
      复制（300ms 防抖）
    </mx-button>
    <mx-button icon-type="save" type="primary" :debounce="500" @click="handleSave">
      保存（500ms 防抖）
    </mx-button>
    <mx-button icon-type="refresh" :debounce="1000" @click="handleRefresh">
      刷新（1s 防抖）
    </mx-button>
  </div>
  <div class="tip">
    <p>💡 提示：快速连续点击按钮，观察防抖效果</p>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue'

const handleCopy = () => {
  message.success('复制成功')
}

const handleSave = () => {
  message.success('保存成功')
}

const handleRefresh = () => {
  message.info('刷新完成')
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
</style>


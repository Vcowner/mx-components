<template>
  <div>
    <mx-reset-button 
      :keyboard="true"
      @reset="handleReset"
    >
      重置（按 Ctrl+R 或 Cmd+R）
    </mx-reset-button>
    <p style="margin-top: 12px; color: #666; font-size: 12px;">
      提示：按下 Ctrl+R（Windows）或 Cmd+R（Mac）可快速重置
    </p>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue'

const handleReset = () => {
  message.success('重置成功')
}
</script>



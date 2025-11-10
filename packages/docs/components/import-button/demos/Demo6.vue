<template>
  <div class="demo">
    <mx-import-button 
      upload-type="button"
      accept=".png"
      :download-template="{
        url: '/template/import-template.png',
        filename: '导入模板.png',
        text: '下载模板'
      }"
      :custom-request="handleCustomRequest"
      @change="handleImport"
    >
      导入 PNG
    </mx-import-button>
    
    <div style="margin-top: 12px; color: #666; font-size: 12px;">
      💡 提示：点击"下载模板"按钮可以下载导入模板文件
    </div>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue'

// 模拟上传请求
function handleCustomRequest(options) {
  const { file, onSuccess, onError, onProgress } = options
  
  // 模拟上传进度
  let percent = 0
  const timer = setInterval(() => {
    percent += 10
    if (percent <= 100) {
      onProgress({ percent })
    }
    if (percent >= 100) {
      clearInterval(timer)
      // 模拟上传成功
      setTimeout(() => {
        onSuccess({
          url: URL.createObjectURL(file),
          name: file.name
        })
      }, 200)
    }
  }, 200)
}

function handleImport(info) {
  if (info.file.status === 'done') {
    message.success(`${info.file.name} 导入成功`)
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 导入失败`)
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


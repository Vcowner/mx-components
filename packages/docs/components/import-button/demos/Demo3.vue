<template>
  <div class="demo">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <mx-import-button 
        upload-type="button"
        accept=".xlsx,.xls"
        :custom-request="handleCustomRequest"
        @change="handleImport"
      >
        导入 Excel
      </mx-import-button>
      
      <mx-import-button 
        upload-type="button"
        accept=".png"
        :custom-request="handleCustomRequest"
        @change="handleImport"
      >
        导入 PNG
      </mx-import-button>
      
      <mx-import-button 
        upload-type="button"
        accept=".csv,.txt"
        :custom-request="handleCustomRequest"
        @change="handleImport"
      >
        导入文本
      </mx-import-button>
    </div>
    
    <div style="margin-top: 16px;">
      <mx-import-button 
        upload-type="drag"
        accept=".xlsx,.xls"
        :custom-request="handleCustomRequest"
        @change="handleImport"
      >
        <template #hint>支持上传 Excel 文件（.xlsx, .xls）</template>
      </mx-import-button>
    </div>
    
    <div style="margin-top: 12px; color: #666; font-size: 12px;">
      💡 提示：尝试上传不符合 accept 类型的文件（如上传 .txt 文件到 Excel 上传按钮，或上传 .jpg 文件到 PNG 上传按钮），会显示文件类型不匹配的错误提示
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




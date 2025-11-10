<template>
  <div class="demo">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <!-- 点击上传 -->
      <mx-import-button 
        upload-type="button"
        accept=".png"
        :multiple="true"
        :max-count="3"
        :loading="uploading"
        :custom-request="handleCustomRequest"
        @change="handleImport"
      >
        批量导入 PNG（最多3个）
      </mx-import-button>
      
      <!-- 带权限控制 -->
      <mx-import-button 
        upload-type="button"
        accept=".png"
        permission="import"
        :custom-request="handleCustomRequest"
        @change="handleImport"
      >
        权限控制导入 PNG
      </mx-import-button>
    </div>
    
    <!-- 拖拽上传 -->
    <div style="margin-top: 16px;">
      <mx-import-button 
        upload-type="drag"
        accept=".png"
        :multiple="true"
        :max-count="5"
        :loading="uploading"
        :custom-request="handleCustomRequest"
        @change="handleImport"
      >
        <template #hint>支持上传 PNG 文件，最多 5 个文件，支持拖拽上传</template>
      </mx-import-button>
    </div>
    
    <div style="margin-top: 12px; color: #666; font-size: 12px;">
      💡 提示：上传文件时会显示加载状态
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const uploading = ref(false)

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
  if (info.file.status === 'uploading') {
    uploading.value = true
  } else if (info.file.status === 'done') {
    uploading.value = false
    message.success(`${info.file.name} 导入成功`)
  } else if (info.file.status === 'error') {
    uploading.value = false
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




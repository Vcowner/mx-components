<template>
  <div class="demo">
    <mx-import-button 
      upload-type="button"
      accept=".png"
      action="/api/upload"
      :headers="{ Authorization: 'Bearer token123' }"
      :data="{ folder: 'imports' }"
      :custom-request="handleCustomRequest"
      @progress="handleProgress"
      @success="handleSuccess"
      @error="handleError"
    >
      上传 PNG 到服务器
    </mx-import-button>
    
    <div v-if="progressInfo" style="margin-top: 12px;">
      <div style="color: #666; font-size: 12px; margin-bottom: 4px;">
        上传进度：{{ progressInfo.percent }}%
      </div>
      <a-progress :percent="progressInfo.percent" :status="progressInfo.status" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const progressInfo = ref(null)

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

function handleProgress(info) {
  progressInfo.value = {
    percent: info.percent || 0,
    status: 'active'
  }
}

function handleSuccess(info) {
  progressInfo.value = {
    percent: 100,
    status: 'success'
  }
  message.success(`${info.file.name} 上传成功`)
  setTimeout(() => {
    progressInfo.value = null
  }, 2000)
}

function handleError(error, info) {
  progressInfo.value = {
    percent: 0,
    status: 'exception'
  }
  message.error(`${info.file.name} 上传失败：${error.message}`)
  setTimeout(() => {
    progressInfo.value = null
  }, 2000)
}
</script>

<style scoped>
.demo {
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
}
</style>


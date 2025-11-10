<template>
  <div class="demo">
    <mx-import-button 
      upload-type="button"
      accept=".png"
      :file-list="fileList"
      :show-upload-list="{ showDownloadIcon: true }"
      :custom-request="handleCustomRequest"
      :download="handleDownload"
      @change="handleChange"
    >
      上传 PNG 文件（支持下载）
    </mx-import-button>
    
    <div style="margin-top: 12px; color: #666; font-size: 12px;">
      💡 提示：上传成功后，文件列表中会显示下载按钮。点击下载按钮可以下载文件。
      <br />
      💡 注意：需要在文件对象中设置 <code>url</code> 属性才能显示下载按钮。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const fileList = ref([])

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
      // 模拟上传成功，返回包含 url 的响应
      setTimeout(() => {
        const url = URL.createObjectURL(file)
        onSuccess({
          url,
          name: file.name
        })
      }, 200)
    }
  }, 200)
}

function handleChange(info) {
  fileList.value = info.fileList.map(file => {
    // 如果文件上传成功，设置 url 属性以启用下载功能
    if (file.status === 'done' && file.response) {
      return {
        ...file,
        url: file.response.url || `/api/download/${file.uid}`
      }
    }
    return file
  })
}

function handleDownload(file) {
  if (file.url) {
    // 自定义下载逻辑
    const link = document.createElement('a')
    link.href = file.url
    link.download = file.name || 'download'
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    message.success(`开始下载 ${file.name}`)
  } else {
    message.warning('文件下载地址不存在')
  }
}
</script>

<style scoped>
.demo {
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
}

code {
  background: #f0f0f0;
  padding: 2px 4px;
  border-radius: 2px;
  font-size: 12px;
}
</style>


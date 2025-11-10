<template>
  <div class="demo">
    <mx-import-button 
      upload-type="button"
      accept=".png"
      :file-list="fileList"
      :show-upload-list="{
        showPreviewIcon: true,
        showRemoveIcon: true,
        showDownloadIcon: true
      }"
      :custom-request="handleCustomRequest"
      :remove="handleRemove"
      :preview="handlePreview"
      @change="handleChange"
    >
      上传 PNG 图片（可删除和预览）
    </mx-import-button>
    
    <div style="margin-top: 12px; color: #666; font-size: 12px;">
      💡 提示：点击文件列表中的预览图标可以预览图片，点击删除图标可以删除文件
    </div>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'
import { message, Modal } from 'ant-design-vue'

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
      // 模拟上传成功，为图片生成预览 URL
      setTimeout(() => {
        const url = URL.createObjectURL(file)
        onSuccess({
          url,
          thumbUrl: url,
          name: file.name
        }, file)
      }, 200)
    }
  }, 200)
}

function handleChange(info) {
  // 更新文件列表，确保上传成功的文件包含 url
  fileList.value = info.fileList.map(file => {
    if (file.status === 'done') {
      // 如果 response 中有 url，使用它；否则使用已有的 url 或 thumbUrl
      const url = file.response?.url || file.response?.thumbUrl || file.url || file.thumbUrl
      if (url) {
        return {
          ...file,
          url: url,
          thumbUrl: url
        }
      }
    }
    return file
  })
  
  // 调试：打印文件列表
  console.log('文件列表更新:', fileList.value)
}

function handleRemove(file) {
  console.log('删除文件:', file)
  return new Promise((resolve) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除文件 ${file.name} 吗？`,
      onOk: () => {
        message.success('文件已删除')
        resolve(true)
      },
      onCancel: () => {
        resolve(false)
      }
    })
  })
}

function handlePreview(file) {
  console.log('预览文件:', file)
  if (file.url || file.thumbUrl) {
    Modal.info({
      title: '图片预览',
      width: 800,
      content: h('img', {
        src: file.url || file.thumbUrl,
        style: { width: '100%' }
      })
    })
  } else {
    message.info('预览功能需要文件 URL')
    console.log('文件对象:', file)
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


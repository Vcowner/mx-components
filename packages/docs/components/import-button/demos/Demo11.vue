<template>
  <div class="demo">
    <div style="margin-bottom: 24px;">
      <h4 style="margin-bottom: 12px;">照片模式（picture）</h4>
      <mx-import-button 
        upload-type="button"
        accept="image/*"
        list-type="picture"
        :file-list="fileList1"
        :custom-request="handleCustomRequest"
        :preview="handlePreview"
        @change="handleChange1"
      >
        上传图片
      </mx-import-button>
    </div>
    
    <div>
      <h4 style="margin-bottom: 12px;">照片墙模式（picture-card）</h4>
      <mx-import-button 
        upload-type="button"
        accept="image/*"
        list-type="picture-card"
        :file-list="fileList2"
        :custom-request="handleCustomRequest"
        :preview="handlePreview"
        @change="handleChange2"
      >
        
      </mx-import-button>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'

const fileList1 = ref([])
const fileList2 = ref([])

// 模拟上传请求
function handleCustomRequest(options) {
  const { file, onSuccess, onError, onProgress } = options
  
  let percent = 0
  const timer = setInterval(() => {
    percent += 10
    if (percent <= 100) {
      onProgress({ percent })
    }
    if (percent >= 100) {
      clearInterval(timer)
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

function handleChange1(info) {
  fileList1.value = info.fileList.map(file => {
    if (file.status === 'done') {
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
}

function handleChange2(info) {
  fileList2.value = info.fileList.map(file => {
    if (file.status === 'done') {
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
}

function handlePreview(file) {
  const url = file.url || file.thumbUrl || file.response?.url || file.response?.thumbUrl
  if (url) {
    Modal.info({
      title: '图片预览',
      width: 800,
      content: h('img', {
        src: url,
        style: { width: '100%' }
      })
    })
    // 返回 URL 供组件使用
    return url
  }
  // 如果没有 URL，返回 false 阻止预览
  return false
}
</script>

<style scoped>
.demo {
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
}

h4 {
  color: #333;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}
</style>


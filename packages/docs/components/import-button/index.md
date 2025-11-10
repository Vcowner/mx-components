# ImportButton 导入按钮

专用于文件上传/导入操作的按钮组件，支持点击上传和拖拽上传两种模式。

## 何时使用

- 需要上传文件进行数据导入
- 需要批量导入数据
- 需要支持拖拽上传的便捷操作

## 代码演示

<script setup>
import Demo1 from './demos/Demo1.vue'
import Demo2 from './demos/Demo2.vue'
import Demo3 from './demos/Demo3.vue'
import Demo4 from './demos/Demo4.vue'
import Demo5 from './demos/Demo5.vue'
import Demo6 from './demos/Demo6.vue'
import Demo7 from './demos/Demo7.vue'
import Demo8 from './demos/Demo8.vue'
import Demo9 from './demos/Demo9.vue'
import Demo10 from './demos/Demo10.vue'
import Demo11 from './demos/Demo11.vue'
</script>

### 点击上传

使用 `upload-type="button"` 可以启用点击上传模式，点击按钮后打开文件选择对话框。

<Demo1 />

**完整代码：**

```vue
<template>
  <mx-import-button 
    upload-type="button"
    accept=".png"
    :custom-request="handleCustomRequest"
    @change="handleImport"
  />
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
```

### 拖拽上传

使用 `upload-type="drag"` 可以启用拖拽上传模式，支持将文件拖拽到指定区域上传。

<Demo2 />

**完整代码：**

```vue
<template>
  <mx-import-button 
    upload-type="drag"
    accept=".png"
    :custom-request="handleCustomRequest"
    @change="handleImport"
  />
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
  }
}
</script>
```

### 文件类型限制

使用 `accept` 属性可以限制上传的文件类型。当用户选择的文件类型不匹配时，会自动显示错误提示。

<Demo3 />

**完整代码：**

```vue
<template>
  <!-- 只允许上传 Excel 文件 -->
  <mx-import-button 
    upload-type="button"
    accept=".xlsx,.xls"
    :custom-request="handleCustomRequest"
    @change="handleImport"
  >
    导入 Excel
  </mx-import-button>
  
  <!-- 只允许上传 PNG 文件 -->
  <mx-import-button 
    upload-type="button"
    accept=".png"
    :custom-request="handleCustomRequest"
    @change="handleImport"
  >
    导入 PNG
  </mx-import-button>
  
  <!-- 只允许上传文本文件 -->
  <mx-import-button 
    upload-type="button"
    accept=".csv,.txt"
    :custom-request="handleCustomRequest"
    @change="handleImport"
  >
    导入文本
  </mx-import-button>
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
```

### 文件大小限制

使用 `max-size` 属性可以限制上传文件的最大大小（单位：MB），超过限制的文件会被拒绝上传。

<Demo5 />

**完整代码：**

```vue
<template>
  <mx-import-button 
    upload-type="button"
    accept=".png"
    :max-size="5"
    :custom-request="handleCustomRequest"
    @change="handleImport"
  >
    上传 PNG 文件（最大 5MB）
  </mx-import-button>
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
```

### 下载模板

使用 `download-template` 属性可以配置模板下载功能，会在上传按钮旁边显示一个下载模板按钮。

<Demo6 />

**完整代码：**

```vue
<template>
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
  }
}
</script>
```

### 上传进度和事件

使用 `action` 属性配置上传地址，通过 `@progress`、`@success`、`@error` 事件监听上传进度和结果。注意：`@progress` 事件会在文件上传过程中自动触发，进度信息来自 `change` 事件。

<Demo7 />

**完整代码：**

```vue
<template>
  <div>
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
```

### 文件删除和预览

使用 `remove` 和 `preview` 属性可以自定义文件删除和预览的行为。

<Demo8 />

**完整代码：**

```vue
<template>
  <mx-import-button 
    upload-type="button"
    accept=".png"
    :file-list="fileList"
    :custom-request="handleCustomRequest"
    :remove="handleRemove"
    :preview="handlePreview"
    @change="handleChange"
  >
    上传 PNG 图片（可删除和预览）
  </mx-import-button>
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
        })
      }, 200)
    }
  }, 200)
}

function handleChange(info) {
  fileList.value = info.fileList
}

function handleRemove(file) {
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
  }
}
</script>
```

### 防抖功能

使用 `debounce` 属性可以设置防抖延迟时间（毫秒），防止用户快速连续点击按钮。

<Demo9 />

**完整代码：**

```vue
<template>
  <mx-import-button 
    upload-type="button"
    accept=".png"
    :debounce="1000"
    :custom-request="handleCustomRequest"
    @change="handleImport"
  >
    防抖上传 PNG（1秒）
  </mx-import-button>
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
```

### 文件下载功能

当文件上传成功后，如果文件对象中包含 `url` 属性，文件列表会自动显示下载按钮。可以通过 `download` 属性自定义下载行为。

<Demo10 />

**完整代码：**

```vue
<template>
  <mx-import-button 
    upload-type="button"
    accept=".png"
    :file-list="fileList"
    :custom-request="handleCustomRequest"
    :download="handleDownload"
    @change="handleChange"
  >
    上传 PNG 文件（支持下载）
  </mx-import-button>
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
```

**说明：**
- 文件对象中的 `url` 属性用于指定文件的下载地址
- 如果设置了 `download` 回调，点击下载按钮时会调用该回调
- 如果没有设置 `download` 回调，默认会跳转到 `file.url` 对应的标签页
- 上传进度可以从 `file.percent` 或 `change` 事件的 `info.event.percent` 中获取

### 完整功能演示

包含文件类型限制、多选、权限控制、加载状态等功能。

<Demo4 />

### 照片和照片墙模式

使用 `list-type` 属性可以设置上传列表的显示样式，支持 `text`（文本列表）、`picture`（照片列表）和 `picture-card`（照片墙）三种模式。

<Demo11 />

**完整代码：**

```vue
<template>
  <div>
    <!-- 照片模式 -->
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
    
    <!-- 照片墙模式 -->
    <mx-import-button 
      upload-type="button"
      accept="image/*"
      list-type="picture-card"
      :file-list="fileList2"
      :custom-request="handleCustomRequest"
      :preview="handlePreview"
      @change="handleChange2"
    >
      <template #default>
        <div>
          <UploadOutlined />
          <div style="margin-top: 8px">上传</div>
        </div>
      </template>
    </mx-import-button>
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
  }
}
</script>
```

### 完整功能演示

包含文件类型限制、多选、权限控制、加载状态等功能。

**完整代码：**

```vue
<template>
  <div>
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
    
    <!-- 拖拽上传 -->
    <mx-import-button 
      upload-type="drag"
      accept=".png"
      :multiple="true"
      :max-count="5"
      :loading="uploading"
      :custom-request="handleCustomRequest"
      @change="handleImport"
      style="margin-top: 16px;"
    >
      <template #hint>支持上传 PNG 文件，最多 5 个文件，支持拖拽上传</template>
    </mx-import-button>
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
```

## API

### ImportButton Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| uploadType | 上传类型：button（点击上传）或 drag（拖拽上传） | button 或 drag | button |
| type | 按钮类型（仅 button 模式有效） | primary 或 default 或 dashed 或 link 或 text | default |
| size | 按钮尺寸（仅 button 模式有效） | large 或 middle 或 small | middle |
| disabled | 是否禁用 | boolean | false |
| loading | 加载状态 | boolean | false |
| customClass | 自定义类名 | string | 空字符串 |
| permission | 权限控制 | string 或 string 数组 | - |
| hideIcon | 是否隐藏图标（仅 button 模式有效） | boolean | false |
| accept | 接受的文件类型 | string | - |
| multiple | 是否支持多选文件 | boolean | false |
| fileList | 上传的文件列表 | UploadFile 数组 | - |
| showUploadList | 是否显示上传列表 | boolean 或 object | true |
| listType | 上传列表的内建样式 | text 或 picture 或 picture-card | - |
| maxCount | 最大文件数量 | number | - |
| maxSize | 最大文件大小（单位：MB） | number | - |
| action | 上传地址 | string | - |
| customRequest | 自定义上传请求 | 函数类型 | - |
| beforeUpload | 上传前的钩子，返回 false 则停止上传 | 函数类型 | - |
| remove | 删除文件的回调，返回 false 或 Promise 则阻止删除 | 函数类型 | - |
| preview | 预览文件的回调 | 函数类型 | - |
| download | 点击下载文件时的回调 | 函数类型 | - |
| debounce | 防抖延迟时间（毫秒），0 则不防抖 | number | 0 |
| downloadTemplate | 下载模板配置 | 对象类型 | - |

### ImportButton Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 文件状态改变时的回调 | `(info: UploadChangeParam) => void` |
| import | 文件导入时的回调（别名，同 change） | `(info: UploadChangeParam) => void` |
| success | 文件上传成功时的回调 | `(info: UploadChangeParam) => void` |
| error | 文件上传失败时的回调 | `(error: Error, info: UploadChangeParam) => void` |
| progress | 文件上传进度回调 | `(info: UploadProgressEvent) => void` |

### DownloadTemplateConfig

下载模板配置对象：

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| url | 模板下载地址 | `string` | 是 |
| filename | 下载的文件名 | `string` | 否 |
| text | 下载按钮文本 | `string` | 否 |

<template>
  <div
    :class="[
      'mx-import-button-wrapper',
      { 'mx-import-button-wrapper--drag': uploadType === 'drag' }
    ]"
  >
    <!-- 下载模板按钮 -->
    <mx-button
      v-if="downloadTemplate"
      :type="type"
      :size="size"
      :custom-class="customClass"
      :permission="permission"
      class="mx-import-button-template-btn"
      @click="handleDownloadTemplate"
    >
      <template #icon>
        <DownloadOutlined />
      </template>
      {{ downloadTemplate.text || '下载模板' }}
    </mx-button>

    <!-- 点击上传模式 -->
    <a-upload
      v-if="uploadType === 'button'"
      v-bind="uploadProps"
      :accept="accept"
      :multiple="multiple"
      :file-list="props.fileList"
      :list-type="listType"
      :show-upload-list="normalizedShowUploadList"
      :max-count="maxCount"
      :action="action"
      :custom-request="customRequest"
      :before-upload="handleBeforeUpload"
      :preview-file="handlePreviewFile"
      :download="handleDownload"
      @update:file-list="(val: UploadProps['fileList']) => emit('update:fileList', val)"
      @change="handleChange"
      @remove="handleRemove"
    >
      <!-- picture-card 模式使用默认插槽 -->
      <template v-if="props.listType === 'picture-card'">
        <slot>
          <div>
            <UploadOutlined />
            <div style="margin-top: 8px">上传</div>
          </div>
        </slot>
      </template>
      <!-- picture 或 text 模式使用按钮 -->
      <mx-button
        v-else
        :type="type"
        :size="size"
        :disabled="disabled || loading"
        :loading="loading"
        :custom-class="customClass"
        :permission="permission"
        :debounce="debounce"
      >
        <template v-if="!hideIcon && !loading" #icon>
          <UploadOutlined />
        </template>
        <slot>导入</slot>
      </mx-button>
    </a-upload>

    <!-- 拖拽上传模式 -->
    <a-upload-dragger
      v-else
      v-bind="uploadProps"
      :accept="accept"
      :multiple="multiple"
      :file-list="props.fileList"
      :list-type="props.listType"
      :show-upload-list="normalizedShowUploadList"
      :max-count="maxCount"
      :action="action"
      :custom-request="customRequest"
      :before-upload="handleBeforeUpload"
      :preview-file="handlePreviewFile"
      :download="handleDownload"
      :disabled="disabled || loading"
      :class="customClass"
      @update:file-list="(val: UploadProps['fileList']) => emit('update:fileList', val)"
      @change="handleChange"
      @remove="handleRemove"
    >
      <p class="ant-upload-drag-icon">
        <UploadOutlined v-if="!loading" />
        <LoadingOutlined v-else />
      </p>
      <p class="ant-upload-text">
        <slot>点击或拖拽文件到此区域上传</slot>
      </p>
      <p class="ant-upload-hint">
        <slot name="hint">支持单个或批量上传</slot>
      </p>
    </a-upload-dragger>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { message } from 'ant-design-vue'
import { UploadOutlined, LoadingOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import MxButton from '../MxButton/MxButton.vue'
import type { UploadProps, UploadChangeParam, UploadFile } from 'ant-design-vue'
import type { MxImportButtonProps, UploadProgressEvent } from './importButtonTypes'

/**
 * 从文件对象中获取 URL
 * 按优先级检查多个可能的 URL 来源
 */
const getFileUrl = (file: UploadFile | any): string | undefined => {
  return (
    file?.url ||
    file?.thumbUrl ||
    file?.response?.url ||
    file?.response?.thumbUrl ||
    file?.response?.data?.url
  )
}

/**
 * 导入按钮组件
 * 专用于文件上传/导入操作，支持点击上传和拖拽上传两种模式
 *
 * @example
 * <!-- 点击上传 -->
 * <mx-import-button upload-type="button" @change="handleImport" />
 *
 * @example
 * <!-- 拖拽上传 -->
 * <mx-import-button upload-type="drag" @change="handleImport" />
 */
defineOptions({
  name: 'MxImportButton'
})

const emit = defineEmits<{
  'update:fileList': [fileList: UploadProps['fileList']]
  change: [info: UploadChangeParam]
  import: [fileList: UploadProps['fileList']]
  success: [info: UploadChangeParam]
  error: [error: Error, info: UploadChangeParam]
  progress: [info: UploadProgressEvent]
}>()

const props = withDefaults(defineProps<MxImportButtonProps>(), {
  uploadType: 'button',
  type: 'default',
  size: 'middle',
  disabled: false,
  loading: false,
  customClass: '',
  hideIcon: false,
  accept: undefined,
  multiple: false,
  fileList: undefined,
  showUploadList: true,
  listType: undefined,
  maxCount: undefined,
  maxSize: undefined,
  action: undefined,
  customRequest: undefined,
  beforeUpload: undefined,
  remove: undefined,
  preview: undefined,
  download: undefined,
  debounce: 0,
  downloadTemplate: undefined
})

// 规范化 showUploadList 配置，确保预览图标默认显示
// 下载图标默认不显示，需要时通过父组件传值控制
const normalizedShowUploadList = computed(() => {
  if (props.showUploadList === false) {
    return false
  }
  if (props.showUploadList === true) {
    // 默认显示预览和删除图标，下载图标默认不显示
    return {
      showPreviewIcon: true,
      showDownloadIcon: false,
      showRemoveIcon: true
    }
  }
  // 如果是对象，确保预览图标默认显示（除非显式设置为 false）
  // 下载图标默认不显示，除非显式设置为 true
  if (typeof props.showUploadList === 'object') {
    return {
      showPreviewIcon: props.showUploadList.showPreviewIcon !== false,
      showDownloadIcon: props.showUploadList.showDownloadIcon === true,
      showRemoveIcon: props.showUploadList.showRemoveIcon !== false,
      ...props.showUploadList
    }
  }
  return props.showUploadList
})

// 计算上传组件的属性（排除自定义属性）
const uploadProps = computed(() => {
  const {
    uploadType: _uploadType,
    type: _type,
    size: _size,
    customClass: _customClass,
    permission: _permission,
    hideIcon: _hideIcon,
    accept: _accept,
    multiple: _multiple,
    fileList: _fileList,
    showUploadList: _showUploadList,
    listType: _listType,
    maxCount: _maxCount,
    maxSize: _maxSize,
    action: _action,
    customRequest: _customRequest,
    beforeUpload: _beforeUpload,
    remove: _remove,
    preview: _preview,
    download: _download,
    debounce: _debounce,
    downloadTemplate: _downloadTemplate,
    ...rest
  } = props
  return rest
})

/** 验证文件类型是否匹配 accept */
const validateFileType = (file: File, accept?: string): boolean => {
  if (!accept) return true

  const fileName = file.name || ''
  const fileType = file.type || ''

  // 将 accept 字符串分割成数组
  const acceptTypes = accept.split(',').map(type => type.trim())

  // 检查文件是否匹配任一 accept 类型
  for (const acceptType of acceptTypes) {
    // 处理扩展名匹配（如 .xlsx, .xls）
    if (acceptType.startsWith('.')) {
      const extension = acceptType.toLowerCase()
      if (fileName.toLowerCase().endsWith(extension)) {
        return true
      }
    }
    // 处理 MIME 类型匹配（如 image/*, application/pdf）
    else if (acceptType.includes('*')) {
      // 通配符匹配（如 image/*）
      const baseType = acceptType.split('/')[0]
      if (fileType.startsWith(baseType + '/')) {
        return true
      }
    }
    // 精确 MIME 类型匹配
    else if (fileType === acceptType) {
      return true
    }
  }

  return false
}

/** 处理文件大小验证 */
const handleBeforeUpload = (file: any, fileList: any[]) => {
  // 文件类型验证
  if (props.accept) {
    if (!validateFileType(file, props.accept)) {
      // 格式化 accept 文本用于提示
      let acceptText = props.accept
      if (!props.accept.includes('*')) {
        // 如果是扩展名列表，美化显示
        acceptText = props.accept
          .split(',')
          .map(t => t.trim())
          .join('、')
      }
      message.error(`文件类型不匹配，仅支持 ${acceptText} 格式的文件`)
      return false
    }
  }

  // 文件大小验证
  if (props.maxSize) {
    const fileSizeMB = file.size / 1024 / 1024
    if (fileSizeMB > props.maxSize) {
      message.error(`文件大小不能超过 ${props.maxSize}MB`)
      return false
    }
  }

  // 调用用户自定义的 beforeUpload
  if (props.beforeUpload) {
    const result = props.beforeUpload(file, fileList)
    // 如果返回 Promise，直接返回
    if (result instanceof Promise) {
      return result
    }
    return result
  }

  return true
}

/** 处理删除文件 */
const handleRemove = async (file: UploadFile) => {
  if (props.remove) {
    try {
      const result = await props.remove(file)
      // 如果返回 false 或 Promise<false>，阻止删除
      if (result === false) {
        return false
      }
    } catch (error) {
      // 如果抛出错误，阻止删除
      return false
    }
  }
  // 如果没有提供 remove 回调，允许删除
  return true
}

/** 处理预览文件（preview-file prop） */
const handlePreviewFile = async (file: UploadFile) => {
  // 如果文件没有 url，直接返回，不进行预览
  const fileUrl = getFileUrl(file)
  if (!fileUrl) {
    return false
  }

  if (props.preview) {
    // 如果用户提供了 preview 回调，调用它
    // preview 可能返回一个 Promise，用于自定义预览 URL
    try {
      const result = await props.preview(file)
      // 如果返回了 URL，使用它；否则使用文件的 url 或 thumbUrl
      return result || fileUrl
    } catch (error) {
      // 如果出错，返回文件的 url 或 thumbUrl
      return fileUrl
    }
  }
  // 如果没有提供 preview，返回文件的 url 或 thumbUrl
  return fileUrl
}

/** 处理下载文件 */
const handleDownload = (file: UploadFile) => {
  if (props.download) {
    props.download(file)
  }
}

/** 处理文件变化 */
const handleChange = (info: UploadChangeParam) => {
  // 如果使用 customRequest，确保上传成功的文件包含 url
  // 这样预览和下载功能才能正常工作
  if (props.customRequest && info.file.status === 'done') {
    const file = info.file
    // 如果 response 中有 url，将其设置到 file.url
    if (file.response && !file.url) {
      const url = getFileUrl(file)
      if (url) {
        file.url = url
        if (!file.thumbUrl) {
          file.thumbUrl = url
        }
      }
    }
  }

  // 触发 update:fileList 事件，支持 v-model:file-list
  emit('update:fileList', info.fileList)

  emit('change', info)

  // 触发上传进度事件（当文件正在上传时）
  // 优先使用 file.percent，如果没有则使用 event.percent
  if (info.file.status === 'uploading') {
    const percent = info.file.percent ?? info.event?.percent ?? 0
    if (percent > 0) {
      const progressInfo: UploadProgressEvent = {
        percent,
        file: info.file
      }
      emit('progress', progressInfo)
    }
  }

  // 触发成功/失败事件
  if (info.file.status === 'done') {
    emit('success', info)
    // 只在文件上传成功时触发 import 事件，避免重复触发
    emit('import', info.fileList)
  } else if (info.file.status === 'error') {
    const error = new Error(info.file.error?.message || '上传失败')
    emit('error', error, info)
  }
}

/** 处理下载模板 */
const handleDownloadTemplate = () => {
  if (!props.downloadTemplate) return

  const { url, filename } = props.downloadTemplate

  // 验证 URL 是否有效
  if (!url) {
    message.error('下载模板地址无效')
    return
  }

  try {
    const link = document.createElement('a')
    link.href = url
    link.download = filename || 'template'
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    message.error('下载模板失败，请稍后重试')
    console.error('Download template error:', error)
  }
}
</script>

<style scoped lang="scss">
.mx-import-button-wrapper {
  display: inline-block;

  // 拖拽上传模式时，wrapper 应该是块级元素
  &--drag {
    display: block;
  }

  // 下载模板按钮样式
  .mx-import-button-template-btn {
    margin-right: 8px;
  }

  // 文件列表删除按钮设置为红色（Ant Design 默认就是红色，这里确保样式生效）
  :deep(.ant-upload-list-item) {
    // 去掉文件名的下划线
    .ant-upload-list-item-name {
      text-decoration: none !important;
    }

    .ant-upload-list-item-actions {
      .anticon-delete {
        color: #ff4d4f !important;

        &:hover {
          color: #ff7875 !important;
        }
      }

      .anticon-download {
        color: #1890ff !important;

        &:hover {
          color: #40a9ff !important;
        }
      }
    }

    // 上传成功状态 - 绿色
    &.ant-upload-list-item-done {
      .ant-upload-list-item-name {
        color: #52c41a !important;
      }

      .ant-upload-list-item-icon,
      .ant-upload-text-icon {
        color: #52c41a !important;
      }
    }

    // 上传中状态 - 蓝色
    &.ant-upload-list-item-uploading {
      .ant-upload-list-item-name {
        color: #1890ff !important;
      }

      .ant-upload-list-item-icon,
      .ant-upload-text-icon {
        color: #1890ff !important;
      }
    }

    // 上传失败状态 - 红色
    &.ant-upload-list-item-error {
      .ant-upload-list-item-name {
        color: #ff4d4f !important;
      }

      .ant-upload-list-item-icon,
      .ant-upload-text-icon {
        color: #ff4d4f !important;
      }
    }
  }
}
</style>

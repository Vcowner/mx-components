import type { UploadProps, UploadFile } from 'ant-design-vue'

/**
 * 上传进度事件类型
 */
export interface UploadProgressEvent {
  percent?: number
  file: UploadFile
}

/**
 * 下载模板配置
 */
export interface DownloadTemplateConfig {
  /** 模板下载地址 */
  url: string
  /** 下载的文件名 */
  filename?: string
  /** 下载按钮文本 */
  text?: string
}

/**
 * MxImportButton 组件属性
 */
export interface MxImportButtonProps {
  /** 上传类型：button（点击上传）或 drag（拖拽上传） */
  uploadType?: 'button' | 'drag'
  /** 按钮类型（仅 button 模式有效） */
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text'
  /** 按钮尺寸（仅 button 模式有效） */
  size?: 'large' | 'middle' | 'small'
  /** 是否禁用 */
  disabled?: boolean
  /** 加载状态 */
  loading?: boolean
  /** 自定义类名 */
  customClass?: string
  /** 需要的权限，传入权限字符串或数组，有权限则显示按钮 */
  permission?: string | string[]
  /** 是否隐藏图标 */
  hideIcon?: boolean
  /** 接受的文件类型 */
  accept?: string
  /** 是否支持多选文件 */
  multiple?: boolean
  /** 上传的文件列表 */
  fileList?: UploadProps['fileList']
  /** 是否显示上传列表 */
  showUploadList?: boolean | UploadProps['showUploadList']
  /** 最大文件数量 */
  maxCount?: number
  /** 最大文件大小（单位：MB） */
  maxSize?: number
  /** 上传地址 */
  action?: string
  /** 自定义上传请求 */
  customRequest?: UploadProps['customRequest']
  /** 上传前的钩子，返回 false 则停止上传 */
  beforeUpload?: UploadProps['beforeUpload']
  /** 删除文件的回调，返回 false 或 Promise<false> 则阻止删除 */
  remove?: (file: UploadFile) => boolean | Promise<boolean>
  /** 预览文件的回调，可以返回预览 URL 或 Promise<预览 URL> */
  preview?: (file: UploadFile) => string | Promise<string> | void
  /** 点击下载文件时的回调，如果没有指定，则默认跳转到文件 url 对应的标签页 */
  download?: (file: UploadFile) => void
  /** 防抖延迟时间（毫秒），0 则不防抖 */
  debounce?: number
  listType?: 'text' | 'picture' | 'picture-card'
  /** 下载模板配置 */
  downloadTemplate?: DownloadTemplateConfig
}

import type { ButtonProps } from 'ant-design-vue'

/**
 * 预设图标类型
 * 注意：已有专门业务组件的类型不在此列（如 search、reset、submit、delete）
 */
export type IconType =
  | 'edit' // 编辑
  | 'view' // 查看
  | 'copy' // 复制
  | 'add' // 新增
  | 'refresh' // 刷新
  | 'save' // 保存
  | 'cancel' // 取消
  | 'print' // 打印
  | 'export' // 导出

/**
 * MxButton 组件属性
 * 继承自 ant-design-vue Button 的所有属性
 */
export interface MxButtonProps extends ButtonProps {
  /**
   * 自定义类名
   */
  customClass?: string
  /**
   * 需要的权限，传入权限字符串或数组，有权限则显示按钮
   */
  permission?: string | string[]
  /**
   * 预设图标类型，会自动显示对应的图标和默认文案
   */
  iconType?: IconType
  /**
   * 是否隐藏图标（当使用 iconType 时）
   */
  hideIcon?: boolean
  /**
   * 防抖延迟时间（毫秒），0 则不防抖
   */
  debounce?: number
  /**
   * 默认文案（使用 iconType 时的默认文案）
   */
  defaultText?: string
  /**
   * 加载状态时的文案
   */
  loadingText?: string
}

// 导出 ButtonProps 供工具使用
export type { ButtonProps }

/**
 * 按钮组件事件类型
 */
export type MxButtonEmits = {
  click: [event: MouseEvent]
}

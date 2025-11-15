import type { ButtonProps } from 'ant-design-vue'

/**
 * MxResetButton 组件属性
 * 继承自 ant-design-vue Button 的所有属性
 */
export interface MxResetButtonProps extends ButtonProps {
  /**
   * 自定义类名
   */
  customClass?: string
  /**
   * 需要的权限，传入权限字符串或数组，有权限则显示按钮
   */
  permission?: string | string[]
  /**
   * 防抖延迟时间（毫秒）
   */
  debounce?: number
  /**
   * 是否支持快捷键触发（Ctrl/Cmd + R）
   */
  keyboard?: boolean
  /**
   * 是否隐藏图标
   */
  hideIcon?: boolean
}

/**
 * 重置按钮组件事件类型
 */
export type MxResetButtonEmits = {
  reset: []
}

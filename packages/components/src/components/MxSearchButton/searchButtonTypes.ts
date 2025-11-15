import type { ButtonProps } from 'ant-design-vue'

/**
 * MxSearchButton 组件属性
 * 继承自 ant-design-vue Button 的所有属性
 */
export interface MxSearchButtonProps extends ButtonProps {
  /**
   * 自定义类名
   */
  customClass?: string
  /**
   * 需要的权限，传入权限字符串或数组，有权限则显示按钮
   */
  permission?: string | string[]
}

/**
 * 搜索按钮组件事件类型
 */
export type MxSearchButtonEmits = {
  search: []
}

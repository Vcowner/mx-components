import type { InputProps } from 'ant-design-vue'

/**
 * MxInput 组件属性
 * 继承自 ant-design-vue Input 的所有属性
 */
export interface MxInputProps extends InputProps {
  /**
   * 自定义类名
   */
  customClass?: string
}

// 导出 InputProps 供工具使用
export type { InputProps }

/**
 * MxInput 组件事件类型
 */
export type MxInputEmits = {
  change: [event: Event]
  focus: [event: Event]
  pressEnter: [event: KeyboardEvent]
}


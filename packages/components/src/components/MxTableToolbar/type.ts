/*
 * @Author: liaokt
 * @Description:
 * @Date: 2025-07-18 11:05:56
 * @LastEditors: liaokt
 * @LastEditTime: 2025-08-28 14:01:43
 */
import type { VNode } from 'vue'

export interface SearchConfigItem {
  type: 'input' | 'select' | 'date' | 'custom' | 'search'
  key: string
  name: string
  placeholder?: string
  width?: string | number
  style?: Record<string, any>
  isHidden?: boolean
  defaultValue?: any
  options?: Array<string | { key: string | number; value: string | number }>
  props?: Record<string, any>
  render?: (ctx: { value: any; onChange: (v: any) => void }) => any
}

// src/components/CustomTable/components/CustomTableToolbar/type.ts

import type { MxImportButtonProps } from '@/components/MxImportButton/importButtonTypes'
import type { BatchActionProps } from '@/components/MxBatchAction/MxBatchAction.vue'

/**
 * 按钮组件类型
 */
export type ButtonComponentType = 'button' | 'import' | 'batch'

/**
 * 基础按钮配置（所有按钮类型共用的属性）
 */
interface BaseOperateButtonConfig {
  label: string // 按钮文本
  icon?: VNode | (() => VNode) | any // 按钮图标（仅 button 类型有效）
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text' // 按钮类型
  size?: 'small' | 'middle' | 'large' // 按钮大小
  onClick?: () => void // 点击事件
  loading?: boolean // loading 状态
  disabled?: boolean // 是否禁用
  show?: boolean // 是否显示（默认 true）
  permission?: string | string[] // 权限标识
  danger?: boolean // 是否危险按钮（红色）
  position?: 'left' | 'right' // 按钮位置
}

/**
 * MxButton 配置
 */
export interface ButtonConfig extends BaseOperateButtonConfig {
  buttonType?: 'button' // 默认为 'button'，可省略
  componentProps?: Record<string, any> // MxButton 的额外 props（如 iconType, debounce 等）
}

/**
 * MxImportButton 配置
 */
export interface ImportButtonConfig extends BaseOperateButtonConfig {
  buttonType: 'import'
  componentProps?: Partial<
    Omit<MxImportButtonProps, 'type' | 'size' | 'loading' | 'disabled' | 'permission'>
  > // 排除已在基础配置中的属性
  onImport?: (fileList: any) => void // 导入事件
  onImportChange?: (info: any) => void // 文件变化事件
}

/**
 * MxBatchAction 配置
 */
export interface BatchButtonConfig extends BaseOperateButtonConfig {
  buttonType: 'batch'
  componentProps?: Partial<
    Omit<BatchActionProps, 'label' | 'type' | 'loading' | 'disabled' | 'permission'>
  > // 排除已在基础配置中的属性
  selectedItems?: any[] // 选中的项（如果未提供，需要从外部传入）
}

/**
 * 操作按钮配置（联合类型）
 */
export type OperateButtonConfig = ButtonConfig | ImportButtonConfig | BatchButtonConfig

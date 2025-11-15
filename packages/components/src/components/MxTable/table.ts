/**
 * 表格列类型枚举
 */
export enum TableColumnTypeEnum {
  /** 文本 */
  TEXT = 'text',
  /** 标签 */
  TAG = 'tag',
  /** 日期 */
  DATE = 'date',
  /** 日期时间 */
  DATETIME = 'dateTime',
  /** 下拉选择 */
  SELECT = 'select',
  /** 状态 */
  STATUS = 'status',
  /** 自定义 */
  CUSTOM = 'custom'
}

/**
 * 表格列对齐方式枚举
 */
export enum TableColumnAlignEnum {
  /** 左对齐 */
  LEFT = 'left',
  /** 居中对齐 */
  CENTER = 'center',
  /** 右对齐 */
  RIGHT = 'right'
}

/**
 * 表格尺寸枚举
 */
export enum TableSizeEnum {
  /** 小尺寸 */
  SMALL = 'small',
  /** 中等尺寸 */
  MIDDLE = 'middle',
  /** 大尺寸 */
  LARGE = 'large'
}

/**
 * 表格选择类型枚举
 */
export enum TableSelectionTypeEnum {
  /** 复选框 */
  CHECKBOX = 'checkbox',
  /** 单选框 */
  RADIO = 'radio'
}

/**
 * 按钮位置枚举
 */
export enum ButtonPositionEnum {
  /** 左侧 */
  LEFT = 'left',
  /** 右侧 */
  RIGHT = 'right'
}

/*
 * @Author: liaokt
 * @Description:
 * @Date: 2025-09-16 14:37:00
 * @LastEditors: liaokt
 * @LastEditTime: 2025-10-02 17:32:01
 */
import type { ButtonProps } from 'ant-design-vue/es/button/buttonTypes'
import type { ColumnType } from 'ant-design-vue/es/table/interface'
import type { TableProps } from 'ant-design-vue/es/table/Table'
import type { SearchConfigItem, OperateButtonConfig } from '@/components/MxTableToolbar/type'

// 表格列配置 - 继承 Ant Design Vue 的列配置
export interface TableColumn extends Omit<ColumnType, 'customRender'> {
  // 自定义属性
  type: TableColumnTypeEnum
  customRender?: (value: any, record: any, index: number) => any
  options?: any[] // 用于 select、tag、status 等组件
  color?: string // 用于 tag 类型的自定义颜色
}

// 表格操作配置
export interface TableAction extends Omit<ButtonProps, 'onClick'> {
  key: string
  label: string
  position?: ButtonPositionEnum
  onClick: (record: any, index: number) => void
}

// 表格配置 - 继承 Ant Design Vue Table 的所有属性
export interface TableConfig extends Omit<TableProps, 'columns'> {
  // 自定义列配置
  columns: TableColumn[]
  // 搜索配置
  searchList?: SearchConfigItem[]
  // 操作按钮配置
  operateList?: OperateButtonConfig[]
}

// 表格生成器配置
export interface TableGeneratorConfig {
  id: string
  name: string
  description?: string
  config: TableConfig
  createdAt?: string
  updatedAt?: string
}

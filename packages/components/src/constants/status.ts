/*
 * @Author: liaokt
 * @Description: 状态相关枚举
 * @Date: 2025-09-17 10:37:54
 * @LastEditors: liaokt
 * @LastEditTime: 2025-11-12 09:47:05
 */

/**
 * 状态枚举
 */
export enum StatusEnum {
  /** 成功 */
  SUCCESS = 'success',
  /** 错误 */
  ERROR = 'error',
  /** 警告 */
  WARNING = 'warning',
  /** 处理中 */
  PROCESSING = 'processing',
  /** 默认 */
  DEFAULT = 'default'
}

/**
 * 状态值枚举（后端返回的数值）
 */
export enum StatusValueEnum {
  /** 成功 */
  SUCCESS = 0,
  /** 错误 */
  ERROR = 1,
  /** 警告 */
  WARNING = 2,
  /** 处理中 */
  PROCESSING = 3,
  /** 默认 */
  DEFAULT = 4
}

/**
 * 数值到状态类型的映射
 */
export const VALUE_TO_STATUS_MAP = {
  [StatusValueEnum.SUCCESS]: StatusEnum.SUCCESS,
  [StatusValueEnum.ERROR]: StatusEnum.ERROR,
  [StatusValueEnum.WARNING]: StatusEnum.WARNING,
  [StatusValueEnum.PROCESSING]: StatusEnum.PROCESSING,
  [StatusValueEnum.DEFAULT]: StatusEnum.DEFAULT
} as const

/**
 * 根据数值获取状态类型
 * @param value 后端返回的数值
 * @returns 对应的状态类型
 */
export function getStatusByValue(value: number): StatusEnum {
  return VALUE_TO_STATUS_MAP[value as StatusValueEnum] || StatusEnum.DEFAULT
}

/**
 * 根据数值获取状态配置
 * @param value 后端返回的数值
 * @returns 状态配置对象
 */
export function getStatusConfigByValue(value: number) {
  const status = getStatusByValue(value)
  return {
    status,
    color: getColorByStatus(status)
  }
}

/**
 * 根据状态获取颜色
 * @param status 状态类型
 * @returns 对应的颜色
 */
export function getColorByStatus(status: StatusEnum): string {
  const colorMap = {
    [StatusEnum.SUCCESS]: 'green',
    [StatusEnum.ERROR]: 'red',
    [StatusEnum.WARNING]: 'orange',
    [StatusEnum.PROCESSING]: 'blue',
    [StatusEnum.DEFAULT]: 'default'
  }
  return colorMap[status] || 'default'
}

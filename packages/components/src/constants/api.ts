/*
 * @Author: liaokt
 * @Description:
 * @Date: 2025-11-06 09:42:36
 * @LastEditors: liaokt
 * @LastEditTime: 2025-11-06 09:43:35
 */
/**
 * API 相关常量
 */

// API 响应状态码
export const API_CODE = {
  SUCCESS: 10200, // 成功
  UNAUTHORIZED: 10401, // 未授权
  FORBIDDEN: 10403, // 禁止访问
  NOT_FOUND: 10404, // 未找到
  INTERNAL_ERROR: 10500, // 内部服务器错误
  BAD_REQUEST: 10400 // 请求错误
} as const

// API 请求超时时间（毫秒）
export const API_TIMEOUT = 10000

// API 基础路径
export const API_BASE_URL = import.meta.env.VITE_BASE_URL || ''

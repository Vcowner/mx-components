/**
 * API 响应类型定义
 */

/**
 * API 响应数据结构
 */
export interface ApiResponse<T = any> {
  /** 响应状态码 */
  code: number;
  /** 响应数据 */
  data: T;
  /** 响应消息 */
  message?: string;
  /** 其他扩展字段 */
  [key: string]: any;
}

/**
 * 处理后的响应结果
 */
export interface ResponseResult<T = any> {
  /** 是否成功 */
  success: boolean;
  /** 响应数据 */
  data: T | null;
  /** 响应消息 */
  message: string;
  /** 响应状态码 */
  code: number;
}

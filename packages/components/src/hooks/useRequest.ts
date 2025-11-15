/**
 * API响应处理工具函数
 */
import { ref, readonly, type Ref } from 'vue'
import { message } from 'ant-design-vue'
import type { ApiResponse, ResponseResult } from '@/types/api'
import { API_CODE } from '@/constants/api'

// 使用 Ant Design Vue 的消息提示
const Message = message

// 响应状态码枚举（从常量中导出，保持向后兼容）
// 建议使用 API_CODE 常量，保留此枚举仅为向后兼容
export enum ResponseCode {
  SUCCESS = API_CODE.SUCCESS,
  UNAUTHORIZED = API_CODE.UNAUTHORIZED,
  FORBIDDEN = API_CODE.FORBIDDEN,
  NOT_FOUND = API_CODE.NOT_FOUND,
  INTERNAL_ERROR = API_CODE.INTERNAL_ERROR,
  BAD_REQUEST = API_CODE.BAD_REQUEST
}

// 重新导出类型，保持向后兼容
export type { ApiResponse, ResponseResult }

/**
 * 处理API响应
 * @param response API响应数据
 * @param options 处理选项
 * @returns 处理后的结果
 */
export function handleResponse<T = any>(
  response: ApiResponse<T>,
  options: {
    showMessage?: boolean // 是否显示消息提示
    successMessage?: string // 成功时的自定义消息
    errorMessage?: string // 错误时的自定义消息
    onSuccess?: (data: T) => void // 成功时的回调
    onError?: (error: any) => void // 错误时的回调
  } = {}
): ResponseResult<T> {
  const { showMessage = true, successMessage, errorMessage, onSuccess, onError } = options

  // 判断是否成功
  const isSuccess = response.code === API_CODE.SUCCESS

  console.log(response, '----xxxx----')

  if (isSuccess) {
    // 成功处理
    const result: ResponseResult<T> = {
      success: true,
      data: response.data,
      message: successMessage || response.message || '操作成功',
      code: response.code
    }

    // 执行成功回调
    if (onSuccess) {
      onSuccess(response.data)
    }

    // 显示成功消息
    if (showMessage) {
      Message.success(result.message)
    }

    return result
  } else {
    // 错误处理
    const result: ResponseResult<T> = {
      success: false,
      data: null,
      message: errorMessage || response.message || '操作失败',
      code: response.code
    }

    // 执行错误回调
    if (onError) {
      onError(response)
    }

    // 显示错误消息
    if (showMessage) {
      Message.error(result.message)
    }

    return result
  }
}

/**
 * 处理异步API调用
 * @param apiCall API调用函数
 * @param options 处理选项
 * @returns Promise<ResponseResult<T>>
 */
export async function handleAsyncResponse<T = any>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: {
    showMessage?: boolean
    successMessage?: string
    errorMessage?: string
    onSuccess?: (data: T) => void
    onError?: (error: any) => void
    loading?: Ref<boolean> // 加载状态引用
  } = {}
): Promise<ResponseResult<T>> {
  const { loading, ...handleOptions } = options

  try {
    // 设置加载状态
    if (loading) {
      loading.value = true
    }

    // 调用API
    const response = await apiCall()

    // 处理响应
    return handleResponse(response, handleOptions)
  } catch (error) {
    // 处理异常
    const result: ResponseResult<T> = {
      success: false,
      data: null,
      message: handleOptions.errorMessage || '网络请求失败',
      code: -1
    }

    // 执行错误回调
    if (handleOptions.onError) {
      handleOptions.onError(error)
    }

    // 显示错误消息
    if (handleOptions.showMessage !== false) {
      Message.error(result.message)
    }

    return result
  } finally {
    // 清除加载状态
    if (loading) {
      loading.value = false
    }
  }
}

/**
 * 处理请求拦截器已封装的响应（成功时直接返回data，失败时已报错）
 * @param apiCall API调用函数
 * @param options 处理选项
 * @returns Promise<{ data: T; loading: Ref<boolean> }> 返回数据和loading状态
 */
export async function handleInterceptorResponse<T = any>(
  apiCall: () => Promise<T>,
  options: {
    showMessage?: boolean // 是否显示成功消息
    successMessage?: string // 成功时的自定义消息
    onSuccess?: (data: T) => void // 成功时的回调
  } = {}
): Promise<{ data: T; loading: Ref<boolean> }> {
  // 创建内部的loading状态
  const loading = ref(false)

  try {
    // 设置加载状态
    loading.value = true

    // 调用API（拦截器已处理成功/失败，这里直接获取数据）
    const data = await apiCall()

    // 执行成功回调
    if (options.onSuccess) {
      options.onSuccess(data)
    }

    // 显示成功消息
    if (options.showMessage !== false) {
      const message = options.successMessage || '操作成功'
      Message.success(message)
    }

    return { data, loading }
  } finally {
    // 清除加载状态
    loading.value = false
  }
}

/**
 * useRequest Hook - 类似 useRequest 的请求管理Hook
 * @param apiCall API调用函数
 * @param options 配置选项
 * @returns 请求状态和方法
 */
export function useRequest<T = any, P = any>(
  apiCall: (params?: P) => Promise<T>,
  options: {
    manual?: boolean // 是否手动触发，默认false（自动执行）
    defaultParams?: P // 默认参数
    onSuccess?: (data: T, params?: P) => void // 成功回调
    onError?: (error: any, params?: P) => void // 错误回调
    showMessage?: boolean // 是否显示成功消息
    successMessage?: string // 成功消息
  } = {}
) {
  const {
    manual = false,
    defaultParams,
    onSuccess,
    onError,
    showMessage = false,
    successMessage = '操作成功'
  } = options

  // 响应式状态
  const loading = ref(false)
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<any>(null)
  const params = ref<P | undefined>(defaultParams) as Ref<P | undefined>

  // 执行请求
  const run = async (requestParams?: P) => {
    const finalParams = (requestParams ?? params.value) as P | undefined

    try {
      loading.value = true
      error.value = null

      const result = await apiCall(finalParams)

      data.value = result as T

      // 执行成功回调
      if (onSuccess) {
        onSuccess(result, finalParams)
      }

      // 显示成功消息
      if (showMessage) {
        Message.success(successMessage)
      }

      return result
    } catch (err) {
      error.value = err

      // 执行错误回调
      if (onError) {
        onError(err, finalParams)
      }

      throw err
    } finally {
      loading.value = false
    }
  }

  // 异步执行请求（不抛出错误）
  const runAsync = async (requestParams?: P) => {
    try {
      return await run(requestParams)
    } catch {
      return null
    }
  }

  // 刷新请求（使用上次的参数）
  const refresh = () => run(params.value as P | undefined)

  // 重置状态
  const reset = () => {
    loading.value = false
    data.value = null
    error.value = null
  }

  // 设置数据
  const setData = (newData: T) => {
    data.value = newData as T
  }

  // 设置参数
  const setParams = (newParams: P) => {
    params.value = newParams as P | undefined
  }

  // 如果不是手动模式，自动执行一次
  if (!manual) {
    // 如果有默认参数，使用默认参数；否则不传参数
    run(defaultParams)
  }

  return {
    // 状态
    loading: readonly(loading),
    data: readonly(data),
    error: readonly(error),
    params: readonly(params),

    // 方法
    run,
    runAsync,
    refresh,
    reset,
    setData,
    setParams
  }
}

/**
 * 检查响应是否成功
 * @param response API响应数据
 * @returns boolean
 */
export function isSuccessResponse(response: ApiResponse): boolean {
  return response.code === API_CODE.SUCCESS
}

/**
 * 获取响应数据，如果失败则返回默认值
 * @param response API响应数据
 * @param defaultValue 默认值
 * @returns T | null
 */
export function getResponseData<T = any>(
  response: ApiResponse<T>,
  defaultValue: T | null = null
): T | null {
  return isSuccessResponse(response) ? response.data : defaultValue
}

/**
 * 创建成功响应
 * @param data 响应数据
 * @param message 消息
 * @returns ApiResponse<T>
 */
export function createSuccessResponse<T = any>(
  data: T,
  message: string = '操作成功'
): ApiResponse<T> {
  return {
    code: API_CODE.SUCCESS,
    message,
    data,
    success: true
  }
}

/**
 * 创建错误响应
 * @param code 错误码
 * @param message 错误消息
 * @param data 错误数据
 * @returns ApiResponse<T>
 */
export function createErrorResponse<T = any>(
  code: number = API_CODE.BAD_REQUEST,
  message: string = '操作失败',
  data?: T
): ApiResponse<T> {
  return {
    code,
    message,
    data: data as T,
    success: false
  }
}

/**
 * useLocalStorage - 响应式 localStorage 管理 Hook
 */
import { ref, watch, type Ref } from 'vue'

/**
 * 使用 localStorage 存储
 * @param key 存储键名
 * @param defaultValue 默认值
 * @returns 响应式的 ref 对象和操作方法
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  // 读取初始值
  const read = (): T => {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return defaultValue
      }
      return JSON.parse(item) as T
    } catch (error) {
      console.warn(`读取 localStorage[${key}] 失败:`, error)
      return defaultValue
    }
  }

  // 创建响应式引用
  const storedValue = ref<T>(read()) as Ref<T>

  // 写入 localStorage
  const write = (value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      storedValue.value = value
    } catch (error) {
      console.error(`写入 localStorage[${key}] 失败:`, error)
    }
  }

  // 删除 localStorage
  const remove = (): void => {
    try {
      localStorage.removeItem(key)
      storedValue.value = defaultValue
    } catch (error) {
      console.error(`删除 localStorage[${key}] 失败:`, error)
    }
  }

  // 监听本地变化，同步到 localStorage（必需）
  watch(
    storedValue,
    newValue => {
      write(newValue)
    },
    { deep: true }
  )

  return {
    /**
     * 响应式的值
     */
    value: storedValue,
    /**
     * 设置值
     */
    setValue: write,
    /**
     * 删除存储
     */
    remove
  }
}

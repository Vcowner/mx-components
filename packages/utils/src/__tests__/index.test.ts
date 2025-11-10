import { describe, it, expect, beforeEach, vi } from 'vitest'
import { debounce, throttle, deepClone, formatDate, randomString, isMobile, isEmpty } from '../index'

describe('工具函数测试', () => {
  describe('debounce 防抖', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    it('应该在指定延迟后执行', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 300)
      
      debouncedFn()
      
      expect(mockFn).not.toHaveBeenCalled()
      
      vi.advanceTimersByTime(300)
      
      expect(mockFn).toHaveBeenCalledOnce()
    })

    it('应该取消之前的调用', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 300)
      
      debouncedFn()
      vi.advanceTimersByTime(100)
      debouncedFn()
      vi.advanceTimersByTime(100)
      debouncedFn()
      
      expect(mockFn).not.toHaveBeenCalled()
      
      vi.advanceTimersByTime(300)
      
      expect(mockFn).toHaveBeenCalledOnce()
    })

    it('应该传递正确的参数', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 300)
      
      debouncedFn('arg1', 'arg2')
      
      vi.advanceTimersByTime(300)
      
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
    })
  })

  describe('throttle 节流', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    it('应该在首次调用时立即执行', () => {
      const mockFn = vi.fn()
      const throttledFn = throttle(mockFn, 300)
      
      throttledFn()
      
      expect(mockFn).toHaveBeenCalledOnce()
    })

    it('应该限制调用频率', () => {
      const mockFn = vi.fn()
      const throttledFn = throttle(mockFn, 300)
      
      throttledFn()
      vi.advanceTimersByTime(100)
      throttledFn()
      vi.advanceTimersByTime(100)
      throttledFn()
      vi.advanceTimersByTime(100)
      
      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('deepClone 深拷贝', () => {
    it('应该深拷贝对象', () => {
      const obj = { a: 1, b: { c: 2 } }
      const cloned = deepClone(obj)
      
      cloned.b.c = 3
      
      expect(obj.b.c).toBe(2)
      expect(cloned.b.c).toBe(3)
    })

    it('应该深拷贝数组', () => {
      const arr = [[1, 2], [3, 4]]
      const cloned = deepClone(arr)
      
      cloned[0][0] = 999
      
      expect(arr[0][0]).toBe(1)
      expect(cloned[0][0]).toBe(999)
    })

    it('应该拷贝 Date 对象', () => {
      const date = new Date('2024-01-01')
      const cloned = deepClone(date)
      
      expect(cloned.getTime()).toBe(date.getTime())
      expect(cloned).not.toBe(date)
    })

    it('应该处理 null 和 undefined', () => {
      expect(deepClone(null)).toBe(null)
      expect(deepClone(undefined)).toBe(undefined)
    })

    it('应该处理原始类型', () => {
      expect(deepClone(1)).toBe(1)
      expect(deepClone('test')).toBe('test')
      expect(deepClone(true)).toBe(true)
    })
  })

  describe('formatDate 格式化日期', () => {
    it('应该格式化为默认格式', () => {
      const date = new Date('2024-01-01')
      const formatted = formatDate(date)
      
      expect(formatted).toBe('2024-01-01')
    })

    it('应该支持自定义格式', () => {
      const date = new Date('2024-01-01 12:30:45')
      const formatted = formatDate(date, 'YYYY-MM-DD HH:mm:ss')
      
      expect(formatted).toBe('2024-01-01 12:30:45')
    })

    it('应该支持字符串日期', () => {
      const formatted = formatDate('2024-01-01', 'YYYY-MM-DD')
      
      expect(formatted).toBe('2024-01-01')
    })
  })

  describe('randomString 随机字符串', () => {
    it('应该生成指定长度的字符串', () => {
      const str = randomString(10)
      
      expect(str.length).toBe(10)
    })

    it('应该生成不同内容的字符串', () => {
      const str1 = randomString(10)
      const str2 = randomString(10)
      
      expect(str1).not.toBe(str2)
    })

    it('默认长度应该是 8', () => {
      const str = randomString()
      
      expect(str.length).toBe(8)
    })
  })

  describe('isEmpty 判断是否为空', () => {
    it('应该返回 true 对于 null', () => {
      expect(isEmpty(null)).toBe(true)
    })

    it('应该返回 true 对于 undefined', () => {
      expect(isEmpty(undefined)).toBe(true)
    })

    it('应该返回 true 对于空字符串', () => {
      expect(isEmpty('')).toBe(true)
      expect(isEmpty('   ')).toBe(true)
    })

    it('应该返回 true 对于空数组', () => {
      expect(isEmpty([])).toBe(true)
    })

    it('应该返回 true 对于空对象', () => {
      expect(isEmpty({})).toBe(true)
    })

    it('应该返回 false 对于非空值', () => {
      expect(isEmpty('test')).toBe(false)
      expect(isEmpty([1, 2])).toBe(false)
      expect(isEmpty({ a: 1 })).toBe(false)
      expect(isEmpty(0)).toBe(false)
    })
  })
})


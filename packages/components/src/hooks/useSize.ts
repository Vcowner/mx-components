/**
 * useSize - 监听元素尺寸变化的 Hook
 */
import { ref, watch, onMounted, onUnmounted, type Ref, type ComputedRef } from 'vue'

export interface UseSizeOptions {
  /** 是否立即执行 */
  immediate?: boolean
  /** 是否监听窗口大小变化 */
  listenWindowResize?: boolean
}

export interface Size {
  width: number
  height: number
}

/**
 * 监听元素尺寸变化
 * @param target 目标元素（可以是 Ref、ComputedRef 或 HTMLElement）
 * @param options 配置选项
 * @returns 尺寸对象 Ref
 */
export function useSize(
  target: Ref<HTMLElement | null> | ComputedRef<HTMLElement | null> | HTMLElement | null,
  options: UseSizeOptions = {}
): Ref<Size> {
  const { immediate = true, listenWindowResize = true } = options

  const size = ref<Size>({ width: 0, height: 0 })

  let resizeObserver: ResizeObserver | null = null
  let fallbackInterval: ReturnType<typeof setInterval> | null = null

  const updateSize = (element: HTMLElement | null) => {
    if (!element) {
      size.value = { width: 0, height: 0 }
      return
    }

    size.value = {
      width: element.offsetWidth,
      height: element.offsetHeight
    }
  }

  const observeElement = (element: HTMLElement | null) => {
    // 清理旧的观察器
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }

    // 清理降级方案的定时器
    if (fallbackInterval) {
      clearInterval(fallbackInterval)
      fallbackInterval = null
    }

    if (!element) {
      size.value = { width: 0, height: 0 }
      return
    }

    // 立即更新一次
    if (immediate) {
      updateSize(element)
    }

    // 使用 ResizeObserver 监听尺寸变化
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateSize(element)
      })
      resizeObserver.observe(element)
    } else {
      // 降级方案：使用定时器检查
      fallbackInterval = setInterval(() => {
        updateSize(element)
      }, 100)
    }
  }

  // 处理窗口大小变化
  const handleWindowResize = () => {
    const element = typeof target === 'function' 
      ? (target as ComputedRef<HTMLElement | null>).value
      : (target as Ref<HTMLElement | null>).value || (target as HTMLElement | null)
    updateSize(element)
  }

  // 监听目标元素变化
  watch(
    () => {
      if (typeof target === 'function') {
        return (target as ComputedRef<HTMLElement | null>).value
      }
      if ('value' in target) {
        return (target as Ref<HTMLElement | null>).value
      }
      return target as HTMLElement | null
    },
    (element) => {
      observeElement(element)
    },
    { immediate: true }
  )

  // 监听窗口大小变化
  if (listenWindowResize) {
    onMounted(() => {
      window.addEventListener('resize', handleWindowResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleWindowResize)
      if (resizeObserver) {
        resizeObserver.disconnect()
        resizeObserver = null
      }
      if (fallbackInterval) {
        clearInterval(fallbackInterval)
        fallbackInterval = null
      }
    })
  } else {
    // 即使不监听窗口大小变化，也需要在卸载时清理
    onUnmounted(() => {
      if (resizeObserver) {
        resizeObserver.disconnect()
        resizeObserver = null
      }
      if (fallbackInterval) {
        clearInterval(fallbackInterval)
        fallbackInterval = null
      }
    })
  }

  return size
}


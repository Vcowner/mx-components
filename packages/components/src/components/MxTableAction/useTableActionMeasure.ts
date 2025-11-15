import { nextTick, type Ref } from 'vue'
import debounce from 'lodash/debounce'

interface MeasureConfig {
  container: Ref<HTMLElement | undefined>
  measureRef: Ref<HTMLElement | undefined>
  moreTriggerRef: Ref<HTMLElement | null>
  gap: number
  actionsLength: number
}

/**
 * 计算可见按钮数量
 */
export function calculateVisibleCount(config: MeasureConfig): number {
  const { container, measureRef, moreTriggerRef, gap, actionsLength } = config

  if (!container.value) {
    return actionsLength
  }

  const available = container.value.clientWidth
  const items = Array.from(
    measureRef.value?.querySelectorAll<HTMLElement>('.mx-table-action-measure-item') || []
  )

  // 只计算操作按钮的宽度（不包括更多按钮）
  const widths = items.slice(0, actionsLength).map(el => el.offsetWidth)
  const moreWidth = moreTriggerRef.value?.offsetWidth ?? 0

  let used = 0
  let count = 0

  for (let i = 0; i < widths.length; i++) {
    const w = widths[i]
    const nextUsed = used === 0 ? w : used + gap + w

    // 预留更多按钮宽度（当还有剩余未放下的按钮时）
    const remain = widths.length - (i + 1)
    const reserve = remain > 0 ? (used === 0 ? moreWidth : gap + moreWidth) : 0

    if (nextUsed + reserve <= available) {
      used = nextUsed
      count++
      continue
    }
    break
  }

  return Math.max(0, Math.min(count, actionsLength))
}

/**
 * 防抖的计算函数
 */
export function useDebouncedCalculate(calculateFn: () => void, delay: number = 150) {
  const debouncedFn = debounce(calculateFn, delay)

  const execute = (immediate = false) => {
    if (immediate) {
      debouncedFn.cancel()
      calculateFn()
    } else {
      debouncedFn()
    }
  }

  // 添加 cancel 方法
  execute.cancel = () => debouncedFn.cancel()

  return execute as typeof execute & { cancel: () => void }
}

/**
 * 响应式宽度检测 Hook
 */
export function useResizeObserver(container: Ref<HTMLElement | undefined>, onResize: () => void) {
  let resizeObserver: ResizeObserver | null = null

  const startObserving = async () => {
    await nextTick()

    if (!container.value) return

    resizeObserver = new ResizeObserver(() => {
      onResize()
    })
    resizeObserver.observe(container.value)
  }

  const stopObserving = () => {
    if (resizeObserver && container.value) {
      resizeObserver.unobserve(container.value)
    }
    resizeObserver = null
  }

  return {
    startObserving,
    stopObserving
  }
}

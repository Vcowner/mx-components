import { ref } from 'vue'

/**
 * TableAction 组件的 refs 管理
 */
export function useTableActionRefs() {
  const containerRef = ref<HTMLElement>()
  const measureRef = ref<HTMLElement>()
  const moreTriggerRef = ref<HTMLElement | null>(null)

  return {
    containerRef,
    measureRef,
    moreTriggerRef
  }
}

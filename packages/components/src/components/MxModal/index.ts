/*
 * @Author: liaokt
 * @Description: MxModal 模块导出和全局 API
 * @Date: 2025-11-13 11:30:00
 * @LastEditors: liaokt
 * @LastEditTime: 2025-11-13 12:30:00
 */
import MxModalProvider from './MxModalProvider.vue'

// 从 modalRegistry 重新导出，避免循环依赖
export { modalRegistry, register, show, hide, remove, removeAll } from './modalRegistry'

export { MxModalProvider }
export { useModal, useModalController, type UseModalReturn } from './useModal'
export { default as MxModal } from './MxModal.vue'
export { default as MxFormModal } from './MxFormModal.vue'
export { default as MxDetailModal } from './MxDetailModal.vue'

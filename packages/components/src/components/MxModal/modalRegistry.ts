/*
 * @Author: liaokt
 * @Description: Modal 注册表和相关函数，避免循环依赖
 * @Date: 2025-11-13 12:30:00
 * @LastEditors: liaokt
 * @LastEditTime: 2025-11-13 14:16:51
 */
import { defineComponent, h, watch, type Component } from 'vue'
import type { UseModalReturn } from './useModal'

// Modal 注册表
export const modalRegistry = new Map<string, Component>()

// 当前显示的 Modal 实例映射 (instanceId -> modal instance)
export const modalInstances = new Map<string, UseModalReturn>()

// 全局存储 provider 实例（由 MxModalProvider 设置）
let globalProvider: {
  register: (id: string, component: Component, props?: Record<string, any>) => void
  unregister: (id: string) => void
  update: (id: string, props: Partial<Record<string, any>>) => void
  removeAll: () => void
} | null = null

/** 设置全局 Provider（由 MxModalProvider 调用） */
export function setGlobalProvider(provider: {
  register: (id: string, component: Component, props?: Record<string, any>) => void
  unregister: (id: string) => void
  update: (id: string, props: Partial<Record<string, any>>) => void
  removeAll: () => void
}) {
  globalProvider = provider
}

/** 获取 Modal Provider 的方法 */
function getModalProvider() {
  if (!globalProvider) {
    console.warn('MxModalProvider 未找到，请确保在 App 中包裹 MxModalProvider')
    return {
      register: () => {
        console.warn('MxModalProvider 未找到，无法注册 Modal')
      },
      unregister: () => {},
      update: () => {},
      removeAll: () => {}
    }
  }
  return globalProvider
}

/**
 * 注册 Modal 组件
 */
export function register(id: string, component: Component) {
  modalRegistry.set(id, component)
}

/**
 * 显示 Modal
 */
export async function show<T = any>(id: string, args?: Record<string, any>): Promise<T | null> {
  const component = modalRegistry.get(id)
  if (!component) {
    throw new Error(`Modal "${id}" 未注册`)
  }

  const provider = getModalProvider()
  const instanceId = `${id}-${Date.now()}-${Math.random()}`

  // 动态导入 useModal，避免循环依赖
  const { useModal } = await import('./useModal')
  const modal = useModal()

  return new Promise<T | null>((resolve, reject) => {
    // 设置初始参数
    if (args) {
      modal.args.value = { ...args }
    }

    // 注入 resolve/reject 到 modal 实例
    ;(modal as any)._resolve = (value: T) => {
      ;(modal as any)._resolved = true
      resolve(value)
      provider.unregister(instanceId)
      modalInstances.delete(instanceId)
    }
    ;(modal as any)._reject = (reason?: any) => {
      reject(reason)
      provider.unregister(instanceId)
      modalInstances.delete(instanceId)
    }

    // 监听 visible 变化，处理取消情况
    watch(
      () => modal.visible.value,
      visible => {
        if (!visible && !(modal as any)._resolved) {
          // 用户关闭了 Modal（非 resolve），resolve null
          setTimeout(() => {
            if (!(modal as any)._resolved) {
              ;(modal as any)._resolved = true
              resolve(null)
              provider.unregister(instanceId)
              modalInstances.delete(instanceId)
            }
          }, 300) // 等待动画完成
        }
      }
    )

    // 创建包装组件
    const wrapperComponent = defineComponent({
      setup() {
        // 显示 Modal
        modal.show(args)

        return () =>
          h(component, {
            modal,
            ...modal.args.value
          })
      }
    })

    // 注册到 Provider
    provider.register(instanceId, wrapperComponent, {})
    modalInstances.set(instanceId, modal)
  })
}

/**
 * 隐藏 Modal
 */
export function hide(id: string) {
  // 找到所有匹配的实例并隐藏
  for (const [instanceId, modal] of modalInstances.entries()) {
    if (instanceId.startsWith(`${id}-`)) {
      modal.hide()
    }
  }
}

/**
 * 移除 Modal
 */
export function remove(id: string) {
  const provider = getModalProvider()
  // 找到所有匹配的实例并移除
  const toRemove: string[] = []
  for (const instanceId of modalInstances.keys()) {
    if (instanceId.startsWith(`${id}-`)) {
      toRemove.push(instanceId)
    }
  }
  toRemove.forEach(instanceId => {
    provider.unregister(instanceId)
    modalInstances.delete(instanceId)
  })
}

/**
 * 移除所有 Modal
 */
export function removeAll() {
  const provider = getModalProvider()
  provider.removeAll()
  modalInstances.clear()
}

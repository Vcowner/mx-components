<!--
 * @Author: liaokt
 * @Description: Modal Provider 组件，用于全局管理 Modal 状态
 * @Date: 2025-11-13 11:30:00
 * @LastEditors: liaokt
 * @LastEditTime: 2025-11-13 11:30:00
-->
<template>
  <slot />
  <teleport to="body">
    <component :is="modal.component" v-for="modal in modals" :key="modal.id" v-bind="modal.props" />
  </teleport>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, onUnmounted, markRaw, type Component } from 'vue'
import { setGlobalProvider } from './modalRegistry'

defineOptions({
  name: 'MxModalProvider'
})

interface ModalInstance {
  id: string
  component: Component
  props: Record<string, any>
}

const modals = ref<ModalInstance[]>([])

/** 注册 Modal */
const register = (id: string, component: Component, props: Record<string, any> = {}) => {
  const existingIndex = modals.value.findIndex(m => m.id === id)
  if (existingIndex >= 0) {
    // 更新已存在的 Modal
    modals.value[existingIndex].props = { ...modals.value[existingIndex].props, ...props }
  } else {
    // 添加新的 Modal，使用 markRaw 避免组件被响应式化
    modals.value.push({ id, component: markRaw(component), props })
  }
}

/** 移除 Modal */
const unregister = (id: string) => {
  const index = modals.value.findIndex(m => m.id === id)
  if (index >= 0) {
    modals.value.splice(index, 1)
  }
}

/** 更新 Modal Props */
const update = (id: string, props: Partial<Record<string, any>>) => {
  const modal = modals.value.find(m => m.id === id)
  if (modal) {
    modal.props = { ...modal.props, ...props }
  }
}

/** 移除所有 Modal */
const removeAll = () => {
  modals.value = []
}

const provider = {
  register,
  unregister,
  update,
  removeAll
}

// 提供给子组件使用（通过 inject）
provide('mxModal', provider)

// 设置全局 provider（用于非组件上下文）
onMounted(() => {
  setGlobalProvider(provider)
})

onUnmounted(() => {
  setGlobalProvider(null as any)
})
</script>

<!--
 * @Author: liaokt
 * @Description: 封装的 a-modal 组件，基于 MxModal 系统
 * @Date: 2025-11-13 12:00:00
 * @LastEditors: liaokt
 * @LastEditTime: 2025-11-13 16:50:11
-->
<template>
  <a-modal
    :open="modal.visible.value"
    v-bind="modalProps"
    :body-style="{ paddingTop: '10px' }"
    @cancel="handleCancel"
    @ok="handleOk"
    @after-close="modal.remove()"
  >
    <slot />
    <template v-if="hasFooterSlot" #footer>
      <slot name="footer" />
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { useModal, type UseModalReturn } from './useModal'
import type { ModalProps } from 'ant-design-vue'

defineOptions({
  name: 'MxModal'
})

interface Props {
  /** Modal 实例（从 modalRegistry 传递） */
  modal?: UseModalReturn
  /** 是否显示确认按钮 */
  showOk?: boolean
  /** 是否显示取消按钮 */
  showCancel?: boolean
  /** 自定义确认按钮文字 */
  okText?: string
  /** 自定义取消按钮文字 */
  cancelText?: string
  /** 确认按钮加载状态 */
  confirmLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modal: undefined,
  showOk: true,
  showCancel: true,
  okText: '确定',
  cancelText: '取消'
})

const emit = defineEmits<{
  ok: []
  cancel: []
}>()

// 如果传递了 modal prop，使用它；否则创建新的实例
const modal = props.modal || useModal()
const slots = useSlots()
const hasFooterSlot = computed(() => Boolean(slots.footer))

// 获取 a-modal 的参数（自动提取）
// 使用 toRaw 避免响应式循环
const modalProps = computed<ModalProps>(() => {
  const modalPropsFromArgs = modal.getModalProps()
  const footerFromArgs = modalPropsFromArgs.footer
  let footer: ModalProps['footer']

  if (footerFromArgs !== undefined) {
    footer = footerFromArgs
  } else if (hasFooterSlot.value) {
    footer = undefined
  } else if (props.showOk || props.showCancel) {
    footer = undefined
  } else {
    footer = null
  }

  return {
    title: '提示',
    width: 520,
    okText: props.okText,
    cancelText: props.cancelText,
    confirmLoading: props.confirmLoading,
    ...modalPropsFromArgs, // 从 args 中获取的参数会覆盖默认值
    footer
  }
})

// 处理确认
const handleOk = () => {
  emit('ok')
  // 由外部决定是否关闭（MxFormModal 会处理）
}

// 处理取消
const handleCancel = () => {
  emit('cancel')
  // 取消时总是关闭
  modal.hide()
}
</script>

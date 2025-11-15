<!--
 * @Author: liaokt
 * @Description: 封装的表单 Modal 组件，基于 MxModal 系统
 * @Date: 2025-11-13 12:00:00
 * @LastEditors: liaokt
 * @LastEditTime: 2025-11-13 16:03:17
-->
<template>
  <MxModal :modal="modal" @ok="handleOk" @cancel="handleCancel">
    <a-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :layout="layout"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <slot :form-data="formData" />
    </a-form>
  </MxModal>
</template>

<script setup lang="ts">
import { reactive, ref, watch, nextTick, toRaw, watchEffect } from 'vue'
import { useModal, type UseModalReturn } from './useModal'
import MxModal from './MxModal.vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'

defineOptions({
  name: 'MxFormModal'
})

interface Props {
  /** Modal 实例（从 modalRegistry 传递） */
  modal?: UseModalReturn
  /** 表单验证规则 */
  rules?: Record<string, Rule[]>
  /** 表单布局 */
  layout?: 'horizontal' | 'vertical' | 'inline'
  /** label 宽度 */
  labelCol?: { span: number; offset?: number }
  /** 输入框宽度 */
  wrapperCol?: { span: number; offset?: number }
  /** 是否在关闭时重置表单 */
  resetOnClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modal: undefined,
  rules: () => ({}),
  layout: 'vertical',
  labelCol: undefined,
  wrapperCol: undefined,
  resetOnClose: true
})

const emit = defineEmits<{
  ok: [values: Record<string, any>]
  cancel: []
}>()

// 如果传递了 modal prop，使用它；否则创建新的实例
const modal = props.modal || useModal()
const formRef = ref<FormInstance>()

// 获取业务数据作为表单初始值
const formData = reactive<Record<string, any>>({})

const extractFormData = () => {
  const args = toRaw(modal.args.value)
  if (args.data && typeof args.data === 'object') {
    return toRaw(args.data) as Record<string, any>
  }
  return toRaw(modal.getFormData())
}

const assignFormData = (source: Record<string, any>) => {
  const keys = Object.keys(formData)
  keys.forEach(key => {
    if (!(key in source)) {
      delete formData[key]
    }
  })
  Object.assign(formData, source)
}

const previousVisible = ref(false)

watchEffect(() => {
  const visible = modal.visible.value

  if (visible) {
    assignFormData(extractFormData())
    nextTick(() => {
      formRef.value?.clearValidate()
    })
  } else if (previousVisible.value && props.resetOnClose) {
    assignFormData({})
    nextTick(() => {
      formRef.value?.resetFields()
      formRef.value?.clearValidate()
    })
  }

  previousVisible.value = visible
})

// 处理确认
const handleOk = async () => {
  if (!formRef.value) {
    modal.hide()
    return
  }

  try {
    // 验证表单
    await formRef.value.validate()

    // 触发 ok 事件，传递表单数据
    emit('ok', { ...formData })
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 处理取消
const handleCancel = () => {
  emit('cancel')
  modal.hide()
}

// 暴露表单实例和方法
defineExpose({
  formRef,
  formData,
  validate: () => formRef.value?.validate(),
  resetFields: () => formRef.value?.resetFields(),
  clearValidate: () => formRef.value?.clearValidate(),
  getFieldsValue: () => formRef.value?.getFieldsValue()
})
</script>

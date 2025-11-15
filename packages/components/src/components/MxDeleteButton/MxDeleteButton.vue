<template>
  <!-- 气泡确认框模式 -->
  <a-popconfirm
    v-if="confirm && confirmType === 'popconfirm'"
    :title="confirm"
    :ok-text="okText"
    :cancel-text="cancelText"
    :ok-button-props="{ loading: loading }"
    @confirm="handleConfirm"
  >
    <template #icon>
      <slot name="popconfirmIcon">
        <ExclamationCircleOutlined style="color: #ff4d4f" />
      </slot>
    </template>
    <mx-button
      :type="type"
      :size="size"
      :disabled="disabled || loading"
      :loading="loading"
      :danger="true"
      :custom-class="customClass"
      :permission="permission"
    >
      <template v-if="!hideIcon && !loading" #icon>
        <DeleteOutlined />
      </template>
      <slot>删除</slot>
    </mx-button>
  </a-popconfirm>

  <!-- 模态框模式或无确认 -->
  <mx-button
    v-else
    :type="type"
    :size="size"
    :disabled="disabled || loading"
    :loading="loading"
    :danger="true"
    :custom-class="customClass"
    :permission="permission"
    @click="handleClick"
  >
    <template v-if="!hideIcon && !loading" #icon>
      <DeleteOutlined />
    </template>
    <slot>删除</slot>
  </mx-button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Modal } from 'ant-design-vue'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import MxButton from '../MxButton/MxButton.vue'
import type { MxDeleteButtonProps } from './deleteButtonTypes'

/**
 * 删除按钮组件
 * 专用于删除操作，自动添加删除图标和危险样式
 * 支持权限控制、加载状态、确认对话框
 *
 * @example
 * <mx-delete-button @delete="handleDelete" confirm="确定要删除吗？" />
 *
 * @example
 * <mx-delete-button @delete="handleDelete" confirm-type="popconfirm" />
 *
 * @example
 * <mx-delete-button permission="delete" @delete="handleDelete" />
 */
defineOptions({
  name: 'MxDeleteButton'
})

const emit = defineEmits<{
  delete: []
}>()

interface Props extends MxDeleteButtonProps {}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'middle',
  disabled: false,
  loading: false,
  customClass: '',
  confirm: '确定要删除吗？',
  confirmType: 'modal',
  confirmTitle: '确认删除',
  okText: '确定',
  cancelText: '取消',
  hideIcon: false
})

// Modal 实例引用
const modalInstance = ref<{ update: (config: any) => void } | null>(null)

// 监听 loading 状态变化，更新 Modal 确认按钮的 loading 状态
watch(
  () => props.loading,
  newLoading => {
    if (modalInstance.value && typeof modalInstance.value.update === 'function') {
      modalInstance.value.update({
        okButtonProps: {
          loading: newLoading
        }
      })
    }
  }
)

/** 等待 loading 完成的 Promise */
const waitLoadingComplete = (): Promise<void> => {
  return new Promise(resolve => {
    let hasControlledLoading = false

    const stopWatcher = watch(
      () => props.loading,
      newLoading => {
        if (newLoading) {
          hasControlledLoading = true
        } else if (hasControlledLoading) {
          stopWatcher()
          resolve()
        }
      },
      { immediate: true }
    )

    // 如果外部没有控制 loading（始终为 false），在微任务中自动 resolve
    if (!props.loading) {
      queueMicrotask(() => {
        if (!hasControlledLoading) {
          stopWatcher()
          resolve()
        }
      })
    }
  })
}

/** 处理点击（Modal 模式或无确认） */
const handleClick = () => {
  if (!props.confirm) {
    // 没有确认提示，直接触发删除
    emit('delete')
    return
  }

  // Modal 确认框
  modalInstance.value = Modal.confirm({
    title: props.confirmTitle,
    content: props.confirm,
    okText: props.okText,
    cancelText: props.cancelText,
    okButtonProps: {
      loading: props.loading
    },
    onOk: () => {
      // 触发删除事件
      emit('delete')
      // 等待 loading 完成后再关闭对话框
      return waitLoadingComplete()
    },
    afterClose: () => {
      modalInstance.value = null
    }
  })
}

/** 处理确认（Popconfirm 模式） */
const handleConfirm = () => {
  // 触发删除事件
  emit('delete')
  // 等待 loading 完成后再关闭气泡框
  return waitLoadingComplete()
}
</script>

<style scoped lang="scss"></style>

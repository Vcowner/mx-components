<template>
  <!-- 删除类型的批量操作 -->
  <mx-delete-button
    v-if="props.actionType === 'delete'"
    :type="props.type || 'default'"
    :permission="props.permission"
    :loading="props.loading || false"
    :disabled="isDisabled"
    :confirm="computedConfirm"
    :confirm-type="props.confirmType"
    :confirm-title="props.confirmTitle"
    :ok-text="props.okText"
    :cancel-text="props.cancelText"
    :hide-icon="props.hideIcon || !!props.iconType"
    @delete="handleDelete"
  >
    <slot :selected-items="props.selectedItems">
      {{ renderLabel() }}
    </slot>
  </mx-delete-button>

  <!-- 普通类型的批量操作 -->
  <mx-button
    v-else
    :type="props.type || 'default'"
    :icon-type="props.iconType"
    :permission="props.permission"
    :debounce="props.debounce || 0"
    :loading="props.loading || false"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <template #icon>
      <slot name="icon" :selected-items="props.selectedItems" />
    </template>
    <slot :selected-items="props.selectedItems">
      {{ renderLabel() }}
    </slot>
  </mx-button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MxButton from '../MxButton/MxButton.vue'
import MxDeleteButton from '../MxDeleteButton/MxDeleteButton.vue'
import type { IconType } from '../MxButton/buttonTypes'
import type { MxDeleteButtonProps } from '../MxDeleteButton/deleteButtonTypes'

defineOptions({ name: 'MxBatchAction' })

export type BatchActionProps = {
  /** 选中的项数组 */
  selectedItems: any[]
  /** 按钮文案，支持函数形式接收 selectedItems */
  label: string | ((selectedItems: any[]) => string)
  /** 操作类型：default（普通操作）或 delete（删除操作） */
  actionType?: 'default' | 'delete'
  /** 图标类型（仅普通操作有效） */
  iconType?: IconType
  /** 按钮类型 */
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text'
  /** 权限控制 */
  permission?: string | string[]
  /** 防抖延迟时间（毫秒），仅对普通操作有效 */
  debounce?: number
  /** 加载状态 */
  loading?: boolean
  /** 是否在无选择时禁用（默认 true） */
  disabledWhenEmpty?: boolean
} & Pick<
  MxDeleteButtonProps,
  'confirm' | 'confirmType' | 'confirmTitle' | 'okText' | 'cancelText' | 'hideIcon'
>

interface Props extends BatchActionProps {}

const props = withDefaults(defineProps<Props>(), {
  selectedItems: () => [],
  label: '批量操作',
  actionType: 'default',
  iconType: undefined,
  type: 'default',
  debounce: 0,
  loading: false,
  disabledWhenEmpty: true,
  confirm: undefined,
  confirmType: 'modal',
  confirmTitle: '确认删除',
  okText: '确定',
  cancelText: '取消',
  hideIcon: false
})

const emit = defineEmits<{ click: [selectedItems: any[]] }>()

const isDisabled = computed(() => {
  if (props.disabledWhenEmpty && props.selectedItems.length === 0) {
    return true
  }
  return false
})

// 计算确认文案：如果未提供，使用默认的批量删除确认文案
const computedConfirm = computed(() => {
  if (props.confirm !== undefined) {
    return props.confirm
  }
  // 默认的批量删除确认文案
  return '确定要删除选中的项吗？'
})

function renderLabel() {
  if (typeof props.label === 'function') {
    return props.label(props.selectedItems)
  }
  return props.label
}

function handleClick(event?: MouseEvent) {
  // 阻止事件继续冒泡，避免重复触发
  if (event) {
    event.stopPropagation()
  }

  // 只 emit 事件，不使用 onClick prop（避免与 @click 重复触发）
  // 如果需要回调，请使用 @click 事件监听器
  emit('click', props.selectedItems)
}

function handleDelete() {
  // 删除按钮确认后触发，同样传递 selectedItems
  emit('click', props.selectedItems)
}
</script>

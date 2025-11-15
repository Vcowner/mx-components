<template>
  <div ref="containerRef" class="mx-table-action" :style="containerStyle">
    <template v-for="action in visibleActions" :key="action.key || action.label">
      <span>
        <slot :name="action.slot || 'default'" :action="action">
          <!-- 渲染按钮组件 -->
          <component
            :is="getActionComponent(action)"
            v-bind="getActionProps(action)"
            v-on="getActionEvents(action)"
          >
            <template v-if="action.icon && !isCustomComponent(action)" #icon>
              <component :is="action.icon" />
            </template>
            {{ action.label }}
          </component>
        </slot>
      </span>
    </template>

    <!-- 更多操作下拉菜单 -->
    <a-dropdown v-if="overflowActions.length > 0" :trigger="['hover', 'click']">
      <mx-button type="link" :size="size">
        <template #icon>
          <MoreOutlined />
        </template>
      </mx-button>
      <template #overlay>
        <a-menu>
          <a-menu-item
            v-for="action in overflowActions"
            :key="action.key || action.label"
            :disabled="action.disabled"
            :danger="action.actionType === 'delete'"
            @click="handleClick(action)"
          >
            <template #icon>
              <component :is="action.icon" v-if="action.icon" />
              <!-- 删除操作自动使用 DeleteOutlined 图标（如果没有指定 icon） -->
              <DeleteOutlined v-else-if="action.actionType === 'delete'" />
            </template>
            <slot :name="action.slot || 'default'" :action="action">
              {{ action.label }}
            </slot>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <!-- 测量容器：用于计算每个按钮和更多按钮的宽度，不参与显示 -->
    <div ref="measureRef" class="mx-table-action-measure" :style="{ gap: `${props.spacing}px` }">
      <template v-for="action in props.actions" :key="action.key || action.label">
        <span class="mx-table-action-measure-item">
          <!-- 测量容器：使用相同的组件和属性确保宽度一致 -->
          <component :is="getActionComponent(action)" v-bind="getActionProps(action)">
            <template v-if="action.icon && !isCustomComponent(action)" #icon>
              <component :is="action.icon" />
            </template>
            {{ action.label }}
          </component>
        </span>
      </template>
      <span ref="moreTriggerRef" class="mx-table-action-measure-item">
        <mx-button type="link" :size="size">
          <template #icon>
            <MoreOutlined />
          </template>
        </mx-button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, nextTick, watch, inject } from 'vue'
import { Modal } from 'ant-design-vue'
import MoreOutlined from '@ant-design/icons-vue/MoreOutlined'
import DeleteOutlined from '@ant-design/icons-vue/DeleteOutlined'
import MxButton from '../MxButton/MxButton.vue'
import MxDeleteButton from '../MxDeleteButton/MxDeleteButton.vue'
import type { MxDeleteButtonProps } from '../MxDeleteButton/deleteButtonTypes'
import { useTableActionRefs } from './useTableActionRefs'
import { calculateVisibleCount, useDebouncedCalculate } from './useTableActionMeasure'
import { ref } from 'vue'

defineOptions({
  name: 'MxTableAction'
})

export interface TableActionItem {
  label?: string
  key?: string
  disabled?: boolean
  slot?: string
  onClick?: (action: TableActionItem) => void
  permission?: string | string[]
  icon?: any
  /**
   * 操作类型：
   * - 'delete': 删除操作，会使用 MxDeleteButton
   * - 'custom': 自定义组件，需要配合 component 使用
   * 未来可以扩展更多类型，如 'export', 'print' 等
   */
  actionType?: 'delete' | 'custom'
  /**
   * 自定义组件（当 actionType === 'custom' 时使用）
   * 例如：component: MyCustomButton
   */
  component?: any
  /**
   * 传递给自定义组件的属性（当 actionType === 'custom' 时使用）
   */
  componentProps?: Record<string, any>
  /** 删除按钮的配置（仅当 actionType === 'delete' 时有效） */
  deleteProps?: Partial<MxDeleteButtonProps>
  [key: string]: any
}

interface Props {
  /** 操作项列表 */
  actions: TableActionItem[]
  /** 间距 */
  spacing?: number
  /** 按钮尺寸 */
  size?: 'large' | 'middle' | 'small'
  /** 最多显示多少个按钮（超过的会放入下拉菜单） */
  maxCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  spacing: 8,
  size: 'small',
  maxCount: 3
})

const emit = defineEmits<{
  click: [action: TableActionItem]
}>()

// 使用 refs 管理 Hook
const { containerRef, measureRef, moreTriggerRef } = useTableActionRefs()

// 注入权限检查函数
const checkPermission = inject<(permission: string | string[]) => boolean>(
  'checkPermission',
  () => true
)

/** 检查权限 */
const hasPermission = (action: TableActionItem) => {
  if (!action.permission) return true
  return checkPermission(action.permission)
}

/** 过滤有权限的操作 */
const filteredActions = computed(() => {
  return props.actions.filter(action => hasPermission(action))
})

/** 可见操作项数量 */
const visibleCount = ref(0)

/** 可见操作项 */
const visibleActions = computed(() => {
  return filteredActions.value.slice(0, visibleCount.value)
})

/** 溢出操作项 */
const overflowActions = computed(() => {
  return filteredActions.value.slice(visibleCount.value)
})

/** 组件映射：管理已知的按钮类型 */
const actionComponentMap = {
  delete: MxDeleteButton,
  default: MxButton
} as const

/** 判断是否为自定义组件 */
function isCustomComponent(action: TableActionItem) {
  return action.actionType === 'custom' && action.component
}

/** 获取操作按钮组件 */
function getActionComponent(action: TableActionItem) {
  // 自定义组件
  if (isCustomComponent(action)) {
    return action.component
  }
  // 已知类型（如 delete）
  if (
    action.actionType &&
    actionComponentMap[action.actionType as keyof typeof actionComponentMap]
  ) {
    return actionComponentMap[action.actionType as keyof typeof actionComponentMap]
  }
  // 默认使用 MxButton
  return actionComponentMap.default
}

/** 获取操作按钮属性 */
function getActionProps(action: TableActionItem) {
  // 从 action 中提取需要的属性，其余属性放入 rest
  const {
    label,
    key,
    onClick,
    permission,
    icon,
    slot,
    actionType,
    component,
    componentProps,
    deleteProps,
    ...rest
  } = action
  // 这些变量是故意未使用的，用于从 rest 中分离出来
  void label
  void key
  void onClick
  void permission
  void icon
  void slot
  void actionType
  void component

  // 自定义组件：合并 componentProps
  if (isCustomComponent(action)) {
    return {
      disabled: action.disabled,
      ...componentProps,
      ...rest
    }
  }

  // 删除按钮：使用 deleteProps
  if (action.actionType === 'delete') {
    return {
      type: 'link' as const,
      size: props.size,
      disabled: action.disabled,
      // 所有配置都从 deleteProps 传入，如果没有则使用 MxDeleteButton 的默认值
      ...deleteProps,
      ...rest
    }
  }

  // 默认按钮
  return {
    type: 'link' as const,
    size: props.size,
    disabled: action.disabled,
    ...rest
  }
}

/** 获取操作按钮事件 */
function getActionEvents(action: TableActionItem) {
  // 删除按钮使用 @delete 事件
  if (action.actionType === 'delete') {
    return {
      delete: () => handleClick(action)
    }
  }
  // 自定义组件：如果 componentProps 中有事件，需要合并
  if (isCustomComponent(action) && action.componentProps) {
    const events: Record<string, any> = {
      click: () => handleClick(action)
    }
    // 合并 componentProps 中的事件（如 @customEvent）
    Object.keys(action.componentProps).forEach(key => {
      if (key.startsWith('on') || key.startsWith('@')) {
        events[key] = action.componentProps![key]
      }
    })
    return events
  }
  // 默认使用 @click 事件
  return {
    click: () => handleClick(action)
  }
}

/** 处理点击 */
function handleClick(action: TableActionItem) {
  // 如果是删除操作且在下拉菜单中，需要特殊处理确认对话框
  const isInOverflowMenu = !visibleActions.value.some(
    visibleAction => visibleAction.key === action.key || visibleAction.label === action.label
  )

  if (action.actionType === 'delete' && isInOverflowMenu) {
    // 在下拉菜单中，使用 MxDeleteButton 的逻辑处理确认对话框
    handleDeleteInMenu(action)
    return
  }

  // 如果配置了 onClick，直接调用
  if (action.onClick) {
    action.onClick(action)
  }
  // 触发事件让外部也可以监听
  emit('click', action)
}

/** 处理下拉菜单中的删除操作 - 使用 MxDeleteButton 的逻辑 */
function handleDeleteInMenu(action: TableActionItem) {
  const deleteProps = (action.deleteProps || {}) as Partial<MxDeleteButtonProps>
  const confirm = deleteProps.confirm
  const confirmTitle = deleteProps.confirmTitle
  const okText = deleteProps.okText
  const cancelText = deleteProps.cancelText

  // 如果没有配置 confirm，直接执行删除
  if (!confirm) {
    if (action.onClick) {
      action.onClick(action)
    }
    emit('click', action)
    return
  }

  // 使用 Modal.confirm（下拉菜单中 Popconfirm 无法使用，统一使用 Modal）
  Modal.confirm({
    title: confirmTitle || '确认删除',
    content: confirm,
    okText: okText || '确定',
    cancelText: cancelText || '取消',
    onOk: () => {
      if (action.onClick) {
        action.onClick(action)
      }
      emit('click', action)
    }
  })
}

/** 容器样式 */
const containerStyle = computed(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: `${props.spacing}px`,
    flexWrap: 'nowrap' as const
  }
})

// 创建防抖函数
let debouncedCalculate: ReturnType<typeof useDebouncedCalculate> | null = null

/** 计算可见数量 */
const calculateVisible = () => {
  visibleCount.value = calculateVisibleCount({
    container: containerRef,
    measureRef,
    moreTriggerRef,
    gap: props.spacing,
    actionsLength: filteredActions.value.length
  })
}

// 使用防抖计算
debouncedCalculate = useDebouncedCalculate(calculateVisible, 150)

// 使用 ResizeObserver Hook
let resizeObserver: ResizeObserver | null = null

const startObserving = async () => {
  await nextTick()
  calculateVisible()

  if (!containerRef.value) return

  resizeObserver = new ResizeObserver(() => {
    debouncedCalculate?.()
  })
  resizeObserver.observe(containerRef.value)
}

const stopObserving = () => {
  if (resizeObserver && containerRef.value) {
    resizeObserver.unobserve(containerRef.value)
  }
  resizeObserver = null
  debouncedCalculate?.cancel()
}

onMounted(async () => {
  // 立即初始化计算
  calculateVisible()
  await nextTick()
  startObserving()
})

onUnmounted(() => {
  stopObserving()
})

watch(
  () => [filteredActions, props.spacing, props.size],
  async () => {
    await nextTick()
    debouncedCalculate?.(true) // 依赖变化时立即计算
  },
  { deep: true }
)
</script>

<style scoped lang="scss">
.mx-table-action {
  display: flex;
  align-items: center;
  white-space: nowrap;

  :deep(.ant-btn-link) {
    padding: 0;
    height: auto;
  }
}

/* 隐藏测量容器，但保留布局用于正确测量宽度 */
.mx-table-action-measure {
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  height: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.mx-table-action-measure-item {
  display: inline-flex;
}
</style>

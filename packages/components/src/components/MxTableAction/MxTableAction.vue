<template>
  <div ref="containerRef" class="mx-table-action" :style="containerStyle">
    <template v-for="action in visibleActions" :key="action.key || action.label">
      <span>
        <slot :name="action.slot || 'default'" :action="action">
          <mx-button 
            type="link" 
            :size="size"
            v-bind="getButtonProps(action)"
            @click="handleClick(action)"
          >
            <template #icon v-if="action.icon">
              <component :is="action.icon" />
            </template>
            {{ action.label }}
          </mx-button>
        </slot>
      </span>
    </template>
    
    <!-- 更多操作下拉菜单 -->
    <a-dropdown 
      v-if="overflowActions.length > 0"
      :trigger="['hover', 'click']"
    >
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
          @click="handleClick(action)"
        >
            <template #icon v-if="action.icon">
            <component :is="action.icon" />
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
      <template v-for="(action, index) in props.actions" :key="action.key || `m-${index}`">
        <span class="mx-table-action-measure-item">
          <mx-button type="link" :size="size">{{ action.label }}</mx-button>
        </span>
      </template>
      <span class="mx-table-action-measure-item" ref="moreTriggerRef">
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
import MoreOutlined from '@ant-design/icons-vue/MoreOutlined'
import MxButton from '../MxButton/MxButton.vue'
import { useTableActionRefs } from './useTableActionRefs'
import { calculateVisibleCount, useDebouncedCalculate } from './useTableActionMeasure'
import { ref } from 'vue'

defineOptions({
  name: 'MxTableAction'
})
 
export interface TableActionItem {
  label: string
  key?: string
  disabled?: boolean
  slot?: string
  onClick?: (action: TableActionItem) => void
  permission?: string | string[]
  icon?: any
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
const checkPermission = inject<(permission: string | string[]) => boolean>('checkPermission', () => true)

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

/** 获取按钮属性 */
function getButtonProps(action: TableActionItem) {
  const { label, key, onClick, permission, icon, slot, ...rest } = action
  return {
    disabled: action.disabled,
    ...rest
  }
}

/** 处理点击 */
function handleClick(action: TableActionItem) {
  // 如果配置了 onClick，直接调用
  if (action.onClick) {
    action.onClick(action)
  }
  // 触发事件让外部也可以监听
  emit('click', action)
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

watch(() => [filteredActions, props.spacing, props.size], async () => {
  await nextTick()
  debouncedCalculate?.(true) // 依赖变化时立即计算
}, { deep: true })

</script>

<style scoped lang="less">
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


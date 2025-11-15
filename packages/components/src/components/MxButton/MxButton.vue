<template>
  <a-button
    v-if="hasPermission"
    v-bind="buttonProps"
    :class="props.customClass"
    @click="handleClick"
  >
    <template #icon>
      <slot name="icon">
        <!-- 调试信息 -->
        <template v-if="false">{{ props.iconType }}{{ showIcon }}</template>
        <EditOutlined v-if="props.iconType === 'edit' && showIcon" />
        <EyeOutlined v-else-if="props.iconType === 'view' && showIcon" />
        <CopyOutlined v-else-if="props.iconType === 'copy' && showIcon" />
        <PlusOutlined v-else-if="props.iconType === 'add' && showIcon" />
        <ReloadOutlined v-else-if="props.iconType === 'refresh' && showIcon" />
        <SaveOutlined v-else-if="props.iconType === 'save' && showIcon" />
        <CloseOutlined v-else-if="props.iconType === 'cancel' && showIcon" />
        <PrinterOutlined v-else-if="props.iconType === 'print' && showIcon" />
        <DownloadOutlined v-else-if="props.iconType === 'export' && showIcon" />
      </slot>
    </template>
    <slot>
      {{ displayText }}
    </slot>
  </a-button>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted } from 'vue'
import debounceFn from 'lodash/debounce'
import {
  EditOutlined,
  EyeOutlined,
  CopyOutlined,
  PlusOutlined,
  ReloadOutlined,
  SaveOutlined,
  CloseOutlined,
  PrinterOutlined,
  DownloadOutlined
} from '@ant-design/icons-vue'
import type { MxButtonProps, MxButtonEmits, IconType } from './buttonTypes'

/**
 * MxButton 按钮组件
 * 基于 Ant Design Vue Button 的二次封装
 * 完全兼容 ant-design-vue Button 组件的所有属性和事件
 * 支持权限控制、预设图标、防抖等
 *
 * 使用 Provide/Inject 注入权限检查函数
 * 在应用入口配置：
 * ```ts
 * const checkPermission = (permission: string | string[]) => boolean
 * app.provide('checkPermission', checkPermission)
 * ```
 *
 * @example
 * ```vue
 * <!-- 基础用法 -->
 * <mx-button @click="handleClick">按钮</mx-button>
 *
 * <!-- 预设图标 -->
 * <mx-button icon-type="edit" @click="handleEdit">编辑</mx-button>
 *
 * <!-- 防抖 -->
 * <mx-button icon-type="copy" :debounce="300" @click="handleCopy">复制</mx-button>
 * ```
 */
defineOptions({
  name: 'MxButton'
})

interface Props {
  // ButtonProps 基础属性
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text'
  size?: 'large' | 'middle' | 'small'
  loading?: boolean | { delay: number }
  disabled?: boolean
  block?: boolean
  danger?: boolean
  ghost?: boolean
  shape?: 'default' | 'circle' | 'round'
  htmlType?: 'button' | 'submit' | 'reset'
  icon?: any
  href?: string
  target?: string
  // 自定义属性
  customClass?: string
  permission?: string | string[]
  iconType?: IconType
  hideIcon?: boolean
  debounce?: number
  defaultText?: string
  loadingText?: string
  // 允许其他 ButtonProps 属性
  [key: string]: any
}

// Props 定义
const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'middle',
  loading: false,
  disabled: false,
  block: false,
  danger: false,
  ghost: false,
  shape: 'default',
  htmlType: 'button',
  icon: undefined,
  href: undefined,
  target: undefined,
  customClass: '',
  permission: undefined,
  iconType: undefined,
  hideIcon: false,
  debounce: 0,
  defaultText: undefined,
  loadingText: undefined
})

// 事件定义
const emit = defineEmits<MxButtonEmits>()

// 注入权限检查函数（可选）
const checkPermission = inject<(permission: string | string[]) => boolean>(
  'checkPermission',
  () => true
)

/** 默认文案映射 */
const defaultTextMap: Record<IconType, string> = {
  edit: '编辑',
  view: '查看',
  copy: '复制',
  add: '新增',
  refresh: '刷新',
  save: '保存',
  cancel: '取消',
  print: '打印',
  export: '导出'
}

/** 显示文本 */
const displayText = computed(() => {
  if (props.loading && props.loadingText) {
    return props.loadingText
  }
  if (props.defaultText !== undefined) {
    return props.defaultText
  }
  if (props.iconType && defaultTextMap[props.iconType]) {
    return defaultTextMap[props.iconType]
  }
  return undefined
})

/** 检查是否有权限 */
const hasPermission = computed(() => {
  // 如果没有传入权限，默认显示
  if (!props.permission) return true

  // 使用注入的权限检查函数
  return checkPermission(props.permission)
})

/** 是否在加载状态 */
const isLoading = computed(() => {
  if (typeof props.loading === 'boolean') {
    return props.loading
  }
  if (typeof props.loading === 'object' && props.loading !== null) {
    return true
  }
  return false
})

/** 是否显示图标 */
const showIcon = computed(() => {
  const result = !props.hideIcon && !isLoading.value && !!props.iconType

  return result
})

/** 按钮属性（排除自定义属性） */
const buttonProps = computed(() => {
  const rest = { ...props } as Record<string, any>
  delete rest.customClass
  delete rest.permission
  delete rest.iconType
  delete rest.hideIcon
  delete rest.debounce
  delete rest.defaultText
  delete rest.loadingText
  return rest
})

/** 防抖函数 */
const debouncedClick = computed(() => {
  if (props.debounce > 0) {
    return debounceFn((event: MouseEvent) => {
      emit('click', event)
    }, props.debounce)
  }
  return (event: MouseEvent) => emit('click', event)
})

/** 处理点击 */
const handleClick = (event: MouseEvent) => {
  debouncedClick.value(event)
}

onUnmounted(() => {
  // 取消防抖
  const debouncedFn = debouncedClick.value as any
  if (debouncedFn && typeof debouncedFn.cancel === 'function') {
    debouncedFn.cancel()
  }
})

// 导出类型供 IDE 识别
export type { MxButtonProps, MxButtonEmits }

// 扩展类型，包含 permission
export type MxButtonPropsWithPermission = MxButtonProps & {
  permission?: string | string[]
}
</script>

<style scoped lang="scss">
// 可在此添加自定义样式
</style>

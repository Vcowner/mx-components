<template>
  <mx-button
    :type="type"
    :size="size"
    :disabled="disabled || loading"
    :loading="loading"
    :permission="permission"
    :custom-class="customClass"
    @click="handleReset"
  >
    <template v-if="!hideIcon && !loading" #icon>
      <ReloadOutlined />
    </template>
    <slot>重置</slot>
  </mx-button>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { ReloadOutlined } from '@ant-design/icons-vue'
import debounceFn from 'lodash/debounce'
import MxButton from '../MxButton/MxButton.vue'

/**
 * 重置按钮组件
 * 专用于重置/清空操作，自动添加重置图标
 * 支持权限控制、加载状态、防抖、键盘快捷键
 *
 * @example
 * ```vue
 * <!-- 基础用法 -->
 * <mx-reset-button @reset="handleReset" />
 *
 * <!-- 防抖重置 -->
 * <mx-reset-button :debounce="300" @reset="handleReset" />
 *
 * <!-- 支持快捷键 -->
 * <mx-reset-button :keyboard="true" @reset="handleReset" />
 * ```
 */
defineOptions({
  name: 'MxResetButton'
})

const emit = defineEmits<{
  reset: []
}>()

interface Props {
  /** 按钮类型 */
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link'
  /** 按钮尺寸 */
  size?: 'large' | 'middle' | 'small'
  /** 是否禁用 */
  disabled?: boolean
  /** 加载状态 */
  loading?: boolean
  /** 自定义类名 */
  customClass?: string
  /** 需要的权限，传入权限字符串或数组，有权限则显示按钮 */
  permission?: string | string[]
  /** 防抖延迟时间（毫秒），0 则不防抖 */
  debounce?: number
  /** 是否支持快捷键触发（Ctrl/Cmd + R） */
  keyboard?: boolean
  /** 是否隐藏图标 */
  hideIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'middle',
  disabled: false,
  loading: false,
  customClass: '',
  permission: undefined,
  debounce: 200, // 重置按钮默认不防抖
  keyboard: false,
  hideIcon: false
})

/** 防抖函数 */
const debouncedReset = computed(() => {
  if (props.debounce > 0) {
    return debounceFn(() => {
      emit('reset')
    }, props.debounce)
  } else {
    return () => emit('reset')
  }
})

/** 处理重置点击 */
const handleReset = () => {
  debouncedReset.value()
}

/** 处理键盘快捷键 */
const handleKeyDown = (event: KeyboardEvent) => {
  if (props.keyboard && (event.ctrlKey || event.metaKey) && event.key === 'r') {
    event.preventDefault()
    if (!props.disabled && !props.loading) {
      handleReset()
    }
  }
}

// 键盘事件监听
onMounted(() => {
  if (props.keyboard) {
    document.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  if (props.keyboard) {
    document.removeEventListener('keydown', handleKeyDown)
  }
  // 取消防抖
  const debouncedFn = debouncedReset.value as any
  if (debouncedFn && typeof debouncedFn.cancel === 'function') {
    debouncedFn.cancel()
  }
})

export type { Props as MxResetButtonProps }
</script>

<style scoped lang="scss"></style>

<template>
  <mx-button
    :type="type"
    :size="size"
    :disabled="disabled || loading"
    :loading="loading"
    :permission="permission"
    :custom-class="customClass"
    @click="handleSearch"
  >
    <template v-if="!hideIcon && !loading" #icon>
      <SearchOutlined />
    </template>
    <slot>搜索</slot>
  </mx-button>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import debounceFn from 'lodash/debounce'
import MxButton from '../MxButton/MxButton.vue'

/**
 * 搜索按钮组件
 * 专用于搜索操作，自动添加搜索图标
 * 支持权限控制、加载状态、防抖、键盘快捷键
 *
 * @example
 * ```vue
 * <!-- 基础用法 -->
 * <mx-search-button @search="handleSearch" />
 *
 * <!-- 防抖搜索 -->
 * <mx-search-button :debounce="300" @search="handleSearch" />
 *
 * <!-- 支持回车键 -->
 * <mx-search-button :enterSubmit="true" @search="handleSearch" />
 * ```
 */
defineOptions({
  name: 'MxSearchButton'
})

const emit = defineEmits<{
  search: []
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
  /** 是否支持回车键触发搜索 */
  enterSubmit?: boolean
  /** 是否隐藏图标 */
  hideIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'middle',
  disabled: false,
  loading: false,
  customClass: '',
  permission: undefined,
  debounce: 200,
  enterSubmit: false,
  hideIcon: false
})

/** 防抖函数 */
const debouncedSearch = computed(() => {
  if (props.debounce > 0) {
    return debounceFn(() => {
      emit('search')
    }, props.debounce)
  } else {
    return () => emit('search')
  }
})

/** 处理搜索点击 */
const handleSearch = () => {
  debouncedSearch.value()
}

/** 处理回车键 */
const handleKeyDown = (event: KeyboardEvent) => {
  if (props.enterSubmit && event.key === 'Enter' && !props.disabled && !props.loading) {
    event.preventDefault()
    handleSearch()
  }
}

// 键盘事件监听
onMounted(() => {
  if (props.enterSubmit) {
    document.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  if (props.enterSubmit) {
    document.removeEventListener('keydown', handleKeyDown)
  }
  // 取消防抖
  const debouncedFn = debouncedSearch.value as any
  if (debouncedFn && typeof debouncedFn.cancel === 'function') {
    debouncedFn.cancel()
  }
})
</script>

<style scoped lang="scss"></style>

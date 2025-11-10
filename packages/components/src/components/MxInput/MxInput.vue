<template>
  <a-input
    v-bind="props"
    @blur="handleBlur"
    @press-enter="handlePressEnter"
  />
</template>

<script setup lang="ts">
import type { MxInputProps, MxInputEmits } from './inputTypes'

/**
 * MxInput 输入框组件
 * 基于 Ant Design Vue Input 的二次封装
 * 完全兼容 ant-design-vue Input 组件的所有属性和事件
 * 
 * @example
 * ```vue
 * <mx-input v-model="value" placeholder="请输入" @pressEnter="handleEnter" />
 * ```
 */
defineOptions({
  name: 'MxInput'
})

// Props 定义
const props = withDefaults(defineProps<MxInputProps>(), {
  customClass: ''
})

// 事件定义
const emit = defineEmits<MxInputEmits>()

// 事件处理
const handleBlur = (event: Event) => {
  emit('change', event)
}

const handlePressEnter = (event: KeyboardEvent) => {
  emit('pressEnter', event)
}

// 导出类型供 IDE 识别
export type { MxInputProps, MxInputEmits }
</script>

<style scoped lang="less">
// 可在此添加自定义样式
</style>


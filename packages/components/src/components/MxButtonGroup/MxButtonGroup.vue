<!--
 * @Author: liaokt
 * @Description: 
 * @Date: 2025-11-12 15:06:55
 * @LastEditors: liaokt
 * @LastEditTime: 2025-11-12 15:40:22
-->
<template>
  <div :class="buttonGroupClass" :style="groupStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'MxButtonGroup'
})

interface Props {
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical'
  /** 对齐方式 */
  align?: 'start' | 'center' | 'end'
  /** 是否拉伸到父容器宽度 */
  block?: boolean
  /** 按钮间距（像素） */
  gap?: number
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  align: 'start',
  block: false,
  gap: 8
})

const buttonGroupClass = computed(() => {
  return [
    'mx-button-group',
    `mx-button-group--${props.direction}`,
    `mx-button-group--${props.align}`,
    {
      'mx-button-group--block': props.block
    }
  ]
})

const groupStyle = computed(() => {
  return {
    gap: `${props.gap}px`
  }
})

export type { Props as MxButtonGroupProps }
</script>

<style scoped lang="scss">
.mx-button-group {
  display: flex;

  &--horizontal {
    flex-direction: row;
    align-items: center;
  }

  &--vertical {
    flex-direction: column;
    align-items: stretch;
  }

  &--start {
    justify-content: flex-start;
  }

  &--center {
    justify-content: center;
  }

  &--end {
    justify-content: flex-end;
  }

  &--block {
    width: 100%;

    :deep(.mx-button),
    :deep(button) {
      flex: 1;
    }
  }

  :deep(.mx-button),
  :deep(button) {
    margin: 0 !important;
  }
}
</style>

<template>
  <mx-button
    :type="type"
    :size="size"
    :disabled="disabled || loading"
    :loading="loading"
    :permission="permission"
    :custom-class="customClass"
    @click="handleSubmit"
  >
    <template v-if="!hideIcon && !loading" #icon>
      <CheckOutlined />
    </template>
    <slot>{{ loading && submittingText ? submittingText : defaultText }}</slot>
  </mx-button>
</template>

<script setup lang="ts">
import { onUnmounted, computed } from 'vue'
import { CheckOutlined } from '@ant-design/icons-vue'
import debounceFn from 'lodash/debounce'
import MxButton from '../MxButton/MxButton.vue'

defineOptions({ name: 'MxSubmitButton' })

const emit = defineEmits<{ submit: [] }>()

interface Props {
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link'
  size?: 'large' | 'middle' | 'small'
  disabled?: boolean
  loading?: boolean
  customClass?: string
  permission?: string | string[]
  debounce?: number
  hideIcon?: boolean
  submittingText?: string
  defaultText?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'middle',
  disabled: false,
  loading: false,
  customClass: '',
  permission: undefined,
  debounce: 0,
  hideIcon: false,
  submittingText: '',
  defaultText: '提交'
})

const debouncedSubmit = computed(() => {
  if (props.debounce > 0) {
    return debounceFn(() => {
      emit('submit')
    }, props.debounce)
  }
  return () => emit('submit')
})

const handleSubmit = () => {
  debouncedSubmit.value()
}

onUnmounted(() => {
  const fn = debouncedSubmit.value as any
  if (fn && typeof fn.cancel === 'function') fn.cancel()
})

export type { Props as MxSubmitButtonProps }
</script>

<style scoped lang="scss"></style>

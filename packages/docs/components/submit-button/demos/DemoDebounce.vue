<template>
  <mx-submit-button :debounce="500" @submit="handleSubmit">提交（500ms 防抖）</mx-submit-button>
</template>

<script setup>
import { message } from 'ant-design-vue'

const handleSubmit = () => {
  message.info('提交触发')
}
</script>

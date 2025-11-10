<template>
  <mx-reset-button @reset="handleReset" />
</template>

<script setup>
import { message } from 'ant-design-vue'

const handleReset = () => {
  message.success('重置成功')
}
</script>



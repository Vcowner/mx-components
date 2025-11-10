<template>
  <mx-submit-button @submit="handleSubmit">提交</mx-submit-button>
</template>

<script setup>
import { message } from 'ant-design-vue'

const handleSubmit = () => {
  message.success('提交成功')
}
</script>

<template>
  <div class="demo">
    <mx-input v-model:value="value" placeholder="Basic usage" />
    <p>输入的内容：{{ value }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>

<style scoped>
.demo {
  width: 300px;
}
</style>


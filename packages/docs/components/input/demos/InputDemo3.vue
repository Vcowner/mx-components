<template>
  <div class="demo">
    <mx-input v-model:value="value" placeholder="支持清除" :allow-clear="true" />
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


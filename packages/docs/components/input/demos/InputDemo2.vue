<template>
  <div class="demo-vertical">
    <mx-input v-model:value="value1" size="large" placeholder="large size" />
    <mx-input v-model:value="value2" placeholder="default size" />
    <mx-input v-model:value="value3" size="small" placeholder="small size" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>

<style scoped>
.demo-vertical {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>


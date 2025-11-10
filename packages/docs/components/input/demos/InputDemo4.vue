<template>
  <div class="demo">
    <mx-input-password v-model:value="value" placeholder="input password" />
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


<template>
  <div class="demo">
    <mx-button type="primary" :loading="true">Loading</mx-button>
    <mx-button type="primary" :loading="loading" @click="enterLoading">
      Click me!
    </mx-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)

const enterLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<style scoped>
.demo {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>


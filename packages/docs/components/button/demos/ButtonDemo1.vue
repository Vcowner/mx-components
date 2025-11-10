<template>
  <div class="demo">
    <mx-button type="primary">Primary Button</mx-button>
    <mx-button>Default Button</mx-button>
    <mx-button type="dashed">Dashed Button</mx-button>
    <mx-button type="text">Text Button</mx-button>
    <mx-button type="link">Link Button</mx-button>
    <mx-button type="primary" :danger="true">Danger</mx-button>
    <mx-button type="primary" :loading="loading" @click="enterLoading">
      Click me!
    </mx-button>
    <mx-button type="primary" :disabled="true">Disabled</mx-button>
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


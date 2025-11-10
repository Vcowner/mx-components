<template>
  <div class="demo">
    <mx-button 
      icon-type="save" 
      type="primary" 
      :loading="loading" 
      loading-text="保存中..." 
      @click="handleSave"
    >
      保存
    </mx-button>
    <mx-button 
      icon-type="add" 
      type="primary" 
      :loading="loading2" 
      loading-text="创建中..." 
      @click="handleCreate"
    >
      创建
    </mx-button>
    <mx-button 
      icon-type="refresh" 
      :loading="loading3" 
      loading-text="刷新中..." 
      @click="handleRefresh"
    >
      刷新
    </mx-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const loading = ref(false)
const loading2 = ref(false)
const loading3 = ref(false)

const handleSave = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    message.success('保存成功')
  }, 2000)
}

const handleCreate = () => {
  loading2.value = true
  setTimeout(() => {
    loading2.value = false
    message.success('创建成功')
  }, 2000)
}

const handleRefresh = () => {
  loading3.value = true
  setTimeout(() => {
    loading3.value = false
    message.success('刷新完成')
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


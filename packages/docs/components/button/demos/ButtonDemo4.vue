<template>
  <div class="demo">
    <mx-button type="primary">
      <template #icon>
        <SearchOutlined />
      </template>
      搜索
    </mx-button>
    <mx-button type="primary">
      <template #icon>
        <DownloadOutlined />
      </template>
      下载
    </mx-button>
  </div>
</template>

<script setup>
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.demo {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>


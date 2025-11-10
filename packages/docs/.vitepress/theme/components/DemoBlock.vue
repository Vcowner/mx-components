<template>
  <div class="vp-demo-box">
    <div v-if="description" class="vp-demo-desc">
      {{ description }}
    </div>
    <div class="vp-demo-wrapper">
      <div class="vp-demo-preview">
        <slot name="preview" />
      </div>
      
      <div class="vp-demo-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          :class="['vp-demo-tab', { active: activeTab === tab.name }]"
          @click="activeTab = tab.name"
        >
          {{ tab.label }}
        </button>
      </div>
      
      <div v-show="activeTab === 'code'" class="vp-demo-code">
        <pre><code v-html="codeHtml" /></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  description?: string
  code?: string
}>()

const activeTab = ref('preview')

const tabs = [
  { name: 'preview', label: '预览' },
  { name: 'code', label: '代码' }
]

const codeHtml = props.code || ''
</script>

<style scoped>
/* 样式在 .vitepress/style.css 中定义 */
</style>



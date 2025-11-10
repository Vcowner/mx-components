<template>
  <div class="my-demo">
    <!-- 描述文字 -->
    <div v-if="description" class="my-demo-description">
      {{ description }}
    </div>
    
    <!-- 演示容器 -->
    <div class="my-demo-container">
      <!-- 预览区域 -->
      <div class="my-demo-preview">
        <div class="preview-wrapper">
          <slot name="preview">
            <slot />
          </slot>
        </div>
      </div>
      
      <!-- 工具栏 -->
      <div class="my-demo-toolbar">
        <div class="toolbar-actions">
          <button
            :class="['toolbar-btn', { active: !showCode }]"
            @click="showCode = false"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <span>预览</span>
          </button>
          <button
            :class="['toolbar-btn', { active: showCode }]"
            @click="showCode = true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 2l4 4-4 4M6 2l-4 4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3.333 8h9.334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <span>代码</span>
          </button>
        </div>
      </div>
      
      <!-- 代码显示区域 -->
      <Transition name="slide">
        <div v-if="showCode" class="my-demo-code">
          <div class="code-content">
            <slot name="code" />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  description: {
    type: String,
    default: ''
  }
})

const showCode = ref(false)
</script>

<style scoped>
.my-demo {
  margin: 24px 0;
}

.my-demo-description {
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5715;
}

.my-demo-container {
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  transition: all 0.2s;
}

.my-demo-container:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
}

.my-demo-preview {
  padding: 48px 32px;
  background: #fff;
  min-height: 100px;
}

.preview-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
}

.my-demo-toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px 12px;
  background: #fafafa;
  border-top: 1px solid #d9d9d9;
}

.toolbar-actions {
  display: flex;
  gap: 4px;
}

.toolbar-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  transition: all 0.2s;
  border-radius: 4px;
}

.toolbar-btn:hover {
  color: rgba(0, 0, 0, 0.85);
  background: rgba(0, 0, 0, 0.04);
}

.toolbar-btn.active {
  color: #1890ff;
  background: rgba(24, 144, 255, 0.08);
}

.toolbar-btn svg {
  flex-shrink: 0;
}

.my-demo-code {
  border-top: 1px solid #d9d9d9;
  background: #fafafa;
  overflow: hidden;
}

.code-content {
  padding: 16px;
  background: #fff;
}

/* 过渡动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

/* 深色模式支持 */
html.dark .my-demo-description {
  color: rgba(255, 255, 255, 0.65);
}

html.dark .my-demo-container {
  border-color: #434343;
  background: #1f1f1f;
}

html.dark .my-demo-preview {
  background: #1f1f1f;
}

html.dark .my-demo-toolbar {
  background: #262626;
  border-top-color: #434343;
}

html.dark .toolbar-btn {
  color: rgba(255, 255, 255, 0.45);
}

html.dark .toolbar-btn:hover {
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.08);
}

html.dark .my-demo-code {
  border-top-color: #434343;
}

html.dark .code-content {
  background: #141414;
}

html.dark .my-demo-container:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.36);
}
</style>

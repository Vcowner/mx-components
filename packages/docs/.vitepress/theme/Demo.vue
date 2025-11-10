<template>
  <div class="vp-demo">
    <div class="vp-demo-preview">
      <ClientOnly>
        <component :is="component" />
      </ClientOnly>
    </div>
    <div class="vp-demo-actions">
      <a-button 
        type="text" 
        size="small" 
        @click="showCode = !showCode"
        class="code-toggle"
      >
        {{ showCode ? '隐藏代码' : '显示代码' }}
      </a-button>
    </div>
    <Transition name="slide-fade">
      <div v-show="showCode" class="vp-demo-code">
        <div class="code-header">
          <span>{{ title }}</span>
        </div>
        <div class="code-content">
          <pre><code v-html="highlightedCode"></code></pre>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ClientOnly } from 'vitepress'
import { Prism } from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

const props = defineProps<{
  title?: string
  code?: string
  src?: string
}>()

const showCode = ref(false)

// 尝试加载外部组件
const component = computed(() => {
  if (props.src) {
    // 动态导入组件
    try {
      const module = require(/* @vite-ignore */ props.src)
      return module.default
    } catch {
      return null
    }
  }
  return null
})

const highlightedCode = computed(() => {
  if (!props.code) return ''
  
  try {
    return Prism.highlight(props.code, Prism.languages.markup, 'vue')
  } catch {
    return props.code
  }
})
</script>

<style scoped>
.vp-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  margin: 24px 0;
  overflow: hidden;
}

.vp-demo-preview {
  padding: 24px;
  background: var(--vp-c-bg);
}

.vp-demo-actions {
  display: flex;
  justify-content: center;
  padding: 12px;
  border-top: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
}

.code-toggle {
  font-size: 12px;
}

.vp-demo-code {
  border-top: 1px solid var(--vp-c-border);
}

.code-header {
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  font-size: 12px;
  font-weight: 500;
}

.code-content {
  overflow-x: auto;
}

.code-content pre {
  margin: 0;
  padding: 16px;
  font-size: 13px;
  line-height: 1.6;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>



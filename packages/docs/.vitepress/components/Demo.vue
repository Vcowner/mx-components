<template>
  <component :is="loadedComponent" v-if="loadedComponent" />
  <div v-else style="padding: 20px; text-align: center; border: 1px dashed #d9d9d9; border-radius: 4px;">
    <a-spin size="large" />
    <p style="margin-top: 12px;">加载组件中...</p>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, onMounted, h } from 'vue'

const props = defineProps<{
  src: string
  name?: string
}>()

const loadedComponent = shallowRef()

onMounted(async () => {
  try {
    // 构建正确的导入路径
    // props.src = "./components/ButtonDemo1.vue"
    const cleanSrc = props.src.replace(/^\.\//, '')
    const modulePath = `../../components/${cleanSrc}`
    
    console.log('Loading demo from:', modulePath)
    const module = await import(/* @vite-ignore */ modulePath)
    loadedComponent.value = module.default
  } catch (err) {
    console.error('Failed to load demo component:', err)
    loadedComponent.value = h('div', { 
      style: 'color: red; padding: 20px; border: 1px solid red;' 
    }, `Failed to load: ${props.src}. Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
  }
})
</script>


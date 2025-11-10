import type { Plugin } from 'vite'
import type { MarkdownRenderer } from 'vitepress'

export function containerPlugin(): Plugin {
  return {
    name: 'vitepress-demo-container',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/\.md$/)) return null
      
      // 处理 :::demo 容器
      const demoRegex = /:::demo\s+(.*?)\n```vue\s*\n([\s\S]*?)\n```\s*:::/g
      
      let transformedCode = code
      let match
      
      while ((match = demoRegex.exec(code)) !== null) {
        const description = match[1]
        const vueCode = match[2]
        const fullMatch = match[0]
        
        // 提取 template、script 和 style
        const templateMatch = vueCode.match(/<template>([\s\S]*?)<\/template>/)
        const scriptMatch = vueCode.match(/<script([\s\S]*?)>([\s\S]*?)<\/script>/)
        const styleMatch = vueCode.match(/<style([\s\S]*?)>([\s\S]*?)<\/style>/)
        
        if (templateMatch) {
          const template = templateMatch[1]
          const script = scriptMatch ? scriptMatch[2] : ''
          const style = styleMatch ? styleMatch[2] : ''
          const scriptAttrs = scriptMatch ? scriptMatch[1] : ''
          
          const componentId = `demo-${Math.random().toString(36).substr(2, 9)}`
          
          const demoBlock = `
\`\`\`vue:${componentId}.vue
<template>
${template}
</template>
${scriptMatch ? `<script${scriptAttrs}>${script}</script>` : ''}
${styleMatch ? `<style${styleMatch[1]}>${style}</style>` : ''}
\`\`\`

<script setup>
import { h } from 'vue'
import Component${componentId} from './${componentId}.vue'

const component = Component${componentId}
</script>

:::details 代码示例
${vueCode}
:::
`
          
          transformedCode = transformedCode.replace(fullMatch, demoBlock)
        }
      }
      
      return transformedCode === code ? null : { code: transformedCode }
    }
  }
}


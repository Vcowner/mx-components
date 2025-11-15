# Hooks 概览

组件库提供的 Vue 3 Composition API Hooks，用于简化常见业务场景的开发。

## 可用 Hooks

### useLocalStorage

响应式 localStorage 管理 Hook，自动同步数据到 localStorage。

[查看文档 →](./use-local-storage)

### useRequest

请求管理 Hook，类似 ahooks 的 useRequest，提供加载状态、错误处理等功能。

[查看文档 →](./use-request)

### useTable

表格状态管理 Hook，仿 ahooks useAntdTable 风格，提供分页、搜索、选择等功能。

[查看文档 →](./use-table)

## 使用方式

### 从组件库导入

```ts
import { useLocalStorage, useRequest, useTable } from '@my-vue/components'
```

### 在组件中使用

```vue
<script setup lang="ts">
import { useLocalStorage } from '@my-vue/components'

const { value, setValue, remove } = useLocalStorage('key', 'defaultValue')
</script>
```

## 特性

- ✅ **类型安全** - 完整的 TypeScript 类型支持
- ✅ **响应式** - 基于 Vue 3 Composition API
- ✅ **易用性** - 简洁的 API 设计
- ✅ **功能完整** - 覆盖常见业务场景


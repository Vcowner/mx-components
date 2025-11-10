# [组件名] [组件中文名]

[组件简介]

## 何时使用

[使用场景说明]

## 代码演示

### [功能演示 1]

[功能描述]

<script setup>
import ComponentDemo1 from './demos/ComponentDemo1.vue'
</script>

<ComponentDemo1 />

**完整代码：**

\`\`\`vue
<template>
  <!-- 代码示例 -->
</template>

<script setup>
// 脚本代码
</script>

<style scoped>
/* 样式代码 */
</style>
\`\`\`

### [功能演示 2]

[功能描述]

<script setup>
import ComponentDemo2 from './demos/ComponentDemo2.vue'
</script>

<ComponentDemo2 />

**完整代码：**

\`\`\`vue
<template>
  <!-- 代码示例 -->
</template>
\`\`\`

## API

### [组件名] Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop1 | 参数说明 | type | default |

### [组件名] Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| event | 事件说明 | (event) => void |

### [组件名] Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 默认内容 |
| custom | 自定义内容 |

## 基于 Ant Design Vue 的封装

我们提供了基于 `a-[component]` 的封装组件 `[Component]`：

\`\`\`vue
<template>
  <AComponent />
</template>

<script setup>
import { AComponent } from '@my-vue/components'
</script>
\`\`\`

`AComponent` 完全兼容 `a-[component]` 的所有 props 和事件，并且可以添加额外的业务功能。


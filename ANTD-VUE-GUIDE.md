# 基于 Ant Design Vue 的二次封装指南

本项目支持在 Ant Design Vue 基础上进行组件二次封装，提供更符合业务场景的组件。

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 组件分类

项目包含两种类型的组件：

#### 原生组件（自己实现）
- `MyButton` - 自定义按钮组件
- `MyInput` - 自定义输入框组件

#### 基于 Ant Design Vue 的封装组件
- `AButton` - 基于 `a-button` 的封装
- `AInput` - 基于 `a-input` 的封装

## 封装原则

### 1. 保持 API 兼容性

在封装 Ant Design Vue 组件时，保持原有 API 的兼容性，让用户能够使用原组件的所有特性。

```vue
<!-- packages/components/src/components/AButton/AButton.vue -->
<template>
  <a-button
    :type="type"
    :size="size"
    :danger="danger"
    :disabled="disabled"
    :loading="loading"
    <!-- 传递所有原有的 props -->
    @click="handleClick"
  >
    <slot />
  </a-button>
</template>
```

### 2. 扩展功能

在保持兼容的同时，可以添加业务特定的功能：

```typescript
// 添加业务特有的 props
export interface AButtonProps {
  // 继承所有 antd 的 props
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default'
  // ... 其他 antd props
  
  // 扩展业务功能
  customClass?: string
}
```

### 3. 样式定制

通过 Less 变量或 CSS 覆盖来定制 Ant Design Vue 的样式：

```vue
<style scoped lang="less">
// 覆盖 antd 组件样式
:deep(.ant-btn-primary) {
  background: your-color;
  border-color: your-color;
}

// 或添加业务特定的样式
.custom-class {
  // 你的样式
}
</style>
```

## 创建一个新的封装组件

### 步骤 1: 创建组件文件

在 `packages/components/src/components/` 下创建新目录：

```bash
mkdir packages/components/src/components/ATable
touch packages/components/src/components/ATable/ATable.vue
```

### 步骤 2: 编写组件代码

```vue
<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    :row-key="rowKey"
    :custom-class="customClass"
    @change="handleChange"
  >
    <!-- 支持插槽 -->
    <slot />
  </a-table>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface ATableProps {
  columns: any[]
  dataSource: any[]
  pagination?: any
  loading?: boolean
  rowKey?: string
  customClass?: string
}

const props = defineProps<ATableProps>()

const emit = defineEmits<{
  change: [pagination: any]
}>()

const handleChange = (pagination: any) => {
  emit('change', pagination)
}
</script>

<style scoped lang="less">
// 自定义样式
</style>
```

### 步骤 3: 导出组件

在 `packages/components/src/index.ts` 中添加：

```typescript
import ATable from './components/ATable/ATable.vue'

const components = [
  // ... 其他组件
  { name: 'ATable', component: ATable }
]

export { ATable }
```

### 步骤 4: 使用组件

在文档站点或其他项目中使用：

```vue
<template>
  <ATable 
    :columns="columns" 
    :data-source="data" 
    :loading="loading"
  />
</template>

<script setup>
import { ATable } from '@my-vue/components'
// ...
</script>
```

## 样式主题定制

### 全局主题配置

在 `packages/components/src/style/` 目录下创建主题文件：

```less
// packages/components/src/style/theme.less

// 覆盖 antd 变量
@primary-color: #1890ff;
@border-radius-base: 4px;
@font-size-base: 14px;

// 自定义业务变量
@my-primary-color: #1890ff;
@my-border-color: #d9d9d9;
```

### 在组件中使用

```vue
<style scoped lang="less">
@import '../style/theme.less';

.my-component {
  color: @my-primary-color;
  border: 1px solid @my-border-color;
}
</style>
```

## 测试封装组件

为封装组件编写测试：

```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AButton from '../AButton.vue'

describe('AButton 封装组件', () => {
  it('应该渲染 antd button', () => {
    const wrapper = mount(AButton, {
      slots: { default: '按钮' }
    })
    
    expect(wrapper.find('.ant-btn').exists()).toBe(true)
  })

  it('应该支持所有 antd 的 props', () => {
    const wrapper = mount(AButton, {
      props: {
        type: 'primary',
        size: 'large',
        danger: true
      }
    })
    
    const btn = wrapper.find('.ant-btn')
    expect(btn.classes()).toContain('ant-btn-primary')
  })
})
```

## 最佳实践

### 1. 保持简洁
- 不要过度封装，保持简单
- 只添加业务必需的扩展

### 2. 文档完善
- 为每个封装组件编写使用文档
- 说明与原组件的差异

### 3. 类型定义
- 使用 TypeScript 定义清晰的接口
- 导出类型供使用者参考

### 4. 向后兼容
- 更新时保持向后兼容
- 不破坏现有 API

## 常用封装模式

### 模式 1: 透传模式（直接使用）

```vue
<template>
  <a-button v-bind="$attrs" @click="handleClick">
    <slot />
  </a-button>
</template>
```

### 模式 2: 扩展模式（添加功能）

```vue
<template>
  <a-button 
    v-bind="$attrs"
    :custom-feature="customFeature"
    @click="handleClick"
  >
    <slot />
  </a-button>
</template>
```

### 模式 3: 组合模式（多个组件）

```vue
<template>
  <a-space>
    <a-button @click="handleReset">重置</a-button>
    <a-button type="primary" @click="handleSubmit">提交</a-button>
  </a-space>
</template>
```

## 参考资源

- [Ant Design Vue 官方文档](https://antdv.com/)
- [组件 API 文档](https://antdv.com/components/overview)


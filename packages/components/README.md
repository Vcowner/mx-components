# @my-vue/components

基于 Ant Design Vue 的二次封装组件库

## 简介

本项目是基于 [Ant Design Vue](https://antdv.com/) 的二次封装组件库，提供更符合业务场景的组件和功能扩展。

## 安装

```bash
pnpm add @my-vue/components ant-design-vue
```

**注意**: 本组件库依赖 `ant-design-vue`，需要同时安装。

## 使用

### 完整引入

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import MyVueComponents from '@my-vue/components'

const app = createApp(App)
app.use(Antd) // 先引入 Ant Design Vue
app.use(MyVueComponents)
app.mount('#app')
```

### 按需引入

```vue
<template>
  <AButton type="primary">按钮</AButton>
  <AInput v-model="value" placeholder="请输入" />
</template>

<script setup>
import { ref } from 'vue'
import { AButton, AInput } from '@my-vue/components'

const value = ref('')
</script>
```

## 组件

### AButton - 按钮组件

基于 `a-button` 的二次封装，支持 Ant Design Vue 的所有原生特性。

```vue
<template>
  <AButton type="primary">主要按钮</AButton>
  <AButton type="primary" :danger="true">危险按钮</AButton>
  <AButton :loading="true">加载中</AButton>
  <AButton :disabled="true">禁用</AButton>
</template>
```

**Props:** 完全兼容 [Ant Design Vue Button](https://antdv.com/components/button) 的所有 props

- `type` - 按钮类型
- `size` - 按钮尺寸
- `danger` - 危险按钮
- `ghost` - 幽灵按钮
- `disabled` - 禁用状态
- `loading` - 加载状态
- `block` - 块级按钮
- `html-type` - 按钮原生的 type
- `customClass` - 自定义类名

### AInput - 输入框组件

基于 `a-input` 的二次封装，支持 Ant Design Vue 的所有原生特性。

```vue
<template>
  <AInput v-model="value" placeholder="请输入" :allow-clear="true" />
  <AInput v-model="value" :disabled="true" />
  <AInput v-model="value" status="error" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

**Props:** 完全兼容 [Ant Design Vue Input](https://antdv.com/components/input) 的所有 props

- `placeholder` - 占位符
- `type` - 输入框类型
- `size` - 输入框尺寸
- `disabled` - 禁用状态
- `readonly` - 只读状态
- `allowClear` - 允许清除
- `showCount` - 显示字数统计
- `maxLength` - 最大长度
- `status` - 状态
- `customClass` - 自定义类名

## 二次封装的优势

1. **保持 API 兼容**: 完全支持原组件的所有 props
2. **业务扩展**: 可以添加业务特定的功能
3. **样式定制**: 统一的样式和主题管理
4. **类型安全**: 完整的 TypeScript 类型定义

## 开发

```bash
# 安装依赖
pnpm install

# 构建
pnpm build

# 测试
pnpm test
```


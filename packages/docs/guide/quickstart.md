# 快速开始

## 在 30 秒内使用 MX UI

### 1. 安装

```bash
npm install @my-vue/components ant-design-vue
# 或
yarn add @my-vue/components ant-design-vue
# 或
pnpm add @my-vue/components ant-design-vue
```

### 2. 引入组件

```vue
<template>
  <div>
    <AButton type="primary">点击我</AButton>
  </div>
</template>

<script setup>
import { AButton } from '@my-vue/components'
</script>
```

### 3. 引入样式

```javascript
import '@my-vue/components/dist/style.css'
```

## 完整示例

```vue
<template>
  <div class="app">
    <h1>欢迎使用 MX UI</h1>
    <AButton type="primary" @click="handleClick">
      点击按钮
    </AButton>
    <AInput v-model="inputValue" placeholder="请输入内容" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AButton, AInput } from '@my-vue/components'
import '@my-vue/components/dist/style.css'

const inputValue = ref('')

const handleClick = () => {
  console.log('按钮被点击了')
}
</script>
```

就是这样！你已经成功使用了 MX UI。

## 下一步

- 查看 [安装](/guide/installation) 获取更多配置选项
- 浏览 [组件](/components/button/) 了解所有可用组件
- 查看 [工具函数](/utils/overview) 获取实用工具


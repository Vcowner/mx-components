# 安装

## 环境支持

- Vue 3.x
- Ant Design Vue 4.x

## 通过包管理器安装

推荐使用 npm、yarn 或 pnpm 进行安装：

```bash
# npm
npm install @my-vue/components ant-design-vue

# yarn
yarn add @my-vue/components ant-design-vue

# pnpm
pnpm add @my-vue/components ant-design-vue
```

## 引入

### 完整引入

在 main.js 中写入以下内容：

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import MyVueComponents from '@my-vue/components'

const app = createApp(App)
app.use(Antd)
app.use(MyVueComponents)
app.mount('#app')
```

### 按需引入

```vue
<template>
  <AButton type="primary">按钮</AButton>
</template>

<script setup>
import { AButton } from '@my-vue/components'
</script>
```

### 样式引入

```javascript
import 'ant-design-vue/dist/reset.css'
import '@my-vue/components/dist/style.css'
```

## 使用组件

```vue
<template>
  <div>
    <AButton type="primary" @click="handleClick">
      点击我
    </AButton>
    <AInput v-model:value="value" placeholder="请输入" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AButton, AInput } from '@my-vue/components'

const value = ref('')

const handleClick = () => {
  console.log('点击了按钮')
}
</script>
```

## 目录结构

```
src/
├── components/
│   └── MyComponent.vue
├── App.vue
└── main.js
```

## 下一步

- 阅读 [快速开始](/guide/quickstart) 开始使用
- 查看 [组件列表](/components/button) 浏览所有组件


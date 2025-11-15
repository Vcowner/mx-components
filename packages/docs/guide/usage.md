# 在项目中使用

## 在 Vue 3 项目中使用

### 1. 创建项目

使用 Vite 创建 Vue 3 项目：

```bash
npm create vite@latest my-project -- --template vue
cd my-project
npm install
```

### 2. 安装依赖

```bash
npm install @my-vue/components ant-design-vue
```

### 3. 配置 main.js

```javascript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Antd from 'ant-design-vue'
import MyVueComponents from '@my-vue/components'
import 'ant-design-vue/dist/reset.css'
import '@my-vue/components/dist/style.css'

const app = createApp(App)
app.use(Antd)
app.use(MyVueComponents)
app.mount('#app')
```

### 4. 使用组件

在 `App.vue` 中：

```vue
<template>
  <div id="app">
    <h1>MX UI Demo</h1>
    
    <div>
      <AButton type="primary" @click="handleClick">
        点击我
      </AButton>
    </div>
    
    <div style="margin-top: 16px;">
      <AInput 
        v-model:value="inputValue" 
        placeholder="请输入内容"
        @press-enter="handleEnter"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AButton, AInput } from '@my-vue/components'

const inputValue = ref('')

const handleClick = () => {
  console.log('按钮被点击')
}

const handleEnter = () => {
  console.log('按下回车，输入值：', inputValue.value)
}
</script>

<style>
#app {
  padding: 40px;
}
</style>
```

## 自定义主题

### 使用 Less 变量

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#1890ff',
          '@border-radius-base': '4px'
        }
      }
    }
  }
})
```

### 使用 CSS 覆盖

```css
/* src/styles/override.css */

/* 覆盖按钮主色 */
.ant-btn-primary {
  background-color: #52c41a;
  border-color: #52c41a;
}

.ant-btn-primary:hover {
  background-color: #73d13d;
  border-color: #73d13d;
}
```

然后在 `main.js` 中引入：

```javascript
import './styles/override.css'
```

## TypeScript 支持

如果你的项目使用 TypeScript：

```typescript
import { AButton, AInput } from '@my-vue/components'

interface MyComponentProps {
  title: string
}

const MyComponent = defineComponent({
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup(props: MyComponentProps) {
    return () => (
      <div>
        <AButton type="primary">{props.title}</AButton>
      </div>
    )
  }
})
```

## 最佳实践

### 1. 按需引入

只引入使用的组件：

```javascript
import { AButton, AInput } from '@my-vue/components'
```

而不是：

```javascript
import * from '@my-vue/components'
```

### 2. 组件命名

使用 `A` 前缀命名封装组件：

```vue
<template>
  <AButton type="primary">按钮</AButton>
  <AInput v-model:value="value" />
</template>
```

### 3. 事件处理

```vue
<script setup>
import { AButton } from '@my-vue/components'

const handleClick = (event) => {
  console.log('按钮被点击', event)
}
</script>

<template>
  <AButton @click="handleClick">点击</AButton>
</template>
```

## 常见问题

### 1. 样式不生效

确保在 `main.js` 中引入了样式：

```javascript
import 'ant-design-vue/dist/reset.css'
import '@my-vue/components/dist/style.css'
```

### 2. TypeScript 报错

安装类型定义：

```bash
npm install --save-dev @types/vue
```

### 3. 组件未注册

确保在 `main.js` 中正确安装了组件：

```javascript
app.use(Antd)  // 先安装 Ant Design Vue
app.use(MyVueComponents)  // 再安装封装组件
```

## 下一步

- 查看 [组件文档](/components/button/) 了解更多组件
- 学习 [自定义主题](#自定义主题) 定制样式


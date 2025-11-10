# Input 输入框

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

- 需要用户输入表单域内容时
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择

## 代码演示

<script setup>
import InputDemo1 from './demos/InputDemo1.vue'
import InputDemo2 from './demos/InputDemo2.vue'
import InputDemo3 from './demos/InputDemo3.vue'
import InputDemo4 from './demos/InputDemo4.vue'
</script>

### 基本用法

基本输入框

<InputDemo1 />

**完整代码：**

```vue
<template>
  <div class="demo">
    <mx-input v-model:value="value" placeholder="Basic usage" />
    <p>输入的内容：{{ value }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>

<style scoped>
.demo {
  width: 300px;
}
</style>
```

### 三种大小

通过 size 属性控制大小

<InputDemo2 />

**完整代码：**

```vue
<template>
  <div class="demo-vertical">
    <mx-input v-model:value="value1" size="large" placeholder="large size" />
    <mx-input v-model:value="value2" placeholder="default size" />
    <mx-input v-model:value="value3" size="small" placeholder="small size" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>

<style scoped>
.demo-vertical {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
```

### 带清除按钮

支持 allow-clear 属性

<InputDemo3 />

**完整代码：**

```vue
<template>
  <div class="demo">
    <mx-input v-model:value="value" placeholder="支持清除" :allow-clear="true" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>

<style scoped>
.demo {
  width: 300px;
}
</style>
```

### 密码输入框

密码输入框，支持显示或隐藏密码

<InputDemo4 />

**完整代码：**

```vue
<template>
  <div class="demo">
    <mx-input-password v-model:value="value" placeholder="input password" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>

<style scoped>
.demo {
  width: 300px;
}
</style>
```

## API

### Input Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 可以点击清除图标删除内容 | boolean | false |
| bordered | 是否有边框 | boolean | true |
| disabled | 是否禁用 | boolean | false |
| id | 输入框的 id | string | - |
| maxlength | 最大长度 | number | - |
| showCount | 是否展示字数 | boolean | false |
| size | 控件大小 | `large` \| `middle` \| `small` | `middle` |
| status | 设置校验状态 | `error` \| `warning` | - |
| type | 声明 input 类型 | `button` \| `checkbox` \| `color` \| `date` \| `datetime-local` \| `email` \| `file` \| `hidden` \| `image` \| `month` \| `number` \| `password` \| `radio` \| `range` \| `reset` \| `search` \| `submit` \| `tel` \| `text` \| `time` \| `url` \| `week` | `text` |
| value / v-model:value | 输入框内容 | string | - |

### Input Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 输入框内容变化时的回调 | function(e) |
| pressEnter | 按下回车的回调 | function(e) |

## 基于 AInput 的封装

我们提供了基于 `a-input` 的封装组件 `AInput`：

```vue
<template>
  <AInput v-model:value="value" placeholder="封装的输入框" :allow-clear="true" />
</template>

<script setup>
import { ref } from 'vue'
import { AInput } from '@my-vue/components'

const value = ref('')
</script>
```

`AInput` 完全兼容 `a-input` 的所有 props 和事件。


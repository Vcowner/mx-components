# SubmitButton 提交按钮

提交类操作的按钮，带有保存图标，支持防抖与权限控制。

## 何时使用

- 表单提交、保存、确认等需要提交动作的场景
- 需要限制高频点击造成的重复提交时

## 代码演示

<script setup>
import SubmitDemo1 from './demos/SubmitDemo1.vue'
import SubmitDemo2 from './demos/SubmitDemo2.vue'
</script>

### 基础用法

<SubmitDemo1 />

**完整代码：**

```vue
<template>
  <mx-submit-button @submit="handleSubmit">提交</mx-submit-button>
</template>

<script setup>
const handleSubmit = () => {
  console.log('提交')
}
</script>
```

### 防抖

<SubmitDemo2 />

**完整代码：**

```vue
<template>
  <mx-submit-button :debounce="500" @submit="handleSubmit">提交（500ms 防抖）</mx-submit-button>
</template>

<script setup>
const handleSubmit = () => {
  console.log('提交')
}
</script>
```

### 加载状态

通过 `loading` 属性控制提交状态，配合 `submittingText` 显示加载中的文案。

**完整代码：**

```vue
<template>
  <mx-submit-button 
    :loading="loading" 
    submitting-text="保存中..."
    @submit="handleSubmit"
  >
    保存
  </mx-submit-button>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    await submitData()
    console.log('保存成功')
  } finally {
    loading.value = false
  }
}
</script>
```

## API

### SubmitButton Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 按钮类型 | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | `'primary'` |
| size | 按钮尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 加载状态 | `boolean` | `false` |
| customClass | 自定义类名 | `string` | `''` |
| permission | 权限控制 | `string \| string[]` | `undefined` |
| debounce | 防抖延迟（ms） | `number` | `0` |
| hideIcon | 是否隐藏图标 | `boolean` | `false` |
| submittingText | 提交中显示的文本 | `string` | `'提交中...'` |
| defaultText | 默认显示文本 | `string` | `'提交'` |

### SubmitButton Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| submit | 点击提交后触发 | - |

## 特性说明

相比普通按钮，SubmitButton 提供了：

1. **自动防抖**：默认 300ms 防抖，避免重复点击
2. **专用图标**：使用 CheckOutlined 图标，明确表示提交动作
3. **可配置文案**：支持自定义提交中和默认状态文案

## 与普通按钮的对比

| 特性 | 普通按钮 | SubmitButton |
|------|---------|--------------|
| 防抖 | 需手动实现 | 自动提供（默认 300ms） |
| 提交专用图标 | 需手动配置 | 自动添加 |
| 状态管理 | 需手动管理 | 由外部 loading 控制 |

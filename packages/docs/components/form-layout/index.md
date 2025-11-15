# FormLayout 表单布局

表单行布局组件，用于控制表单项的排列，自动布局。

## 何时使用

- 需要自动排列表单项
- 需要控制每行显示的列数
- 需要自定义表单项的宽度

## 代码演示

### 基础用法

最简单的用法，每行显示一列。

```vue
<template>
  <mx-form-row>
    <a-form-item label="姓名">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="年龄">
      <a-input-number v-model:value="form.age" />
    </a-form-item>
  </mx-form-row>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  age: undefined
})
</script>
```

### 多列布局

通过 `cols` 属性控制每行显示的列数。

```vue
<template>
  <mx-form-row :cols="2">
    <a-form-item label="姓名">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="年龄">
      <a-input-number v-model:value="form.age" />
    </a-form-item>
    <a-form-item label="邮箱">
      <a-input v-model:value="form.email" />
    </a-form-item>
    <a-form-item label="电话">
      <a-input v-model:value="form.phone" />
    </a-form-item>
  </mx-form-row>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  age: undefined,
  email: '',
  phone: ''
})
</script>
```

### 自定义列宽

通过 `span` 或 `data-span` 属性自定义单个表单项的宽度。

```vue
<template>
  <mx-form-row :cols="3">
    <a-form-item label="姓名" :span="12">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="年龄" :span="6">
      <a-input-number v-model:value="form.age" />
    </a-form-item>
    <a-form-item label="邮箱" :span="6">
      <a-input v-model:value="form.email" />
    </a-form-item>
  </mx-form-row>
</template>
```

### 自定义间距

通过 `gutter` 属性控制列间距。

```vue
<template>
  <mx-form-row :cols="2" :gutter="24">
    <a-form-item label="姓名">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="年龄">
      <a-input-number v-model:value="form.age" />
    </a-form-item>
  </mx-form-row>
</template>
```

### 自定义类名

通过 `class` 属性添加自定义类名。

```vue
<template>
  <mx-form-row :cols="2" class="custom-form-row">
    <a-form-item label="姓名">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="年龄">
      <a-input-number v-model:value="form.age" />
    </a-form-item>
  </mx-form-row>
</template>

<style scoped>
.custom-form-row {
  background: #fafafa;
  padding: 16px;
  border-radius: 4px;
}
</style>
```

## API

### FormRow Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cols | 每行显示的列数（1-24） | `number` | `1` |
| gutter | 列间距 | `number \| [number, number]` | `16` |
| class | 自定义类名 | `string` | - |

### 子组件属性

子组件可以通过 `span` 或 `data-span` 属性自定义宽度：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 列宽度（1-24） | `number` | 自动计算 |
| data-span | 列宽度（1-24） | `number` | 自动计算 |

## 特性说明

### 自动布局

组件会自动计算每列的宽度，根据 `cols` 属性平均分配。

### 支持 Fragment

组件会自动处理 Fragment，递归处理子节点。

### 跳过文本节点

组件会自动跳过文本节点和注释节点，只处理有效的组件节点。

### 自定义列宽

子组件可以通过 `span` 或 `data-span` 属性自定义宽度，支持混合布局。

## 计算规则

- 默认每列宽度 = `24 / cols`
- 如果子组件设置了 `span` 或 `data-span`，使用设置的宽度
- 如果子组件未设置宽度，使用默认宽度

## 示例

### 三列布局，其中一列占两倍宽度

```vue
<template>
  <mx-form-row :cols="3">
    <a-form-item label="姓名" :span="12">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="年龄" :span="6">
      <a-input-number v-model:value="form.age" />
    </a-form-item>
    <a-form-item label="邮箱" :span="6">
      <a-input v-model:value="form.email" />
    </a-form-item>
  </mx-form-row>
</template>
```

### 响应式布局

```vue
<template>
  <mx-form-row :cols="2" :gutter="[16, 24]">
    <a-form-item label="姓名">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="年龄">
      <a-input-number v-model:value="form.age" />
    </a-form-item>
  </mx-form-row>
</template>
```


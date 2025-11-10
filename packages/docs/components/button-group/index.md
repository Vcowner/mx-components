# ButtonGroup 按钮组

用于将多个按钮组合在一起，提供统一的布局样式和间距控制。

## 何时使用

- 需要将相关操作的按钮组合在一起
- 需要统一按钮间距和对齐方式
- 需要灵活控制按钮的排列方向

## 代码演示

<script setup>
import Demo1 from './demos/Demo1.vue'
import Demo2 from './demos/Demo2.vue'
import Demo3 from './demos/Demo3.vue'
import Demo4 from './demos/Demo4.vue'
</script>

### 基础用法

水平排列，默认左侧对齐。

<Demo1 />

**完整代码：**

```vue
<template>
  <mx-button-group>
    <mx-button type="primary">提交</mx-button>
    <mx-button>取消</mx-button>
  </mx-button-group>
</template>
```

### 居中对齐

<Demo2 />

**完整代码：**

```vue
<template>
  <mx-button-group align="center">
    <mx-button type="primary">提交</mx-button>
    <mx-button>取消</mx-button>
  </mx-button-group>
</template>
```

### 垂直排列

<Demo3 />

**完整代码：**

```vue
<template>
  <mx-button-group direction="vertical">
    <mx-button type="primary">提交</mx-button>
    <mx-button>取消</mx-button>
    <mx-button>重置</mx-button>
  </mx-button-group>
</template>
```

### 全宽模式

<Demo4 />

**完整代码：**

```vue
<template>
  <mx-button-group block>
    <mx-button type="primary">提交</mx-button>
    <mx-button>取消</mx-button>
  </mx-button-group>
</template>
```

### 自定义间距

通过 `gap` 属性自定义按钮间距。

**完整代码：**

```vue
<template>
  <mx-button-group :gap="16">
    <mx-button type="primary">搜索</mx-button>
    <mx-reset-button>重置</mx-reset-button>
  </mx-button-group>
</template>
```

### 业务组件组合

按钮组可以配合业务组件使用。

**完整代码：**

```vue
<template>
  <mx-button-group align="end">
    <mx-search-button :debounce="300" @search="handleSearch" />
    <mx-reset-button @reset="handleReset" />
    <mx-submit-button @submit="handleSubmit" />
  </mx-button-group>
</template>
```

## API

### ButtonGroup Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| align | 对齐方式 | `'start' \| 'center' \| 'end'` | `'start'` |
| block | 是否拉伸到父容器宽度 | `boolean` | `false` |
| gap | 按钮间距（像素） | `number` | `8` |

## 注意事项

1. 按钮组会自动移除子按钮的 margin
2. 全宽模式（block）下，按钮会自动平分空间
3. 支持所有类型按钮混用，包括业务组件按钮


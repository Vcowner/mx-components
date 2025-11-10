# 组件文档编写指南

本文档说明如何使用 VDemo 组件编写类似 Ant Design Vue 的交互式文档。

## 基本语法

使用 `<VDemo>` 组件来创建可切换预览/代码的演示：

```markdown
<VDemo description="这里是描述文字">

<template #preview>
  <!-- 这里放置要展示的组件 -->
  <a-button type="primary">主要按钮</a-button>
</template>

<template #code>
  <!-- 这里放置对应的代码 -->
  <div class="language-vue" v-pre>
    <code>
      代码内容
    </code>
  </div>
</template>

</VDemo>
```

## 属性

- `description`: 演示的描述文字（可选）

## 使用示例

### 示例 1: 简单按钮演示

```markdown
<VDemo description="不同的按钮类型">

<template #preview>
  <a-space wrap>
    <a-button type="primary">主按钮</a-button>
    <a-button>次按钮</a-button>
  </a-space>
</template>

<template #code>
  <div class="language-vue" v-pre>
    <code>
      <span class="token tag">&lt;<span class="token keyword">template</span>&gt;</span>
      <!-- 代码内容 -->
    </code>
  </div>
</template>

</VDemo>
```

### 示例 2: 带交互的演示

需要在 `<script setup>` 中定义状态：

```markdown
<script setup>
import { ref } from 'vue'

const loading = ref(false)

const enterLoading = () => {
  loading.value = true
  setTimeout(() => loading.value = false, 2000)
}
</script>

<VDemo description="点击后可查看加载状态">

<template #preview>
  <a-button :loading="loading" @click="enterLoading">
    点击加载
  </a-button>
</template>

<template #code>
  <!-- 代码 -->
</template>

</VDemo>
```

## 特性

- ✅ 预览/代码切换
- ✅ 描述文字
- ✅ 边框和阴影
- ✅ 美观的样式
- ✅ 支持交互
- ✅ 暗色模式

## 注意事项

1. 代码需要使用 `v-pre` 指令防止被 Vue 解析
2. 使用 `language-vue` 类来高亮代码
3. `description` 属性用来描述演示功能

## 创建新演示

1. 在 markdown 文件中引入 VDemo
2. 设置 description 描述
3. 在 `#preview` 插槽中放置组件
4. 在 `#code` 插槽中放置代码

## 参考

查看 `packages/docs/components/button.md` 查看完整示例。



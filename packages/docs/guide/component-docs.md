# 组件文档编写指南

本文档说明如何为新组件编写文档，保持项目结构清晰。

## 目录结构规范

每个组件应该创建独立的文件夹，结构如下：

```
components/
└── [component-name]/
    ├── index.md          # 主文档
    ├── demos/            # 示例组件文件夹
    │   ├── ComponentDemo1.vue
    │   ├── ComponentDemo2.vue
    │   └── ...
    └── README.md         # 说明文件（可选）
```

## 创建新组件文档步骤

### 1. 创建组件文件夹

在 `packages/docs/components/` 目录下创建组件文件夹：

```bash
mkdir packages/docs/components/[component-name]
```

### 2. 创建 demos 文件夹

```bash
mkdir packages/docs/components/[component-name]/demos
```

### 3. 创建主文档

复制模板或创建新文件：

```bash
cp packages/docs/.vitepress/COMPONENT_DOC_TEMPLATE.md components/[component-name]/index.md
```

编辑 `index.md`，替换：
- `[组件名]` → 实际的组件名
- `[组件中文名]` → 中文名称
- `[组件简介]` → 组件简介
- 等等...

### 4. 创建示例组件

在 `demos/` 文件夹中创建示例组件：

```bash
# 创建第一个示例
touch components/[component-name]/demos/[Component]Demo1.vue
```

示例文件应该：
- 使用驼峰命名：`[Component]Demo1.vue`
- 文件名清晰表达功能
- 每个文件只演示一个功能点

### 5. 在 index.md 中引用

```markdown
<script setup>
import ComponentDemo1 from './demos/ComponentDemo1.vue'
import ComponentDemo2 from './demos/ComponentDemo2.vue'
</script>

### 功能标题

<ComponentDemo1 />

**完整代码：**

\`\`\`vue
<template>
  <!-- 代码 -->
</template>
\`\`\`
```

### 6. 更新 VitePress 配置

在 `packages/docs/.vitepress/config.ts` 中添加路由：

```typescript
sidebar: {
  '/components/': [
    {
      text: '通用',
      items: [
        { text: 'Button 按钮', link: '/components/button/' },
        { text: '[组件名] [中文名]', link: '/components/[component-name]/' },
      ]
    }
  ]
}
```

## 文件命名规范

### 组件文件夹
- 使用小写字母
- 多个单词用连字符分隔
- 例如：`date-picker`, `tree-select`

### Demo 文件
- 使用驼峰命名法
- 以组件名开头
- 例如：`DatePickerDemo1.vue`, `TreeSelectDemo2.vue`

### 文档文件
- 主文档固定为 `index.md`
- 说明文件可以命名 `README.md`

## 注意事项

1. **相关文件放在一起**：所有组件相关的文档、示例都应该在同一个文件夹内
2. **使用 demos 子文件夹**：统一管理示例组件
3. **保持结构清晰**：主文档和演示文件分离
4. **按功能分类**：每个 demo 文件只展示一个功能点
5. **完整示例代码**：每个 demo 下面都要有完整的代码示例（用户可复制粘贴）

## 示例：Button 组件

参考 `packages/docs/components/button/` 文件夹的结构。

```
button/
├── index.md              # 主文档
├── demos/
│   ├── ButtonDemo1.vue  # 按钮类型示例
│   ├── ButtonDemo2.vue  # 按钮尺寸示例
│   ├── ButtonDemo3.vue  # 加载状态示例
│   └── ButtonDemo4.vue  # 图标按钮示例
└── README.md            # 结构说明
```

## 最佳实践

1. **先写示例再写文档**：确保示例能正常运行
2. **保持示例简洁**：每个示例只展示一个功能
3. **提供完整代码**：用户应该能直接复制使用
4. **及时更新**：组件更新时同步更新文档
5. **保持一致性**：所有组件的文档结构应该统一


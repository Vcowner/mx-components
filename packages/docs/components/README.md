# 组件文档结构规范

此文档定义了所有组件文档应该遵循的标准目录结构。

## 目录结构

每个组件都应该遵循以下结构：

```
components/
└── [component-name]/
    ├── index.md              # 主文档（组件说明、API、使用示例）
    ├── demos/                # 所有演示组件
    │   ├── ComponentDemo1.vue  # 示例 1
    │   ├── ComponentDemo2.vue  # 示例 2
    │   └── ...
    └── README.md            # 说明文档（可选）

```

### 示例：Button 组件

```
button/
├── index.md              # 主文档
├── demos/                # 所有演示组件
│   ├── ButtonDemo1.vue  # 示例 1：按钮类型
│   ├── ButtonDemo2.vue  # 示例 2：按钮尺寸
│   ├── ButtonDemo3.vue  # 示例 3：加载状态
│   └── ButtonDemo4.vue  # 示例 4：图标按钮
└── README.md            # 说明文档
```

## 文件说明

### index.md
- 组件的基本介绍
- 使用场景说明
- API 文档
- 在文档中引用 demos 中的示例组件

### demos/
存放所有与该组件相关的 Vue 示例组件，每个组件演示一个功能点。

### 命名规范
- demo 文件使用驼峰命名：`[Component]Demo1.vue`, `[Component]Demo2.vue`
- 内容清晰表达示例功能
- 从 1 开始递增编号

## 使用方式

在 `index.md` 中引入 demo 组件：

```markdown
<script setup>
import ComponentDemo1 from './demos/ComponentDemo1.vue'
import ComponentDemo2 from './demos/ComponentDemo2.vue'
</script>

### 功能标题

<ComponentDemo1 />

**完整代码：**

\`\`\`vue
// 代码示例
\`\`\`
```

## 注意事项

1. **相关文件放在一起**：每个组件的所有相关文件都应该在同一个文件夹内
2. **使用 demos 子文件夹**：将示例组件统一放在 demos 文件夹中，保持结构清晰
3. **主文档与示例分离**：index.md 是主文档，demo 组件放在 demos 子文件夹
4. **按功能分类**：每个 demo 文件只展示一个功能点
5. **保持一致性**：所有组件都遵循相同的目录结构

## 示例

参考 `button/` 文件夹的结构，这是标准实现的示例：

- ✅ 所有文件都在 `button/` 文件夹内
- ✅ 示例组件放在 `button/demos/` 子文件夹
- ✅ 主文档为 `button/index.md`
- ✅ 使用相对路径引用：`./demos/ComponentDemo.vue`

这样确保每个组件的文档都是独立的、可维护的。


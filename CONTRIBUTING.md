# 贡献指南

## 项目结构

```
my-component-workspace/
├── packages/
│   ├── components/     # 组件库
│   │   └── src/
│   │       ├── components/  # 组件目录
│   │       ├── style/       # 样式目录
│   │       └── index.ts     # 入口文件
│   ├── utils/          # 工具库
│   │   └── src/
│   │       └── index.ts     # 工具函数
│   └── docs/           # 文档站点
│       └── src/        # 文档源码
├── pnpm-workspace.yaml
└── package.json
```

## 开发流程

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发

```bash
# 启动文档站点（会实时预览组件）
pnpm dev
```

### 3. 添加新组件

在 `packages/components/src/components/` 目录下创建组件：

```bash
packages/components/src/components/MyNewComponent/
├── MyNewComponent.vue
└── index.ts  # 可选：导出文件
```

然后在 `packages/components/src/index.ts` 中导出：

```typescript
import MyNewComponent from './components/MyNewComponent/MyNewComponent.vue'

// 添加到 components 数组
const components = [Button, Input, MyNewComponent]

// 添加到导出
export { Button, Input, MyNewComponent }
```

### 4. 添加工具函数

在 `packages/utils/src/` 目录下添加工具函数：

```typescript
// packages/utils/src/helpers.ts
export function myHelper() {
  // ...
}

// packages/utils/src/index.ts
export * from './helpers'
```

### 5. 构建

```bash
# 构建所有包
pnpm build

# 构建组件库
pnpm build:components

# 构建文档
pnpm build:docs
```

### 6. 测试

```bash
pnpm test
```

## 代码规范

- 使用 TypeScript
- 使用 Vue 3 Composition API 和 `<script setup>`
- 遵循 ESLint 规则
- 组件命名使用 PascalCase
- 文件命名使用 PascalCase（组件）或 camelCase（工具函数）

## 组件开发规范

### 1. 组件 Props

使用 TypeScript 接口定义：

```typescript
export interface ButtonProps {
  type?: 'primary' | 'default'
  disabled?: boolean
}
```

### 2. 组件 Emits

使用 TypeScript 类型定义：

```typescript
defineEmits<{
  click: [event: MouseEvent]
  change: [value: string]
}>()
```

### 3. 组件样式

使用 scoped 样式：

```vue
<style scoped>
.my-component {
  /* 样式 */
}
</style>
```

### 4. 组件文档

在文档站点中添加演示：

1. 在 `packages/docs/src/App.vue` 中添加演示
2. 更新 `packages/docs/README.md`

## Git 提交规范

使用 Conventional Commits：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 重构
- `test`: 测试
- `chore`: 构建/工具

示例：

```bash
git commit -m "feat: 添加 Button 组件"
git commit -m "fix: 修复 Input 组件的样式问题"
```

## 发布流程

1. 更新版本号
2. 构建所有包
3. 测试
4. 提交代码
5. 创建标签
6. 发布到 npm


# My Vue Components

基于 Ant Design Vue 的二次封装组件库 Monorepo 项目

## 📦 项目结构

```
my-component-workspace/
├── packages/
│   ├── components/     # 组件库（@my-vue/components）
│   │   └── src/
│   │       ├── components/  # 组件目录
│   │       ├── style/       # 样式
│   │       └── index.ts     # 入口
│   ├── utils/          # 工具库（@my-vue/utils）
│   │   └── src/
│   │       └── index.ts     # 工具函数
│   └── docs/           # 文档站点
│       └── src/        # 演示代码
├── pnpm-workspace.yaml
└── package.json
```

## 🚀 快速开始

### 前置要求

- Node.js >= 16
- pnpm >= 7

### 安装依赖

```bash
# 如果没有安装 pnpm，先安装
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 开发

```bash
# 启动文档站点（预览组件效果）
pnpm dev

# 访问 http://localhost:5173
```

### 构建

```bash
# 构建所有包
pnpm build

# 单独构建组件库
pnpm build:components

# 单独构建文档
pnpm build:docs
```

### 部署文档

文档使用 GitHub Pages 部署，详细说明请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

**快速部署**：

1. 在 GitHub 仓库设置中启用 Pages（Settings → Pages → Source 选择 "GitHub Actions"）
2. 推送代码到 main 分支，GitHub Actions 会自动构建并部署
3. 部署完成后，访问 `https://username.github.io/repo-name` 查看文档

**注意**：如果仓库名不是 `username.github.io`，需要在 `packages/docs/.vitepress/config.ts` 中设置 `base` 路径。

## 📦 包说明

### @my-vue/components

Vue 3 组件库

```bash
cd packages/components
```

查看完整文档：[packages/components/README.md](./packages/components/README.md)

### @my-vue/utils

工具函数库

```bash
cd packages/utils
```

查看完整文档：[packages/utils/README.md](./packages/utils/README.md)

### docs

文档演示站点

```bash
cd packages/docs
```

查看完整文档：[packages/docs/README.md](./packages/docs/README.md)

## 🛠️ 开发指南

### 添加新组件

1. 在 `packages/components/src/components/` 下创建组件
2. 在 `packages/components/src/index.ts` 中导出
3. 在 `packages/docs/src/App.vue` 中添加演示

示例：

```bash
# 创建组件目录
mkdir -p packages/components/src/components/MyComponent

# 创建组件
touch packages/components/src/components/MyComponent/MyComponent.vue

# 更新导出
# 编辑 packages/components/src/index.ts
```

### 添加工具函数

在 `packages/utils/src/index.ts` 中添加函数

### 开发和测试

```bash
# 启动开发服务器
pnpm dev

# 运行测试
pnpm test

# 监听模式运行测试
pnpm test --watch

# 查看测试覆盖率
pnpm test --coverage

# 代码检查
pnpm lint
```

## 🎯 技术栈

- **Vue 3** - 渐进式框架
- **TypeScript** - 类型支持
- **Vite** - 构建工具
- **Less/CSS** - 样式解决方案
- **pnpm** - 包管理器
- **Monorepo** - 工作区管理

## 📄 许可证

MIT

## 🧪 测试

查看 [TESTING.md](./TESTING.md) 了解如何编写和运行测试

## 🤝 贡献

查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解如何贡献代码


# 文档部署指南 - GitHub Pages

本文档介绍如何将 VitePress 文档部署到 GitHub Pages。

## 📦 构建文档

在部署之前，需要先构建文档：

```bash
# 构建文档
pnpm build:docs

# 构建后的文件位于 packages/docs/.vitepress/dist 目录
```

## ❓ 常见问题：应该提交哪些代码？

### 应该提交所有代码

**你需要提交所有代码**（包括 `packages/components`、`packages/utils`、`packages/docs` 等），原因如下：

1. **构建需要依赖**：文档构建时需要依赖 `components` 和 `utils` 包的源代码
2. **GitHub Actions 需要**：工作流会从仓库中读取所有代码来构建文档
3. **Pages 只部署构建产物**：GitHub Pages 只会部署 `packages/docs/.vitepress/dist` 目录下的静态文件，**不会暴露源代码**

### 代码仓库 vs GitHub Pages

- **代码仓库**：包含所有源代码（可以是私有或公开）
- **GitHub Pages**：只包含构建后的静态 HTML/CSS/JS 文件（公开访问）

### 如果担心代码泄露

如果你不想公开源代码，有以下选择：

1. **使用私有仓库**：
   - 创建私有 GitHub 仓库
   - 代码只有你有权限访问
   - GitHub Pages 可以设置为私有（需要 GitHub Pro/Team 账户）

2. **只公开文档**：
   - 代码仓库设为私有
   - GitHub Pages 可以公开访问（只显示构建后的文档）

## 🚀 部署到 GitHub Pages

### 方式一：使用 GitHub Actions 自动部署（推荐）

这是最简单且推荐的方式，每次推送代码到 main 分支时，GitHub Actions 会自动构建并部署文档。

#### 步骤 1：启用 GitHub Pages

1. 打开你的 GitHub 仓库
2. 进入 **Settings** → **Pages**
3. 在 **Source** 部分，选择 **GitHub Actions**
4. 保存设置

#### 步骤 2：推送代码

工作流文件 `.github/workflows/deploy-docs.yml` 已经配置好了，直接推送**所有代码**到 main 分支即可：

```bash
# 提交所有代码（包括组件、工具、文档等）
git add .
git commit -m "配置 GitHub Pages 部署"
git push origin main
```

**注意**：需要提交所有代码，因为：
- 文档依赖 `packages/components` 和 `packages/utils`
- GitHub Actions 需要这些代码来构建文档
- 只有构建后的静态文件会被部署到 Pages

#### 步骤 3：查看部署状态

1. 进入仓库的 **Actions** 标签页
2. 查看工作流运行状态
3. 部署成功后，在 **Settings** → **Pages** 中可以看到部署的 URL

#### 部署 URL

- 如果仓库名为 `username.github.io`，访问地址为：`https://username.github.io`
- 如果仓库名为其他名称，访问地址为：`https://username.github.io/repo-name`

### 方式二：手动部署

如果需要手动部署，可以按照以下步骤：

```bash
# 1. 构建文档
pnpm build:docs

# 2. 进入构建目录
cd packages/docs/.vitepress/dist

# 3. 初始化 git（如果还没有）
git init
git add -A
git commit -m "deploy docs"

# 4. 推送到 gh-pages 分支
git push -f git@github.com:your-username/your-repo.git main:gh-pages
```

## ⚙️ 配置 Base 路径

如果你的仓库名不是 `username.github.io`，需要在 `packages/docs/.vitepress/config.ts` 中设置 `base` 路径：

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/repo-name/', // 替换为你的仓库名，注意前后都有斜杠
  // ... 其他配置
})
```

例如，如果仓库名是 `mx-ui`，则设置为：

```typescript
base: '/mx-ui/',
```

## 📝 注意事项

1. **Base 路径**：如果部署在子路径下（非 `username.github.io`），务必设置正确的 `base` 配置
2. **构建命令**：确保在 monorepo 根目录运行构建命令，以便正确解析 workspace 依赖
3. **静态资源**：确保 `public` 目录下的资源（如 favicon.ico、logo.png）正确复制
4. **工作流触发**：工作流会在以下情况触发：
   - 推送到 main 分支
   - 修改了 `packages/docs/**`、`packages/components/**` 或 `packages/utils/**` 目录下的文件
   - 手动触发（在 Actions 页面点击 "Run workflow"）
5. **代码提交**：需要提交所有代码到仓库，但只有文档构建产物会被部署到 Pages

## 🐛 常见问题

### 问题 1：页面刷新 404

**原因**：GitHub Pages 默认不支持 SPA 路由回退

**解决方案**：VitePress 已经处理了这个问题，如果仍有问题，检查 `base` 配置是否正确。

### 问题 2：资源路径错误（CSS/JS 加载失败）

**原因**：`base` 配置不正确

**解决方案**：
1. 检查 `packages/docs/.vitepress/config.ts` 中的 `base` 配置
2. 确保 `base` 路径与仓库名匹配
3. 重新构建并部署

### 问题 3：构建失败

**原因**：依赖未正确安装或构建命令错误

**解决方案**：
```bash
# 清理并重新安装
pnpm clean
pnpm install
pnpm build:docs
```

### 问题 4：GitHub Actions 工作流未触发

**原因**：可能没有正确配置或文件路径不匹配

**解决方案**：
1. 检查 `.github/workflows/deploy-docs.yml` 文件是否存在
2. 确认推送的文件在触发路径范围内
3. 检查仓库的 Actions 权限是否已启用

### 问题 5：部署后页面空白

**原因**：可能是 `base` 路径配置错误或构建产物有问题

**解决方案**：
1. 检查构建是否成功（查看 Actions 日志）
2. 验证 `base` 配置是否正确
3. 尝试本地预览：`pnpm --filter docs preview`

### 问题 6：不想公开源代码怎么办？

**解决方案**：
1. 将仓库设置为**私有**
2. GitHub Pages 可以单独设置为公开或私有
3. 如果使用私有 Pages，需要 GitHub Pro/Team 账户
4. 或者只提交文档相关代码（但这样文档可能无法正常构建，因为缺少依赖）

## 🔧 自定义域名（可选）

如果你想使用自定义域名：

1. 在仓库根目录创建 `CNAME` 文件，内容为你的域名：
   ```
   docs.example.com
   ```

2. 在域名 DNS 设置中添加 CNAME 记录：
   - 类型：CNAME
   - 名称：docs（或你想要的子域名）
   - 值：`username.github.io`

3. 在 GitHub 仓库的 **Settings** → **Pages** 中配置自定义域名

## 📚 相关链接

- [VitePress 部署指南](https://vitepress.dev/guide/deploy)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

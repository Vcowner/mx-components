# 文档部署指南

本文档介绍如何将 VitePress 文档部署到 GitHub Pages 或自己的服务器。

## 📦 构建文档

在部署之前，需要先构建文档：

```bash
# 构建文档
pnpm build:docs

# 构建后的文件位于 packages/docs/.vitepress/dist 目录
```

## 🚀 部署方式

### 方式一：GitHub Pages（推荐，最简单）

#### 快速开始

1. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 "GitHub Actions"
   - 保存设置

2. **推送代码**
   ```bash
   git push origin main
   ```
   GitHub Actions 会自动构建并部署

3. **访问文档**
   - 地址：`https://vcowner.github.io/mt-components/`

#### 配置说明

- Base 路径已配置为 `/mt-components/`
- 工作流文件：`.github/workflows/deploy-docs.yml`
- 自动触发：推送代码到 main 分支时自动部署

---

### 方式二：部署到自己的服务器

#### 前置要求

- Linux 服务器（Ubuntu/CentOS 等）
- 已安装 Nginx
- 拥有域名
- 可通过 SSH 访问服务器

#### 部署步骤

**1. 修改 Base 配置**

如果部署在域名根路径（如 `https://docs.example.com`）：

```typescript
// packages/docs/.vitepress/config.ts
export default defineConfig({
  base: '/', // 改为根路径
  // ...
})
```

**2. 构建文档**

```bash
pnpm build:docs
```

**3. 上传到服务器**

使用部署脚本（推荐）：
```bash
# 编辑 scripts/deploy-to-server.sh，修改服务器信息
./scripts/deploy-to-server.sh
```

或手动上传：
```bash
# 使用 rsync（推荐）
rsync -avz --delete packages/docs/.vitepress/dist/ user@server.com:/var/www/docs/

# 或使用 scp
scp -r packages/docs/.vitepress/dist/* user@server.com:/var/www/docs/
```

**4. 配置 Nginx**

复制配置文件并修改域名：
```bash
sudo cp nginx-server.conf /etc/nginx/sites-available/docs
sudo nano /etc/nginx/sites-available/docs  # 修改 server_name
sudo ln -s /etc/nginx/sites-available/docs /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**5. 配置 DNS**

在域名管理面板添加 A 记录：
- 类型：A
- 名称：docs（或 @）
- 值：服务器 IP 地址

**6. 配置 HTTPS（推荐）**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d docs.example.com
```

---

## ⚙️ Base 路径配置

根据部署位置设置 `base` 路径：

| 部署位置 | base 配置 | 示例 |
|---------|----------|------|
| GitHub Pages（子路径） | `/repo-name/` | `/mt-components/` |
| 服务器根路径 | `/` | `https://docs.example.com` |
| 服务器子路径 | `/docs/` | `https://example.com/docs` |

修改 `packages/docs/.vitepress/config.ts` 中的 `base` 值，然后重新构建。

---

## 🐛 常见问题

### 页面刷新 404

**原因**：服务器未配置 SPA 路由回退

**解决**：
- GitHub Pages：VitePress 已自动处理
- 服务器：确保 Nginx 配置中有 `try_files $uri $uri/ $uri.html /index.html;`

### 资源加载失败（CSS/JS 404）

**原因**：`base` 路径配置不正确

**解决**：检查并修改 `packages/docs/.vitepress/config.ts` 中的 `base` 配置，重新构建

### 构建失败

**解决**：
```bash
pnpm clean
pnpm install
pnpm build:docs
```

### GitHub Actions 未触发

**解决**：
1. 检查 `.github/workflows/deploy-docs.yml` 是否存在
2. 确认仓库 Settings → Actions 已启用
3. 检查推送的文件是否在触发路径内

---

## 📝 注意事项

1. **代码提交**：需要提交所有代码（包括 components、utils），因为构建需要依赖
2. **Base 路径**：部署位置不同，`base` 配置也不同
3. **静态资源**：确保 `public` 目录下的资源正确复制
4. **HTTPS**：生产环境建议配置 SSL 证书

---

## 🔧 自动化部署

### GitHub Actions（已配置）

推送到 main 分支自动部署到 GitHub Pages。

### 服务器自动部署

使用部署脚本 `scripts/deploy-to-server.sh`，修改配置后运行即可。

### Docker 部署（可选）

```bash
# 构建镜像
docker build -f Dockerfile.server -t mt-docs .

# 运行容器
docker run -d -p 80:80 --name mt-docs mt-docs
```

---

## 📚 相关链接

- [VitePress 部署指南](https://vitepress.dev/guide/deploy)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Nginx 官方文档](https://nginx.org/en/docs/)

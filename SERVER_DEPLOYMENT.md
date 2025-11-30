# 服务器部署配置指南

## 概述

当代码推送到 GitHub 后，workflow 会自动：
1. 构建文档
2. 构建 Docker 镜像并推送到 Harbor
3. 在服务器上自动拉取最新镜像并重启容器

## 前置要求

### 1. 服务器上安装 Docker

确保服务器上已安装 Docker：

```bash
# 检查 Docker 是否已安装
docker --version

# 如果未安装，执行安装命令（以 CentOS/RHEL 为例）
yum install -y docker
systemctl start docker
systemctl enable docker
```

### 2. 在服务器上配置 Harbor 证书

由于 Harbor 使用自签证书，需要在服务器上安装证书，否则 Docker 无法拉取镜像。

#### 方法 1：手动安装证书（推荐）

在服务器上执行以下命令：

```bash
# 创建证书目录
HARBOR_REGISTRY="mx-compoments.top:443"
HARBOR_HOST="mx-compoments.top"
sudo mkdir -p /etc/docker/certs.d/${HARBOR_REGISTRY}
sudo mkdir -p /etc/docker/certs.d/${HARBOR_HOST}

# 从 Harbor 服务器获取证书（需要 SSH 到 Harbor 服务器）
# 在 Harbor 服务器上执行：
# cat /root/harbor-certs/harbor.crt

# 将证书内容保存到服务器上
sudo tee /etc/docker/certs.d/${HARBOR_REGISTRY}/ca.crt > /dev/null << 'EOF'
-----BEGIN CERTIFICATE-----
（在这里粘贴 Harbor 证书的完整内容）
-----END CERTIFICATE-----
EOF

# 复制到不带端口的路径
sudo cp /etc/docker/certs.d/${HARBOR_REGISTRY}/ca.crt /etc/docker/certs.d/${HARBOR_HOST}/ca.crt

# 设置权限
sudo chmod 644 /etc/docker/certs.d/${HARBOR_REGISTRY}/ca.crt
sudo chmod 644 /etc/docker/certs.d/${HARBOR_HOST}/ca.crt

# 重启 Docker 使证书生效
sudo systemctl restart docker
```

#### 方法 2：使用 SCP 从 Harbor 服务器复制证书

如果服务器可以访问 Harbor 服务器：

```bash
# 从 Harbor 服务器复制证书
scp root@8.136.247.234:/root/harbor-certs/harbor.crt /tmp/harbor.crt

# 安装证书
HARBOR_REGISTRY="mx-compoments.top:443"
HARBOR_HOST="mx-compoments.top"
sudo mkdir -p /etc/docker/certs.d/${HARBOR_REGISTRY}
sudo mkdir -p /etc/docker/certs.d/${HARBOR_HOST}
sudo cp /tmp/harbor.crt /etc/docker/certs.d/${HARBOR_REGISTRY}/ca.crt
sudo cp /tmp/harbor.crt /etc/docker/certs.d/${HARBOR_HOST}/ca.crt
sudo chmod 644 /etc/docker/certs.d/${HARBOR_REGISTRY}/ca.crt
sudo chmod 644 /etc/docker/certs.d/${HARBOR_HOST}/ca.crt
sudo systemctl restart docker
```

### 3. 配置 GitHub Secrets

确保在 GitHub 仓库的 Environment secrets（`github-pages` environment）中配置了：

- `SERVER_HOST` - 服务器 IP 或域名
- `SERVER_USER` - SSH 用户名（通常是 `root`）
- `SERVER_PASSWORD` - SSH 密码
- `SERVER_PORT` - SSH 端口（默认 22）
- `HARBOR_USERNAME` - Harbor 登录用户名
- `HARBOR_PASSWORD` - Harbor 登录密码
- `HARBOR_CA_CERT` - Harbor 证书内容（用于 CI/CD）

## 工作流程

1. **代码推送到 GitHub** → 触发 workflow
2. **构建文档** → 生成静态文件
3. **构建 Docker 镜像** → 推送到 Harbor
4. **自动部署到服务器**：
   - SSH 连接到服务器
   - 登录 Harbor
   - 拉取最新镜像
   - 停止旧容器
   - 启动新容器

## 容器配置

默认配置：
- **容器名称**: `mx-components-docs`
- **端口映射**: `8080:80`（服务器 8080 端口映射到容器 80 端口）
- **重启策略**: `unless-stopped`（除非手动停止，否则自动重启）

### 修改容器配置

如果需要修改容器名称、端口等，可以编辑 `.github/workflows/deploy-docs.yml` 中的 `在服务器上拉取镜像并重启容器` 步骤。

例如，修改端口映射：

```yaml
docker run -d \
  --name mx-components-docs \
  --restart unless-stopped \
  -p 3000:80 \  # 改为 3000 端口
  ${{ env.HARBOR_REGISTRY }}/${{ env.HARBOR_PROJECT }}/${{ env.HARBOR_REPOSITORY }}:latest
```

## 验证部署

部署成功后，可以通过以下方式验证：

```bash
# 在服务器上检查容器状态
docker ps | grep mx-components-docs

# 查看容器日志
docker logs mx-components-docs

# 测试访问（假设服务器 IP 是 192.168.1.100）
curl http://192.168.1.100:8080
```

## 故障排查

### 问题 1：无法拉取镜像（证书验证失败）

**错误信息**：
```
tls: failed to verify certificate: x509: certificate signed by unknown authority
```

**解决方法**：
1. 确认证书已正确安装到 `/etc/docker/certs.d/mx-compoments.top:443/ca.crt`
2. 重启 Docker：`sudo systemctl restart docker`
3. 验证证书：`openssl x509 -in /etc/docker/certs.d/mx-compoments.top:443/ca.crt -noout -subject`

### 问题 2：容器启动失败

**检查步骤**：
1. 查看容器日志：`docker logs mx-components-docs`
2. 检查端口是否被占用：`netstat -tlnp | grep 8080`
3. 检查镜像是否存在：`docker images | grep docs`

### 问题 3：无法 SSH 连接到服务器

**检查步骤**：
1. 确认 `SERVER_HOST`、`SERVER_USER`、`SERVER_PASSWORD` 配置正确
2. 测试 SSH 连接：`ssh ${SERVER_USER}@${SERVER_HOST} -p ${SERVER_PORT}`
3. 检查防火墙是否开放 SSH 端口

## 手动部署（可选）

如果需要手动部署，可以在服务器上执行：

```bash
# 登录 Harbor
docker login mx-compoments.top:443 -u <用户名> -p <密码>

# 拉取镜像
docker pull mx-compoments.top:443/mx-component/docs:latest

# 停止并删除旧容器
docker stop mx-components-docs 2>/dev/null
docker rm mx-components-docs 2>/dev/null

# 启动新容器
docker run -d \
  --name mx-components-docs \
  --restart unless-stopped \
  -p 8080:80 \
  mx-compoments.top:443/mx-component/docs:latest
```


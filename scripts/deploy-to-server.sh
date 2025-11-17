#!/bin/bash

# 服务器部署脚本
# 使用方法: ./scripts/deploy-to-server.sh

# ========== 配置区域 ==========
# 请根据实际情况修改以下配置

# 服务器信息
SERVER_USER="your-username"        # SSH 用户名
SERVER_HOST="your-server.com"      # 服务器地址（IP 或域名）
SERVER_PATH="/var/www/docs"        # 服务器部署路径

# 本地路径
LOCAL_DIST="packages/docs/.vitepress/dist"

# 是否自动重启 Nginx
AUTO_RELOAD_NGINX=true

# ========== 脚本开始 ==========

set -e  # 遇到错误立即退出

echo "🚀 开始部署文档到服务器..."

# 检查本地构建目录是否存在
if [ ! -d "$LOCAL_DIST" ]; then
    echo "❌ 错误: 构建目录不存在，请先运行 pnpm build:docs"
    exit 1
fi

# 构建文档
echo "📦 构建文档..."
pnpm build:docs

# 检查构建是否成功
if [ ! -f "$LOCAL_DIST/index.html" ]; then
    echo "❌ 错误: 构建失败，未找到 index.html"
    exit 1
fi

# 上传文件
echo "📤 上传文件到服务器..."
echo "   目标: $SERVER_USER@$SERVER_HOST:$SERVER_PATH"

# 使用 rsync 同步文件（推荐，支持增量同步）
if command -v rsync &> /dev/null; then
    rsync -avz --delete \
        --exclude='.git' \
        --exclude='node_modules' \
        "$LOCAL_DIST/" \
        "$SERVER_USER@$SERVER_HOST:$SERVER_PATH/"
else
    # 如果没有 rsync，使用 scp
    echo "⚠️  未找到 rsync，使用 scp（较慢）"
    ssh "$SERVER_USER@$SERVER_HOST" "mkdir -p $SERVER_PATH"
    scp -r "$LOCAL_DIST"/* "$SERVER_USER@$SERVER_HOST:$SERVER_PATH/"
fi

# 设置文件权限
echo "🔧 设置文件权限..."
ssh "$SERVER_USER@$SERVER_HOST" "sudo chown -R www-data:www-data $SERVER_PATH && sudo chmod -R 755 $SERVER_PATH"

# 重启 Nginx
if [ "$AUTO_RELOAD_NGINX" = true ]; then
    echo "🔄 重新加载 Nginx..."
    ssh "$SERVER_USER@$SERVER_HOST" "sudo systemctl reload nginx"
fi

echo "✅ 部署完成！"
echo "   访问地址: http://$SERVER_HOST"


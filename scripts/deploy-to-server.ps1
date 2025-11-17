# 服务器部署脚本 (PowerShell)
# 使用方法: .\scripts\deploy-to-server.ps1

# ========== 配置区域 ==========
# 请根据实际情况修改以下配置

$SERVER_USER = "your-username"        # SSH 用户名
$SERVER_HOST = "your-server.com"      # 服务器地址（IP 或域名）
$SERVER_PATH = "/var/www/docs"        # 服务器部署路径

$LOCAL_DIST = "packages/docs/.vitepress/dist"

$AUTO_RELOAD_NGINX = $true

# ========== 脚本开始 ==========

$ErrorActionPreference = "Stop"

Write-Host "🚀 开始部署文档到服务器..." -ForegroundColor Green

# 检查本地构建目录是否存在
if (-not (Test-Path $LOCAL_DIST)) {
    Write-Host "❌ 错误: 构建目录不存在，请先运行 pnpm build:docs" -ForegroundColor Red
    exit 1
}

# 构建文档
Write-Host "📦 构建文档..." -ForegroundColor Yellow
pnpm build:docs

# 检查构建是否成功
if (-not (Test-Path "$LOCAL_DIST/index.html")) {
    Write-Host "❌ 错误: 构建失败，未找到 index.html" -ForegroundColor Red
    exit 1
}

# 上传文件
Write-Host "📤 上传文件到服务器..." -ForegroundColor Yellow
Write-Host "   目标: ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}" -ForegroundColor Cyan

# 使用 scp 上传（Windows 需要安装 OpenSSH 客户端）
$scpCommand = "scp -r $LOCAL_DIST/* ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/"
Invoke-Expression $scpCommand

# 设置文件权限和重启 Nginx
Write-Host "🔧 设置文件权限并重新加载 Nginx..." -ForegroundColor Yellow
$sshCommand = "ssh ${SERVER_USER}@${SERVER_HOST} 'sudo chown -R www-data:www-data $SERVER_PATH && sudo chmod -R 755 $SERVER_PATH && sudo systemctl reload nginx'"
Invoke-Expression $sshCommand

Write-Host "✅ 部署完成！" -ForegroundColor Green
Write-Host "   访问地址: http://${SERVER_HOST}" -ForegroundColor Cyan


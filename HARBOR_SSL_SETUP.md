# Harbor 自签证书配置指南

## 步骤 1: 在 Harbor 服务器上生成自签证书

SSH 登录到你的 Harbor 服务器（`8.136.247.234`），然后执行以下命令：

```bash
# 创建证书目录
mkdir -p /root/harbor-certs
cd /root/harbor-certs

# 生成自签证书（有效期 10 年）
# 注意：CN 和 DNS 必须匹配你的域名 mx-compoments.top
openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
  -keyout harbor.key \
  -out harbor.crt \
  -subj "/C=CN/ST=State/L=City/O=Organization/CN=mx-compoments.top" \
  -addext "subjectAltName=DNS:mx-compoments.top,IP:8.136.247.234"

# 设置权限
chmod 600 harbor.key
chmod 644 harbor.crt
```

**重要说明：**
- `CN=8.136.247.234` 和 `subjectAltName=IP:8.136.247.234` 必须匹配你的 Harbor 服务器 IP
- 如果你有域名，可以把 `CN` 和 `DNS` 改成域名，例如：`CN=harbor.example.com,DNS:harbor.example.com`

## 步骤 2: 配置 Harbor 使用 HTTPS

找到你的 Harbor 安装目录（通常在 `/opt/harbor` 或 `/usr/local/harbor`），编辑 `harbor.yml`：

```bash
# 找到 Harbor 安装目录（常见位置）
cd /opt/harbor  # 或 /usr/local/harbor

# 编辑配置文件
vi harbor.yml
```

在 `harbor.yml` 中找到并修改以下部分：

```yaml
# https related config
https:
  # https port for harbor, default is 443
  port: 5000
  # The path of cert and key files for nginx
  certificate: /root/harbor-certs/harbor.crt
  private_key: /root/harbor-certs/harbor.key
```

**注意：**
- `port: 5000` 保持你当前的端口
- `certificate` 和 `private_key` 路径改为你刚才生成的证书路径

## 步骤 3: 重启 Harbor

```bash
# 如果使用 docker-compose 部署
cd /opt/harbor  # 或你的 Harbor 安装目录
docker-compose down
docker-compose up -d

# 或者如果使用 Harbor 的安装脚本
./install.sh --with-notary --with-clair --with-chartmuseum
```

## 步骤 4: 验证 HTTPS 是否生效

在浏览器访问：`https://8.136.247.234:5000`

浏览器会提示证书不安全（因为是自签证书），点击"高级" -> "继续访问"即可。

## 步骤 5: 获取证书内容（用于 GitHub Actions）

```bash
# 在 Harbor 服务器上执行
cat /root/harbor-certs/harbor.crt
```

**复制整个证书内容**（包括 `-----BEGIN CERTIFICATE-----` 和 `-----END CERTIFICATE-----`），稍后需要添加到 GitHub Secrets。

---

## 下一步：配置 GitHub Actions

完成上述步骤后，需要：

1. 在 GitHub 仓库的 Secrets 中添加 `HARBOR_CA_CERT`，值为步骤 5 复制的证书内容
2. Workflow 会自动使用这个证书来信任 Harbor 的自签证书


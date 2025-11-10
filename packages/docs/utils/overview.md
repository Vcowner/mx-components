# 工具函数概览

MX UI 提供了丰富的工具函数库，帮助你提高开发效率。

## 安装

```bash
npm install @my-vue/utils
```

## 使用

```javascript
import { debounce, throttle, deepClone } from '@my-vue/utils'
```

## 工具函数列表

### 函数工具

| 函数 | 说明 |
| --- | --- |
| `debounce` | 防抖函数 |
| `throttle` | 节流函数 |

### 对象工具

| 函数 | 说明 |
| --- | --- |
| `deepClone` | 深拷贝 |

### 日期工具

| 函数 | 说明 |
| --- | --- |
| `formatDate` | 格式化日期 |

### 字符串工具

| 函数 | 说明 |
| --- | --- |
| `randomString` | 生成随机字符串 |

### 判断工具

| 函数 | 说明 |
| --- | --- |
| `isEmpty` | 判断是否为空 |
| `isMobile` | 判断是否为移动设备 |

## 完整示例

```javascript
import { debounce, formatDate, deepClone } from '@my-vue/utils'

// 防抖
const handleSearch = debounce((value) => {
  console.log('搜索:', value)
}, 300)

// 格式化日期
const formatted = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')

// 深拷贝
const cloned = deepClone({ name: 'test' })
```

## 快速开始

查看 [常用工具](/utils/common) 了解更多使用示例。


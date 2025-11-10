# @my-vue/utils

工具函数库

## 安装

```bash
pnpm add @my-vue/utils
```

## 使用

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

## API

### debounce

防抖函数

```javascript
const handleSearch = debounce((value) => {
  console.log(value)
}, 300)
```

### throttle

节流函数

```javascript
const handleScroll = throttle(() => {
  console.log('滚动')
}, 300)
```

### deepClone

深拷贝

```javascript
const cloned = deepClone({ name: 'test', nested: { value: 1 } })
```

### formatDate

格式化日期

```javascript
formatDate(new Date(), 'YYYY-MM-DD')  // 2024-01-01
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')  // 2024-01-01 12:00:00
```

### randomString

获取随机字符串

```javascript
randomString(8)  // 'aB3dE5fG'
```

### isMobile

判断是否为移动设备

```javascript
if (isMobile()) {
  console.log('移动设备')
}
```

### isEmpty

判断是否为空值

```javascript
isEmpty(null)  // true
isEmpty('')  // true
isEmpty([])  // true
isEmpty({})  // true
isEmpty('text')  // false
```


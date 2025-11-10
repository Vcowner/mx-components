# 常用工具

提供常用的工具函数。

## debounce 防抖

限制函数的执行频率，在指定时间内只执行最后一次调用。

### 示例

```javascript
import { debounce } from '@my-vue/utils'

const handleSearch = debounce((value) => {
  console.log('搜索:', value)
}, 300)

// 在输入框中使用时
input.addEventListener('input', (e) => {
  handleSearch(e.target.value)
})
```

## throttle 节流

限制函数的执行频率，在指定时间间隔内最多执行一次。

### 示例

```javascript
import { throttle } from '@my-vue/utils'

const handleScroll = throttle(() => {
  console.log('滚动事件')
}, 200)

window.addEventListener('scroll', handleScroll)
```

## deepClone 深拷贝

深度克隆对象或数组，避免引用传递。

### 示例

```javascript
import { deepClone } from '@my-vue/utils'

const obj = { name: 'test', nested: { value: 1 } }
const cloned = deepClone(obj)

cloned.nested.value = 2
console.log(obj.nested.value) // 仍然是 1
```

## formatDate 格式化日期

格式化日期为指定格式的字符串。

### 示例

```javascript
import { formatDate } from '@my-vue/utils'

// 默认格式
formatDate(new Date()) // '2024-01-01'

// 自定义格式
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') // '2024-01-01 12:00:00'

// 支持字符串日期
formatDate('2024-01-01', 'YYYY年MM月DD日') // '2024年01月01日'
```

## randomString 随机字符串

生成指定长度的随机字符串。

### 示例

```javascript
import { randomString } from '@my-vue/utils'

randomString() // 'aB3dE5fG' (默认长度 8)
randomString(16) // 'aB3dE5fGhIjKlMnO'
```

## isEmpty 判断是否为空

判断值是否为空（null、undefined、空字符串、空数组、空对象）。

### 示例

```javascript
import { isEmpty } from '@my-vue/utils'

isEmpty(null) // true
isEmpty('') // true
isEmpty('   ') // true
isEmpty([]) // true
isEmpty({}) // true
isEmpty('text') // false
isEmpty([1, 2]) // false
```

## isMobile 判断是否为移动设备

判断是否为移动设备。

### 示例

```javascript
import { isMobile } from '@my-vue/utils'

if (isMobile()) {
  console.log('当前在移动设备上')
} else {
  console.log('当前在桌面设备上')
}
```

## 在 Vue 中使用

```vue
<template>
  <div>
    <input @input="handleInput" />
    <button @click="handleClick">点击</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { debounce, throttle } from '@my-vue/utils'

const inputValue = ref('')

const handleInput = debounce((e) => {
  inputValue.value = e.target.value
  console.log('输入:', inputValue.value)
}, 300)

const handleClick = throttle(() => {
  console.log('按钮被点击')
}, 1000)
</script>
```

## API 参考

详细的 API 文档请查看各函数的定义和类型说明。


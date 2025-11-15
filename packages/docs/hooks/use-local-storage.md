# useLocalStorage

响应式 localStorage 管理 Hook，自动同步数据到 localStorage。

## 何时使用

- 需要将数据持久化到 localStorage
- 需要响应式地管理 localStorage 数据
- 需要在多个组件间共享 localStorage 数据

## 代码演示

### 基础用法

最简单的用法，存储字符串。

```vue
<template>
  <div>
    <a-input v-model:value="value.value" placeholder="输入内容" />
    <a-button @click="remove">清除</a-button>
    <p>当前值：{{ value.value }}</p>
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@my-vue/components'

const { value, setValue, remove } = useLocalStorage('my-key', '默认值')
</script>
```

### 存储对象

支持存储复杂对象。

```vue
<template>
  <div>
    <a-input v-model:value="user.value.name" placeholder="姓名" />
    <a-input-number v-model:value="user.value.age" placeholder="年龄" />
    <a-button @click="remove">清除</a-button>
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@my-vue/components'

interface User {
  name: string
  age: number
}

const { value: user, remove } = useLocalStorage<User>('user', {
  name: '',
  age: 0
})
</script>
```

### 存储数组

支持存储数组数据。

```vue
<template>
  <div>
    <a-button @click="addItem">添加项</a-button>
    <a-button @click="remove">清除</a-button>
    <ul>
      <li v-for="(item, index) in items.value" :key="index">
        {{ item }}
        <a-button @click="removeItem(index)">删除</a-button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@my-vue/components'

const { value: items, setValue, remove } = useLocalStorage<string[]>('items', [])

function addItem() {
  items.value.push(`Item ${items.value.length + 1}`)
}

function removeItem(index: number) {
  items.value.splice(index, 1)
}
</script>
```

### 手动设置值

使用 `setValue` 方法手动设置值。

```vue
<template>
  <div>
    <a-input v-model:value="inputValue" placeholder="输入内容" />
    <a-button @click="save">保存</a-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLocalStorage } from '@my-vue/components'

const { value, setValue } = useLocalStorage('my-key', '')
const inputValue = ref('')

function save() {
  setValue(inputValue.value)
}
</script>
```

## API

### useLocalStorage

```ts
function useLocalStorage<T>(key: string, defaultValue: T): {
  value: Ref<T>
  setValue: (value: T) => void
  remove: () => void
}
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | localStorage 键名 | `string` | - |
| defaultValue | 默认值 | `T` | - |

### 返回值

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| value | 响应式的值 | `Ref<T>` |
| setValue | 设置值 | `(value: T) => void` |
| remove | 删除存储 | `() => void` |

## 特性说明

### 自动同步

当 `value` 发生变化时，会自动同步到 localStorage。无需手动调用 `setValue`。

```vue
<script setup lang="ts">
const { value } = useLocalStorage('key', 'default')

// 直接修改 value，会自动同步到 localStorage
value.value = 'new value'
</script>
```

### 类型安全

支持 TypeScript 泛型，提供完整的类型提示。

```ts
interface User {
  name: string
  age: number
}

const { value } = useLocalStorage<User>('user', { name: '', age: 0 })
// value 的类型是 Ref<User>
```

### 错误处理

如果读取或写入 localStorage 失败，会在控制台输出警告，并返回默认值。

### 深拷贝

使用 `JSON.parse` 和 `JSON.stringify` 进行序列化，支持对象和数组的深拷贝。

## 注意事项

1. **序列化限制**：只能存储可被 JSON 序列化的数据（对象、数组、字符串、数字等）
2. **存储大小**：localStorage 有大小限制（通常 5-10MB）
3. **同步操作**：localStorage 是同步操作，大量数据可能影响性能
4. **浏览器兼容性**：需要浏览器支持 localStorage


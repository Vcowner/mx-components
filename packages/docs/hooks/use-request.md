# useRequest

请求管理 Hook，类似 ahooks 的 useRequest，提供加载状态、错误处理等功能。

## 何时使用

- 需要管理 API 请求的加载状态
- 需要处理请求成功/失败的回调
- 需要自动或手动触发请求
- 需要刷新、重置等操作

## 代码演示

### 基础用法

最简单的用法，自动执行请求。

```vue
<template>
  <div>
    <a-spin :spinning="loading.value">
      <div v-if="data">
        <p>用户名：{{ data.username }}</p>
        <p>邮箱：{{ data.email }}</p>
      </div>
    </a-spin>
    <a-button @click="refresh">刷新</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@my-vue/components'

// 模拟 API 调用
async function fetchUser() {
  return {
    username: '张三',
    email: 'zhangsan@example.com'
  }
}

const { data, loading, refresh } = useRequest(fetchUser)
</script>
```

### 手动触发

使用 `manual: true` 手动触发请求。

```vue
<template>
  <div>
    <a-button :loading="loading.value" @click="run">获取数据</a-button>
    <div v-if="data">
      <p>{{ data }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@my-vue/components'

async function fetchData() {
  // API 调用
  return { message: '数据获取成功' }
}

const { data, loading, run } = useRequest(fetchData, {
  manual: true
})
</script>
```

### 带参数请求

支持传递参数。

```vue
<template>
  <div>
    <a-input v-model:value="userId" placeholder="用户ID" />
    <a-button :loading="loading.value" @click="() => run(userId)">
      获取用户信息
    </a-button>
    <div v-if="data">
      <p>{{ data }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRequest } from '@my-vue/components'

const userId = ref('')

async function fetchUser(id: string) {
  // API 调用
  return { id, name: `用户${id}` }
}

const { data, loading, run } = useRequest(fetchUser, {
  manual: true
})
</script>
```

### 成功/失败回调

配置成功和失败的回调函数。

```vue
<template>
  <div>
    <a-button :loading="loading.value" @click="run">提交</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@my-vue/components'
import { message } from 'ant-design-vue'

async function submitData() {
  // API 调用
  return { success: true }
}

const { loading, run } = useRequest(submitData, {
  manual: true,
  onSuccess: (data) => {
    message.success('提交成功')
    console.log('成功数据:', data)
  },
  onError: (error) => {
    message.error('提交失败')
    console.error('错误:', error)
  }
})
</script>
```

### 显示成功消息

配置自动显示成功消息。

```vue
<script setup lang="ts">
import { useRequest } from '@my-vue/components'

const { loading, run } = useRequest(submitData, {
  manual: true,
  showMessage: true,
  successMessage: '操作成功'
})
</script>
```

### 设置默认参数

使用 `defaultParams` 设置默认参数。

```vue
<script setup lang="ts">
import { useRequest } from '@my-vue/components'

async function fetchUser(id: string) {
  // API 调用
  return { id, name: `用户${id}` }
}

const { data, loading } = useRequest(fetchUser, {
  defaultParams: '123' // 自动使用默认参数执行
})
</script>
```

### 重置状态

使用 `reset` 重置所有状态。

```vue
<template>
  <div>
    <a-button @click="run">获取数据</a-button>
    <a-button @click="reset">重置</a-button>
    <div v-if="data">{{ data }}</div>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@my-vue/components'

const { data, loading, run, reset } = useRequest(fetchData)
</script>
```

## API

### useRequest

```ts
function useRequest<T = any, P = any>(
  apiCall: (params?: P) => Promise<T>,
  options?: UseRequestOptions
): UseRequestResult<T, P>
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| apiCall | API 调用函数 | `(params?: P) => Promise<T>` | - |
| options | 配置选项 | `UseRequestOptions` | `{}` |

### UseRequestOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| manual | 是否手动触发 | `boolean` | `false` |
| defaultParams | 默认参数 | `P` | - |
| onSuccess | 成功回调 | `(data: T, params?: P) => void` | - |
| onError | 错误回调 | `(error: any, params?: P) => void` | - |
| showMessage | 是否显示成功消息 | `boolean` | `false` |
| successMessage | 成功消息 | `string` | `'操作成功'` |

### 返回值

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| loading | 加载状态 | `Readonly<Ref<boolean>>` |
| data | 响应数据 | `Readonly<Ref<T \| null>>` |
| error | 错误信息 | `Readonly<Ref<any>>` |
| params | 请求参数 | `Readonly<Ref<P \| undefined>>` |
| run | 执行请求 | `(params?: P) => Promise<T>` |
| runAsync | 异步执行请求（不抛出错误） | `(params?: P) => Promise<T \| null>` |
| refresh | 刷新请求（使用上次的参数） | `() => Promise<T>` |
| reset | 重置状态 | `() => void` |
| setData | 设置数据 | `(data: T) => void` |
| setParams | 设置参数 | `(params: P) => void` |

## 工具函数

### handleResponse

处理 API 响应。

```ts
function handleResponse<T = any>(
  response: ApiResponse<T>,
  options?: {
    showMessage?: boolean
    successMessage?: string
    errorMessage?: string
    onSuccess?: (data: T) => void
    onError?: (error: any) => void
  }
): ResponseResult<T>
```

### handleAsyncResponse

处理异步 API 调用。

```ts
function handleAsyncResponse<T = any>(
  apiCall: () => Promise<ApiResponse<T>>,
  options?: {
    showMessage?: boolean
    successMessage?: string
    errorMessage?: string
    onSuccess?: (data: T) => void
    onError?: (error: any) => void
    loading?: Ref<boolean>
  }
): Promise<ResponseResult<T>>
```

### handleInterceptorResponse

处理请求拦截器已封装的响应。

```ts
function handleInterceptorResponse<T = any>(
  apiCall: () => Promise<T>,
  options?: {
    showMessage?: boolean
    successMessage?: string
    onSuccess?: (data: T) => void
  }
): Promise<{ data: T; loading: Ref<boolean> }>
```

## 特性说明

### 自动执行

默认情况下，Hook 会自动执行一次请求（除非设置了 `manual: true`）。

### 响应式状态

所有状态都是响应式的，可以直接在模板中使用。

### 错误处理

支持错误回调和自动错误提示。

### 类型安全

完整的 TypeScript 类型支持，提供良好的开发体验。


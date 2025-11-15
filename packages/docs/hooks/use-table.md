# useTable

表格状态管理 Hook，仿 ahooks useAntdTable 风格，提供分页、搜索、选择等功能。

## 何时使用

- 需要管理表格的分页状态
- 需要处理表格的搜索功能
- 需要管理表格的行选择
- 需要自动处理表格数据加载

## 代码演示

### 基础用法

最简单的用法，手动触发请求。

```vue
<template>
  <a-table v-bind="tableProps">
    <template #columns>
      <a-table-column title="姓名" data-index="name" />
      <a-table-column title="年龄" data-index="age" />
    </template>
  </a-table>
  <a-button @click="refresh">刷新</a-button>
</template>

<script setup lang="ts">
import { useTable } from '@my-vue/components'

// 模拟 API 调用
async function fetchTableData([pagination, searchParams]: [
  { current: number; pageSize: number },
  any
]) {
  return {
    list: [
      { id: 1, name: '张三', age: 25 },
      { id: 2, name: '李四', age: 30 }
    ],
    total: 100
  }
}

const { tableProps, refresh } = useTable(fetchTableData)
</script>
```

### 自动加载

使用 `manual: false` 自动加载数据。

```vue
<template>
  <a-table v-bind="tableProps">
    <template #columns>
      <a-table-column title="姓名" data-index="name" />
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { useTable } from '@my-vue/components'

const { tableProps } = useTable(fetchTableData, {
  manual: false // 自动加载
})
</script>
```

### 搜索功能

使用 `search` 对象处理搜索。

```vue
<template>
  <div>
    <a-input v-model:value="keyword" placeholder="搜索关键词" />
    <a-button @click="handleSearch">搜索</a-button>
    <a-button @click="handleReset">重置</a-button>
    <a-table v-bind="tableProps">
      <template #columns>
        <a-table-column title="姓名" data-index="name" />
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTable } from '@my-vue/components'

const keyword = ref('')

const { tableProps, search } = useTable(fetchTableData)

function handleSearch() {
  search.submit({ keyword: keyword.value })
}

function handleReset() {
  keyword.value = ''
  search.reset()
}
</script>
```

### 行选择

使用 `selectedRowKeys` 和 `selectedRows` 管理行选择。

```vue
<template>
  <div>
    <a-table
      v-bind="tableProps"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: (keys, rows) => {
          selectedRowKeys.value = keys
          selectedRows.value = rows
        }
      }"
    >
      <template #columns>
        <a-table-column title="姓名" data-index="name" />
      </template>
    </a-table>
    <p>已选择：{{ selectedRowKeys.length }} 项</p>
  </div>
</template>

<script setup lang="ts">
import { useTable } from '@my-vue/components'

const {
  tableProps,
  selectedRowKeys,
  selectedRows
} = useTable(fetchTableData)
</script>
```

### 搜索参数格式化

使用 `searchFormatter` 格式化搜索参数。

```vue
<script setup lang="ts">
import { useTable } from '@my-vue/components'

const { tableProps, search } = useTable(fetchTableData, {
  searchFormatter: (params) => {
    // 格式化搜索参数
    return {
      ...params,
      keyword: params.keyword?.trim()
    }
  }
})
</script>
```

### 刷新依赖

使用 `refreshDeps` 监听依赖变化，自动刷新。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useTable } from '@my-vue/components'

const status = ref('active')

const { tableProps } = useTable(fetchTableData, {
  refreshDeps: [status] // 当 status 变化时自动刷新
})
</script>
```

### 成功/失败回调

配置成功和失败的回调函数。

```vue
<script setup lang="ts">
import { useTable } from '@my-vue/components'
import { message } from 'ant-design-vue'

const { tableProps } = useTable(fetchTableData, {
  onSuccess: (data) => {
    message.success('数据加载成功')
    console.log('数据:', data)
  },
  onError: (error) => {
    message.error('数据加载失败')
    console.error('错误:', error)
  }
})
</script>
```

### 重置状态

使用 `reset` 重置所有状态。

```vue
<template>
  <div>
    <a-table v-bind="tableProps" />
    <a-button @click="reset">重置</a-button>
  </div>
</template>

<script setup lang="ts">
import { useTable } from '@my-vue/components'

const { tableProps, reset } = useTable(fetchTableData)
</script>
```

## API

### useTable

```ts
function useTable<TData extends Data, TParams extends Params>(
  service: (...args: TParams) => Promise<TData>,
  options?: UseTableOptions
): UseTableResult<TData>
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| service | 数据请求函数 | `(...args: TParams) => Promise<TData>` | - |
| options | 配置选项 | `UseTableOptions` | `{}` |

### UseTableOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultParams | 默认参数 | `any` | - |
| defaultPageSize | 默认页面大小 | `number` | `10` |
| refreshDeps | 刷新依赖 | `any[]` | `[]` |
| manual | 是否立即请求 | `boolean` | `true` |
| searchFormatter | 搜索参数格式化函数 | `(params: any) => any` | - |
| onError | 错误处理函数 | `(error: Error) => void` | - |
| onSuccess | 成功回调 | `(data: any) => void` | - |

### 返回值

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| tableProps | 表格属性 | `ComputedRef<TableProps>` |
| search | 搜索功能 | `{ submit: (params: Record<string, any>) => void; reset: () => void }` |
| dataSource | 数据源 | `Ref<TData['list']>` |
| loading | 加载状态 | `Ref<boolean>` |
| pagination | 分页状态 | `Ref<{ current: number; pageSize: number; total: number }>` |
| selectedRowKeys | 选中的行键 | `Ref<string[]>` |
| selectedRows | 选中的行数据 | `Ref<any[]>` |
| refresh | 刷新 | `() => Promise<void>` |
| reload | 重新加载 | `() => Promise<void>` |
| reset | 重置 | `() => void` |

### 类型定义

```ts
type Data = { total: number; list: any[] }

type Params = [
  {
    current: number
    pageSize: number
    filters?: any
    sorter?: any
    extra?: any
  },
  { [key: string]: any }
]
```

## 特性说明

### 自动分页

自动管理分页状态，包括当前页、每页条数、总数等。

### 搜索集成

提供搜索提交和重置功能，自动处理分页重置。

### 行选择管理

提供选中行键和行数据的管理。

### 响应式状态

所有状态都是响应式的，可以直接在模板中使用。

### 类型安全

完整的 TypeScript 类型支持，提供良好的开发体验。


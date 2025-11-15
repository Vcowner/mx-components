# Table 表格

高度可配置的表格组件，集成了搜索工具栏、自动滚动高度计算、多种列类型渲染等功能。

## 何时使用

- 需要展示结构化数据
- 需要搜索、筛选、分页等功能
- 需要自动计算滚动高度以适应容器
- 需要多种列类型的自动渲染（文本、标签、日期、状态等）

## 代码演示

<script setup>
import TableDemo1 from './demos/TableDemo1.vue'
import TableDemo2 from './demos/TableDemo2.vue'
import TableDemo3 from './demos/TableDemo3.vue'
import TableDemo4 from './demos/TableDemo4.vue'
import TableDemo5 from './demos/TableDemo5.vue'
</script>

### 基础用法

最简单的表格用法。

<TableDemo1 />

**完整代码：**

```vue
<template>
  <mx-table
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
  />
</template>

<script setup>
import { ref } from 'vue'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    type: 'text'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    type: 'text'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    type: 'status',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  }
]

const dataSource = ref([
  { id: 1, name: '张三', age: 25, status: 1 },
  { id: 2, name: '李四', age: 30, status: 0 }
])

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 2
})
</script>
```

### 带搜索工具栏

通过 `search-list` 和 `operate-list` 配置搜索和操作按钮。

<TableDemo2 />

**完整代码：**

```vue
<template>
  <mx-table
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
    :search-list="searchList"
    :operate-list="operateList"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script setup>
import { ref } from 'vue'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    type: 'text'
  }
]

const searchList = [
  {
    key: 'name',
    name: '姓名',
    type: 'input',
    placeholder: '请输入姓名'
  }
]

const operateList = [
  {
    label: '新增',
    type: 'primary',
    onClick: () => console.log('新增')
  }
]

const dataSource = ref([])
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0
})

function handleSearch(params) {
  console.log('搜索参数:', params)
  // 调用接口搜索
}

function handleReset() {
  console.log('重置')
}
</script>
```

### 列类型

支持多种列类型，自动渲染对应的组件。

<TableDemo3 />

**完整代码：**

```vue
<template>
  <mx-table
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
  />
</template>

<script setup>
import { ref } from 'vue'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    type: 'text'
  },
  {
    title: '标签',
    dataIndex: 'tag',
    key: 'tag',
    type: 'tag',
    color: 'blue'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    type: 'date'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    type: 'dateTime'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    type: 'status',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
    type: 'select',
    options: [
      { label: '技术', value: 'tech' },
      { label: '产品', value: 'product' },
      { label: '设计', value: 'design' }
    ]
  }
]

const dataSource = ref([
  {
    id: 1,
    name: '张三',
    tag: 'VIP',
    createTime: '2024-01-01',
    updateTime: '2024-01-01 10:30:00',
    status: 1,
    category: 'tech'
  },
  {
    id: 2,
    name: '李四',
    tag: '普通',
    createTime: '2024-01-02',
    updateTime: '2024-01-02 14:20:00',
    status: 0,
    category: 'product'
  }
])

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 2
})
</script>
```

#### 文本类型（text）

默认类型，支持文本省略和 Tooltip。

```vue
{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  type: 'text'
}
```

#### 标签类型（tag）

显示为标签，支持自定义颜色。

```vue
{
  title: '标签',
  dataIndex: 'tag',
  key: 'tag',
  type: 'tag',
  color: 'blue' // 可选：'default' | 'blue' | 'green' | 'red' 等
}
```

#### 日期类型（date）

自动格式化日期。

```vue
{
  title: '创建时间',
  dataIndex: 'createTime',
  key: 'createTime',
  type: 'date'
}
```

#### 日期时间类型（dateTime）

自动格式化日期时间。

```vue
{
  title: '更新时间',
  dataIndex: 'updateTime',
  key: 'updateTime',
  type: 'dateTime'
}
```

#### 选择类型（select）

根据选项列表显示对应文本。

```vue
{
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  type: 'select',
  options: [
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 }
  ]
}
```

#### 状态类型（status）

显示为 Badge 状态点。

```vue
{
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  type: 'status',
  options: [
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 }
  ]
}
```

#### 自定义类型（custom）

使用自定义渲染函数。

```vue
{
  title: '操作',
  dataIndex: 'action',
  key: 'action',
  type: 'custom',
  customRender: ({ text, record, index }) => {
    return h('a-button', {
      onClick: () => handleEdit(record)
    }, '编辑')
  }
}
```

### 自动滚动高度

组件会自动计算容器高度，并设置表格的滚动高度。当容器高度变化时，滚动高度会自动调整。

```vue
<template>
  <div style="height: 500px;">
    <mx-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
    />
  </div>
</template>
```

### 行选择

支持行选择功能。

<TableDemo4 />

**完整代码：**

```vue
<template>
  <mx-table
    :columns="columns"
    :data-source="dataSource"
    :row-selection="rowSelection"
    @selection-change="handleSelectionChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const rowSelection = ref({
  selectedRowKeys: [],
  onChange: (selectedRowKeys, selectedRows) => {
    console.log('选中的行:', selectedRowKeys, selectedRows)
  }
})

function handleSelectionChange(selectedRowKeys, selectedRows) {
  console.log('选择变化:', selectedRowKeys, selectedRows)
}
</script>
```

### 分页

支持分页功能。

<TableDemo5 />

**完整代码：**

```vue
<template>
  <mx-table
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
    @pagination-change="handlePaginationChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 100
})

function handlePaginationChange({ current, pageSize }) {
  console.log('分页变化:', current, pageSize)
  // 调用接口获取数据
}
</script>
```

## API

### Table Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表格列配置 | `TableColumn[]` | - |
| dataSource | 数据源 | `any[]` | - |
| pagination | 分页配置 | `PaginationConfig \| false` | - |
| rowKey | 行 key 的取值 | `string \| ((record: any) => string)` | `'id'` |
| loading | 加载状态 | `boolean` | `false` |
| bordered | 是否显示边框 | `boolean` | `false` |
| size | 表格尺寸 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| searchList | 搜索配置列表 | `SearchConfigItem[]` | - |
| operateList | 操作按钮配置列表 | `OperateButtonConfig[]` | - |
| rowSelection | 行选择配置 | `RowSelectionConfig` | - |
| scroll | 滚动配置 | `{ x?: number, y?: number }` | - |

### Table Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| paginationChange | 分页变化时触发 | `(pagination: { current: number, pageSize: number }) => void` |
| selectionChange | 选择变化时触发 | `(selectedRowKeys: string[], selectedRows: any[]) => void` |
| search | 搜索时触发 | `(params: Record<string, any>, reset?: boolean) => void` |
| reset | 重置时触发 | `(params: any) => void` |
| change | 表格变化时触发（分页、筛选、排序） | `(pagination, filters, sorter, extra) => void` |

### TableColumn

表格列配置，继承 `a-table` 的所有列属性，并扩展以下属性：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 列类型 | `'text' \| 'tag' \| 'date' \| 'dateTime' \| 'select' \| 'status' \| 'custom'` | `'text'` |
| options | 选项列表（用于 select、status 等类型） | `Array<{ label: string, value: any }>` | - |
| color | 标签颜色（用于 tag 类型） | `string` | `'default'` |
| customRender | 自定义渲染函数 | `(value: any, record: any, index: number) => any` | - |

## 特性说明

### 完全兼容 ant-design-vue Table

`MxTable` 完全兼容 `a-table` 的所有 props 和事件，可以直接替换使用。

### 增强功能

- ✅ **自动滚动高度计算** - 根据容器高度自动计算表格滚动高度
- ✅ **集成搜索工具栏** - 内置 `MxTableToolbar` 组件
- ✅ **多种列类型** - 支持文本、标签、日期、状态等多种类型自动渲染
- ✅ **文本省略** - 文本过长时自动省略并显示 Tooltip
- ✅ **类型安全** - 完整的 TypeScript 类型支持

### 列类型说明

- **text**: 文本类型，支持省略和 Tooltip
- **tag**: 标签类型，显示为 `a-tag`
- **date**: 日期类型，格式化为 `YYYY-MM-DD`
- **dateTime**: 日期时间类型，格式化为 `YYYY-MM-DD HH:mm:ss`
- **select**: 选择类型，根据选项列表显示对应文本
- **status**: 状态类型，显示为 `a-badge` 状态点
- **custom**: 自定义类型，使用 `customRender` 函数渲染

### 与 MxTableToolbar 的关系

`MxTable` 内部集成了 `MxTableToolbar` 组件，当提供了 `searchList` 或 `operateList` 时，会自动显示工具栏。你也可以单独使用 `MxTableToolbar` 组件。


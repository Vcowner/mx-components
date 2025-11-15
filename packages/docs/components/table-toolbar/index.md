# TableToolbar 表格工具栏

高度可配置的表格工具栏组件，提供了搜索表单和操作按钮的完整解决方案。

## 何时使用

- 表格页面的搜索和操作工具栏
- 需要动态配置搜索条件的场景
- 需要灵活布局操作按钮的场景

## 代码演示

<script setup>
import ToolbarDemo1 from './demos/ToolbarDemo1.vue'
import ToolbarDemo2 from './demos/ToolbarDemo2.vue'
import ToolbarDemo3 from './demos/ToolbarDemo3.vue'
import ToolbarDemo4 from './demos/ToolbarDemo4.vue'
</script>

### 基础用法

最简单的用法，配置搜索项和操作按钮。

<ToolbarDemo1 />

**完整代码：**

```vue
<template>
  <mx-table-toolbar
    :search-list="searchList"
    :operate-list="operateList"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script setup>
const searchList = [
  {
    key: 'name',
    name: '姓名',
    type: 'input',
    placeholder: '请输入姓名',
    width: 200
  },
  {
    key: 'status',
    name: '状态',
    type: 'select',
    placeholder: '请选择状态',
    options: [
      { key: '1', value: '启用' },
      { key: '0', value: '禁用' }
    ]
  }
]

const operateList = [
  {
    label: '新增',
    type: 'primary',
    position: 'left',
    onClick: () => console.log('新增')
  },
  {
    label: '导出',
    type: 'default',
    position: 'right',
    onClick: () => console.log('导出')
  }
]

function handleSearch(params) {
  console.log('搜索参数:', params)
}

function handleReset() {
  console.log('重置')
}
</script>
```

### 高级搜索

使用 `isHidden` 属性将搜索项放入高级搜索区域。

<ToolbarDemo2 />

**完整代码：**

```vue
<template>
  <mx-table-toolbar
    :search-list="searchList"
    @search="handleSearch"
  />
</template>

<script setup>
const searchList = [
  // 基础搜索项
  {
    key: 'name',
    name: '姓名',
    type: 'input',
    placeholder: '请输入姓名'
  },
  // 高级搜索项
  {
    key: 'createTime',
    name: '创建时间',
    type: 'date',
    placeholder: '请选择创建时间',
    isHidden: true // 在高级搜索中显示
  }
]
</script>
```

### 搜索类型

支持多种搜索控件类型。

#### input

基础输入框。

```vue
{
  key: 'name',
  name: '姓名',
  type: 'input',
  placeholder: '请输入姓名'
}
```

#### search

搜索输入框，带有搜索图标前缀。

```vue
{
  key: 'keyword',
  name: '关键词',
  type: 'search',
  placeholder: '请输入关键词'
}
```

#### select

下拉选择框。

```vue
{
  key: 'status',
  name: '状态',
  type: 'select',
  placeholder: '请选择状态',
  options: [
    { key: '1', value: '启用' },
    { key: '0', value: '禁用' }
  ]
}
```

#### date

日期选择器。

```vue
{
  key: 'createTime',
  name: '创建时间',
  type: 'date',
  placeholder: '请选择创建时间'
}
```

#### custom

自定义组件。

```vue
{
  key: 'customField',
  name: '自定义字段',
  type: 'custom',
  render: ({ value, onChange }) => {
    return h('a-input-number', {
      value,
      onChange,
      placeholder: '请输入数字',
      min: 0,
      max: 100
    })
  }
}
```

### 操作按钮类型

支持三种按钮类型：普通按钮、导入按钮、批量操作按钮。

<ToolbarDemo3 />

**完整代码：**

```vue
<template>
  <mx-table-toolbar
    :search-list="searchList"
    :operate-list="operateList"
    @search="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const selectedRows = ref([])

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
    position: 'left',
    onClick: () => {
      message.success('点击了新增按钮')
    }
  },
  {
    label: '导入',
    buttonType: 'import',
    position: 'left',
    onImport: (fileList) => {
      message.success(`导入了 ${fileList.length} 个文件`)
    }
  },
  {
    label: '批量删除',
    buttonType: 'batch',
    position: 'left',
    selectedItems: selectedRows.value,
    onClick: () => {
      message.success(`批量删除 ${selectedRows.value.length} 项`)
    }
  },
  {
    label: '导出',
    type: 'default',
    position: 'right',
    onClick: () => {
      message.success('点击了导出按钮')
    }
  }
]

function handleSearch(params) {
  message.info('搜索参数: ' + JSON.stringify(params))
}
</script>
```

### 完整示例

包含高级搜索和自定义组件的完整示例。

<ToolbarDemo4 />

**完整代码：**

```vue
<template>
  <mx-table-toolbar
    :search-list="searchList"
    :operate-list="operateList"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script setup>
import { h } from 'vue'
import { message } from 'ant-design-vue'

const searchList = [
  {
    key: 'name',
    name: '姓名',
    type: 'input',
    placeholder: '请输入姓名',
    width: 200
  },
  {
    key: 'status',
    name: '状态',
    type: 'select',
    placeholder: '请选择状态',
    options: [
      { key: '1', value: '启用' },
      { key: '0', value: '禁用' }
    ]
  },
  {
    key: 'createTime',
    name: '创建时间',
    type: 'date',
    placeholder: '请选择创建时间',
    isHidden: true,
    props: {
      format: 'YYYY-MM-DD'
    }
  },
  {
    key: 'age',
    name: '年龄',
    type: 'custom',
    isHidden: true,
    render: ({ value, onChange }) => {
      return h('a-input-number', {
        value,
        onChange,
        placeholder: '请输入年龄',
        min: 0,
        max: 100,
        style: { width: '100%' }
      })
    }
  }
]

const operateList = [
  {
    label: '新增',
    type: 'primary',
    position: 'left',
    onClick: () => {
      message.success('点击了新增按钮')
    }
  },
  {
    label: '批量删除',
    buttonType: 'batch',
    type: 'default',
    danger: true,
    position: 'left',
    selectedItems: [],
    onClick: () => {
      message.success('批量删除')
    }
  },
  {
    label: '导出',
    type: 'default',
    position: 'right',
    onClick: () => {
      message.success('点击了导出按钮')
    }
  }
]

function handleSearch(params) {
  message.info('搜索参数: ' + JSON.stringify(params))
}

function handleReset() {
  message.info('已重置')
}
</script>
```

## API

### TableToolbar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| searchList | 搜索配置列表 | `SearchConfigItem[]` | `[]` |
| operateList | 操作按钮配置列表 | `OperateButtonConfig[]` | `[]` |

### TableToolbar Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| search | 搜索事件 | `(payload: Record<string, any>, reset?: boolean) => void` |
| reset | 重置事件 | `(payload: any) => void` |

### SearchConfigItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 字段键名 | `string` | - |
| name | 显示名称 | `string` | - |
| type | 控件类型 | `'input' \| 'search' \| 'select' \| 'date' \| 'custom'` | - |
| placeholder | 占位符 | `string` | - |
| defaultValue | 默认值 | `any` | - |
| isHidden | 是否在高级搜索中显示 | `boolean` | `false` |
| width | 宽度（像素） | `number` | - |
| style | 自定义样式 | `Record<string, any>` | - |
| props | 组件属性 | `Record<string, any>` | - |
| options | 选项列表（select 类型） | `Array<string \| { key: string \| number, value: string \| number }>` | - |
| render | 自定义渲染函数（custom 类型） | `(ctx: { value: any, onChange: (v: any) => void }) => any` | - |

### OperateButtonConfig

操作按钮配置，支持三种类型：

#### ButtonConfig（普通按钮）

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 按钮文本 | `string` | - |
| buttonType | 按钮类型 | `'button'` | `'button'` |
| type | 按钮样式类型 | `'primary' \| 'default' \| 'dashed' \| 'link' \| 'text'` | `'default'` |
| position | 按钮位置 | `'left' \| 'right'` | `'left'` |
| onClick | 点击事件 | `() => void` | - |
| componentProps | MxButton 的额外 props | `Record<string, any>` | - |

#### ImportButtonConfig（导入按钮）

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 按钮文本 | `string` | - |
| buttonType | 按钮类型 | `'import'` | - |
| onImport | 导入事件 | `(fileList: any) => void` | - |
| onImportChange | 文件变化事件 | `(info: any) => void` | - |
| componentProps | MxImportButton 的额外 props | `Partial<MxImportButtonProps>` | - |

#### BatchButtonConfig（批量操作按钮）

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 按钮文本 | `string` | - |
| buttonType | 按钮类型 | `'batch'` | - |
| selectedItems | 选中的项 | `any[]` | - |
| onClick | 点击事件 | `() => void` | - |
| componentProps | MxBatchAction 的额外 props | `Partial<BatchActionProps>` | - |

## 特性说明

### 完全兼容 ant-design-vue Form

`MxTableToolbar` 内部使用 `a-form`，完全兼容 Ant Design Vue 的表单功能。

### 增强功能

- ✅ **可配置搜索表单** - 支持基础搜索和高级搜索两种模式
- ✅ **多种表单控件** - 支持 input、select、date、custom 等控件类型
- ✅ **灵活布局** - 支持左右两侧操作按钮布局
- ✅ **响应式设计** - 自适应不同屏幕尺寸
- ✅ **表单验证** - 集成 Ant Design Vue 表单验证
- ✅ **数据过滤** - 自动过滤空值，优化搜索参数
- ✅ **事件驱动** - 完整的搜索和重置事件支持

### 与 MxTable 的关系

`MxTable` 内部集成了 `MxTableToolbar` 组件，当提供了 `searchList` 或 `operateList` 时，会自动显示工具栏。你也可以单独使用 `MxTableToolbar` 组件。


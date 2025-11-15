# CustomTableToolbar 组件

## 概述

`CustomTableToolbar` 是一个高度可配置的表格工具栏组件，提供了搜索表单和操作按钮的完整解决方案。该组件支持多种表单控件类型，灵活的布局配置，以及丰富的自定义选项。

## 功能特性

- ✅ **可配置搜索表单** - 支持基础搜索和高级搜索两种模式
- ✅ **多种表单控件** - 支持 input、select、date、custom 等控件类型
- ✅ **灵活布局** - 支持左右两侧操作按钮布局
- ✅ **响应式设计** - 自适应不同屏幕尺寸
- ✅ **表单验证** - 集成 Ant Design Vue 表单验证
- ✅ **数据过滤** - 自动过滤空值，优化搜索参数
- ✅ **事件驱动** - 完整的搜索和重置事件支持

## 组件结构

```
CustomTableToolbar
├── 基础搜索区域
│   ├── 动态表单项
│   ├── 展开/收起按钮
│   └── 搜索/重置按钮
├── 高级搜索区域（可折叠）
│   └── 动态表单项
└── 操作按钮区域
    ├── 左侧按钮组
    └── 右侧按钮组
```

## Props

| 属性名        | 类型                    | 默认值 | 说明             |
| ------------- | ----------------------- | ------ | ---------------- |
| `searchList`  | `SearchConfigItem[]`    | `[]`   | 搜索配置列表     |
| `operateList` | `OperateButtonConfig[]` | `[]`   | 操作按钮配置列表 |

## Events

| 事件名   | 参数                                              | 说明     |
| -------- | ------------------------------------------------- | -------- |
| `search` | `(payload: Record<string, any>, reset?: boolean)` | 搜索事件 |
| `reset`  | `(payload: any)`                                  | 重置事件 |

## 类型定义

### SearchConfigItem

```typescript
interface SearchConfigItem {
  key: string // 字段键名
  name: string // 显示名称
  type: 'input' | 'search' | 'select' | 'date' | 'custom' // 控件类型
  placeholder?: string // 占位符
  defaultValue?: any // 默认值
  isHidden?: boolean // 是否在高级搜索中显示
  width?: number // 宽度（像素）
  style?: Record<string, any> // 自定义样式
  props?: Record<string, any> // 组件属性
  options?: Array<string | { key: string; value: string }> // 选项列表（select 类型）
  render?: Function // 自定义渲染函数（custom 类型）
}
```

### OperateButtonConfig

```typescript
interface OperateButtonConfig {
  label: string // 按钮文本
  icon?: VNode | (() => VNode) | any // 按钮图标
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text' // 按钮类型
  size?: 'small' | 'middle' | 'large' // 按钮大小
  onClick?: () => void // 点击事件
  loading?: boolean // loading 状态
  disabled?: boolean // 是否禁用
  show?: boolean // 是否显示（默认 true）
  permission?: string // 权限标识（可选，业务自用）
  danger?: boolean // 是否危险按钮（红色）
  position?: 'left' | 'right' // 按钮位置
  [key: string]: any // 其他扩展属性
}
```

## 使用示例

### 基础用法

```vue
<template>
  <CustomTableToolbar
    :search-list="searchList"
    :operate-list="operateList"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script setup>
import CustomTableToolbar from '@/components/CustomTableToolbar/CustomTableToolbar.vue'

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
    isHidden: true // 在高级搜索中显示
  }
]

const operateList = [
  {
    label: '新增',
    type: 'primary',
    icon: PlusOutlined,
    position: 'left',
    onClick: () => console.log('新增')
  },
  {
    label: '导出',
    type: 'default',
    icon: DownloadOutlined,
    position: 'right',
    onClick: () => console.log('导出')
  }
]

function handleSearch(params) {
  console.log('搜索参数:', params)
}

function handleReset(params) {
  console.log('重置参数:', params)
}
</script>
```

### 高级用法

```vue
<template>
  <CustomTableToolbar
    :search-list="advancedSearchList"
    :operate-list="advancedOperateList"
    @search="handleAdvancedSearch"
    @reset="handleAdvancedReset"
  />
</template>

<script setup>
const advancedSearchList = [
  // 基础搜索项
  {
    key: 'keyword',
    name: '关键词',
    type: 'search',
    placeholder: '请输入关键词',
    width: 300
  },
  {
    key: 'category',
    name: '分类',
    type: 'select',
    placeholder: '请选择分类',
    options: ['技术', '产品', '设计', '运营']
  },

  // 高级搜索项
  {
    key: 'dateRange',
    name: '日期范围',
    type: 'date',
    placeholder: '请选择日期范围',
    isHidden: true,
    props: {
      range: true
    }
  },
  {
    key: 'customField',
    name: '自定义字段',
    type: 'custom',
    isHidden: true,
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
]

const advancedOperateList = [
  {
    label: '批量删除',
    type: 'default',
    danger: true,
    icon: DeleteOutlined,
    position: 'left',
    disabled: true,
    onClick: () => console.log('批量删除')
  },
  {
    label: '导入数据',
    type: 'default',
    icon: UploadOutlined,
    position: 'right',
    onClick: () => console.log('导入数据')
  }
]
</script>
```

## 表单控件类型

### input

基础输入框，支持所有 `a-input` 的属性。

```typescript
{
  key: 'name',
  name: '姓名',
  type: 'input',
  placeholder: '请输入姓名',
  props: {
    maxLength: 50,
    allowClear: true
  }
}
```

### search

搜索输入框，带有搜索图标前缀。

```typescript
{
  key: 'keyword',
  name: '关键词',
  type: 'search',
  placeholder: '请输入关键词'
}
```

### select

下拉选择框，支持字符串数组或对象数组。

```typescript
// 字符串数组
{
  key: 'status',
  name: '状态',
  type: 'select',
  options: ['启用', '禁用']
}

// 对象数组
{
  key: 'category',
  name: '分类',
  type: 'select',
  options: [
    { key: 'tech', value: '技术' },
    { key: 'product', value: '产品' }
  ]
}
```

### date

日期选择器，支持所有 `a-date-picker` 的属性。

```typescript
{
  key: 'createTime',
  name: '创建时间',
  type: 'date',
  placeholder: '请选择创建时间',
  props: {
    format: 'YYYY-MM-DD',
    showTime: true
  }
}
```

### custom

自定义组件，通过 `render` 函数渲染。

```typescript
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

## 样式定制

组件使用 Tailwind CSS 和自定义 CSS 类，支持以下样式定制：

### CSS 类名

- `.table-toolbar` - 工具栏容器
- `.toolbar-search-row` - 基础搜索行
- `.toolbar-advanced-row` - 高级搜索区域
- `.advanced-form` - 高级搜索表单
- `.toolbar-action-row` - 操作按钮行

### 自定义样式示例

```vue
<style scoped>
/* 自定义工具栏样式 */
.table-toolbar {
  background: #fafafa;
  border-radius: 8px;
  padding: 16px;
}

/* 自定义高级搜索区域 */
.toolbar-advanced-row {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* 自定义按钮样式 */
.toolbar-action-row :deep(.ant-btn) {
  border-radius: 6px;
  font-weight: 500;
}
</style>
```

## 最佳实践

### 1. 搜索项配置

- 常用搜索项放在基础搜索区域（`isHidden: false`）
- 复杂搜索项放在高级搜索区域（`isHidden: true`）
- 合理设置搜索项宽度，避免布局混乱

### 2. 操作按钮配置

- 主要操作放在左侧（`position: 'left'`）
- 次要操作放在右侧（`position: 'right'`）
- 危险操作使用 `danger: true`

### 3. 性能优化

- 避免在 `render` 函数中创建复杂组件
- 合理使用 `show` 属性控制按钮显示
- 大数据量时考虑虚拟滚动

### 4. 事件处理

- 搜索事件中过滤空值，减少不必要的请求
- 重置事件中清理表单状态
- 使用防抖处理频繁的搜索操作

## 注意事项

1. **表单验证**：组件依赖 Ant Design Vue 的表单验证，确保正确配置 `name` 属性
2. **数据绑定**：搜索数据通过 `v-model` 绑定，确保 `key` 值唯一
3. **图标使用**：操作按钮图标需要从 `@ant-design/icons-vue` 导入
4. **响应式**：组件支持响应式布局，但建议在移动端测试
5. **类型安全**：建议使用 TypeScript 以获得更好的类型提示

## 更新日志

### v1.0.0

- 初始版本发布
- 支持基础搜索和高级搜索
- 支持多种表单控件类型
- 支持左右两侧操作按钮布局
- 完整的 TypeScript 类型支持

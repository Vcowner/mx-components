# TableAction 表格操作栏

用于表格中的操作列，自动将多余的操作项折叠到下拉菜单中。

## 何时使用

- 表格操作列，操作项较多时自动折叠
- 需要节省空间，只显示关键操作
- 操作项的数量可能动态变化

## 代码演示

<script setup>
import Demo1 from './demos/Demo1.vue'
import Demo2 from './demos/Demo2.vue'
import Demo3 from './demos/Demo3.vue'
import Demo4 from './demos/Demo4.vue'
import Demo5 from './demos/Demo5.vue'
import TableDemo from './demos/TableDemo.vue'
</script>

### 基础用法

默认最多显示 3 个操作按钮，超过的部分会自动折叠到下拉菜单中。

<Demo1 />

**完整代码：**

```vue
<template>
  <mx-table-action 
    :actions="actions" 
    @click="handleAction"
  />
</template>

<script setup>
const actions = [
  { label: '编辑', key: 'edit' },
  { label: '删除', key: 'delete' },
  { label: '查看', key: 'view' },
  { label: '复制', key: 'copy' }
]

const handleAction = (action) => {
  console.log('执行操作:', action.key)
}
</script>
```

### 自定义显示数量

通过 `maxCount` 属性控制最多显示多少个按钮。

<Demo2 />

**完整代码：**

```vue
<template>
  <mx-table-action 
    :actions="actions" 
    :max-count="2"
    @click="handleAction"
  />
</template>

<script setup>
const actions = [
  { label: '编辑', key: 'edit' },
  { label: '删除', key: 'delete' },
  { label: '查看', key: 'view' }
]
</script>
```

### 带禁用状态

<Demo3 />

**完整代码：**

```vue
<template>
  <mx-table-action 
    :actions="actions" 
    @click="handleAction"
  />
</template>

<script setup>
const actions = [
  { label: '编辑', key: 'edit' },
  { label: '删除', key: 'delete', disabled: true },
  { label: '查看', key: 'view' }
]
</script>
```

### 大量操作项

<Demo4 />

### 权限控制

配置 `permission` 属性，无权限的操作项会自动隐藏。

<Demo5 />

**完整代码：**

```vue
<template>
  <mx-table-action :actions="actions" />
</template>

<script setup>
import { message } from 'ant-design-vue'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons-vue'

const actions = [
  { 
    label: '编辑', 
    icon: EditOutlined,
    permission: 'edit',
    onClick: () => message.success('编辑操作')
  },
  { 
    label: '删除', 
    icon: DeleteOutlined,
    permission: 'delete', // 无权限，会自动隐藏
    danger: true,
    onClick: () => message.success('删除操作')
  },
  { 
    label: '查看', 
    icon: EyeOutlined,
    permission: 'view',
    onClick: () => message.success('查看操作')
  }
]
</script>
```

**应用配置示例：**

```vue
<!-- main.ts 或 app.vue -->
<script setup>
import { provide } from 'vue'

// 配置权限检查函数
const checkPermission = (permission: string | string[]) => {
  const userPermissions = ['edit', 'view'] // 从后端获取用户权限
  
  if (Array.isArray(permission)) {
    return permission.some(p => userPermissions.includes(p))
  }
  return userPermissions.includes(permission)
}

// 提供给所有子组件使用
provide('checkPermission', checkPermission)
</script>
```

### 在表格中使用

完整的表格示例，展示 TableAction 在实际场景中的应用。

<TableDemo />

**完整代码：**

```vue
<template>
  <a-table :columns="columns" :data-source="data" :pagination="false">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <mx-table-action 
          :actions="getActions(record)" 
          :max-count="2"
        />
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { message } from 'ant-design-vue'
import { EditOutlined, DeleteOutlined, EyeOutlined, CopyOutlined } from '@ant-design/icons-vue'

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
  { title: '操作', key: 'action', width: 120 }
]

const data = [
  { key: '1', name: '张三', age: 32, address: '西湖区湖底公园1号' },
  { key: '2', name: '李四', age: 42, address: '西湖区湖底公园2号' }
]

import { EditOutlined, DeleteOutlined, EyeOutlined, CopyOutlined } from '@ant-design/icons-vue'

const getActions = (record) => {
  return [
    { 
      label: '编辑', 
      key: 'edit', 
      icon: EditOutlined,
      onClick: (action) => {
        message.success(`编辑 ${action.record.name}`)
      }
    },
    { 
      label: '删除', 
      key: 'delete', 
      icon: DeleteOutlined,
      danger: true,
      onClick: (action) => {
        message.success(`删除 ${action.record.name}`)
      }
    },
    { 
      label: '查看', 
      key: 'view', 
      icon: EyeOutlined,
      onClick: (action) => {
        message.success(`查看 ${action.record.name}`)
      }
    },
    { 
      label: '复制', 
      key: 'copy', 
      icon: CopyOutlined,
      onClick: (action) => {
        message.success(`复制 ${action.record.name}`)
      }
    }
  ]
}
</script>
```

## API

### TableAction Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| actions | 操作项列表 | `TableActionItem[]` | - |
| maxCount | 最多显示多少个按钮 | `number` | `3` |
| spacing | 按钮间距（像素） | `number` | `8` |
| size | 按钮尺寸 | `'large' \| 'middle' \| 'small'` | `'small'` |

### ActionItem 数据结构

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| label | 按钮文本 | `string` | - |
| key | 操作唯一标识 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| icon | 图标组件 | `Component` | - |
| permission | 权限标识 | `string \| string[]` | - |
| onClick | 点击回调 | `(action: TableActionItem) => void` | - |
| slot | 插槽名称 | `string` | - |
| actionType | 操作类型：`'delete'`（删除操作）或 `'custom'`（自定义组件） | `'delete' \| 'custom'` | - |
| component | 自定义组件（当 actionType === 'custom' 时使用） | `Component` | - |
| componentProps | 传递给自定义组件的属性（当 actionType === 'custom' 时使用） | `Record<string, any>` | - |
| deleteProps | 删除按钮的配置（仅当 actionType === 'delete' 时有效） | `Partial<MxDeleteButtonProps>` | - |
| 其他按钮属性 | 可传入任意 Button 支持的属性，如 `danger`、`ghost`、`loading` 等 | `any` | - |

### TableAction Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击操作项后触发 | `(action: TableActionItem) => void` |

## 特性说明

### 自动响应式折叠

组件会根据容器宽度自动计算可见按钮数量，自动将多余的操作项折叠到下拉菜单中。

### 权限控制

支持权限配置，无权限的操作项会自动隐藏：

```vue
const actions = [
  { label: '编辑', permission: 'edit' },
  { label: '删除', permission: 'delete' }
]
```

### 图标支持

每个操作项可以配置图标：

```vue
import { EditOutlined } from '@ant-design/icons-vue'

const actions = [
  { label: '编辑', icon: EditOutlined }
]
```

### 删除操作

使用 `actionType: 'delete'` 可以启用删除操作，会自动使用 `MxDeleteButton`，具有删除图标、危险样式和确认对话框：

```vue
const actions = [
  {
    label: '删除',
    actionType: 'delete',
    deleteProps: {
      confirm: '确定要删除吗？',
      confirmType: 'modal'
    },
    onClick: (action) => {
      console.log('删除操作')
    }
  }
]
```

### 自定义组件

使用 `actionType: 'custom'` 可以自定义操作按钮组件：

```vue
import MyCustomButton from './MyCustomButton.vue'

const actions = [
  {
    label: '自定义操作',
    actionType: 'custom',
    component: MyCustomButton,
    componentProps: {
      customProp: 'value'
    },
    onClick: (action) => {
      console.log('自定义操作')
    }
  }
]
```

### 按钮属性透传

可以传入任意按钮属性，如 `danger`、`ghost`、`loading` 等：

```vue
const actions = [
  { label: '删除', danger: true, onClick: handleDelete }
]
```

### 点击事件处理

支持两种方式处理点击：

1. **配置 onClick**（推荐）：在 actions 中直接配置

```vue
const actions = [
  { 
    label: '编辑', 
    onClick: (action) => {
      console.log(action.record)
    }
  }
]
```

2. **监听 @click 事件**

```vue
<mx-table-action :actions="actions" @click="handleClick" />
```

## 注意事项

1. **自动折叠**：当操作项数量超过 `maxCount` 时，多余的会自动放入下拉菜单
2. **权限控制**：需要配置权限检查函数，通过 Provide/Inject 注入
3. **Link 按钮**：所有按钮默认使用 link 类型，节省空间
4. **自定义内容**：支持通过插槽自定义按钮显示内容
5. **宽度检测**：组件会自动检测容器宽度，响应式调整可见按钮数量


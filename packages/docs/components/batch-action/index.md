# BatchAction 批量操作

用于批量操作场景，根据选中的项数组显示操作按钮。

## 何时使用

- 表格批量操作（批量删除、批量导出等）
- 列表多选后的批量处理
- 需要根据选中项数量动态显示文案

## 代码演示

<script setup>
import Demo1 from './demos/Demo1.vue'
import Demo2 from './demos/Demo2.vue'
import Demo3 from './demos/Demo3.vue'
import Demo4 from './demos/Demo4.vue'
</script>

### 基础用法

最简单的用法，传入选中的项数组即可。

<Demo1 />

**完整代码：**

```vue
<template>
  <mx-batch-action
    :selected-items="selectedItems"
    label="批量删除"
    icon-type="cancel"
    @click="handleBatchDelete"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedItems = ref([
  { id: 1, name: '项目1' },
  { id: 2, name: '项目2' }
])

function handleBatchDelete(items) {
  console.log('选中的项：', items)
  // 执行批量删除
}
</script>
```

### 动态文案

使用函数形式的 `label`，可以根据选中项数量动态显示文案。

<Demo2 />

**完整代码：**

```vue
<template>
  <mx-batch-action
    :selected-items="selectedItems"
    :label="(items) => `批量删除(${items.length})`"
    icon-type="cancel"
    type="default"
    @click="handleBatchDelete"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedItems = ref([])

function handleBatchDelete(items) {
  console.log('删除', items.length, '项')
}
</script>
```

### 完整功能演示

包含防抖、加载状态、权限控制等功能。

<Demo3 />

### 批量删除

使用 `action-type="delete"` 可以启用批量删除功能，会自动使用 `MxDeleteButton`，具有删除图标、危险样式和确认对话框。

<Demo4 />

**完整代码：**

```vue
<template>
  <mx-batch-action
    action-type="delete"
    :selected-items="selectedItems"
    :label="(items) => `批量删除(${items.length})`"
    @click="handleBatchDelete"
  />
  
  <!-- 自定义确认文案 -->
  <mx-batch-action
    action-type="delete"
    :selected-items="selectedItems"
    label="批量删除"
    :confirm="`确定要删除选中的 ${selectedItems.length} 条记录吗？删除后无法恢复！`"
    @click="handleBatchDelete"
  />
  
  <!-- 使用气泡确认框 -->
  <mx-batch-action
    action-type="delete"
    :selected-items="selectedItems"
    label="批量删除"
    confirm-type="popconfirm"
    :confirm="`确定要删除 ${selectedItems.length} 项吗？`"
    @click="handleBatchDelete"
  />
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const selectedItems = ref([])

async function handleBatchDelete(items) {
  // 执行批量删除
  await deleteItems(items)
  message.success(`成功删除 ${items.length} 项`)
  selectedItems.value = []
}
</script>
```

## API

### BatchAction Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| selectedItems | 选中的项数组 | `any[]` | `[]` |
| label | 按钮文案，支持函数形式 | `string \| ((selectedItems: any[]) => string)` | `'批量操作'` |
| actionType | 操作类型：default（普通操作）或 delete（删除操作） | `'default' \| 'delete'` | `'default'` |
| iconType | 图标类型（仅普通操作有效） | `'edit' \| 'view' \| 'copy' \| 'add' \| 'refresh' \| 'save' \| 'cancel' \| 'print' \| 'export'` | - |
| type | 按钮类型 | `'primary' \| 'default' \| 'dashed' \| 'link' \| 'text'` | `'default'` |
| permission | 权限控制 | `string \| string[]` | - |
| debounce | 防抖延迟时间（毫秒，仅普通操作有效） | `number` | `0` |
| loading | 加载状态 | `boolean` | `false` |
| disabledWhenEmpty | 无选择时是否禁用 | `boolean` | `true` |
| confirm | 确认对话框文案（仅删除操作有效） | `string` | `'确定要删除选中的项吗？'` |
| confirmType | 确认类型：modal（模态框）或 popconfirm（气泡确认），仅删除操作有效 | `'modal' \| 'popconfirm'` | `'modal'` |
| confirmTitle | 确认标题（仅删除操作且 confirmType 为 modal 时有效） | `string` | `'确认删除'` |
| okText | 确认按钮文案（仅删除操作有效） | `string` | `'确定'` |
| cancelText | 取消按钮文案（仅删除操作有效） | `string` | `'取消'` |
| hideIcon | 是否隐藏图标（仅删除操作有效） | `boolean` | `false` |

### BatchAction Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击按钮后触发 | `(selectedItems: any[]) => void` |

## 特性说明

### 自动禁用

当 `selectedItems` 为空且 `disabledWhenEmpty` 为 `true`（默认）时，按钮会自动禁用。

### 动态文案

`label` 支持函数形式，可以根据选中项动态显示文案：

```vue
:label="(items) => `批量删除(${items.length})`"
```

### 权限控制

支持权限配置，无权限时按钮自动隐藏：

```vue
<mx-batch-action
  :selected-items="selectedItems"
  label="批量删除"
  permission="batch.delete"
  @click="handleDelete"
/>
```

### 防抖支持

可以设置防抖时间，防止快速重复点击（仅普通操作有效）：

```vue
<mx-batch-action
  :selected-items="selectedItems"
  label="批量删除"
  :debounce="300"
  @click="handleDelete"
/>
```

### 批量导出

使用 `icon-type="export"` 可以快速实现批量导出功能。导出按钮会自动显示导出图标，支持加载状态和权限控制：

```vue
<mx-batch-action
  :selected-items="selectedItems"
  :label="(items) => `批量导出(${items.length})`"
  icon-type="export"
  type="primary"
  :loading="exporting"
  @click="handleBatchExport"
/>
```

### 批量删除

使用 `action-type="delete"` 可以启用批量删除功能，组件会自动使用 `MxDeleteButton`，具有以下特性：

- **自动删除图标**：显示删除图标（可通过 `hide-icon` 隐藏）
- **危险样式**：自动应用危险样式
- **确认对话框**：默认显示确认对话框，防止误操作
- **加载状态同步**：加载状态会同步显示在按钮和确认对话框的确认按钮上

```vue
<!-- 基础用法 -->
<mx-batch-action
  action-type="delete"
  :selected-items="selectedItems"
  :label="(items) => `批量删除(${items.length})`"
  @click="handleBatchDelete"
/>

<!-- 自定义确认文案 -->
<mx-batch-action
  action-type="delete"
  :selected-items="selectedItems"
  label="批量删除"
  :confirm="`确定要删除选中的 ${selectedItems.length} 条记录吗？删除后无法恢复！`"
  @click="handleBatchDelete"
/>

<!-- 使用气泡确认框 -->
<mx-batch-action
  action-type="delete"
  :selected-items="selectedItems"
  label="批量删除"
  confirm-type="popconfirm"
  :confirm="`确定要删除 ${selectedItems.length} 项吗？`"
  @click="handleBatchDelete"
/>

<!-- 无确认直接删除 -->
<mx-batch-action
  action-type="delete"
  :selected-items="selectedItems"
  label="批量删除"
  :confirm="''"
  @click="handleBatchDelete"
/>
```

### 与表格结合使用

通常与表格的 `row-selection` 结合使用：

```vue
<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :row-selection="{ selectedRowKeys, onChange: handleSelectionChange }"
    />
    
    <mx-batch-action
      :selected-items="selectedRows"
      :label="(items) => `批量删除(${items.length})`"
      icon-type="cancel"
      @click="handleBatchDelete"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedRowKeys = ref([])
const selectedRows = ref([])

function handleSelectionChange(keys, rows) {
  selectedRowKeys.value = keys
  selectedRows.value = rows
}

function handleBatchDelete(items) {
  console.log('删除选中的项：', items)
}
</script>
```


# DeleteButton 删除按钮

删除按钮是专用于删除操作的业务按钮组件，自动带有删除图标和危险样式，并支持确认对话框。

## 何时使用

- 需要执行删除操作时
- 需要确认后删除的场景
- 列表中的删除操作

## 代码演示

<script setup>
import DeleteDemo1 from './demos/DeleteDemo1.vue'
import DeleteDemo2 from './demos/DeleteDemo2.vue'
import DeleteDemo3 from './demos/DeleteDemo3.vue'
import DeleteDemo4 from './demos/DeleteDemo4.vue'
import DeleteDemo5 from './demos/DeleteDemo5.vue'
import DeleteDemo6 from './demos/DeleteDemo6.vue'
import DeleteDemo7 from './demos/DeleteDemo7.vue'
import DeleteDemo8 from './demos/DeleteDemo8.vue'
import DeleteDemo9 from './demos/DeleteDemo9.vue'
import DeleteDemo10 from './demos/DeleteDemo10.vue'
</script>

### 基础用法

最简单的删除按钮，点击后会弹出确认对话框。

<DeleteDemo1 />

**完整代码：**

```vue
<template>
  <mx-delete-button @delete="handleDelete" />
</template>

<script setup>
const handleDelete = () => {
  console.log('删除')
}
</script>
```

### 自定义按钮文案

可以自定义按钮显示的内容，默认显示"删除"。

<DeleteDemo2 />

**完整代码：**

```vue
<template>
  <mx-delete-button @delete="handleDelete">删除此记录</mx-delete-button>
  <mx-delete-button @delete="handleDelete">移除</mx-delete-button>
  <mx-delete-button @delete="handleDelete">清理</mx-delete-button>
</template>

<script setup>
const handleDelete = () => {
  console.log('删除')
}
</script>
```

### 自定义确认文案

可以自定义确认对话框的提示文案。

<DeleteDemo3 />

**完整代码：**

```vue
<template>
  <mx-delete-button 
    confirm="确定要删除这条记录吗？删除后无法恢复！"
    @delete="handleDelete"
  >
    删除
  </mx-delete-button>
  
  <mx-delete-button 
    confirm="此操作将永久删除，是否继续？"
    @delete="handleDelete"
  >
    永久删除
  </mx-delete-button>
</template>

<script setup>
const handleDelete = () => {
  console.log('删除')
}
</script>
```

### 气泡确认框

使用 `confirm-type="popconfirm"` 可以显示气泡确认框，而不是模态框。

<DeleteDemo10 />

**完整代码：**

```vue
<template>
  <mx-delete-button 
    confirm-type="popconfirm"
    confirm="确定要删除这条记录吗？"
    @delete="handleDelete"
  >
    删除
  </mx-delete-button>
</template>

<script setup>
const handleDelete = () => {
  console.log('删除')
}
</script>
```

### 关闭确认对话框

如果不需要确认对话框，可以设置 `confirm` 为空字符串。

<DeleteDemo4 />

**完整代码：**

```vue
<template>
  <mx-delete-button 
    :confirm="''"
    @delete="handleDelete"
  >
    直接删除
  </mx-delete-button>
</template>

<script setup>
const handleDelete = () => {
  console.log('删除')
}
</script>
```

### 按钮尺寸

支持三种尺寸：large、middle（默认）、small。

<DeleteDemo5 />

**完整代码：**

```vue
<template>
  <mx-delete-button size="large" @delete="handleDelete">大按钮</mx-delete-button>
  <mx-delete-button size="middle" @delete="handleDelete">中按钮</mx-delete-button>
  <mx-delete-button size="small" @delete="handleDelete">小按钮</mx-delete-button>
</template>

<script setup>
const handleDelete = () => {
  console.log('删除')
}
</script>
```

### 按钮类型

支持多种按钮类型。

<DeleteDemo6 />

**完整代码：**

```vue
<template>
  <mx-delete-button type="primary" @delete="handleDelete">主要按钮</mx-delete-button>
  <mx-delete-button type="default" @delete="handleDelete">默认按钮</mx-delete-button>
  <mx-delete-button type="dashed" @delete="handleDelete">虚线按钮</mx-delete-button>
  <mx-delete-button type="text" @delete="handleDelete">文本按钮</mx-delete-button>
</template>

<script setup>
const handleDelete = () => {
  console.log('删除')
}
</script>
```

### 加载状态

删除操作通常需要调用接口，可以使用 `loading` 属性显示加载状态。加载状态会同时显示在：
- 按钮本身
- 气泡确认框（Popconfirm）的确认按钮
- 对话框（Modal）的确认按钮

<DeleteDemo7 />

**完整代码：**

```vue
<template>
  <!-- 模态框确认方式 -->
  <mx-delete-button 
    :loading="loading"
    confirm="确定要删除这条记录吗？"
    @delete="handleDelete"
  >
    删除
  </mx-delete-button>
  
  <!-- 气泡确认方式 -->
  <mx-delete-button 
    :loading="loading"
    confirm-type="popconfirm"
    confirm="确定要删除这条记录吗？"
    @delete="handleDelete"
  >
    删除
  </mx-delete-button>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const loading = ref(false)

async function handleDelete() {
  loading.value = true
  try {
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    message.success('删除成功')
  } finally {
    loading.value = false
  }
}
</script>
```

### 自定义图标

可以隐藏默认图标，或通过插槽自定义图标。

<DeleteDemo8 />

**完整代码：**

```vue
<template>
  <mx-delete-button show-icon @delete="handleDelete">
    删除
  </mx-delete-button>
  
  <mx-delete-button 
    :hide-icon="true"
    @delete="handleDelete"
  >
    移除（无图标）
  </mx-delete-button>
</template>

<script setup>
const handleDelete = () => {
  console.log('删除')
}
</script>
```

### 权限控制

支持权限控制，无权限时按钮自动隐藏。

<DeleteDemo9 />

**完整代码：**

```vue
<template>
  <mx-delete-button 
    permission="delete"
    @delete="handleDelete"
  >
    删除
  </mx-delete-button>
  
  <mx-delete-button 
    :permission="['edit', 'delete']"
    @delete="handleDelete"
  >
    删除（多权限）
  </mx-delete-button>
</template>

<script setup>
const handleDelete = () => {
  console.log('删除')
}
</script>
```

## API

### DeleteButton Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 按钮类型 | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | `'default'` |
| size | 按钮尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 加载状态 | `boolean` | `false` |
| customClass | 自定义类名 | `string` | `''` |
| permission | 权限控制 | `string \| string[]` | - |
| confirm | 确认对话框文案 | `string` | `'确定要删除吗？'` |
| confirmType | 确认类型 | `'modal' \| 'popconfirm'` | `'modal'` |
| confirmTitle | 确认标题（仅 modal 类型） | `string` | `'确认删除'` |
| okText | 确认按钮文案 | `string` | `'确定'` |
| cancelText | 取消按钮文案 | `string` | `'取消'` |
| hideIcon | 是否隐藏图标 | `boolean` | `false` |

### DeleteButton Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| delete | 确认删除后触发 | - |

## 特性说明

### 自动危险样式

删除按钮自动应用 `danger` 样式，视觉效果更加醒目。

### 确认对话框

默认会弹出确认对话框，防止误操作。可以通过设置 `confirm` 为空字符串来关闭。

支持两种确认方式：
- **模态框（Modal）**：默认方式，显示在页面中央的对话框
- **气泡确认框（Popconfirm）**：通过 `confirm-type="popconfirm"` 设置，显示在按钮附近的气泡提示

两种方式都支持加载状态，当 `loading` 为 `true` 时，确认按钮会显示加载动画，防止重复提交。

### 加载状态同步

当设置 `loading` 属性时，加载状态会同步显示在以下位置：
1. **按钮本身**：按钮显示 loading 图标和禁用状态
2. **气泡确认框**：确认按钮显示 loading 状态
3. **对话框确认按钮**：确认按钮显示 loading 状态并禁用

这样可以确保在删除操作进行中，用户无法重复点击，提供更好的用户体验。

### 权限控制

支持权限配置，无权限时按钮自动隐藏：

```vue
<mx-delete-button
  permission="delete"
  @delete="handleDelete"
>
  删除
</mx-delete-button>
```

### 与表格结合使用

通常与表格操作列结合使用：

```vue
<template>
  <a-table :columns="columns" :data-source="dataSource">
    <template #action="{ record }">
      <mx-delete-button 
        @delete="() => handleDelete(record)"
      >
        删除
      </mx-delete-button>
    </template>
  </a-table>
</template>

<script setup>
const handleDelete = (record) => {
  console.log('删除记录：', record)
}
</script>
```


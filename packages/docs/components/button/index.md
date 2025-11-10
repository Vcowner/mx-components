# Button 按钮

按钮用于开始一个操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

## 代码演示

### 按钮类型

按钮有五种类型：主要按钮、默认按钮、虚线按钮、文本按钮和链接按钮。通过设置 type 为 primary dashed text link 来创建不同类型的按钮。

<script setup>
import ButtonDemo1 from './demos/ButtonDemo1.vue'
import ButtonDemo2 from './demos/ButtonDemo2.vue'
import ButtonDemo3 from './demos/ButtonDemo3.vue'
import ButtonDemo4 from './demos/ButtonDemo4.vue'
import ButtonDemo5 from './demos/ButtonDemo5.vue'
import ButtonDemo6 from './demos/ButtonDemo6.vue'
import ButtonDemo7 from './demos/ButtonDemo7.vue'
import ButtonDemo8 from './demos/ButtonDemo8.vue'
</script>

<ButtonDemo1 />

**完整代码：**

```vue
<template>
  <div class="demo">
  <mx-button type="primary">Primary Button</mx-button>
  <mx-button>Default Button</mx-button>
  <mx-button type="dashed">Dashed Button</mx-button>
  <mx-button type="text">Text Button</mx-button>
  <mx-button type="link">Link Button</mx-button>
  <mx-button type="primary" :danger="true">Danger</mx-button>
  </div>
</template>

<style scoped>
.demo {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
```

### 图标按钮

当需要在 Button 内嵌入 Icon 时，可以使用两种方式：

#### 方式一：使用插槽

<ButtonDemo4 />

**完整代码：**

```vue
<template>
  <div class="demo">
    <mx-button type="primary">
      <template #icon>
        <SearchOutlined />
      </template>
      搜索
    </mx-button>
  </div>
</template>

<script setup>
import { SearchOutlined } from '@ant-design/icons-vue'
</script>
```

#### 方式二：使用预设图标类型

使用 `icon-type` 属性可以快速设置常用图标和默认文案：

<ButtonDemo5 />

**完整代码：**

```vue
<template>
  <div class="demo">
    <mx-button icon-type="edit" @click="handleEdit">编辑</mx-button>
    <mx-button icon-type="view" @click="handleView">查看</mx-button>
    <mx-button icon-type="copy" @click="handleCopy">复制</mx-button>
    <mx-button icon-type="add" type="primary" @click="handleAdd">新增</mx-button>
    <mx-button icon-type="refresh" @click="handleRefresh">刷新</mx-button>
    <mx-button icon-type="save" type="primary" @click="handleSave">保存</mx-button>
    <mx-button icon-type="cancel" @click="handleCancel">取消</mx-button>
    <mx-button icon-type="print" @click="handlePrint">打印</mx-button>
    <mx-button icon-type="export" @click="handleExport">导出</mx-button>
  </div>
</template>
```

**支持的预设图标类型：**
- `edit` - 编辑
- `view` - 查看
- `copy` - 复制
- `add` - 新增
- `refresh` - 刷新
- `save` - 保存
- `cancel` - 取消
- `print` - 打印
- `export` - 导出

#### 自定义图标和文案

如果需要隐藏图标，可以使用 `hide-icon` 属性。如果需要自定义文案，可以使用 `default-text` 属性或直接使用插槽：

<ButtonDemo8 />

**完整代码：**

```vue
<template>
  <div class="demo">
    <mx-button icon-type="edit" hide-icon>编辑（无图标）</mx-button>
    <mx-button icon-type="add" hide-icon type="primary">新增（无图标）</mx-button>
    <mx-button icon-type="save" default-text="保存数据" @click="handleSave" />
    <mx-button icon-type="add">创建新记录</mx-button>
  </div>
</template>
```

### 按钮尺寸

按钮有大、中、小三种尺寸。通过设置 size 为 large middle small 来创建不同尺寸的按钮。

<ButtonDemo2 />

**完整代码：**

```vue
<template>
  <div class="demo-vertical">
    <div>
      <mx-button type="primary" size="large">Large</mx-button>
      <mx-button type="primary">Middle</mx-button>
      <mx-button type="primary" size="small">Small</mx-button>
    </div>
  </div>
</template>

<style scoped>
.demo-vertical {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-vertical > div {
  display: flex;
  gap: 8px;
}
</style>
```

### 加载状态

添加 `loading` 属性即可让按钮处于加载状态。可以使用 `loading-text` 属性设置加载时的文案：

<ButtonDemo3 />

**完整代码：**

```vue
<template>
  <div class="demo">
    <mx-button type="primary" :loading="true">Loading</mx-button>
    <mx-button type="primary" :loading="loading" @click="enterLoading">
      Click me!
    </mx-button>
  </div>
</template>
```

使用 `loading-text` 自定义加载文案：

<ButtonDemo7 />

**完整代码：**

```vue
<template>
  <div class="demo">
    <mx-button 
      icon-type="save" 
      type="primary" 
      :loading="loading" 
      loading-text="保存中..." 
      @click="handleSave"
    >
      保存
    </mx-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)

const handleSave = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>
```

### 防抖功能

使用 `debounce` 属性可以防止按钮被快速重复点击，单位是毫秒：

<ButtonDemo6 />

**完整代码：**

```vue
<template>
  <div class="demo">
    <mx-button icon-type="copy" :debounce="300" @click="handleCopy">
      复制（300ms 防抖）
    </mx-button>
    <mx-button icon-type="save" type="primary" :debounce="500" @click="handleSave">
      保存（500ms 防抖）
    </mx-button>
  </div>
</template>
```

### 权限控制

使用 `permission` 属性可以控制按钮的显示权限，需要配合全局权限检查函数使用：

```vue
<template>
  <div class="demo">
    <!-- 需要编辑权限 -->
    <mx-button icon-type="edit" permission="edit" @click="handleEdit">编辑</mx-button>
    
    <!-- 需要删除权限 -->
    <mx-button icon-type="delete" permission="delete" danger @click="handleDelete">删除</mx-button>
    
    <!-- 多个权限，满足任一即可 -->
    <mx-button permission="['edit', 'view']" @click="handleAction">操作</mx-button>
  </div>
</template>
```

**配置权限检查函数：**

在应用入口配置全局权限检查函数：

```ts
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 配置权限检查函数
const checkPermission = (permission: string | string[]) => {
  const userPermissions = getUserPermissions() // ['edit', 'delete', 'view']
  
  // 如果是数组，只要有一个匹配即可
  if (Array.isArray(permission)) {
    return permission.some(p => userPermissions.includes(p))
  }
  
  // 单个权限检查
  return userPermissions.includes(permission)
}

app.provide('checkPermission', checkPermission)
```

## API

### Button Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| block | 将按钮宽度调整为其父宽度的选项 | boolean | false |
| danger | 设置危险按钮 | boolean | false |
| disabled | 按钮失效状态 | boolean | false |
| ghost | 幽灵属性，使按钮背景透明 | boolean | false |
| href | 跳转的地址，指定此属性 button 的行为和 a 链接一致 | string | - |
| htmlType | 设置 button 原生的 type 值 | `button` \| `submit` \| `reset` | `button` |
| icon | 设置按钮的图标组件（插槽） | v-slot | - |
| loading | 设置按钮载入状态 | boolean \| { delay: number } | false |
| shape | 设置按钮形状 | `default` \| `circle` \| `round` | default |
| size | 设置按钮大小 | `large` \| `middle` \| `small` | `middle` |
| target | 相当于 a 链接的 target 属性，href 存在时生效 | string | - |
| type | 设置按钮类型 | `primary` \| `ghost` \| `dashed` \| `link` \| `text` \| `default` | default |
| **iconType** | **预设图标类型** | `'edit'` \| `'view'` \| `'copy'` \| `'add'` \| `'refresh'` \| `'save'` \| `'cancel'` \| `'print'` \| `'export'` | - |
| **hideIcon** | **是否隐藏图标（使用 iconType 时）** | boolean | false |
| **debounce** | **防抖延迟时间（毫秒），0 则不防抖** | number | 0 |
| **permission** | **需要的权限，传入权限字符串或数组，有权限则显示按钮** | string \| string[] | - |
| **defaultText** | **默认文案（使用 iconType 时的默认文案）** | string | - |
| **loadingText** | **加载状态时的文案** | string | - |
| **customClass** | **自定义类名** | string | - |

### Button Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮时的回调 | (event: MouseEvent) => void |
## 特性说明

### 完全兼容 ant-design-vue Button

`MxButton` 完全兼容 `a-button` 的所有 props 和事件，可以直接替换使用。

### 增强功能

- ✅ **预设图标类型** - 快速设置常用图标和默认文案
- ✅ **防抖功能** - 防止按钮被快速重复点击
- ✅ **权限控制** - 基于权限显示/隐藏按钮
- ✅ **加载状态文案** - 自定义加载时的按钮文案
- ✅ **自定义类名** - 支持额外的样式定制

### 与其他业务按钮的区别

对于简单的图标按钮，可以直接使用 `MxButton` 的 `icon-type` 属性。但对于有特殊业务逻辑的按钮，建议使用专门的业务组件：

- **MxDeleteButton** - 删除按钮（带确认对话框）
- **MxSearchButton** - 搜索按钮（带回车键支持）
- **MxResetButton** - 重置按钮（带快捷键支持）
- **MxSubmitButton** - 提交按钮（带加载文案变化）



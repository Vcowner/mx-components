# ResetButton 重置按钮

重置按钮是专用于重置/清空操作的业务按钮组件。

## 何时使用

- 需要清空搜索条件时
- 需要重置表单数据时
- 需要恢复初始状态时

## 代码演示

<script setup>
import ResetDemo1 from './demos/ResetDemo1.vue'
import ResetDemo2 from './demos/ResetDemo2.vue'
import ResetDemo3 from './demos/ResetDemo3.vue'
</script>

### 基础用法

最基础的重置按钮，自动带有重置图标。

<ResetDemo1 />

**完整代码：**

```vue
<template>
  <mx-reset-button @reset="handleReset" />
</template>

<script setup>
const handleReset = () => {
  console.log('重置')
}
</script>
```

### 与搜索按钮配合

重置按钮通常与搜索按钮配合使用。

<ResetDemo2 />

**完整代码：**

```vue
<template>
  <a-space>
    <mx-search-button @search="handleSearch">搜索</mx-search-button>
    <mx-reset-button @reset="handleReset">重置</mx-reset-button>
  </a-space>
</template>

<script setup>
const handleSearch = () => {
  console.log('搜索')
}
const handleReset = () => {
  console.log('重置')
}
</script>
```

### 快捷键支持

设置 `keyboard` 为 `true` 支持 Ctrl/Cmd + R 快捷键。

<ResetDemo3 />

**完整代码：**

```vue
<template>
  <mx-reset-button 
    :keyboard="true"
    @reset="handleReset"
  >
    重置（按 Ctrl+R）
  </mx-reset-button>
</template>

<script setup>
const handleReset = () => {
  console.log('重置')
}
</script>
```

## API

### ResetButton Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 按钮类型 | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | `'default'` |
| size | 按钮尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 加载状态 | `boolean` | `false` |
| debounce | 防抖延迟时间（毫秒），0 则不防抖 | `number` | `0` |
| keyboard | 是否支持快捷键触发（Ctrl/Cmd + R） | `boolean` | `false` |
| hideIcon | 是否隐藏重置图标 | `boolean` | `false` |
| customClass | 自定义类名 | `string` | `''` |
| permission | 需要的权限，传入权限字符串或数组，有权限则显示按钮 | `string \| string[]` | `undefined` |

### ResetButton Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| reset | 点击重置按钮后触发 | - |

## 注意事项

1. **自动图标**：组件自动添加重置图标，无需手动配置
2. **快捷键**：支持 Ctrl/Cmd + R 快捷键，提升重置效率
3. **防抖支持**：可配置防抖延迟，避免频繁触发
4. **权限控制**：可以使用 `permission` 属性控制按钮的显示
5. **配合使用**：通常与搜索按钮或其他输入控件配合使用

## 最佳实践

### 完整的搜索重置场景

```vue
<template>
  <a-form>
    <a-form-item label="关键词">
      <mx-input v-model="keyword" placeholder="请输入关键词" />
    </a-form-item>
    <a-form-item label="状态">
      <a-select v-model="status" placeholder="请选择">
        <a-select-option value="active">激活</a-select-option>
        <a-select-option value="inactive">未激活</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-space>
        <mx-search-button :loading="searching" @search="handleSearch">
          搜索
        </mx-search-button>
        <mx-reset-button @reset="handleReset">
          重置
        </mx-reset-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { ref } from 'vue'

const keyword = ref('')
const status = ref('')
const searching = ref(false)

const handleSearch = async () => {
  searching.value = true
  try {
    await searchData()
  } finally {
    searching.value = false
  }
}

const handleReset = () => {
  keyword.value = ''
  status.value = ''
  // 重置后自动搜索
  handleSearch()
}
</script>
```



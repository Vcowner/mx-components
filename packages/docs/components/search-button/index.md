# SearchButton 搜索按钮

搜索按钮是专用于搜索操作的业务按钮组件。

## 何时使用

- 需要执行搜索操作时
- 搜索表单提交
- 数据筛选查询

## 代码演示

<script setup>
import SearchDemo1 from './demos/SearchDemo1.vue'
import SearchDemo2 from './demos/SearchDemo2.vue'
import SearchDemo3 from './demos/SearchDemo3.vue'
import SearchDemo4 from './demos/SearchDemo4.vue'
import SearchDemo5 from './demos/SearchDemo5.vue'
</script>

### 基础用法

最基础的搜索按钮，自动带有搜索图标。

<SearchDemo1 />

**完整代码：**

```vue
<template>
  <mx-search-button @search="handleSearch" />
</template>

<script setup>
const handleSearch = () => {
  console.log('搜索')
}
</script>
```

### 自定义按钮文案

可以自定义按钮显示的内容，默认显示"搜索"。

<SearchDemo2 />

**完整代码：**

```vue
<template>
  <mx-search-button @search="handleSearch">快速搜索</mx-search-button>
  <mx-search-button @search="handleSearch">高级搜索</mx-search-button>
</template>

<script setup>
const handleSearch = () => {
  console.log('搜索')
}
</script>
```

### 加载状态

搜索操作通常是异步的，可以使用 `loading` 属性显示加载状态。

<SearchDemo3 />

**完整代码：**

```vue
<template>
  <mx-search-button 
    :loading="searching" 
    @search="handleSearch"
  >
    搜索
  </mx-search-button>
</template>

<script setup>
import { ref } from 'vue'

const searching = ref(false)

const handleSearch = async () => {
  searching.value = true
  try {
    // 模拟异步搜索
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('搜索完成')
  } finally {
    searching.value = false
  }
}
</script>
```

### 防抖搜索

通过 `debounce` 属性控制搜索防抖，避免频繁触发搜索请求。

<SearchDemo5 />

**完整代码：**

```vue
<template>
  <mx-search-button 
    :debounce="500" 
    @search="handleSearch"
  >
    防抖搜索（500ms）
  </mx-search-button>
  
  <mx-search-button 
    :debounce="0" 
    @search="handleSearch"
  >
    不防抖
  </mx-search-button>
</template>

<script setup>
const handleSearch = () => {
  console.log('搜索')
}
</script>
```

### 回车键触发

设置 `enterSubmit` 为 `true` 支持按回车键触发搜索。

**完整代码：**

```vue
<template>
  <mx-search-button 
    :enter-submit="true"
    @search="handleSearch"
  >
    支持回车键搜索
  </mx-search-button>
</template>

<script setup>
const handleSearch = () => {
  console.log('搜索')
}
</script>
```

### 不同尺寸和类型

支持不同的尺寸和类型样式。

<SearchDemo4 />

**完整代码：**

```vue
<template>
  <a-space>
    <mx-search-button type="primary" @search="handleSearch">主要按钮</mx-search-button>
    <mx-search-button type="default" @search="handleSearch">默认按钮</mx-search-button>
    <mx-search-button size="large" @search="handleSearch">大按钮</mx-search-button>
    <mx-search-button size="small" @search="handleSearch">小按钮</mx-search-button>
  </a-space>
</template>

<script setup>
const handleSearch = () => {
  console.log('搜索')
}
</script>
```

## API

### SearchButton Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 按钮类型 | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | `'primary'` |
| size | 按钮尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 加载状态 | `boolean` | `false` |
| debounce | 防抖延迟时间（毫秒），0 则不防抖 | `number` | `300` |
| enterSubmit | 是否支持回车键触发搜索 | `boolean` | `false` |
| hideIcon | 是否隐藏搜索图标 | `boolean` | `false` |
| customClass | 自定义类名 | `string` | `''` |
| permission | 需要的权限，传入权限字符串或数组，有权限则显示按钮 | `string \| string[]` | `undefined` |

### SearchButton Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| search | 点击搜索按钮后触发 | - |

## 注意事项

1. **自动图标**：组件自动添加搜索图标，无需手动配置
2. **防抖功能**：内置防抖机制，默认 300ms，可自定义或关闭
3. **键盘支持**：支持回车键触发搜索，提升用户体验
4. **加载状态**：搜索时建议配合 `loading` 属性使用，提供清晰的用户反馈
5. **权限控制**：可以使用 `permission` 属性控制按钮的显示

## 最佳实践

### 结合表单使用

```vue
<template>
  <a-form @submit.prevent="handleSearch">
    <a-form-item label="关键词">
      <mx-input v-model="keyword" placeholder="请输入关键词" />
    </a-form-item>
    <a-form-item>
      <mx-search-button :loading="loading" @search="handleSearch">
        搜索
      </mx-search-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { ref } from 'vue'

const keyword = ref('')
const loading = ref(false)

const handleSearch = async () => {
  if (!keyword.value) {
    message.warning('请输入关键词')
    return
  }
  
  loading.value = true
  try {
    await searchApi({ keyword: keyword.value })
    message.success('搜索成功')
  } finally {
    loading.value = false
  }
}
</script>
```


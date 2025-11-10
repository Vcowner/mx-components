# 权限控制

MX UI 提供了简单的权限控制功能，可以基于用户权限显示或隐藏组件。

## 配置权限检查函数

在应用入口配置全局的权限检查函数：

```ts
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 配置权限检查函数
const checkPermission = (permission: string | string[]) => {
  // 从用户信息中获取权限列表（示例）
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

## 使用方式

### Button 组件权限控制

```vue
<template>
  <!-- 普通按钮，不需要权限 -->
  <mx-button @click="handleClick">查看</mx-button>
  
  <!-- 需要编辑权限才能显示 -->
  <mx-button permission="edit" @click="handleEdit">编辑</mx-button>
  
  <!-- 需要删除权限才能显示 -->
  <mx-button permission="delete" @click="handleDelete">删除</mx-button>
  
  <!-- 只要有编辑或删除权限之一即可显示 -->
  <mx-button :permission="['edit', 'delete']" @click="handleAction">操作</mx-button>
</template>
```

### 完整的权限检查示例

```vue
<template>
  <div>
    <h1>用户管理</h1>
    
    <!-- 查看列表 -->
    <mx-button @click="viewList">查看列表</mx-button>
    
    <!-- 编辑权限 -->
    <mx-button 
      permission="user.edit" 
      @click="handleEdit"
    >
      编辑用户
    </mx-button>
    
    <!-- 删除权限 -->
    <mx-delete-button 
      permission="user.delete"
      @delete="handleDelete"
    >
      删除用户
    </mx-delete-button>
  </div>
</template>

<script setup lang="ts">
const handleEdit = () => {
  console.log('编辑用户')
}

const handleDelete = () => {
  console.log('删除用户')
}

const viewList = () => {
  console.log('查看列表')
}
</script>
```

## 权限检查逻辑

组件使用 `v-if="hasPermission"` 来控制是否渲染：

- **有权限**：组件正常渲染
- **无权限**：组件不渲染（直接从 DOM 中移除）

## 注意事项

1. **默认行为**：如果没有配置 `checkPermission` 函数，或者组件没有传入 `permission` 属性，组件会默认显示
2. **权限注入**：需要使用 `provide` 在应用级别注入权限检查函数
3. **性能考虑**：使用 `computed` 缓存权限检查结果，避免重复计算

## 实际应用场景

### 场景 1：基于角色

```ts
const checkPermission = (permission: string | string[]) => {
  const userRole = getCurrentUserRole() // 'admin' | 'editor' | 'viewer'
  
  // 管理员有所有权限
  if (userRole === 'admin') return true
  
  // 角色权限映射
  const rolePermissions = {
    editor: ['edit', 'view', 'create'],
    viewer: ['view']
  }
  
  const userPermissions = rolePermissions[userRole] || []
  
  if (Array.isArray(permission)) {
    return permission.some(p => userPermissions.includes(p))
  }
  
  return userPermissions.includes(permission)
}
```

### 场景 2：基于后端 API

```ts
const checkPermission = async (permission: string | string[]) => {
  // 如果权限已经缓存，直接返回
  if (cachedPermissions) {
    return checkCached(permission)
  }
  
  // 从后端获取用户权限
  const permissions = await api.getUserPermissions()
  cachedPermissions = permissions
  
  if (Array.isArray(permission)) {
    return permission.some(p => permissions.includes(p))
  }
  
  return permissions.includes(permission)
}
```

### 场景 3：动态权限检查

```vue
<template>
  <mx-button 
    :permission="requiredPermission" 
    @click="handleAction"
  >
    操作按钮
  </mx-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const requiredPermission = ref('view')

// 根据某些条件动态改变需要的权限
const updatePermission = (newPermission: string) => {
  requiredPermission.value = newPermission
}
</script>
```

## 所有支持权限控制的组件

- `MxButton` - 按钮组件
- `MxDeleteButton` - 删除按钮组件

未来将支持更多组件。


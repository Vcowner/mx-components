# MxModal 命令式弹窗系统

类似 `@ebay/nice-modal-react` 的命令式弹窗方案，使用 Context Provider 全局管理 Modal 状态。

## 特性

- ✅ 命令式 API，无需在模板中声明组件
- ✅ 全局状态管理，通过 Provider 统一管理
- ✅ 支持 Promise，可以等待用户操作结果
- ✅ 自动注册，无需手动管理
- ✅ 类型安全，完整的 TypeScript 支持
- ✅ 封装了 `MxFormModal`，简化表单弹窗开发
- ✅ 自动区分业务数据和 `a-modal` 参数

## 快速开始

### 1. 在 App 中包裹 Provider

```vue
<!-- App.vue -->
<template>
  <a-config-provider :theme="themeConfig" :locale="locale">
    <MxModalProvider>
      <router-view />
    </MxModalProvider>
  </a-config-provider>
</template>

<script setup lang="ts">
import { MxModalProvider } from '@/components/MxModal'
</script>
```

### 2. 创建 Modal 组件

#### 方式1：使用 MxFormModal（推荐，适用于表单场景）

```vue
<!-- components/UserModal.vue -->
<template>
  <MxFormModal :modal="modal" :rules="rules" layout="vertical" @ok="handleSubmit">
    <template #default="{ formData }">
      <a-form-item label="姓名" name="name" required>
        <a-input v-model:value="formData.name" placeholder="请输入姓名" />
      </a-form-item>
      <a-form-item label="年龄" name="age" required>
        <a-input-number v-model:value="formData.age" :min="0" style="width: 100%" />
      </a-form-item>
    </template>
  </MxFormModal>
</template>

<script setup lang="ts">
import { MxFormModal, useModal } from '@/components/MxModal'
import type { UseModalReturn } from '@/components/MxModal/useModal'
import type { Rule } from 'ant-design-vue/es/form'

interface Props {
  modal?: UseModalReturn
}

const props = defineProps<Props>()
const modal = props.modal || useModal()

// 表单验证规则
const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  age: [{ required: true, message: '请输入年龄', trigger: 'blur' }]
}

// 处理提交（确认按钮事件入口）
const handleSubmit = async (values: Record<string, any>) => {
  try {
    // 在这里调用接口
    // const result = await api.addUser(values)

    // 接口成功后，关闭弹窗
    modal.resolve(values)
    modal.hide()
  } catch (error) {
    // 接口失败，不关闭弹窗（让用户看到错误信息）
    console.error('提交失败:', error)
  }
}
</script>
```

#### 方式2：使用 MxModal（适用于非表单场景）

```vue
<!-- components/ConfirmModal.vue -->
<template>
  <MxModal :modal="modal" @ok="handleOk" @cancel="handleCancel">
    <p>{{ message }}</p>
  </MxModal>
</template>

<script setup lang="ts">
import { MxModal, useModal } from '@/components/MxModal'
import type { UseModalReturn } from '@/components/MxModal/useModal'

interface Props {
  modal?: UseModalReturn
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  message: '确认执行此操作？'
})

const modal = props.modal || useModal()

const handleOk = () => {
  modal.resolve(true)
  modal.hide()
}

const handleCancel = () => {
  modal.hide()
}
</script>
```

#### 方式3：直接使用 a-modal（高级用法）

```vue
<!-- components/UserModal.vue -->
<template>
  <a-modal
    :open="modal.visible.value"
    v-bind="modalProps"
    @cancel="modal.hide()"
    @after-close="modal.remove()"
    @ok="handleOk"
  >
    <a-form :model="formData" layout="vertical">
      <a-form-item label="姓名" name="name" required>
        <a-input v-model:value="formData.name" placeholder="请输入姓名" />
      </a-form-item>
      <a-form-item label="年龄" name="age" required>
        <a-input-number v-model:value="formData.age" :min="0" style="width: 100%" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useModal } from '@/components/MxModal'
import type { ModalProps } from 'ant-design-vue'

const modal = useModal()

// 使用 getFormData 获取业务数据（自动排除 a-modal 参数）
const formData = reactive({
  name: '',
  age: undefined,
  ...modal.getFormData<{ name: string; age: number }>()
})

// 使用 getModalProps 获取 a-modal 参数（自动提取）
const modalProps = computed<ModalProps>(() => ({
  title: '用户信息',
  width: 600,
  ...modal.getModalProps() // 自动提取所有 a-modal 的参数
}))

const handleOk = () => {
  // 提交数据并关闭
  modal.resolve({ ...formData })
  modal.hide()
}
</script>
```

### 3. 使用 Modal（无需注册）

```vue
<!-- views/UserList.vue -->
<template>
  <mx-button @click="handleAdd">新增用户</mx-button>
</template>

<script setup lang="ts">
import { useModalController } from '@/components/MxModal'
import UserModal from '@/components/UserModal.vue'

// 创建 Modal 控制器（自动注册）
const modal = useModalController(UserModal)

const handleAdd = async () => {
  // 可以传递业务数据和 a-modal 的参数
  const result = await modal.show({
    // 业务数据
    name: '',
    age: 0,
    // a-modal 的参数（可选）
    title: '新增用户',
    width: 800,
    okText: '保存',
    cancelText: '取消',
    maskClosable: false
  })

  if (result) {
    console.log('用户提交的数据:', result)
    // 调用 API 保存数据
  }
}
</script>
```

## API

### MxModalProvider

全局 Provider 组件，需要在 App 根组件中包裹。

### useModal()

在 Modal 组件内部使用的 Hook，返回：

- `visible: Ref<boolean>` - Modal 是否可见
- `args: Ref<Record<string, any>>` - Modal 参数（包含业务数据和 a-modal 参数）
- `show(args?)` - 显示 Modal
- `hide()` - 隐藏 Modal
- `remove()` - 移除 Modal
- `update(args)` - 更新参数
- `resolve(value)` - 解析 Promise（用于命令式调用，将数据返回给调用者）
- `reject(reason)` - 拒绝 Promise
- `getFormData<T>(keys?)` - 获取业务数据（自动排除 a-modal 参数）
  - `keys?: string[]` - 可选，指定要获取的字段，不传则返回所有业务数据
- `getModalProps()` - 获取 a-modal 的参数（自动提取）

### useModalController(component)

创建 Modal 控制器（推荐使用），自动注册组件，返回：

- `show(args?)` - 显示 Modal，返回 Promise
  - `args` 可以包含业务数据和 `a-modal` 的所有参数（如 `title`, `width`, `okText`, `cancelText`, `maskClosable` 等）
- `hide()` - 隐藏 Modal
- `remove()` - 移除 Modal

```ts
const modal = useModalController(UserModal)

// 传递业务数据和 a-modal 参数
const result = await modal.show({
  // 业务数据
  userId: 123,
  // a-modal 参数（可选）
  title: '编辑用户',
  width: 800,
  okText: '确定',
  cancelText: '取消'
})
```

**注意**：

- 如果使用 `MxFormModal` 或 `MxModal`，它们会自动处理 `a-modal` 参数的绑定
- 如果直接使用 `a-modal`，需要通过 `modal.args.value` 访问这些参数，并使用 `v-bind` 绑定到 `a-modal` 上

### removeAll()

移除所有 Modal。

## 完整示例

```vue
<!-- views/UserList.vue -->
<template>
  <mx-button @click="handleAdd">新增用户</mx-button>
</template>

<script setup lang="ts">
import { useModalController } from '@/components/MxModal'
import UserModal from '@/components/UserModal.vue'

// 创建 Modal 控制器
const modal = useModalController(UserModal)

const handleAdd = async () => {
  const result = await modal.show({ name: '', age: 0 })

  if (result) {
    console.log('用户提交的数据:', result)
    // 调用 API 保存数据
  } else {
    // 用户取消了操作
    console.log('用户取消了操作')
  }
}
</script>
```

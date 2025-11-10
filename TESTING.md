# 测试指南

项目使用 [Vitest](https://vitest.dev/) 作为测试框架。

## 测试文件位置

```
packages/
├── components/
│   └── src/
│       └── components/
│           ├── Button/
│           │   ├── Button.vue
│           │   └── __tests__/
│           │       └── Button.test.ts
│           └── Input/
│               ├── Input.vue
│               └── __tests__/
│                   └── Input.test.ts
└── utils/
    └── src/
        ├── index.ts
        └── __tests__/
            └── index.test.ts
```

## 运行测试

### 运行所有测试

```bash
pnpm test
```

### 运行组件库的测试

```bash
cd packages/components
pnpm test
```

### 运行工具库的测试

```bash
cd packages/utils
pnpm test
```

### 以监听模式运行

```bash
pnpm test --watch
```

### 生成测试覆盖率报告

```bash
pnpm test --coverage
```

## 测试配置

每个包的测试配置都在对应目录下的 `vitest.config.ts` 文件中：

- `packages/components/vitest.config.ts` - 组件库测试配置
- `packages/utils/vitest.config.ts` - 工具库测试配置

## 编写测试

### 组件测试示例

```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Button from '../Button.vue'

describe('Button 组件', () => {
  it('应该正确渲染', () => {
    const wrapper = mount(Button, {
      slots: {
        default: '按钮文本'
      }
    })
    
    expect(wrapper.text()).toBe('按钮文本')
  })

  it('应该在点击时触发事件', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
```

### 工具函数测试示例

```typescript
import { describe, it, expect } from 'vitest'
import { debounce } from '../index'

describe('debounce 函数', () => {
  it('应该在延迟后执行', () => {
    // 测试代码
  })
})
```

## 测试命令

| 命令 | 说明 |
|------|------|
| `pnpm test` | 运行所有测试 |
| `pnpm test --watch` | 监听模式运行测试 |
| `pnpm test --ui` | 打开 Vitest UI 界面 |
| `pnpm test --coverage` | 生成覆盖率报告 |
| `pnpm test [路径]` | 运行指定路径的测试 |

## 测试覆盖率

### 添加覆盖率依赖

```bash
pnpm add -D @vitest/coverage-v8
```

### 配置覆盖率

在 `vitest.config.ts` 中添加：

```typescript
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        '**/*.test.ts',
        '**/__tests__/**'
      ]
    }
  }
})
```

## 注意事项

1. **组件测试**：使用 `@vue/test-utils` 的 `mount` 函数
2. **环境**：组件测试需要 `jsdom` 环境
3. **异步测试**：使用 `async/await` 处理异步操作
4. **模拟**：使用 `vi.fn()` 创建模拟函数
5. **定时器**：使用 `vi.useFakeTimers()` 测试定时器相关功能

## 参考资料

- [Vitest 文档](https://vitest.dev/)
- [Vue Test Utils 文档](https://test-utils.vuejs.org/)
- [Testing Vue Components](https://vuejs.org/guide/scaling-up/testing.html)


# 测试指南 (Testing Guide)

> **测试框架**: Vitest + React Testing Library  
> **覆盖目标**: 核心业务逻辑优先

---

## 📋 测试命令

```bash
# 运行所有测试（watch 模式，文件变化时自动重新运行）
npm run test

# 运行一次所有测试
npm run test:run

# 运行测试并查看 UI 界面
npm run test:ui

# 运行测试并生成覆盖率报告
npm run test:coverage
```

---

## 🎯 测试优先级策略

### ✅ 必须测试（P0）- 核心业务逻辑

#### 1. **Custom Hooks**
**示例**: `useSampleData`

测试内容：
- ✅ Hook 初始化状态
- ✅ CRUD 操作（增删改查）
- ✅ 状态更新逻辑
- ✅ 边界情况处理

**位置**: `src/modules/{ModuleName}/hooks/{hookName}.test.ts`

#### 2. **工具函数**
**示例**: 数据转换、验证函数

测试内容：
- ✅ 输入输出正确性
- ✅ 边界值处理
- ✅ 错误处理

**位置**: `src/utils/{utilName}.test.ts`

#### 3. **业务逻辑函数**
**示例**: 排序、过滤、计算函数

---

### 🔶 建议测试（P1）- 复杂组件和表单

#### 1. **表单验证逻辑**
测试内容：
- ✅ 必填字段验证
- ✅ 格式验证
- ✅ 自定义规则

#### 2. **关键业务流程组件**
测试内容：
- ✅ 用户交互流程
- ✅ 表单提交
- ✅ 错误处理

---

### 🟢 可选测试（P2）- UI 组件

#### 1. **纯展示组件**
- 简单的 Button, Card 等组件可以跳过测试
- 除非有复杂的条件渲染逻辑

---

## 📝 测试文件命名规范

```
原文件: useSampleData.ts
测试文件: useSampleData.test.ts

原文件: SampleTable.tsx
测试文件: SampleTable.test.tsx
```

**规则**: 测试文件与源文件放在同一目录，文件名加 `.test` 后缀。

---

## 🛠️ 编写测试示例

### 示例 1: 测试 Custom Hook

```typescript
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useYourHook } from './useYourHook';

describe('useYourHook', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useYourHook());
    expect(result.current.value).toBe(0);
  });

  it('should update value', () => {
    const { result } = renderHook(() => useYourHook());
    
    act(() => {
      result.current.increment();
    });

    expect(result.current.value).toBe(1);
  });
});
```

### 示例 2: 测试组件

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { YourComponent } from './YourComponent';

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should handle click event', () => {
    const handleClick = vi.fn();
    render(<YourComponent onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### 示例 3: 测试工具函数

```typescript
import { describe, it, expect } from 'vitest';
import { formatDate, validateEmail } from './utils';

describe('utils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-11-21');
      expect(formatDate(date)).toBe('2024-11-21');
    });

    it('should handle null input', () => {
      expect(formatDate(null)).toBe('');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });
});
```

---

## 🎨 常用测试工具

### React Testing Library

```typescript
import { 
  render,        // 渲染组件
  screen,        // 查询 DOM 元素
  fireEvent,     // 触发事件
  waitFor,       // 等待异步操作
} from '@testing-library/react';
```

### Vitest

```typescript
import { 
  describe,      // 测试套件
  it,            // 单个测试用例
  expect,        // 断言
  vi,            // Mock 工具
  beforeEach,    // 每个测试前执行
  afterEach,     // 每个测试后执行
} from 'vitest';
```

---

## 💡 最佳实践

### 1. **测试行为，而非实现**
```typescript
// ❌ 不要测试内部实现
expect(component.state.count).toBe(1);

// ✅ 测试用户可见的行为
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

### 2. **使用有意义的测试描述**
```typescript
// ❌ 不好的描述
it('should work', () => { ... });

// ✅ 清晰的描述
it('should display error message when email is invalid', () => { ... });
```

### 3. **保持测试独立性**
```typescript
// 每个测试应该是独立的，不依赖其他测试的结果
afterEach(() => {
  cleanup(); // 清理测试环境
});
```

### 4. **AAA 模式（Arrange-Act-Assert）**
```typescript
it('should add new sample', () => {
  // Arrange: 准备测试数据
  const { result } = renderHook(() => useSampleData());
  const newSample = { id: '1', name: 'Test' };

  // Act: 执行操作
  act(() => {
    result.current.addSample(newSample);
  });

  // Assert: 验证结果
  expect(result.current.samples).toContainEqual(newSample);
});
```

---

## 📊 覆盖率目标

**不追求 100% 覆盖率**，建议目标：
- 核心业务逻辑: **80%+**
- 工具函数: **90%+**
- UI 组件: **50%+** (可选)

---

## 🚀 新模块开发流程

1. **编写核心业务逻辑** (Hooks, Utils)
2. **编写对应的测试** (*.test.ts)
3. **运行测试确保通过** (`npm run test:run`)
4. **继续开发 UI 组件**
5. **(可选) 为复杂组件添加测试**

---

## 🔗 相关资源

- [Vitest 官方文档](https://vitest.dev/)
- [React Testing Library 文档](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## ✅ 当前测试状态

```
✓ useSampleData Hook - 9 tests
✓ UnderDevelopment Component - 2 tests

Total: 11 tests passing ✅
```

**测试已集成到项目中，可以随时运行 `npm run test` 开始测试驱动开发！**

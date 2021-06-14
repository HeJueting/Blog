# hook 的工作原理

</br>

### 前言

在 [React Hook 官方文档](https://zh-hans.reactjs.org/docs/hooks-rules.html) 中，有这样两条使用规则：

1. 顶层使用 hook，不能在循环和条件语句中使用

2. 只能在 react 函数中使用 hook

第二条规则比较容易理解，但是为什么有第一条规则，是需要我们去探索和理解的。

</br>
</br>

### 工作原理

React 官方有这样一句话：**not magic, just arrays**，告诉我们 hook 并不是什么神奇的魔法，仅是数组而已。下面我简易梳理一下它的工作流程：

1. 第一次渲染时，React 会将每一个 hook push 进入一个数组

2. 第二次（第 N 次）渲染，直接从这个数组中**顺序取出** hook 使用

如果在 if 语句中使用 hook，这会影响 React 将 hook push 进入数组或者从数组中取出 hook，两者都会影响 React 的运行；循环语句中的循环条件也会影响 React 的运行，其原理与条件语句类似。

</br>
</br>

# React Hook 汇总

</br>

### 诞生原因

-   组件之间的状态复用（不再需要 HOC 和 render props）

-   组件逻辑越来越复杂，生命周期中的代码越来越臃肿

-   class 语法的学习成本，函数组件代码更优雅更简洁

</br>
</br>

### hook 规则

-   顶层使用 hook，不能在循环和条件语句中使用

-   只能在 react 函数中使用 hook

</br>
</br>

### hook 的工作原理

-   not magic, just arrays

    1. 用 state、setters 两个数组来分别保存变量、设置变量的方法

    2. setter 跟 state 下标一一对应

-   第一次渲染时会以数组的形式按顺序保存 hook，此后的每一次渲染都会重置数组下标，按顺序读取这些 hook

</br>
</br>

### 自定义 hook

-   其名称以 “use” 开头

-   抽离公共逻辑

</br>
</br>

### 常用的 hook

1. useState

    - 传入的 initialState 只在初始化的时候渲染
    - 如果 initialState 需要计算得到，可以传入一个函数，返回值作为 initialState

2. useEffect

    - 通过 return 一个函数，来取消事件监听
    - 参数 [ ] 决定了哪些变量的更新会触发该 hook

3. useContext

    - 跨组件通信

4. useReducer

    - 处理复杂的 state
    - 与 useContext 一起使用可以提代 redux

5. useCallback 和 useMemo

    - 类似于 vue 中的 computed，依赖于 state 的变化而计算，不会每次都重新计算

</br>
</br>

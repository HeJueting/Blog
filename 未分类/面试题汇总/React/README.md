# React 面试题汇总

</br>

### React 项目中有哪些优化措施

1. 开发过程中，一定要**遵守 state 的不可变性**

2. 合理使用 Context/Redux 等全局状态管理

3. 合理使用 React.PureComponent 以及 shouldComponentUpdate 这个生命周期避免组件的不必要渲染

4. 合理使用 React.memo 缓存组件

5. 在 React Hook 中合理使用 useMemo 和 useCallback 方法去缓存函数或变量

6. 循环渲染列表时，保证 key 值的唯一性，避免 dom 元素的重复性渲染

7. 合理使用 React.Fragments 避免渲染不必要的标签

8. 通过异步组件和路由懒加载，对资源进行分包，提高首屏渲染速度

9. 记得在 componentWillUnmount 生命周期中销毁定时器，事件监听等操作

10. 图片懒加载 / 防抖函数 / 使用 web worker 处理复杂任务 / CDN ...

11. 结合 webpack 的优化措施 ...

</br>
</br>

### 组件之间如何通讯

1. 父子组件：props

2. 跨层级组件：context、redux

</br>
</br>

### React 最近版本迭代解决了什么问题？

**v16 版本**

推出 React Fiber， 它是对核心算法的一次重新实现：

1. 以 render 为界，将任务拆分为两个阶段

2. rende 之前的任务，可以随时暂停，终止；render 之后的任务，不能被终止，会一直执行到底

3. 因为 JS 是单线程，如果整个渲染过程是同步的，用户在这过程中有任何操作，是无法立刻得到响应的

4. 因此在 render 之前的任务可能会被多次执行，不要在 render 之前去执行 ajax 等操作

**v16.3 版本**

鉴于 React Fiber 的机制，废除了 componentWillMount、componentWillUpdate、componentWillReceiveProps 这三个生命周期。推出了两个新的生命周期：

1. getDerivedStateFromProps：是一个静态函数，不能组件中的访问 this 对象，返回值为最新的 state，组件第一次挂载和更新阶段都会执行（在 render 之前）

2. getSnapshotBeforeUpdate：组件更新阶段执行，返回值会作为 componentDidUpdate 的第三个参数

**v16.8 版本**

推出 React Hook：

1. 使代码更精简，更容易理解

2. 更好的复用状态逻辑（不必使用 HOC 和 render props）

3. 降低了学习成本，摒弃了生命周期的概念以及 this 对象

</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>

### JSX 本质是什么

-   babel

-   createElement 函数

-   返回 vnode

</br>
</br>

### redux 单向数据流

-   用户通过界面事件，触发 dispatch(action)

-   调用 reducer(state, action)生成返回一个新的 newState

-   更新 store

</br>
</br>

### 什么是纯函数

-   返回新值，没有副作用（不会修改其他值）

-   不可变值

</br>
</br>

### 组件生命周期

-   挂载阶段

    1. constructor
    2. static getDerivedStateFromProps
    3. render
    4. componentDidMount

-   更新阶段

    1. static getDerivedStateFromProps
    2. shouldComponentUpdate
    3. render
    4. getSnapshotBeforeUpdate（返回值作为 componentDidupdate 第三个参数）
    5. componentDidupdate

-   更新阶段
    1. componentWillUnmount

</br>
</br>

### 列表渲染，为何使用 key

dom diff 算法，减少渲染次数，提高渲染性能

</br>
</br>

### 函数组件和 class 组件区别

-   纯函数，输入 props，输出 JSX

-   没有实例，没有生命周期，没有 state

-   函数组件语法更简洁

</br>
</br>

### 受控组件与非受控组件

</br>
</br>

### 何时使用异步组件

-   加载大组件

-   路由懒加载

</br>
</br>

### 多个组件的公共逻辑，如何抽离

-   高阶组件： 本质是一个函数，传入一个组件，返回一个新组件

-   Render Props：通过 props 传入一个组件

</br>
</br>

### redux 如何进行异步请求

-   异步 action

-   redux-thunk

-   中间件

</br>
</br>

### PurComponent 有何区别

实现了浅比较的 shouldComponentUpdate

</br>
</br>

### React 事件和 DOM 事件的区别

-   所有事件挂载到 document 上

-   event 不是原生的，是合成事件对象，通过 event.native 事件访问原生事件

    1. 更好的兼容性

    2. 所有事件挂载到 document 上，通过事件委托，避免组件事件频繁解绑，减少内存消耗

    3. 方便事件的统一管理

</br>
</br>

### React 和 Vue 的区别

-   React 使用的 JSX，Vue 使用的 template 模板语法

-   React 更多的提供的是一种能力，需要们自己去实现。Vue 封装了很多能力让你直接使用

-   React 父组件更新，子组件也会跟着更新（shouldComponentUpdate）；Vue 组件的更新只依赖于当前组件的数据更新

</br>
</br>

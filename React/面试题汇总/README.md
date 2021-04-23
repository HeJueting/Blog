# React 面试题汇总

</br>

### 组件之间如何通讯

-   父子组件 props

-   context

-   redux

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

### React 性能优化

-   循环列表使用 key

-   自定义事件、定时器及时销毁

-   合理使用异步组件

-   合理使用 shouldComponentUpdate，pureComponent，memo

</br>
</br>

### React 和 Vue 的区别

-   React 使用的 JSX，Vue 使用的 template 模板语法

-   React 更多的提供的是一种能力，需要们自己去实现。Vue 封装了很多能力让你直接使用

</br>
</br>

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

### React Fiber

**描述**

React Fiber 是对 React 核心算法的一次重新实现，16 版本之前在组件挂载和更新时，会一气呵成执行完所有任务，由于 JS 是单线程，如果整个渲染过程耗时较长，用户在这过程中有任何操作，是无法立刻得到响应的。因此 React Fiber 以 render 为界，将任务拆分为两个阶段，rende 之前的任务，可以随时暂停终止；而 render 之后的任务，不能被终止，会一直执行到底。

注意：render 之前的任务可能会被多次执行，不要在 render 之前去执行 ajax 等操作

**原理**

此前 React 使用的是 JS 本身的函数调用栈，因此所有会一气呵成执行完所有任务。React Fiber 基于 requestldleCallback 函数（这个 API 能让开发者自行控制函数调用顺序）重新实现了函数调用栈

</br>
</br>

### React 最近版本迭代解决了什么问题？

**v16 版本**

推出 React Fiber

**v16.3 版本**

废除了 componentWillMount、componentWillUpdate、componentWillReceiveProps 这三个生命周期。推出了两个新的生命周期：

1. getDerivedStateFromProps：是一个静态函数，不能组件中的访问 this 对象，返回值为最新的 state，组件第一次挂载和更新阶段都会执行（在 render 之前）

2. getSnapshotBeforeUpdate：组件更新阶段执行，返回值会作为 componentDidUpdate 的第三个参数

**v16.8 版本**

推出 React Hook：

1. 使代码更精简，更容易理解

2. 更好的复用状态逻辑（不必使用 HOC 和 render props）

3. 降低了学习成本，摒弃了生命周期的概念以及 this 对象

</br>
</br>

### React 事件绑定原理

1. React 是将所有事件都挂载到 document 上，方便事件的统一管理，并且减少了内存消耗（类似于事件委托）

2. 冒泡到 document 上的事件，也是合成事件，并不是原生 Dom 事件，具有更好的兼容性，可通过 event.nativeEvent 访问原生事件对象

**原理**

1. 事件注册：React 通过 EventPlugin 插件**将不同类型的事件都封装成为一个模块**，在组件挂载/更新时，React 会根据组件上绑定的事件类型去注册

2. 存储事件回调：React 会把组件内的所有事件统一地存放到一个对象中，通过 key-fn 的形式存储组件中的事件

3. 事件触发：通过原生事件找到触发的节点，在事件冒泡过程中，通过存储的事件对象找到目标节点和它的父级节点的回调事件，最后执行这些回调事件

</br>
</br>

### setState 和 batchUpdate 机制

setState 默认是异步的，它可以将一个同步任务中多个 state 的修改合并到一起修改，减少 Dom 的操作，提高渲染性能

1. 调用 setState

2. 将需要更新的 state 存入一个 pending 队列

3. 判断是否处于 batchUpdate
    - Yes：就将这个 pending 队列保存在 dirtyComponents 中进行异步更新
    - No：遍历所有的 dirtyComponents，同步更新 pending 队列中的 state

**batchUpdate 机制**

1. 当函数执行的时候，React 会定义一个变量 isbatchUpdates 为 true

2. 函数执行完之后，isbatchUpdates 会设置为 false

注意：只有由 react 管理的函数才可以命中 batchUpdate 机制（例如：生命周期、React 中注册的事件）；但 setTimeOut、dom 事件...非 react 管理的函数就无法命中 batchUpdate 机制

</br>
</br>

### 对 React Hook 的理解，它的实现原理，和生命周期的区别

**诞生的原因**

1. 用于提取处理公共的复杂逻辑，使代码更简洁易懂（提代 HOC 和 render props）

2. 降低学习成本，不再需要生命周期和 this 对象

**工作原理**

1. not magic, just arrays

2. 第一次渲染时会以数组的形式按顺序保存 hook，此后的每一次渲染都会重置数组下标，按顺序读取这些 hook

**区别**

hook 本身只是一个函数，没有生命周期的概念，state 和 props 的改变都会触发这个函数的重新执行，但是我们可以利用 useEeffect 去模拟生命周期。数据驱动逻辑的开发思路...

</br>
</br>

### React 和 Vue 的理解和区别

**相同点**

1. 都使用了虚拟 dom 来提高页面渲染性能

2. 数据驱动视图

3. 组件化思想

**不同点**

1. Vue 是双向数据绑定，而 React 提倡单向数据流

2. Vue 对子组件的更新默认进行了优化，而 React 需要自己使用 shouldComponentUpdate 或者 PureComponent 去控制，否则只要父组件更新子组件也会跟着更新，原因是因为 React 中 state 的不可变性

3. Vue 使用的是 template 模板语法，而 React 使用的 JSX，但都需要编译

4. React 更多的提供的是一种能力，需要们自己去实现。Vue 封装了很多能力让你直接使用

</br>
</br>

### Redux 的原理，整体的工作流程

**工作流程**

1. 用户通过界面事件，触发 dispatch(action) 函数，该函数是 redux 中唯一用来修改 state 的 入口

2. 调用 reducer(state, action) 生成返回一个新的 newState

3. 更新 store

4. 通过 react-redux 这个库去更新 Context，最后更新整个页面

**源码**

1. createStore.js 用来生成唯一的 store

2. combineReducers.js 用来合并多个 reducer 函数，保证 store 的唯一性

3. applyMiddleware.js 传入中间件，链式调用这些中间件，增强 disaptch 函数的功能

</br>
</br>

### 受控组件与非受控组件

1. 受控组件：通过 state 去控制它显示的内容

2. 非受控组件：通过 refs 去获取它的内容

</br>
</br>

### 虚拟 Dom 的理解？它主要做了什么？为什么需要它？

1. 浏览器操作 dom 是比较耗费性能的一件事，但是 JS 的执行速度却很快

2. 虚拟 Dom 本质是一个 JS 对象......（聊一聊 JS 对象如何模拟 dom 结构）

3. 因此通过直接操作 JS 对象，最后根据变化后的 JS 对象一次性操作 Dom，有效的减少了 dom 渲染的次数，提高了渲染性能

4. 开发者也不再需要过度关注 dom 操作和操作优化，只需要交给专业的框架去帮我们处理即可

</br>
</br>

### 简述一下 Dom diff 算法

1. 只比较同一层级，不跨级比较

2. tag 不相同，则直接删掉重建，不再深度比较

3. tag 和 key，两者都相同，则认为是相同节点，不再深度比较

</br>
</br>

### JSX 本质是什么

1. 类似于 Vue 中的 template 模板

2. 需要通过 babel 去编译成可执行的 JS 代码

3. 最后会编译成一个 createElement 函数，执行这个函数，会返回 vnode

</br>
</br>

### 组件生命周期

**挂载阶段**

1. constructor
2. static getDerivedStateFromProps
3. render
4. componentDidMount

**更新阶段**

1. static getDerivedStateFromProps
2. shouldComponentUpdate
3. render
4. getSnapshotBeforeUpdate（返回值作为 componentDidupdate 第三个参数）
5. componentDidupdate

**更新阶段**

1. componentWillUnmount

</br>
</br>

### 多个组件的公共逻辑，如何抽离

1. 高阶组件： 本质是一个函数，传入一个组件，返回一个新组件

2. Render Props：通过 props 传入一个组件

3. React Hook 以及自定义 Hook

</br>
</br>

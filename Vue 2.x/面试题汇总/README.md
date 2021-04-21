### v-show 和 v-if 的区别

-   v-show 通过 display 属性隐藏 dom

-   v-if 不会渲染 dom

</br>
</br>

### 为何 v-for 中要用 key

-   减少渲染次数，提高渲染性能

-   dom diff 算法

    1. 只比较同一层级，不跨级比较
    2. tag 不相同，则直接删掉重建，不再深度比较
    3. tag 和 key，两者都相同，则认为是相同节点，不再深度比较

</br>
</br>

### 描述 Vue 组件的生命周期（父子组件）

-   挂载阶段

    1. beforeCreate
    2. created
    3. beforeMount
    4. mounted

-   更新阶段

    1. beforeUpdate
    2. updated

-   销毁阶段

    1. beforeDestroy
    2. destroyed

父组件(beforeCreate/beforeUpdate/beforeDestroy) -> 子组件（beforeCreate/beforeUpdate/beforeDestroy） -> 子组件（created/updated/destroyed） -> 父组件（created/updated/destroyed）

</br>
</br>

### Vue 组件如何通讯

-   props 和 $emit（父子组件）
-   自定义事件，event.$on / event.$off / event.$emit （兄弟组件）
-   vuex（全局）

</br>
</br>

### 描述组件渲染和更新的过程

-   初次渲染过程

    1. 解析模板为 render 函数（一般在本地打包的时候完成此步骤）
    2. 监听组件中的 data
    3. 执行 render 函数，生成 vnode（虚拟 dom），然后根据虚拟 dom 渲染页面

-   更新过程

    1. 修改 data，触发 setter
    2. 重新执行 render 函数，生成 newVnode（新的虚拟 dom）
    3. 通过 dom diff 算法对比 vnode 和 newVnode，找到变化的地方，更新页面

</br>
</br>

### 双向数据绑定 v-modal 的实现原理

**绑定过程：**

1. 给表单绑定一个变量
2. 给表单绑定一个 change 事件，如果 value 值有更新，就会去更新这个变量
3. data 更新，重新 render 渲染页面

**如何监听 data**

通过 Object.defineProperty 的 set 和 get 方法去实现，但是这个 API 也有一定弊端

-   深度监听，需要一直递归到底，计算量大

-   无法监听新增/删除的属性（Vue.set 和 Vue.delete）

-   无法监听原生数组，需要特殊处理

**如何监听数组**

重新定义数组的原型，重写 push、pop 等方法

</br>
</br>

### 对 MVVM 的理解

View + ViewModal + Modal

</br>
</br>

### computed 有何特点

-   缓存，data 不变不会重新计算
-   提高性能

</br>
</br>

### 为何组件的 data 必须是一个函数？

```javascript
export default {
    data() {
        return {};
    },
};
```

vue 文件在编译之后，组件会被编译成为一个 class 类。在不同地方引用组件时，其实就是根据这个 class 类实例化这个组件，如果 data 是挂载在 class 类上的属性的话，就会导致实例化组件之间的 data 相互影响。因此这个 data 应该是一个函数，每一个函数都有独立的作用域。

</br>
</br>

### ajax 请求应该放在哪一个生命周期？

应该放在 mounted 中处理，ajax 请求是一个异步操作，且 JS 是一个单线程，将 ajax 放在 mounted 之前去处理没有任何意义。可以继续聊一聊 React Fiber....

</br>
</br>

### 如何自己实现 v-modal

-   父组件通过 v-modal 给子组件绑定一个 value 值

-   子组件接收一个 props 对象，包涵了父组件传来的 value 值

-   再定义 modal 属性，包涵一个 prop（与父组件传来 value 字段保持一致） 和 event（改变这个 value 值的 change 事件名）

-   子组件通过 $emit 去修改这个 value 值

</br>
</br>

### 多个组件有相同逻辑，如何抽离

使用 minxi（代码可读性边查）

</br>
</br>

### 何时使用 keep-alive

-   缓存组件，不需要重复渲染

-   多个静态 tab 页的切换

</br>
</br>

### 何时使用 beforeDestory

-   解除自定义事件 event.$off

-   清除定时器

-   取消事件监听

</br>
</br>

### 什么是插槽、作用域插槽、具名插槽

插槽：类似于 React 中的 children，父组件传递内容给子组件

作用域插槽：父组件传递的内容依赖于子组件的一些数据

具名插槽：父组件同时传入多种内容，子组件通过 name 属性一一对应

</br>
</br>

### Vuex 中 action 和 mutation 的区别

-   action 中可以处理异步，mutation 不可以

-   mutation 用于具体操作哪个数据的变更

-   action 可以整合多个 mutation

</br>
</br>

### 异步加载

-   较大组件的加载

-   路由异步加载

-   通过 import 函数异步加载

</br>
</br>

### 用 vnode（虚拟 dom） 描述一个 DOM 结构

</br>
</br>

### 简述 Dom Diff 算法

</br>
</br>

### Vue 为何是异步渲染，$nextTick 的作用

-   异步渲染，合并 data 的修改，再修改 dom，提高渲染性能

-   $nextTick 会在 DOM 更新完成之后执行

</br>
</br>

### Vue 常见性能优化

-   v-show 和 v-if

-   computed

-   v-for 中添加 key，以及不和 v-if 同时使用

-   自定义事件、事件监听、定时器的销毁

-   keep-alive

-   合理使用异步组件

-   data 层级不要太深（深度监听，会递归到底）

-   图片懒加载（当元素处于可视范围内的时候加载图片）

-   结合 webpack....

</br>
</br>

### Vue 面试题汇总

</br>

### 1、Vue 常见性能优化

1. v-show 和 v-if

2. computed

3. v-for 中添加 key，以及不和 v-if 同时使用

4. 自定义事件、事件监听、定时器的销毁

5. keep-alive

6. 合理使用异步组件

7. data 层级不要太深（深度监听，会递归到底）

8. 图片懒加载 / 防抖函数 / 使用 web worker 处理复杂任务 / CDN ...

9. 结合 webpack 的优化措施 ...

</br>
</br>

### 2、Vuex 和 localStroage 的区别

1. vuex 存储在内存中，而 localStroage 存储在本地，读取内存中的数据要快于本地磁盘

2. vuex 能做到数据响应式，而 localStroage 不能

3. 刷新页面 vuex 会丢失，而 localStorage 不会

</br>
</br>

### 3、Vue 如何实现数据双向绑定

**绑定过程**

1. 给表单绑定一个变量
2. 给表单绑定一个 change 事件，如果 value 值有更新，就会去更新这个变量
3. data 更新，重新 render 渲染页面

**如何监听 data**

通过 Object.defineProperty 的 set 和 get 方法去实现，但是这个 API 也有一定弊端：

1. 深度监听，需要一直递归到底，计算量大
2. 无法监听新增/删除的属性（Vue.set 和 Vue.delete）
3. 无法监听原生数组，需要特殊处理

**如何监听数组**

重新定义数组的原型，重写 push、pop 等方法

**proxy**

兼容性不好，而且没办法 polyfill

```javascript
let proxy = new Proxy(target, handlers);
```

</br>
</br>

### 4、计算属性 computed

1. computed 计算属性用于缓存计算量大，且改变机会少的操作，提高性能

2. 它是响应式的，只要依赖的变量没有变化，他最终的返回结果就不会重新计算，也不会变化

</br>
</br>

### 5、为何组件的 data 必须是一个函数？

```javascript
export default {
    data() {
        return {};
    },
};
```

因为 vue 组件就是一个 vue 实例，实例是通过构造函数创建的，每一个实例都会继承该函数原型上的方法或属性，如果 data 是一个属性的话，意味着所有实例都共享着这个属性，不同组件之间的 data 就会相互影响。而每一个函数都有独立的作用域，如果这个 data 是一个函数的话，不同作用域间的数据是相互隔离的，就不会造成实例之间 data 的相互影响。

</br>
</br>

### 6、描述组件渲染和更新的过程

**初次渲染过程**

1. 将 template 模板解析为 render 函数（一般在本地打包的时候完成此步骤）
2. 监听组件中的 data
3. 执行 render 函数，生成 vnode（虚拟 dom），然后根据虚拟 dom 渲染页面

**更新过程**

1. 修改 data，触发 setter 函数
2. 重新执行 render 函数，生成 newVnode（新的虚拟 dom）
3. 通过 dom diff 算法对比 vnode 和 newVnode，找到变化的地方，更新页面

</br>
</br>

### 7、Vue 组件如何通讯

1. props 和 $emit（父子组件）
2. 自定义事件，event.$on / event.$off / event.$emit （兄弟组件）
3. vuex（全局）

</br>
</br>

### 8、Vue 中 data 发生改变后，会立刻同步重新渲染吗？

1. 数据改变后，并不会立刻更新视图，他会开启一个异步任务队列，将需要变化的 data 加入这个队列中，最后再统一进行视图更新，提高渲染性能

2. 我们可以通过 $nextTick 的方法去获取此次异步更新后的 dom 元素

</br>
</br>

### 9、插槽、作用域插槽、具名插槽

插槽：类似于 React 中的 children，父组件传递内容给子组件

作用域插槽：父组件传递的内容依赖于子组件的一些数据

具名插槽：父组件同时传入多种内容，子组件通过 name 属性一一对应

</br>
</br>

### 10、简述一下 vuex

**流程**

1. 用户通过页面产生交互，触发一个 dispatch 函数
2. 根据 dispatch 函数传入的参数，会产生一个 action 动作，该动作会通过 commit 提交到 mutation
3. 最后 mutation 就会去改变 state

**核心概念**

1. dispatch：唯一触发 action 的方法
2. actions：负责处理数据产生的变化，以及数据如何变化，在 action 中也可以处理异步操作
3. commit：提交到 mutation 的方法
4. mutation：操作 state 的变更
5. state：vuex 中存储的全局状态
6. getter：从 vuex 中取出 state 的一种方式，便于我们取出处理后的 state

</br>
</br>

### 11、描述 Vue 组件的生命周期

-   挂载阶段

    1. beforeCreate
    2. created：创建好了 Vue 实例，但是 dom 还未渲染完成
    3. beforeMount
    4. mounted：dom 已经更新完成，用于执行 ajax 等操作

-   更新阶段

    1. beforeUpdate
    2. updated

-   销毁阶段

    1. beforeDestroy：销毁实例之前触发，用于执行注销事件监听、定时器等操作
    2. destroyed

父组件(beforeCreate/beforeUpdate/beforeDestroy) -> 子组件（beforeCreate/beforeUpdate/beforeDestroy） -> 子组件（created/updated/destroyed） -> 父组件（created/updated/destroyed）

</br>
</br>

### 12、简述 vue-router

1. Hash 和 History 两种路由模式
2. 路由钩子可全局配置所有路由，也可以单独配置每个路由
3. router.beforeEach：每个路由进入前触发，一般用于登录校验
4. router.afterEach：进入路由后触发
5. 动态路由(/path/:id)
6. 通过 import 以及结合 webpack 实现路由懒加载

</br>
</br>

### 13、v-show、v-if

1. v-show 通过 display 属性显示/隐藏 dom

2. v-if 销毁/重新渲染 dom

</br>
</br>

### 14、动态组件 和 keep-alive

通过 :is 属性去动态渲染某个不确定的组件，可结合 keep-alive 缓存组件

```html
<keep-alive :include="/a|b/">
    <component :is="witchComponent"></component>
</keep-alive>
```

### 15、如何自己实现 v-modal

1. 父组件通过 v-modal 给子组件绑定一个 value 值

2. 子组件接收一个 props 对象，包涵了父组件传来的 value 值

3. 再定义 modal 属性，包涵一个 prop（与父组件传来 value 字段保持一致） 和 event（改变这个 value 值的 change 事件名）

4. 子组件通过 $emit 去修改这个 value 值

</br>
</br>

### 16、如何实现自定义指令

1. 通过 Vue.directives 或者在组件内部使用 directives 属性去指定指令内容

2. 通过自定义指令提供的生命钩子，去执行相关操作逻辑

3. 一般适用于 dom 操作

</br>
</br>

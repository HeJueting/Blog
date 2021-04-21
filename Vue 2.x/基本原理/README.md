# Vue 2.x 基本原理

</br>

### MVVM

Vue 和 React 都是采用数据驱动视图的模式进行开发，Vue 是基于 MVVM 架构：**View + ViewModal + Modal**，将 view(视图) 和 modal(数据) 通过 ViewModal 双向绑定。

</br>
</br>

### Vue 如何监听数据的变化

核心 API：Object.defineProperty

</br>

**基本使用：**

```javascript
const data = {};
let name = "hejueting";
Object.defineProperty(data, "name", {
    get: () => {
        console.log("调用了get方法");
        return name;
    },
    set: (newVal) => {
        console.log("调用了set方法");
        name = newVal;
    },
});

console.log(data.name); // 调用了get方法，"hejueting"
data.name = "yueyue"; // 调用了set方法
console.log(data.name); // 调用了get方法，"yueyue"
```

</br>

**如何深度监听对象**

```javascript
function updateView() {
    console.log("数据改变了");
}
function defineProperty(target, key, value) {
    // 如果value是一个对象，继续深度监听value
    observe(value);
    // 监听属性key
    Object.defineProperty(target, key, {
        get: () => {
            return value;
        },
        set: (newVal) => {
            if (value !== newVal) {
                value = newVal;
                // 如果newVal又是一个对象，继续深度监听
                observe(newVal);
                // 通知视图更新
                updateView();
            }
        },
    });
}
function observe(target) {
    if (typeof target !== "object" && target !== "null") {
        return target;
    }
    Object.keys(target).forEach((key) => {
        defineProperty(target, key, target[key]);
    });
}

// 深度监听data
const data = {
    name: "hejueting",
    age: 24,
    about: {
        location: "CQ",
    },
};
observe(data);

data.name = "hjt"; // 数据改变了
data.age = "18"; // 数据改变了
data.about.location = "BJ"; // 数据改变了
```

</br>

**如何监听数组**

```javascript
// 重新定义数组的原型，让newArrayPrototype的__proto__属性指向了Array.prototype
const newArrayPrototype = Object.create(Array.prototype);
// 给newArrayPrototype封装数组的方法
["push", "pop", "unshift", "shift"].forEach((methodName) => {
    newArrayPrototype[methodName] = function () {
        // 通知视图更新
        updateView();
        // 调用数组的原生方法
        Array.prototype[methodName].call(this, ...arguments);
    };
});

const data = [1, 2, 3];
data.__proto = newArrayPrototype;
data.push(4); // 数据改变了
console.log(data); // [1,2,3,4]
```

</br>

**缺点**

-   深度监听，需要一直递归到底，计算量大

-   无法监听新增/删除的属性（Vue.set 和 Vue.delete）

-   无法监听原生数组，需要特殊处理

</br>
</br>

### proxy 监听

```javascript
let handlers = {
    get(target, key, receiver) {
        console.log(`触发了get方法，key:${key}`);
        const result = Reflect.get(target, key, receiver);
        return result;
    },
    set(target, key, value, receiver) {
        console.log(`触发了set方法，key:${key}，value:${value}`);
        const result = Reflect.set(target, key, value, receiver);
        return result;
    },
    deleteProperty(target, key) {
        console.log(`删除属性，key:${key}`);
        const result = Reflect.deleteProperty(target, key);
        return result;
    },
};
let proxy = new Proxy(target, handlers);
```

**监听对象**

```javascript
let target = { age: 18, name: "Niko Bellic" };

// 触发了get方法，key:age
console.log(proxy.name);
// 触发了set方法，key:age，value:18
proxy.age = 18;
// 触发了set方法，key:live，value:CQ
proxy.live = "CQ";
// 删除属性，key:name
delete proxy.name;
```

</br>

**监听数组**

```javascript
let target = [1, 2, 3];

// 触发了get方法，key:0
console.log(proxy[0]);
// 触发了get方法，key:push
// 触发了get方法，key:length
// 触发了set方法，key:3，value:4
// 触发了set方法，key:length，value:4
proxy.push(4);
// 触发了set方法，key:0，value:0
proxy[0] = 0;
```

</br>

**Vue3 如何实现响应式**

```javascript
// 监听处理
const handlers = {
    get(target, key, receiver) {
        console.log(`触发get方法...key：${key}`);
        // 深度监听
        const result = Reflect.get(target, key, receiver);
        return observe(result);
    },
    set(target, key, value, receiver) {
        // 不处理重复的重复的数据
        if (target[key] === value) {
            return true;
        }
        console.log(`触发set方法...key：${key}`);
        const result = Reflect.set(target, key, value, receiver);
        return result;
    },
    deleteProperty(target, key) {
        const result = Reflect.deleteProperty(target, key);
        return result;
    },
};
// 监听的方法
function observe(target) {
    // 不用监听基本数据类型
    if (typeof target !== "object" && target !== "null") {
        return target;
    }
    const proxy = new Proxy(target, handlers);
    return proxy;
}

const target = {
    name: "hejueting",
    obj: {
        location: "CQ",
    },
    arr: [1, 2, 3],
};
const proxy = observe(target);

// 触发get方法...key：name
console.log(proxy.name);
// 触发get方法...key：obj
// 触发get方法...key：location
console.log(proxy.obj.location);
// 触发set方法...key：age
proxy.age = 24;
// 触发get方法...key：arr
// 触发get方法...key：push
// 触发get方法...key：length
// 触发set方法...key：3
proxy.arr.push(4);
```

</br>

**相比于 Object.defineProperty 的优势**

-   不会深度监听，执行到 get 才会去递归

-   可以监听对象新增、删除属性

-   可以监听数组

</br>
</br>

### 用 JS 模拟 DOM 结构

DOM 操作非常耗费性能，虚拟 DOM 就是利用 JS 去模拟 DOM 结构

```html
<div id="div" class="container">
    <p style="font-size: 18px">hello, hejueting</p>
</div>
```

```javascript
const vdom = {
    tag: "div",
    id: "div",
    className: "container",
    children: [
        {
            tag: "p",
            style: "font-size: 18px",
            text: "hello, hejueting",
        },
    ],
};
```

</br>
</br>

### Dom Diff 算法

diff 算法只是一种对比算法（例如: git）， dom diff 算法是将两个 JS DOM 树进行比较的一种算法。**传统的 Dom Diff 算法的时间复杂度为 O(n ^ 3)**，如果有 1000 个节点，就要遍历 1 亿次，不可取。

-   遍历 tree1

-   遍历 tree2

-   排序对比

Dom Diff 算法进行优化后，时间复杂度降为了 O(n)

-   只比较同一层级，不跨级比较

-   tag 不相同，则直接删掉重建，不再深度比较

-   tag 和 key，两者都相同，则认为是相同节点，不再深度比较

</br>
</br>

### 模板编译

将 Vue 中模板（template 标签）转化成 JS 这个过程叫做模板编译。Vue 通过 **vue-template-compiler** 工具将模板将模板转为 render 函数，执行这个 render 函数就可以得到一个虚拟 dom

</br>
</br>

### 如何渲染和更新

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

### 异步渲染

-   汇总 data 的修改，一次性更新视图

-   减少 DOM 操作次数，提高性能

</br>
</br>

### 前端路由

-   hash

    1. 支持浏览器前进、后退
    2. hash 不会刷新页面
    3. hash 值的变化不会导致浏览器像服务器发送请求
    4. 可以通过 hashchange 来监听

-   H5 history
    1. 前端提供的一种路由处理方式，不会刷新页面，需要服务端配合（nginx 的 try_files）

</br>
</br>

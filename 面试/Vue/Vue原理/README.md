### 组件化和MVVM

- 传统组件，更新依赖于DOM操作

- 数据驱动视图 -> Vue MVVM -> M(Modal) V(View) VM(ViewModal)

![vue-mvvm](./img/mvvm.jpg)

<br></br>
<br></br>
<br></br>




### 监听data变化的核心API是什么？

**基本使用**

- 利用Object.defineProperty这个API，通过它的set和get方法去监听对象属性的改变

```javascript
const data = {};

Object.defineProperty(data, 'name', {
    get: function () {
        console.log('你在获取data的name属性');
        return name;
    },
    set: function (val) {
        console.log('你在对data的name属性赋值');
        name = val;
    }
})

data.name = 'hejueting'; // 你在对data的name属性赋值
console.log(data.name);  // 你在获取data的name属性  hejueting
```


**复杂对象，深度监听？如何监听数组？**

```javascript
// 更新视图
function updateView() {
    console.log('更新视图');
}

// 定义一个新的数据类型，在这个新数组类型上封装一层push、pop等方法
// Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
const newArray = Object.create(Array.prototype);
['push', 'pop', 'shift', 'unshift'].forEach(methodName => {
    newArray[methodName] = function (params) {
        // 该function中this指向了target这个数组
        // 让该target调用数组原生的方法
        newArray.__proto__[methodName].call(this, params);
        // 更新视图
        updateView();
    }
});

// 监听的方法
function observe(target) {
    if(typeof target !== 'object' || target === null) {
        // 不是对象或者数组
        return target;
    }

    // 如果这个变量是一个数组，则改变这个数组的原型
    if(Array.isArray(target)) {
        target.__proto__ = newArray;
    }

    // 重新定义各个属性
    for(let key in target) {
        defineAttribute(target, key, target[key]);
    }
}

// 重新定义属性进行监听
function defineAttribute(target, key, value) {
    // 对进行value深度监听
    observe(value);
    // 重新定义这个对象属性
    Object.defineProperty(target, key, {
        get: function () {
            return value;
        },
        set: function (newValue) {
            if (newValue !== value) {
                // 如果更新的这个newValue是一个对象，也需要深度监听
                observe(value);
                // 更新值
                value = newValue;
                // 更新新视图
                updateView();
            }
        }
    })
}


const data = {
    name: 'hejueting',
    age: 18,
    other: {
        location: 'CQ',
    },
    arr: [1, 2, 3],
}

observe(data);

data.name = 'xxx';          // 视图更新
data.age = 25;              // 视图更新
data.other.location = 'BJ'; // 视图更新
data.arr.push(4);           // 视图更新
```




**Object.defineProperty的缺点**

- 深度监听，需要递归到底，一次性计算量大

- 无法监听新增属性/删除属性（需要调用 Vue.set 和 Vue.delete）

- 无法监听数组，需要特殊处理





### 响应式原理

<br></br>
<br></br>
<br></br>




### v-dom和diff算法

<br></br>
<br></br>
<br></br>




### 模板编译

<br></br>
<br></br>
<br></br>




### 组件渲染过程

<br></br>
<br></br>
<br></br>




### 前端路由

<br></br>
<br></br>
<br></br>

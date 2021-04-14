# 对象的浅克隆和深克隆

</br>

### 前言

如果 JavaScript 的数据按照存储类型进行分类，会划分为：

-   基本类型：Number/Boolean/String/undefined/null/Symbol/BigInt，他们在内存中分别占有固定的小大空间，因此他们的**值是保存在栈内存中**，我们是通过按值来访问的

-   引用类型：object/function，他们是通过地址值去访问，它的**地址值是保存在栈内存中**，而**具体值是保存在在堆内存中**

由于引用类型的特殊性，我们就会常用到浅克隆和深克隆去处理引用类型

</br>
</br>

### 浅克隆的实现

```javascript
const a = { name: "hejueting" };
const a1 = a;
const a2 = a;
console.log(a1 === a2); // true

// 对象解构
const a1 = { ...a };
const a2 = { ...a };
console.log(a1 === a2); // false

// Object.assign
const a1 = Object.assign({}, a);
const a2 = Object.assign({}, a);
console.log(a1 === a2); // false

// ......
```

</br>
</br>

### 深克隆的实现

1. **JSON.stringify 和 JSON.parse**

```javascript
const a = {
    obj: {
        name: "hejueting",
    },
};
const b = JSON.parse(JSON.stringify(a));
console.log(a === b); // false
console.log(a.obj === b.obj); // false
```

这种方式比较简单粗暴，但是也会存在一些问题：正则表达式在序列化的过程中自动转为了空对象，函数和 undefined 在序列化的过程中也消失......

```javascript
const a = {
    num: 1,
    str: "str",
    undefined: undefined,
    null: null,
    obj: {
        name: "hejueting",
    },
    reg: /reg/,
    func: () => {
        console.log("func");
    },
    date: new Date(),
};
const b = JSON.parse(JSON.stringify(a));

/*
{
    date: "2021-04-13T09:38:00.831Z",
    null: null,
    num: 1,
    obj: {name: "hejueting"},
    reg: {},
    str: "str",
}
*/
console.log(b);
```

</br>

2. **通过递归实现**

```javascript
function deepClone(obj) {
    // 如果是函数，bind方法能创建一个新的函数
    if (typeof obj === "function") return obj.bind();
    // 如果obj为null
    if (obj === null) return null;
    // 如果obj的类型不为object
    if (typeof obj !== "object") return obj;
    // 如果是正则
    if (obj instanceof RegExp) return new RegExp(obj);
    // 如果是日期
    if (obj instanceof Date) return new Date(obj);
    // 其他特殊情况
    // ......

    const newObj = {};
    // 使用Reflect.ownKeys遍历对象，只会遍历对象自身的属性（包括：可枚举/不可枚举/Symbol键值）
    Reflect.ownKeys(obj).forEach((key) => {
        newObj[key] = deepClone(obj[key]);
    });

    return newObj;
}
```

</br>

3. **使用 lodash 等类库**

点击查看：[文档地址](https://www.lodashjs.com/)

```javascript
lodash.cloneDeep(obj);
```

</br>
</br>

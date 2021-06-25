### JSON 序列化（巧解）

这种方式比较简单粗暴，但存在一些问题：**正则表达式在序列化的过程中自动转为了空对象，函数和 undefined 在序列化的过程中也消失**

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
console.log(b);
// {
//     date: "2021-04-13T09:38:00.831Z",
//     null: null,
//     num: 1,
//     obj: {name: "hejueting"},
//     reg: {},
//     str: "str",
// }
```

</br>
</br>

### 如何实现深拷贝（简易版本）

```javascript
function deepClone(obj) {
    let newObj = {};
    Object.keys(obj).map((key) => {
        if (typeof obj[key] === "object") {
            newObj[key] = deepClone(obj[key]);
        } else {
            newObj[key] = obj[key];
        }
    });
    return newObj;
}
```

</br>
</br>

### 解决循环引用（升级版 1）

用一个 map 去缓存记录已经克隆过的对象

```javascript
function deepClone(target) {
    // 用 Map 保存已经克隆过的对象
    let map = new Map();

    // 递归深克隆
    function deep(obj) {
        let newObj = {};
        // 遍历这个对象的属性
        Object.keys(obj).map((key) => {
            if (typeof obj[key] === "object") {
                // 如果 map 中已经存在
                if (map.get(obj[key])) {
                    newObj[key] = map.get(obj[key]);
                } else {
                    // 缓存这个对象，value 值就是 newObj
                    map.set(obj, newObj);
                    // 递归克隆这个对象
                    newObj[key] = deep(obj[key]);
                }
            }
            // 非对象的原始数据类型直接复制即可
            else {
                newObj[key] = obj[key];
            }
        });
        return newObj;
    }

    return deep(target);
}
```

</br>
</br>

### 数组，函数...的处理（升级版 2）

```javascript
function deepClone(target) {
    // 用 Map 保存已经克隆过的对象
    let map = new Map();

    // 递归深克隆
    function deep(obj) {
        // 处理函数，bind 方法能创建一个新的函数
        if (typeof obj === "function") {
            return obj.bind();
        }
        // 处理非原始数据类型
        else if (typeof obj === "object") {
            // 处理 null
            if (obj === null) return null;
            // 处理数组
            else if (Array.isArray(obj)) {
                let newArr = [];
                // 循环遍历这个对象
                obj.map((item) => {
                    newArr.push(deep(item));
                });
                return newArr;
            }
            // 常规对象
            else {
                let newObj = {};
                // 递归遍历这个对象的属性
                Object.keys(obj).map((key) => {
                    if (typeof obj[key] === "object") {
                        // 如果 map 中已经存在
                        if (map.get(obj[key])) {
                            newObj[key] = map.get(obj[key]);
                        } else {
                            // 缓存这个对象，value 值就是 newObj
                            map.set(obj, newObj);
                            // 递归克隆这个对象
                            newObj[key] = deep(obj[key]);
                        }
                    }
                    // 非对象的原始数据类型直接复制即可
                    else {
                        newObj[key] = obj[key];
                    }
                });
                return newObj;
            }
        }
        // 原始数据类型
        else {
            return obj;
        }
    }

    return deep(target);
}
```

</br>
</br>

### Symbol 属性、不可枚举属性（升级版 3）

1. Object.keys：只可遍历自身可枚举属性

2. for...in：遍历自身可枚举属性、原型链上继承的可枚举属性

3. Reflect.ownKeys：自身可枚举属性、自身不可枚举属性、Symbol 属性

</br>
</br>

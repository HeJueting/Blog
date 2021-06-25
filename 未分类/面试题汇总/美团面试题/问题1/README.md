### 题目描述

```javascript
const a = new Func(); // { id: 1 }
const b = new Func(); // { id: 2 }
const c = Func(); // { id: 3 }

a instanceof Func; // true
b instanceof Func; // true
c instanceof Func; // true
```

实现上述 Func，要求：

1. a b c 的 id 属性值跟 Func 的调用次数有关

2. a b c 都继承于 Func

</br>
</br>

### 继承实现

```javascript
function Func() {
    Func.prototype.id++;
    const obj = Object.create(Func.prototype);
    obj.id = Func.prototype.id;
    return obj;
}
Func.prototype.id = 0;
```

</br>
</br>

### 作用域来实现

使用继承的话，Func 上的 id 可能会被修改掉，因此可以使用作用域来实现

```javascript
const Func = (function () {
    let id = 0;
    return function func() {
        id++;
        const obj = Object.create(Func.prototype);
        obj.id = id;
        return obj;
    };
})();
```

</br>
</br>

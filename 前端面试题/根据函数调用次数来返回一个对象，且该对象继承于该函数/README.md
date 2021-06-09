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

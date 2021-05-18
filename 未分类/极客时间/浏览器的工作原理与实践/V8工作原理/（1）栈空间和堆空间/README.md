# 栈空间和堆空间：数据是如何存储的？

</br>

### 弱类型语言

支持隐式类型转换的语言称为弱类型语言，不支持隐式类型转换的语言称为强类型语言。弱类型语言具有以下特点：

1. 弱类型：意味着你不需要告诉 JavaScript 引擎这个或那个变量是什么数据类型，JavaScript 引擎在运行代码的时候自己会计算出来

2. 动态：意味着你可以使用同一个变量保存不同类型的数据。

</br>
</br>

### 数据类型分类

1. 7 种原始类型：String、Boolean、Number、undefined、null、Symbol、BigInt

2. 2 种引用类型：Function、Object

</br>
</br>

### 栈空间和堆空间

1. 栈空间：原始类型都是保存在栈空间中

2. 堆空间：地址值保存中栈空间中，具体数据内容保存在堆空间中

</br>
</br>

### 为什么需要堆空间？

因为 JavaScript 引擎需要用栈来维护程序执行期间上下文的状态，如果栈空间大了话，所有的数据都存放在栈空间里面，那么会影响到上下文切换的效率，进而又影响到整个程序的执行效率

</br>
</br>

### 执行上下文销毁后，为什么没有销毁掉闭包变量？

```javascript
function foo() {
    var myName = "极客时间";
    var innerBar = {
        getName: function () {
            return myName;
        },
    };
    return innerBar;
}
var bar = foo();
bar.getName(); // 极客时间
```

以上述代码为例：

1. 当内部函数引用了外部函数的变量，JavaScript 引擎会判断这是一个闭包，于是 Javascrpt 会创建一个于是在**堆空间创建换一个 “closure(foo)” 的对象**

2. 虽然函数 foo 执行完之后，执行上下文已经被销毁了，但是 “closure(foo)” 的对象还保存在内容中

3. 通过 getName 方法访问 myName 变量时，实际是访问的 closure(foo) 对象中的 myName 属性

</br>
</br>
